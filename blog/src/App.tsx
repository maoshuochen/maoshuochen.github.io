import Header from "@/components/header";
import Home from "@/pages/Home";
import Post from "@/pages/Post";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/next";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="post/:articleId" element={<Post />} />\
      <SpeedInsights />
    </Route>,
  ),
);
export default function App() {
  return (
    <div className="h-full w-full">
      <RouterProvider router={router} />
    </div>
  );
}
