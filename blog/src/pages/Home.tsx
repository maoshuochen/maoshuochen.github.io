import { articles } from "@/data";
import { Link } from "react-router-dom";

export default function Home() {
    const covers = articles.map((article) => (
        <div className="w-full space-y-2 cursor-pointer">
            <Link to={`/post/${article.id}`}>
                <div
                    className="rounded-xl h-60 p-12 bg-white bg-cover border border-zinc-100 hover:shadow-xl hover:shadow-zinc-100 duration-300"
                    style={{
                        backgroundImage: `url(${article.image_url})`,
                    }}
                ></div>
                <h2 className="text-xl">{article.title}</h2>
            </Link>
        </div>
    ));

    return (
        <div className="flex h-full w-full justify-center">
            <div className="w-3/4 flex flex-col space-y-8 p-8">{covers}</div>
        </div>
    );
}
