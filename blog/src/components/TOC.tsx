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
  const levelPaddingMap: Record<number, string> = {
    2: "pl-0",
    3: "pl-4",
    4: "pl-8",
    5: "pl-12",
    6: "pl-16",
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const yOffset = -80;
      const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

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
              levelPaddingMap[level] ?? "pl-0",
              "opacity-40 transition hover:opacity-100",
            )}
          >
            <a href={`#${id}`} onClick={(e) => handleClick(e, id)}>
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TOC;
