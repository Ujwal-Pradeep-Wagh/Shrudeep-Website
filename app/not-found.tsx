import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-6xl font-bold text-brand-200">404</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            This page doesn't exist
          </h1>
          <p className="mt-3 text-slate-600">
            The link may be old or mistyped. Head back home — or tell us what
            you were looking for.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/" className={buttonClasses({})}>
              Go to Homepage
            </Link>
            <Link href="/contact" className={buttonClasses({ variant: "secondary" })}>
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
