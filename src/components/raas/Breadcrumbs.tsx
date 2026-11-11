"use client";

import Link from "next/link";
import { Fragment } from "react";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1 text-[11px] opacity-60 mb-4"
    >
      {items.map((c, i) => {
        const last = i === items.length - 1;
        return (
          <Fragment key={i}>
            {i > 0 && <ChevronRight className="h-3 w-3 opacity-50" />}
            {c.href && !last ? (
              <Link href={c.href} className="hover:text-foreground hover:opacity-100">
                {c.label}
              </Link>
            ) : (
              <span className={last ? "text-foreground opacity-100" : ""}>{c.label}</span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
