import { useParams } from "react-router-dom";
import { articles } from "@/data";
import { useEffect, useState } from "react";
import Markdown from "react-markdown"; // Doc: https://github.com/remarkjs/react-markdown
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";

export default function Post() {
    const { articleId } = useParams();
    const [markdown, setMarkdown] = useState("Loading...");
    const article = articles.find((article) => article.id === articleId);

    useEffect(() => {
        if (article?.content_url) {
            console.log("URL:" + article.content_url);
            fetch(article.content_url)
                .then((response) => response.text())
                .then((text) => setMarkdown(text));
        } else {
            setMarkdown("No markdown found");
        }
    }, [article]);

    if (!article) {
        return <div>Article not found</div>;
    }

    return (
        <div
            className="
                h-full w-full
                flex justify-center
                pt-20 pb-40"
        >
            <Markdown
                className="
                    prose prose-zinc dark:prose-invert
                    max-w-none w-5/12 
                    prose-h1:font-semibold
                    prose-p:font-serif prose-p:text-xl 
                    prose-img:rounded-lg"
                remarkPlugins={[remarkGfm, remarkRehype, rehypeRaw]}
            >
                {markdown}
            </Markdown>
        </div>
    );
}
