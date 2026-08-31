"use client";

import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import type { Locale } from "@/lib/content/types";
import { ui } from "@/lib/i18n";
import { SiteSidebar, type SidebarFamily } from "./site-sidebar";

export function SiteShell({ locale, families, children }: { locale: Locale; families: SidebarFamily[]; children: ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className={`site-shell ${collapsed ? "has-collapsed-sidebar" : ""}`}>
      <button className="mobile-menu-button" type="button" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}>{ui[locale].menu}</button>
      {mobileOpen ? <button className="sidebar-scrim" type="button" aria-label="Close navigation" onClick={() => setMobileOpen(false)} /> : null}
      <SiteSidebar locale={locale} pathname={pathname} families={families} collapsed={collapsed} mobileOpen={mobileOpen} onCollapse={() => setCollapsed((value) => !value)} onMobileClose={() => setMobileOpen(false)} />
      <div className="site-main">{children}</div>
    </div>
  );
}
