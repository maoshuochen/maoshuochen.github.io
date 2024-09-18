import { Button } from "@/components/ui/button";
import { articles } from "./data.tsx";

export default function App() {
    const covers = articles.map((article) => (
        <div className="w-full space-y-2 cursor-pointer">
            <div
                className="rounded-xl h-60 p-12 bg-white bg-cover border border-zinc-100 hover:shadow-xl hover:shadow-zinc-100 duration-300"
                style={{
                    backgroundImage: `url(${article.image_url})`,
                }}
            ></div>
            <h2 className="text-xl">{article.title}</h2>
        </div>
    ));

    return (
        <div className="h-full w-full">
            <header className="sticky top-0 w-full h-16 flex items-center space-x-2 px-8 bg-white border-b border-zinc-100">
                <Button variant="ghost">MAOSHUO CHEN</Button>
                <Button variant="link" className="font-normal">
                    Projects
                </Button>
                <Button variant="link" className="font-normal">
                    About me
                </Button>
            </header>
            <div className="flex h-full w-full justify-center">
                <div className="w-3/4 flex flex-col space-y-8 p-8">
                    {covers}
                </div>
            </div>
        </div>
    );
}
