"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/content/types";
import { localizedPath, ui } from "@/lib/i18n";

export type SidebarFamily = {
  id: string;
  title: string;
  moduleNumber: number;
  specifications: Array<{ id: string; title: string; hasPage?: boolean }>;
};

export function SiteSidebar({
  locale,
  pathname,
  families,
  collapsed,
  mobileOpen,
  onCollapse,
  onMobileClose,
}: {
  locale: Locale;
  pathname: string;
  families: SidebarFamily[];
  collapsed: boolean;
  mobileOpen: boolean;
  onCollapse: () => void;
  onMobileClose: () => void;
}) {
  const activeFamily = families.find(({ id }) => pathname.includes(`/modules/${id}`))?.id;
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    activeFamily ? { [activeFamily]: true } : {},
  );
  const labels = ui[locale];
  const otherLocale: Locale = locale === "en" ? "zh" : "en";

  return (
    <aside className={`site-sidebar ${collapsed ? "is-collapsed" : ""} ${mobileOpen ? "is-mobile-open" : ""}`}>
      <div className="sidebar-head">
        <Link className="sidebar-brand" href={`/${locale}/`} onClick={onMobileClose}>
          <span className="sidebar-mark">AQE</span><span className="sidebar-brand-text">Auto Quant Econ</span>
        </Link>
        <button className="sidebar-collapse" type="button" onClick={onCollapse} aria-label={collapsed ? labels.expand : labels.collapse}>{collapsed ? "›" : "‹"}</button>
      </div>
      <nav className="sidebar-nav" aria-label={labels.components}>
        <Link aria-label={labels.home} className="sidebar-leaf" href={`/${locale}/`} onClick={onMobileClose}><span className="sidebar-code">⌂</span><span className="sidebar-label">{labels.home}</span></Link>
        <p className="sidebar-section-label">{labels.components}</p>
        {families.map((family) => {
          const isExpanded = expanded[family.id] ?? false;
          return (
            <div className="sidebar-family" key={family.id}>
              <button
                aria-expanded={isExpanded}
                aria-label={`Module ${family.moduleNumber}: ${family.title}`}
                className={activeFamily === family.id ? "sidebar-module is-current" : "sidebar-module"}
                onClick={() => setExpanded((current) => ({ ...current, [family.id]: !isExpanded }))}
                type="button"
              >
                <span className="sidebar-code">{String(family.moduleNumber).padStart(2, "0")}</span>
                <span className="sidebar-label">{family.title}</span><span className="sidebar-chevron">{isExpanded ? "⌄" : "›"}</span>
              </button>
              {isExpanded ? (
                <div className="sidebar-submenu">
                  <Link href={`/${locale}/modules/${family.id}/`} onClick={onMobileClose}>{locale === "en" ? "Overview" : "模块概览"}</Link>
                  {family.specifications.map((specification) => (
                    <Link key={specification.id} href={specification.hasPage === false ? `/${locale}/modules/${family.id}/#${specification.id}` : `/${locale}/modules/${family.id}/${specification.id.split(".").at(-1)}/`} onClick={onMobileClose}>{specification.title}</Link>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
        <Link aria-label={labels.literature} className="sidebar-leaf" href={`/${locale}/literature/`} onClick={onMobileClose}><span className="sidebar-code">L</span><span className="sidebar-label">{labels.literature}</span></Link>
        <Link aria-label={labels.about} className="sidebar-leaf" href={`/${locale}/about/`} onClick={onMobileClose}><span className="sidebar-code">A</span><span className="sidebar-label">{labels.about}</span></Link>
        <Link aria-label={labels.contribute} className="sidebar-leaf" href={`/${locale}/contribute/`} onClick={onMobileClose}><span className="sidebar-code">+</span><span className="sidebar-label">{labels.contribute}</span></Link>
      </nav>
      <div className="sidebar-foot"><span className="sidebar-label">Language</span><Link href={localizedPath(otherLocale, pathname)}>{labels.language}</Link></div>
    </aside>
  );
}
