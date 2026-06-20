import puppeteer from "puppeteer-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push("[c] " + m.text()));
page.on("pageerror", (e) => errors.push("[e] " + e.message + "\n" + (e.stack || "")));

const client = await page.target().createCDPSession();
await client.send("Page.setDownloadBehavior", {
  behavior: "allow",
  downloadPath: process.env.TEMP || "/tmp",
});

await page.goto("http://localhost:3000/propuestas/prop-telco", {
  waitUntil: "networkidle2",
  timeout: 45000,
});
await new Promise((r) => setTimeout(r, 1500));

// Buscar el botón "Exportar PDF" por texto y clickear
const clicked = await page.evaluate(() => {
  const btn = [...document.querySelectorAll("button")].find((b) =>
    /exportar pdf/i.test(b.textContent || ""),
  );
  if (btn) {
    btn.click();
    return true;
  }
  return false;
});
console.log("Botón 'Exportar PDF' encontrado y clickeado:", clicked);

// esperar a que corra html-to-image + jsPDF
await new Promise((r) => setTimeout(r, 6000));

console.log("Errores:", errors.length);
errors.slice(0, 6).forEach((e) => console.log(e.slice(0, 1000)));

await browser.close();
process.exit(errors.length ? 1 : 0);
