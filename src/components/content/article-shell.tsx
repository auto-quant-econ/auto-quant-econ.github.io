import type { ReactNode } from "react";

export function ArticleShell({
  eyebrow,
  title,
  lead,
  meta,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  meta?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="article-shell">
      <header className="article-header">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="article-lead">{lead}</p>
        {meta ? <div className="article-meta">{meta}</div> : null}
      </header>
      <article className="prose">{children}</article>
    </main>
  );
}
