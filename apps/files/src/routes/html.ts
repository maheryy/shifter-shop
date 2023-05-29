import { Router } from "express";
import { generatePDF } from "services/pdf.service";
import { getHandlebarsHTML } from "services/template.service";

const router = Router();

/*
 * Get a HTML from a template
 *
 * @param template string
 * @body data object
 *
 */
router.get("/html/:template", async (req, res) => {
  try {
    const { template } = req.params;
    const html = await getHandlebarsHTML(template, req.body.data || {});

    return res.status(200).setHeader("Content-Type", "text/html").send(html);
  } catch (err) {
    console.error((err as Error).message);
    if (err instanceof ReferenceError) {
      return res.status(404).send({
        error: { code: 404, message: (err as Error).message },
      });
    }
    return res.status(500).send({
      error: { code: 500, message: "Unable to generate HTML" },
    });
  }
});

export default router;
