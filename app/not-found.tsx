import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24 sm:py-32">
      <p className="eyebrow">404</p>
      <h1 className="display-1 mt-4 max-w-3xl">The page you are looking for has moved.</h1>
      <p className="mt-6 max-w-xl text-[var(--color-muted-foreground)]">
        The link is either stale or the page has been retired. Try the homepage or one of the routes
        below.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/projects">View projects</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/articles">Read articles</Link>
        </Button>
      </div>
    </Container>
  );
}
