import { Link } from "react-router-dom";

function Finish() {
  return (
    <section className="container grid gap-8 py-16 md:justify-items-center">
      <h1 className="text-2xl font-bold">Submission Successful!</h1>
      <p>
        Thank you for choosing Shifter Shop, we appreciate your interest and are
        excited to connect with you soon.
      </p>
      <p>
        Our dedicated team will review your submission carefully and one of our
        representatives will personally reach out to you shortly.
      </p>
      <p>
        They will contact you to and guide you through the next steps in the
        process.
      </p>
      <p>
        If you have any questions in the meantime, please feel free to contact
        us at{" "}
        <a
          className="hover:text-primary"
          href="mailto:support@shifter-shop.pro"
        >
          support@shifter-shop.pro
        </a>
      </p>
      <p>
        In the meantime, you can{" "}
        <Link className="underline hover:text-primary" to="/business/profile">
          complete your profile
        </Link>
      </p>
    </section>
  );
}

export default Finish;
