import fs from "fs";
import path from "path";
import initialData from "../data/portfolio-data.json";
import { PortfolioData } from "../types/portfolio";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "portfolio-data.json");

export function getPortfolioData(): PortfolioData {
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

export function savePortfolioData(data: PortfolioData): boolean {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error saving portfolio data file:", error);
    return false;
  }
}
