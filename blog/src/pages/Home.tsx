import { articles } from "@/data";
import { Link } from "react-router-dom";

export default function Home() {
    const covers = articles.map((article) => (
        <div className="w-full space-y-4 cursor-pointer">
            <Link to={`/post/${article.id}`}>
                <div className="flex flex-col space-y-4">
                    <div className="flex w-full space-x-4 pt-4 items-center">
                        <h2 className="text-2xl font-sans font-medium">
                            {article.title}
                        </h2>
                        <h3 className="text-xl font-light">
                            {article.subtitle}
                        </h3>
                    </div>
                    <div
                        className="
                            w-full h-96 p-12
                            rounded-3xl
                            bg-white bg-cover 
                            border border-zinc-100  
                            hover:shadow-xl hover:shadow-zinc-200 duration-300"
                        style={{
                            backgroundImage: `url(${article.image_url})`,
                        }}
                    ></div>
                </div>
            </Link>
        </div>
    ));

    return (
        <div className="flex h-full w-full justify-center pt-4">
            <div className="w-3/4 flex flex-col space-y-16 p-8">{covers}</div>
        </div>
    );
}
