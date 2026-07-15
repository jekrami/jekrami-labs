import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/lib/site";
import "./globals.css";

/**
 * Fallback 404 for URLs that don't match any route at all — Next.js
 * requires this file (rather than app/[locale]/not-found.tsx) because
 * the root layout lives under the [locale] dynamic segment, which
 * bypasses the normal nested not-found boundary. No locale is known
 * here, so the copy is bilingual. See:
 * https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 */
export const metadata: Metadata = {
  title: `Not found · ${site.name}`,
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="bg-[var(--color-background)] text-[var(--color-foreground)] antialiased">
        <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-start justify-center gap-8 px-6 py-24">
          <div>
            <p className="eyebrow">404</p>
            <h1 className="display-1 mt-4">The page you are looking for has moved.</h1>
            <p className="mt-6 text-[var(--color-muted-foreground)]">
              The link is either stale or the page has been retired.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/en"
                className="rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-[var(--color-primary-foreground)]"
              >
                Go home
              </Link>
              <Link
                href="/en/projects"
                className="rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium"
              >
                View projects
              </Link>
            </div>
          </div>

          <div dir="rtl" className="border-t border-[var(--color-border)] pt-8">
            <p className="eyebrow">۴۰۴</p>
            <h2 className="display-2 mt-4">صفحه‌ای که به دنبال آن بودید یافت نشد.</h2>
            <p className="mt-6 text-[var(--color-muted-foreground)]">
              پیوند نامعتبر است یا صفحه حذف شده است.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/fa"
                className="rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-[var(--color-primary-foreground)]"
              >
                بازگشت به خانه
              </Link>
              <Link
                href="/fa/projects"
                className="rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium"
              >
                مشاهده پروژه‌ها
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
