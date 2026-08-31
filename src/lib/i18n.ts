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
    modules: "Modules",
    buildModel: "Build Model",
    simulation: "Simulation",
    papers: "Papers",
    modulePaperMap: "Module–Paper Map",
    modelBuilder: "New Model",
    savedModels: "Saved Models",
    experiments: "Experiments",
    results: "Results",
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
    modules: "模型模块",
    buildModel: "构建模型",
    simulation: "模型模拟",
    papers: "论文库",
    modulePaperMap: "模块—文献映射",
    modelBuilder: "新建模型",
    savedModels: "已保存模型",
    experiments: "模拟实验",
    results: "模拟结果",
    collapse: "收起侧栏",
    expand: "展开侧栏",
    menu: "打开导航",
    specifications: "模块设定",
  },
} satisfies Record<Locale, Record<string, string>>;
