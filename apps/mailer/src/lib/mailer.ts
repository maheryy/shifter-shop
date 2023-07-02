import nodemailer from "nodemailer";
import { logger } from "@shifter-shop/logger";

const mailer = nodemailer.createTransport(process.env.MAILER_DSN, {
  from: {
    name: "Shifter Shop",
    address: "no-reply@shiftershop.com",
  },
  replyTo: "contact@shiftershop.com",
});

export const initMailer = () => {
  mailer.verify((err) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }

    console.log("SMTP connection established successfully");
  });
};

export default mailer;
