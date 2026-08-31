import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useId } from "react";

export function AcademicLink(
  props: AnchorHTMLAttributes<HTMLAnchorElement>,
) {
  const external = props.href?.startsWith("http");
  return (
    <a
      {...props}
      rel={external ? "noreferrer" : props.rel}
      target={external ? "_blank" : props.target}
    />
  );
}

export function Note({ title, children }: { title: string; children: ReactNode }) {
  const titleId = useId();
  return (
    <aside className="note" aria-labelledby={titleId}>
      <p className="note-title" id={titleId}>
        {title}
      </p>
      <div>{children}</div>
    </aside>
  );
}

export const mdxComponents = {
  a: AcademicLink,
  Note,
};
