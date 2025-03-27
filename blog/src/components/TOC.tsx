import React from "react";

interface TOCProps {
  toc: React.ReactNode[];
}

const TOC: React.FC<TOCProps> = ({ toc }) => {
  return (
    <nav
      aria-label="Table of contents"
      className="fixed bottom-20 right-20 max-w-72 p-0"
    >
      <ul>{toc}</ul>
    </nav>
  );
};

export default TOC;
