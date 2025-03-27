import { articles } from "@/data";
import { Link } from "react-router-dom";

export default function Home() {
  const covers = articles.map((article) => (
    <div key={article.id} className="w-full cursor-pointer">
      <Link to={`/post/${article.id}`}>
        <div
          className="h-72 w-full rounded-xl border border-zinc-100 bg-white bg-cover p-12 duration-300 hover:shadow-xl hover:shadow-zinc-200"
          style={{
            backgroundImage: `url(/posts/${article.image_url})`,
          }}
        ></div>
        <div className="flex w-full flex-col items-start space-y-2 pt-4">
          <h2 className="font-sans text-2xl font-medium">{article.title}</h2>
          <h3 className="text-xl font-light">{article.subtitle}</h3>
        </div>
      </Link>
    </div>
  ));

  return (
    <div className="flex h-full w-full flex-col items-center justify-center pt-4">
      <div className="w-3/4 p-8">
        <h1 className="py-20 font-sans text-4xl/relaxed font-medium">
          Hi, I am Maoshuo Chen
          <br />I am a Product Designer
        </h1>
      </div>
      <div className="grid w-3/4 grid-cols-2 gap-16 p-8">{covers}</div>
    </div>
  );
}
