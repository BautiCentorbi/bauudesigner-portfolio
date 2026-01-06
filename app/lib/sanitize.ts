export default function sanitize(input: string): string {
  return input.replace(/[<>&'"]/g, (c) =>
    ({
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&#39;",
      '"': "&quot;",
    }[c] ?? c)
  );
}