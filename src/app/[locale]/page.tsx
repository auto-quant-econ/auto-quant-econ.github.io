import Link from "next/link";
import { notFound } from "next/navigation";
import { parseLocale } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Open research infrastructure",
    title: "Quantitative Spatial Models, Built from Components",
    lead: "Learn recurring model components, see how papers assemble them, build new models, and carry those models into simulation and counterfactual analysis.",
    modules: "Explore the modules",
    literature: "Browse the literature",
    framework: "From economic knowledge to reproducible simulation",
    frameworkLead: "The site is organized as a cumulative research workflow. Each stage reuses the structured output of the previous stage.",
    stages: [
      ["01", "Module library", "Detailed assumptions, equations, mechanisms, data requirements, and foundational literature."],
      ["02", "Literature mapping", "Decompose each paper into existing components and record its complete model, fit, and counterfactuals."],
      ["03", "Model composition", "Select one specification from each relevant family and assemble a transparent new model."],
      ["04", "Data and fit", "Connect parameters, fundamentals, moments, calibration, estimation, and baseline validation."],
      ["05", "Simulation", "Solve the baseline, apply policy shocks, compare equilibria, and report welfare and spatial outcomes."],
      ["06", "GitHub review", "Version every model, paper map, experiment, and result through reproducible pull requests."],
    ],
  },
  zh: {
    eyebrow: "开放研究基础设施",
    title: "由模块构建的定量空间模型",
    lead: "学习反复出现的模型模块，理解论文如何组合模块，构建新的模型，并进一步开展模拟与反事实分析。",
    modules: "浏览模型模块",
    literature: "浏览文献",
    framework: "从经济学知识到可复现模拟",
    frameworkLead: "网站按照累积式研究流程组织，每一阶段都复用上一阶段形成的结构化成果。",
    stages: [
      ["01", "模块知识库", "系统介绍假设、方程、经济机制、数据要求与基础文献。"],
      ["02", "文献模块映射", "把每篇论文拆解到已有模块，并记录完整模型、拟合与反事实。"],
      ["03", "模型组合", "从相关模块中选择具体设定，组合成结构透明的新模型。"],
      ["04", "数据与拟合", "连接参数、基本面、目标矩、校准、估计与基准验证。"],
      ["05", "模型模拟", "求解基准均衡、施加政策冲击、比较均衡并报告福利与空间结果。"],
      ["06", "GitHub 审查与复现", "通过可复现的 Pull Request 管理模型、文献映射、实验与结果。"],
    ],
  },
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  if (!locale) notFound();
  const text = copy[locale];

  return (
    <main className="home localized-home">
      <section className="hero">
        <p className="eyebrow">{text.eyebrow}</p>
        <h1>{text.title}</h1>
        <p className="hero-lead">{text.lead}</p>
        <div className="hero-actions">
          <Link className="button button-primary" href={`/${locale}/modules/`}>
            {text.modules}
          </Link>
          <Link className="button button-secondary" href={`/${locale}/literature/`}>
            {text.literature}
          </Link>
        </div>
      </section>

      <section className="framework" aria-labelledby="framework-title">
        <header className="framework-header">
          <p className="section-number">Framework</p>
          <div>
            <h2 id="framework-title">{text.framework}</h2>
            <p>{text.frameworkLead}</p>
          </div>
        </header>
        <ol className="framework-flow">
          {text.stages.map(([number, title, description], index) => (
            <li key={number}>
              <span className="framework-number">{number}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
              {index < text.stages.length - 1 ? <span aria-hidden="true" className="framework-arrow">↓</span> : null}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
