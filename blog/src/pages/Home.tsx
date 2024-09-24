import { articles } from "@/data";
import { Link } from "react-router-dom";

export default function Home() {
    const covers = articles.map((article) => (
        <div className="w-full space-y-4 cursor-pointer">
            <Link to={`/post/${article.id}`}>
                <div className="flex space-x-16">
                    {" "}
                    <div className="w-5/12 space-y-4 pt-4">
                        <h2 className="text-4xl font-serif font-medium">
                            {article.title}
                        </h2>
                        <h3 className="text-xl font-light">
                            {article.subtitle}
                        </h3>
                    </div>
                    <div
                        className="
                            w-full h-80 p-12
                            rounded
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
            <div className="w-3/4 flex flex-col space-y-8 p-8">{covers}</div>
        </div>
    );
}
