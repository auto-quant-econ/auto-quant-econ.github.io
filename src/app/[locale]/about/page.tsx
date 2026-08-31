import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleShell } from "@/components/content/article-shell";
import { parseLocale } from "@/lib/i18n";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = parseLocale((await params).locale);
  if (!locale) notFound();
  const zh = locale === "zh";
  return (
    <ArticleShell eyebrow={zh ? "关于" : "About"} title={zh ? "定量模型的共同语言" : "A Common Language for Quantitative Models"} lead={zh ? "Auto Quant Econ 把空间模型组织为透明、可引用、可复用的经济学模块。" : "Auto Quant Econ organizes spatial models as transparent, citable, and reusable economic components."}>
      <h2>{zh ? "目标" : "Purpose"}</h2><p>{zh ? "定量论文往往只在少数关键建模选择上不同，但不同符号和写法使比较十分困难。本项目为反复出现的模块提供稳定位置，再把完整论文映射回这些模块。" : "Quantitative papers often differ by a small number of consequential modeling choices. This project gives each recurring component a stable home, then maps complete papers back to those components."}</p>
      <h2>{zh ? "编辑原则" : "Editorial Principles"}</h2><ul>{(zh ? ["先说明经济问题，再展示方程。","区分基准假设与实质性扩展。","重要结论连接到原始文献。","解释理论对象与观察数据的对应。","所有发布修改均可通过 Git 历史审查。"] : ["State the economic question before equations.","Separate baseline assumptions from extensions.","Connect important claims to primary literature.","Explain how theory maps to observed data.","Keep published changes inspectable through Git history."]).map((item) => <li key={item}>{item}</li>)}</ul>
      <p><Link href={`/${locale}/modules/`}>{zh ? "浏览模块结构" : "Explore the module structure"}</Link></p>
    </ArticleShell>
  );
}
