import React from "react";
import clsx from "clsx";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TOCProps {
  toc: TOCItem[];
}

const TOC: React.FC<TOCProps> = ({ toc }) => {
  return (
    <nav
      aria-label="Table of contents"
      className="fixed bottom-20 right-10 w-80 p-0"
    >
      <ul>
        {toc.map(({ id, text, level }) => (
          <li
            key={id}
            className={clsx(
              `px-${(level - 2) * 8}`,
              "opacity-70 transition hover:opacity-100",
            )}
          >
            <a href={`#${id}`}>{text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TOC;
