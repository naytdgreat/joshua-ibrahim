import fs from "fs";
import path from "path";
import initialData from "../data/portfolio-data.json";
import { PortfolioData } from "../types/portfolio";
import { Redis } from "@upstash/redis";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "portfolio-data.json");
const REDIS_KEY = "portfolio_data";

/**
 * Returns an Upstash Redis client if environment variables are set.
 * Works with either Vercel KV (KV_REST_API_*) or Upstash Redis (UPSTASH_REDIS_REST_*).
 */
export function getRedisClient(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    return new Redis({ url, token });
  }
  return null;
}

/**
 * Fetches portfolio data from Redis/KV first; if not found or Redis is not configured,
 * falls back to reading the local portfolio-data.json file.
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  const redis = getRedisClient();
  if (redis) {
    try {
      let data = await redis.get<PortfolioData | string>(REDIS_KEY);
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          // ignore parsing error if string is not JSON
        }
      }
      if (data && typeof data === "object") {
        return data as PortfolioData;
      }
    } catch (error) {
      console.error("Error fetching portfolio data from Redis/KV:", error);
    }
  }

  // Fallback to local filesystem / bundled initial data
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      return JSON.parse(fileContent) as PortfolioData;
    }
  } catch (error) {
    console.error("Error reading portfolio data file:", error);
  }

  return initialData as unknown as PortfolioData;
}

/**
 * Persists portfolio data.
 * Tries saving to Upstash Redis / Vercel KV (for cloud/Vercel persistence)
 * and to the local filesystem (for local development updates).
 */
export async function savePortfolioData(data: PortfolioData): Promise<boolean> {
  const redis = getRedisClient();
  let savedToRemote = false;

  if (redis) {
    try {
      await redis.set(REDIS_KEY, data);
      savedToRemote = true;
    } catch (error) {
      console.error("Error saving portfolio data to Redis/KV:", error);
    }
  }

  let savedToLocal = false;
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    savedToLocal = true;
  } catch (error) {
    // Expected on Vercel read-only filesystem (EROFS)
    if (!savedToRemote) {
      console.error("Error saving portfolio data to local file system:", error);
    }
  }

  return savedToRemote || savedToLocal;
}

