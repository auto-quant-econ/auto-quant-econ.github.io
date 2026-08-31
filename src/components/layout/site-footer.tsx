import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <p className="footer-title">Auto Quant Econ</p>
          <p className="footer-copy">
            Open, modular notes for quantitative spatial economics.
          </p>
        </div>
        <div className="footer-links">
          <Link href="https://github.com/auto-quant-econ">
            GitHub Organization
          </Link>
          <Link href="/contribute">Contribute</Link>
        </div>
      </div>
    </footer>
  );
}
