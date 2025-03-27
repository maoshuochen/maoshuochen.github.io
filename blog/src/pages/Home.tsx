import { articles } from "@/data";
import { Link } from "react-router-dom";

export default function Home() {
    const covers = articles.map((article) => (
        <div key={article.id} className="w-full cursor-pointer">
            <Link to={`/post/${article.id}`}>
                <div
                    className="
                            w-full h-72 p-12
                            rounded-xl
                            bg-white bg-cover 
                            border border-zinc-100  
                            hover:shadow-xl hover:shadow-zinc-200 duration-300"
                    style={{
                        backgroundImage: `url(/posts/${article.image_url})`,
                    }}
                ></div>
                <div className="flex flex-col w-full space-y-2 pt-4 items-start">
                    <h2 className="text-2xl font-sans font-medium">
                        {article.title}
                    </h2>
                    <h3 className="text-xl font-light">{article.subtitle}</h3>
                </div>
            </Link>
        </div>
    ));

    return (
        <div className="flex flex-col h-full w-full justify-center items-center pt-4">
            <div className="w-3/4 p-8">
                <h1 className="text-4xl/relaxed font-sans font-medium py-20">
                    Hi, I am Maoshuo Chen
                    <br />I am a Product Designer
                </h1>
            </div>
            <div className="w-3/4 grid grid-cols-2 gap-16 p-8">{covers}</div>
        </div>
    );
}
