import Link from "next/link";

const links = [
  { href: "/modules", label: "Modules" },
  { href: "/literature", label: "Literature" },
  { href: "/about", label: "About" },
  { href: "/contribute", label: "Contribute" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="wordmark" href="/">
          <span aria-hidden="true" className="wordmark-mark">
            AQE
          </span>
          <span>Auto Quant Econ</span>
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="primary-nav">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
