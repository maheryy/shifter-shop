import { Router } from "express";
import { getHandlebarsHTML } from "services/template.service";

const router = Router();

/*
 * Get a HTML from a template
 *
 * @param template string
 * @body data object
 *
 */
router.post("/html/:template", async (req, res, next) => {
  try {
    const { template } = req.params;
    const html = await getHandlebarsHTML(template, req.body.data || {});

    return res.status(200).setHeader("Content-Type", "text/html").send(html);
  } catch (err) {
    if (!(err instanceof ReferenceError)) {
      (err as Error).message = "Unable to generate HTML";
    }
    next(err);
  }
});

export default router;
