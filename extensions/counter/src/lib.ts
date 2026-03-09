import { mkdir, readFile, writeFile, appendFile } from "node:fs/promises";

const DATA_DIR = "/Users/sayori/.config/raycast/data/counter";

function sanitizeName(name: string): string {
  const normalized = name.trim().toLowerCase();
  const safe = normalized.replace(/[^a-z0-9._-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  if (!safe) {
    throw new Error("Counter name is empty after sanitization");
  }
  return safe;
}

function nowParts() {
  const now = new Date();

  const localDate = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

  const localDateTime = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
    .format(now)
    .replace(",", "");

  return {
    date: localDate,
    dateTime: localDateTime,
  };
}

function filePaths(counterName: string) {
  const name = sanitizeName(counterName);
  return {
    name,
    dailyFile: `${DATA_DIR}/${name}.txt`,
    auditFile: `${DATA_DIR}/${name}.audit.log`,
  };
}

export async function incrementCounter(rawName: string): Promise<{ name: string; today: string; count: number }> {
  const { date, dateTime } = nowParts();
  const { name, dailyFile, auditFile } = filePaths(rawName);

  await mkdir(DATA_DIR, { recursive: true });

  let lines: string[] = [];
  try {
    const content = await readFile(dailyFile, "utf8");
    lines = content
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  } catch {
    lines = [];
  }

  let found = false;
  let todayCount = 1;

  const updated = lines.map((line) => {
    const [d, c] = line.split(/\s+/);
    if (d === date) {
      found = true;
      todayCount = Number(c || "0") + 1;
      return `${d}\t${todayCount}`;
    }
    return line;
  });

  if (!found) {
    updated.push(`${date}\t1`);
    todayCount = 1;
  }

  updated.sort((a, b) => {
    const da = a.split(/\s+/)[0];
    const db = b.split(/\s+/)[0];
    return da.localeCompare(db);
  });

  await writeFile(dailyFile, updated.join("\n") + "\n", "utf8");
  await appendFile(auditFile, `${dateTime}\t${name}\n`, "utf8");

  return {
    name,
    today: date,
    count: todayCount,
  };
}