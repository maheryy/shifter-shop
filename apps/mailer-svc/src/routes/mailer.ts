import { NextFunction, Response, Router } from "express";
import { MailerBody } from "types/body";
import { CustomRequest } from "types/request";
import mailer from "lib/mailer";

const router = Router();

router.post(
  "/",
  async (req: CustomRequest<MailerBody>, res: Response, next: NextFunction) => {
    try {
      const message = await mailer.sendMail({
        ...req.body,
      });

      if (message.rejected.length) {
        console.log("email rejected from : ", message.rejected.join(", "));
      }
      if (message.accepted.length) {
        console.log("email sent to : ", message.accepted.join(", "));
      }
      return res.status(200).send("Email sent successfully");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
