import { articles } from "@/data";
import { Link } from "react-router-dom";

export default function Home() {
  const covers = articles.map((article) => (
    <div key={article.id} className="w-full cursor-pointer">
      <Link to={`/post/${article.id}`}>
        <div
          className="h-56 w-full rounded-xl border border-zinc-100 bg-white bg-cover p-6 duration-300 hover:shadow-xl hover:shadow-zinc-200 sm:h-72 sm:p-12"
          style={{
            backgroundImage: `url(/posts/${article.image_url})`,
          }}
        />

        <div className="flex w-full flex-col items-start space-y-1 pt-2 sm:space-y-2 sm:pt-4">
          <h2 className="font-sans text-xl font-medium sm:text-2xl">
            {article.title}
          </h2>
          <h3 className="text-lg font-light sm:text-xl">{article.subtitle}</h3>
        </div>
      </Link>
    </div>
  ));

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4 pt-4 sm:px-0">
      <div className="w-full p-4 sm:w-3/4 sm:p-8">
        <h1 className="py-12 font-sans text-2xl font-medium sm:py-20 sm:text-4xl/relaxed">
          Hi, I am Maoshuo Chen
          <br />I am a Product Designer
        </h1>
      </div>
      <div className="grid w-full grid-cols-1 gap-8 p-4 sm:w-3/4 sm:grid-cols-2 sm:gap-16 sm:p-8">
        {covers}
      </div>
    </div>
  );
}
