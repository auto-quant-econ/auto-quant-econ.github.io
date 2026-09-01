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

export function SiteSidebar({ locale, pathname, families, collapsed, mobileOpen, onCollapse, onMobileClose }: {
  locale: Locale; pathname: string; families: SidebarFamily[]; collapsed: boolean; mobileOpen: boolean; onCollapse: () => void; onMobileClose: () => void;
}) {
  const labels = ui[locale];
  const activeFamily = families.find(({ id }) => pathname.includes(`/modules/${id}`))?.id;
  const activePrimary = pathname.includes("/modules") ? "modules" : pathname.includes("/literature") ? "literature" : pathname.includes("/build") ? "build" : pathname.includes("/simulation") ? "simulation" : "";
  const [primaryOpen, setPrimaryOpen] = useState<Record<string, boolean>>(activePrimary ? { [activePrimary]: true } : {});
  const [familyOpen, setFamilyOpen] = useState<Record<string, boolean>>(activeFamily ? { [activeFamily]: true } : {});
  const otherLocale: Locale = locale === "en" ? "zh" : "en";
  const togglePrimary = (name: string) => setPrimaryOpen((current) => ({ ...current, [name]: !current[name] }));
  const primaryButton = (name: string, label: string) => (
    <button aria-label={label} className={activePrimary === name ? "sidebar-primary is-current" : "sidebar-primary"} type="button" aria-expanded={primaryOpen[name] ?? false} onClick={() => togglePrimary(name)}>
      <span>{label}</span><span className="sidebar-chevron">{primaryOpen[name] ? "⌄" : "›"}</span>
    </button>
  );

  return (
    <aside className={`site-sidebar ${collapsed ? "is-collapsed" : ""} ${mobileOpen ? "is-mobile-open" : ""}`}>
      <div className="sidebar-head">
        <Link className="sidebar-brand" href={`/${locale}/`} onClick={onMobileClose}><span className="sidebar-mark">AQE</span><span className="sidebar-brand-text">Auto Quant Econ</span></Link>
        <button className="sidebar-collapse" type="button" onClick={onCollapse} aria-label={collapsed ? labels.expand : labels.collapse}>{collapsed ? "›" : "‹"}</button>
      </div>
      <nav className="sidebar-nav" aria-label="Primary navigation">
        <Link aria-label={labels.home} className="sidebar-home" href={`/${locale}/`} onClick={onMobileClose}>{labels.home}</Link>

        {primaryButton("modules", labels.modules)}
        {primaryOpen.modules ? <div className="sidebar-primary-submenu">
          <Link href={`/${locale}/modules/`} onClick={onMobileClose}>{locale === "en" ? "All Modules" : "全部模块"}</Link>
          {families.map((family) => {
            const expanded = familyOpen[family.id] ?? false;
            return <div className="sidebar-family" key={family.id}>
              <button aria-label={family.title} className={activeFamily === family.id ? "sidebar-module is-current" : "sidebar-module"} type="button" aria-expanded={expanded} onClick={() => setFamilyOpen((current) => ({ ...current, [family.id]: !expanded }))}>
                <span>{family.title}</span><span className="sidebar-chevron">{expanded ? "⌄" : "›"}</span>
              </button>
              {expanded ? <div className="sidebar-submenu">
                <Link href={`/${locale}/modules/${family.id}/`} onClick={onMobileClose}>{locale === "en" ? "Overview" : "模块概览"}</Link>
                {family.specifications.map((specification) => <Link key={specification.id} href={specification.hasPage === false ? `/${locale}/modules/${family.id}/#${specification.id}` : `/${locale}/modules/${family.id}/${specification.id.split(".").at(-1)}/`} onClick={onMobileClose}>{specification.title}</Link>)}
              </div> : null}
            </div>;
          })}
        </div> : null}

        {primaryButton("literature", labels.literature)}
        {primaryOpen.literature ? <div className="sidebar-primary-submenu"><Link href={`/${locale}/literature/`} onClick={onMobileClose}>{labels.papers}</Link><Link href={`/${locale}/literature/#module-paper-map`} onClick={onMobileClose}>{labels.modulePaperMap}</Link></div> : null}

        {primaryButton("build", labels.buildModel)}
        {primaryOpen.build ? <div className="sidebar-primary-submenu"><Link href={`/${locale}/build/`} onClick={onMobileClose}>{labels.modelBuilder}</Link><Link href={`/${locale}/build/#saved-models`} onClick={onMobileClose}>{labels.savedModels}</Link></div> : null}

        {primaryButton("simulation", labels.simulation)}
        {primaryOpen.simulation ? <div className="sidebar-primary-submenu"><Link href={`/${locale}/simulation/`} onClick={onMobileClose}>{labels.experiments}</Link><Link href={`/${locale}/simulation/#results`} onClick={onMobileClose}>{labels.results}</Link></div> : null}

        <Link className="sidebar-utility" href={`/${locale}/about/`} onClick={onMobileClose}>{labels.about}</Link>
        <Link className="sidebar-utility" href={`/${locale}/contribute/`} onClick={onMobileClose}>{labels.contribute}</Link>
      </nav>
      <div className="sidebar-foot"><span className="sidebar-label">Language</span><Link href={localizedPath(otherLocale, pathname)}>{labels.language}</Link></div>
    </aside>
  );
}
