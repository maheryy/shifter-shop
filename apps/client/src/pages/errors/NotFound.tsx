import Void from "@illustrations/void.svg";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="container grid h-screen items-center">
      <div className="grid gap-8">
        <p className="text-center text-2xl">
          mmh, maybe I should{" "}
          <Link className="underline hover:text-primary" to="/">
            go back to a safe place
          </Link>
        </p>
        <Void className="mx-auto h-fit w-full max-w-lg" />
      </div>
    </section>
  );
}

export default NotFound;
