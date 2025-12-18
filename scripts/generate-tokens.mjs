import fs from "node:fs";
import path from "node:path";

const TOKENS_JSON = path.resolve("design/tokens.json");
const OUT_TW = path.resolve("design/tailwind.tokens.cjs");
const OUT_CSS = path.resolve("src/styles/tokens.css");

function ensureDir(p) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
}

function readTokens() {
  const raw = fs.readFileSync(TOKENS_JSON, "utf8");
  return JSON.parse(raw);
}

function toCssVarName(element, prop) {
  const map = {
    fontFamily: "font-family",
    fontSize: "font-size",
    fontStyle: "font-style",
    fontWeight: "font-weight",
    textTransform: "text-transform",
    lineHeight: "line-height",
    textDecoration: "text-decoration",
    color: "color",
  };
  return `--${element}-${map[prop]}`;
}

function generateCss(tokens) {
  const elements = Object.keys(tokens);
  const lines = [];
  lines.push(":root {");
  for (const el of elements) {
    const t = tokens[el] || {};
    for (const prop of ["fontFamily","fontSize","fontStyle","fontWeight","textTransform","lineHeight","textDecoration","color"]) {
      const v = (t[prop] ?? "").toString().trim();
      if (!v) continue;
      lines.push(`  ${toCssVarName(el, prop)}: ${v};`);
    }
  }
  lines.push("}");
  lines.push("");

  const apply = (selector, elKey) => {
    lines.push(`${selector} {`);
    lines.push(`  font-family: var(--${elKey}-font-family, inherit);`);
    lines.push(`  font-size: var(--${elKey}-font-size, inherit);`);
    lines.push(`  font-style: var(--${elKey}-font-style, inherit);`);
    lines.push(`  font-weight: var(--${elKey}-font-weight, inherit);`);
    lines.push(`  text-transform: var(--${elKey}-text-transform, none);`);
    lines.push(`  line-height: var(--${elKey}-line-height, normal);`);
    lines.push(`  text-decoration: var(--${elKey}-text-decoration, none);`);
    lines.push(`  color: var(--${elKey}-color, inherit);`);
    lines.push("}");
    lines.push("");
  };

  apply("body", "body");
  apply("p", "p");
  apply("h1", "h1");
  apply("h2", "h2");
  apply("h3", "h3");
  apply("a", "a");
  apply("label", "label");
  apply("small", "small");

  lines.push("body { margin: 0; }");
  lines.push("a:hover { opacity: 0.85; }");
  lines.push("");
  return lines.join("\n");
}

function generateTailwindExt(tokens) {
  const fontFamily = {
    sans: [(tokens.body?.fontFamily || "system-ui"), "system-ui", "sans-serif"],
  };

  const fontSize = {};
  const add = (key) => {
    const t = tokens[key];
    if (!t?.fontSize) return;
    fontSize[key] = [
      t.fontSize,
      {
        lineHeight: t.lineHeight || undefined,
        fontWeight: t.fontWeight || undefined,
      },
    ];
  };
  ["h1","h2","h3","body","p","label","small"].forEach(add);

  const colors = {
    ink: tokens.body?.color || "#111111",
    ink2: tokens.p?.color || "#222222",
    heading: tokens.h1?.color || "#111111",
    link: tokens.a?.color || "#0066cc",
  };

  return { fontFamily, fontSize, colors };
}

function main() {
  const tokens = readTokens();
  ensureDir(OUT_CSS);
  ensureDir(OUT_TW);

  fs.writeFileSync(OUT_CSS, generateCss(tokens), "utf8");

  const ext = generateTailwindExt(tokens);
  fs.writeFileSync(OUT_TW, "module.exports = " + JSON.stringify(ext, null, 2) + ";\n", "utf8");

  console.log("Generated:", path.relative(process.cwd(), OUT_CSS), "and", path.relative(process.cwd(), OUT_TW));
}

main();
