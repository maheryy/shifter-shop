import nodemailer from "nodemailer";

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
      console.error(err);
      process.exit(1);
    }

    console.log("SMTP connection established successfully");
  });
};

export default mailer;
