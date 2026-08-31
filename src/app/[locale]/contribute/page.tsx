import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleShell } from "@/components/content/article-shell";
import { parseLocale } from "@/lib/i18n";

export default async function ContributePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = parseLocale((await params).locale);
  if (!locale) notFound();
  const zh = locale === "zh";
  return (
    <ArticleShell eyebrow={zh ? "协作" : "Collaboration"} title={zh ? "通过审查共同贡献" : "Contribute through review"} lead={zh ? "研究者、学生和开发者可以共同完善知识库，同时保持经济学和技术标准。" : "Researchers, students, and developers can improve the same knowledge base without sacrificing economic or technical standards."}>
      <h2>{zh ? "Issue → 分支 → Pull Request" : "Issue → Branch → Pull Request"}</h2><p>{zh ? "每项实质性贡献先建立 Issue，明确页面、文献、修改内容、完成标准、贡献者和审查者；随后在短期分支上工作，通过 Pull Request 进入网站。" : "Every substantive contribution begins with an issue defining the page, literature, change, completion criteria, contributor, and reviewer. Work proceeds on a short-lived branch and enters through a pull request."}</p>
      <h2>{zh ? "审查标准" : "Review Standard"}</h2><p>{zh ? "编辑检查经济学准确性、假设、符号、推导、引用和模块连接；开发者检查类型、元数据、路由、渲染、无障碍和生产构建。" : "Editors check economic accuracy, assumptions, notation, derivations, citations, and module links. Developers check types, metadata, routes, rendering, accessibility, and the production build."}</p>
      <h2>{zh ? "开始贡献" : "Start Here"}</h2><p><Link href="https://github.com/auto-quant-econ/auto-quant-econ.github.io/issues/new/choose">{zh ? "创建结构化 GitHub Issue" : "Open a structured GitHub issue"}</Link></p>
    </ArticleShell>
  );
}
