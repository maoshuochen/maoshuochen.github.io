import { useParams } from "react-router-dom";
import { articles } from "@/data";
export default function Post() {
    const { articleId } = useParams();
    const article = articles.find((article) => article.id === articleId);

    if (!article) {
        return <div>Article not found</div>;
    }
    return (
        <div className="h-full w-full">
            <p>{article.content}</p>
        </div>
    );
}
