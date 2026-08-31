import { localeSchema } from "@/lib/content/schema";
import type { Locale } from "@/lib/content/types";

export function parseLocale(value: string) {
  const result = localeSchema.safeParse(value);
  return result.success ? result.data : undefined;
}

export function localizedPath(locale: Locale, pathname: string) {
  const path = pathname.replace(/^\/(?:en|zh)(?=\/|$)/, "");
  const normalized = path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}`.replace(/\/{2,}/g, "/");
}

export const ui = {
  en: {
    home: "Home",
    literature: "Literature",
    about: "About",
    contribute: "Contribute",
    language: "中文",
    components: "Model components",
    collapse: "Collapse sidebar",
    expand: "Expand sidebar",
    menu: "Open navigation",
    specifications: "Specifications",
  },
  zh: {
    home: "首页",
    literature: "文献",
    about: "关于",
    contribute: "参与贡献",
    language: "EN",
    components: "模型模块",
    collapse: "收起侧栏",
    expand: "展开侧栏",
    menu: "打开导航",
    specifications: "模块设定",
  },
} satisfies Record<Locale, Record<string, string>>;
