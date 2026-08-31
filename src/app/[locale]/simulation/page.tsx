import { notFound } from "next/navigation";
import { ArticleShell } from "@/components/content/article-shell";
import { parseLocale } from "@/lib/i18n";

export default async function SimulationPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = parseLocale((await params).locale); if (!locale) notFound(); const zh = locale === "zh";
  return <ArticleShell eyebrow={zh ? "模型模拟" : "Model simulation"} title={zh ? "实验与反事实" : "Experiments and Counterfactuals"} lead={zh ? "连接基准经济、参数、数据、政策冲击、均衡求解与结果比较。" : "Connect the baseline economy, parameters, data, policy shocks, equilibrium solution, and result comparison."}>
    <h2>{zh ? "模拟实验" : "Experiments"}</h2><p>{zh ? "每个实验明确改变什么、保持什么不变，并重新求解完整均衡。" : "Each experiment states what changes, what remains fixed, and re-solves the complete equilibrium."}</p>
    <h2 id="results">{zh ? "模拟结果" : "Results"}</h2><p>{zh ? "结果包括工资、人口、价格指数、租金、贸易流、实际收入、福利和空间分布。" : "Results cover wages, population, price indices, rents, trade flows, real income, welfare, and spatial distributions."}</p>
  </ArticleShell>;
}
