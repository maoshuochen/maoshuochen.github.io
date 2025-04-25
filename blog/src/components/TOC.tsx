import React from "react";
import clsx from "clsx";

// 自定义 TOCItem 类型
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
      className="fixed bottom-20 right-10 w-72 p-0"
    >
      <ul>
        {toc.map(({ id, text, level }) => (
          <li
            key={id}
            className={clsx(
              `px-${(level - 2) * 4}`,
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
