import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const patternsFile = join(repoRoot, "src/data/patterns.ts");

const source = readFileSync(patternsFile, "utf-8");
const regex = /sourcePath:\s*"([^"]+)"/g;

let match;
const paths = [];
while ((match = regex.exec(source)) !== null) {
  paths.push(match[1]);
}

if (paths.length === 0) {
  console.error("No sourcePath entries found — regex may be out of sync with patterns.ts");
  process.exit(1);
}

let missing = 0;
for (const p of paths) {
  const full = join(repoRoot, "solutions", p);
  if (!existsSync(full)) {
    console.error(`MISSING: ${p}`);
    missing++;
  }
}

if (missing > 0) {
  console.error(`\n${missing} of ${paths.length} sourcePath(s) do not resolve under solutions/.`);
  process.exit(1);
}

console.log(`OK — all ${paths.length} sourcePath(s) resolve under solutions/.`);
