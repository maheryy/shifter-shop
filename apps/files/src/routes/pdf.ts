import { Router } from "express";
import { generatePDF } from "services/pdf.service";
import { getHandlebarsHTML } from "services/template.service";

const router = Router();

/*
 * Download a pdf file
 *
 * @param template string
 * @body filename string
 * @body data object
 *
 */
router.post("/pdf/:template", async (req, res, next) => {
  try {
    const { template } = req.params;
    const filename = req.body.filename || template;
    const html = await getHandlebarsHTML(template, req.body.data || {});
    const pdf = await generatePDF(html);

    return res
      .status(200)
      .setHeader("Content-Type", "application/pdf")
      .setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}.pdf"`
      )
      .send(pdf);
  } catch (error) {
    next(error);
  }
});

export default router;
