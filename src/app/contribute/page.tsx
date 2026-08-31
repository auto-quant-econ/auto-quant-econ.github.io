import Link from "next/link";
import { ArticleShell } from "@/components/content/article-shell";

export default function ContributePage() {
  return (
    <ArticleShell
      eyebrow="Collaboration"
      title="Contribute through review"
      lead="Researchers, students, and developers can improve the same public knowledge base without sacrificing economic or technical standards."
    >
      <h2>Issue → Branch → Pull Request</h2>
      <p>
        Every substantive contribution begins with an issue. The issue defines
        the page, relevant literature, intended change, completion criteria,
        contributor, and reviewer. Work then proceeds on a short-lived branch
        and enters the site through a pull request.
      </p>

      <h2>Choose a Contribution Path</h2>

      <h3>Correct or extend prose</h3>
      <p>
        Small corrections can be made directly in GitHub. GitHub creates a
        branch automatically and opens a pull request for review.
      </p>

      <h3>Add a specification or paper</h3>
      <p>
        Clone the repository, copy the relevant MDX template, write the page,
        add primary references, run the local checks, and open a pull request.
      </p>

      <h3>Improve the website</h3>
      <p>
        Developers work in the same branch-and-review flow. Application changes
        receive technical review; content changes receive editorial review;
        mixed changes receive both.
      </p>

      <h2>Review Standard</h2>
      <p>
        Editors check economic accuracy, assumptions, notation, derivations,
        citations, and module links. Developers check types, metadata, routes,
        rendering, accessibility, and the production build. Required automated
        checks must pass before a change can merge.
      </p>

      <h2>Start Here</h2>
      <p>
        Read the repository&apos;s content and citation guides, then open a{" "}
        <Link href="https://github.com/auto-quant-econ/auto-quant-econ.github.io/issues/new/choose">
          structured GitHub issue
        </Link>
        . External contributors may work from a fork; regular collaborators can
        join the editors or developers team.
      </p>
    </ArticleShell>
  );
}
