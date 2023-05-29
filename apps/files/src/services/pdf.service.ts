import puppeteer from "puppeteer";

export const generatePDF = async (content: string) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(content, { waitUntil: "domcontentloaded" });
  const pdf = await page.pdf({
    margin: { top: "50px", right: "50px", bottom: "50px", left: "50px" },
    printBackground: true,
    format: "A4",
  });
  await browser.close();

  return pdf;
};
