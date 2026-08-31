import { notFound } from "next/navigation";
import { ArticleShell } from "@/components/content/article-shell";
import { parseLocale } from "@/lib/i18n";

export default async function BuildModelPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = parseLocale((await params).locale); if (!locale) notFound(); const zh = locale === "zh";
  return <ArticleShell eyebrow={zh ? "模型组合" : "Model composition"} title={zh ? "构建新模型" : "Build a New Model"} lead={zh ? "从每个相关模块选择具体设定，形成结构透明、可审查的完整模型。" : "Select a specification from each relevant module and assemble a transparent, reviewable model."}>
    <h2>{zh ? "模型构建流程" : "Model-building workflow"}</h2>
    <ol><li>{zh ? "定义研究问题和目标反事实。" : "Define the research question and target counterfactual."}</li><li>{zh ? "选择偏好、生产、贸易、思想流动、迁移、禀赋与均衡设定。" : "Choose preferences, production, trade, idea flows, migration, endowments, and equilibrium specifications."}</li><li>{zh ? "检查新增变量、参数、数据和闭合条件。" : "Check added variables, parameters, data, and closure conditions."}</li><li>{zh ? "保存模型设定并进入拟合与模拟。" : "Save the model specification and proceed to fit and simulation."}</li></ol>
    <h2 id="saved-models">{zh ? "已保存模型" : "Saved Models"}</h2><p>{zh ? "模型将以版本化配置保存到 GitHub，便于合作者审查和复现。" : "Models will be stored as versioned configurations on GitHub for review and reproduction."}</p>
  </ArticleShell>;
}
