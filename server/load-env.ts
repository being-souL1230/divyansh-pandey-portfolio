import fs from "node:fs";
import path from "node:path";

let loaded = false;

function parseLine(line: string): [string, string] | null {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;

  const separatorIndex = trimmed.indexOf("=");
  if (separatorIndex <= 0) return null;

  const key = trimmed.slice(0, separatorIndex).trim();
  let value = trimmed.slice(separatorIndex + 1).trim();

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }

  return [key, value];
}

export function ensureEnvLoaded() {
  if (loaded) return;
  loaded = true;

  const envFiles = [".env.local", ".env"];

  for (const envFile of envFiles) {
    const absolutePath = path.resolve(process.cwd(), envFile);
    if (!fs.existsSync(absolutePath)) continue;

    const fileContent = fs.readFileSync(absolutePath, "utf8");
    const lines = fileContent.split(/\r?\n/);

    for (const line of lines) {
      const parsed = parseLine(line);
      if (!parsed) continue;

      const [key, value] = parsed;
      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  }
}
