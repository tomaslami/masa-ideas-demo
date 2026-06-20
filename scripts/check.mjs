import puppeteer from "puppeteer-core";

const CHROME =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE = process.env.BASE || "http://localhost:3000";
const ROUTES = (
  process.env.ROUTES ||
  "/,/inventario,/crm,/propuestas,/propuestas/nueva"
).split(",");

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox"],
});

let totalErrors = 0;

for (const route of ROUTES) {
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`[console] ${msg.text()}`);
  });
  page.on("pageerror", (err) => {
    errors.push(`[pageerror] ${err.message}\n${err.stack || ""}`);
  });
  try {
    await page.goto(BASE + route, { waitUntil: "networkidle2", timeout: 45000 });
    await new Promise((r) => setTimeout(r, 2500));
  } catch (e) {
    errors.push(`[navigation] ${e.message}`);
  }
  console.log(`\n===== ${route} =====`);
  if (errors.length === 0) {
    console.log("OK — sin errores de consola");
  } else {
    totalErrors += errors.length;
    for (const e of errors.slice(0, 6)) console.log(e.slice(0, 1200));
  }
  await page.close();
}

await browser.close();
console.log(`\n##### TOTAL ERRORES: ${totalErrors} #####`);
process.exit(totalErrors > 0 ? 1 : 0);
