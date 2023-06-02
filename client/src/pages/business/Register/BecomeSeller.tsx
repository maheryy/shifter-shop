import { Fragment } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/business/register/Header";
import Copyright from "@/components/Copyright";

export function BecomeSeller() {
  return (
    <Fragment>
      <Header />
      <main>
        <section className="grid gap-8 p-4">
          <h1 className="text-xl font-bold">
            Ready to sell? Here's what you need to do:
          </h1>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <h2 className="text-lg font-medium">
                Share key details about you and your business
              </h2>
              <p>
                In order to ensure a secure and reliable environment, we kindly
                request the collection of necessary information for
                identification and verification purposes.
              </p>
            </div>
            <div className="grid gap-2">
              <h2 className="text-lg font-medium">
                We'll validate your submission
              </h2>
              <p>
                You can anticipate us getting in touch to establish trust
                between our businesses.
              </p>
            </div>
            <div className="grid gap-2">
              <h2 className="text-lg font-medium">Get ready to sell!</h2>
              <p>
                Step into the marketplace and watch your business soar as you
                start selling on our platform.
              </p>
            </div>
          </div>
          <Link
            className="w-full rounded-md border border-primary bg-primary px-4 py-3 text-center text-sm font-medium uppercase text-white transition hover:bg-transparent hover:text-primary md:max-w-md"
            to="/business/register/landing"
          >
            Begin
          </Link>
        </section>
      </main>
      <Copyright />
    </Fragment>
  );
}

export default BecomeSeller;
