export default function cleanIndent(str: string) {
  const indents = str
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => line.match(/^[ \t]*/)?.[0]?.length ?? 0);

  const minIndent = Math.min(...indents);

  if (minIndent === 0) return str;

  const regex = new RegExp(`^[ \\t]{${minIndent}}`, "gm");
  return str.replace(regex, "").trim();
}
