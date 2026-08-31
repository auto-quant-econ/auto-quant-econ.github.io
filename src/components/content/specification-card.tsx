import Link from "next/link";

export function SpecificationCard({
  id,
  title,
  summary,
  mechanism,
  href,
}: {
  id?: string;
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
    <Link className="specification-card" href={href} id={id}>
      {content}
    </Link>
  ) : (
    <div className="specification-card" id={id}>{content}</div>
  );
}
