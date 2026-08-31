import Link from "next/link";

export function SpecificationCard({
  title,
  summary,
  mechanism,
  href,
}: {
  title: string;
  summary: string;
  mechanism: string;
  href?: string;
}) {
  const content = (
    <>
      <h3>{title}</h3>
      <p>{summary}</p>
      <p className="card-meta">{mechanism}</p>
    </>
  );

  return href ? (
    <Link className="specification-card" href={href}>
      {content}
    </Link>
  ) : (
    <div className="specification-card">{content}</div>
  );
}
