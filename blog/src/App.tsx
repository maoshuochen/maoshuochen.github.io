import Header from "@/components/header";
import Footer from "@/components/footer";
import Home from "@/pages/Home";
import Post from "@/pages/Post";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Footer />
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="post/:articleId" element={<Post />} />
    </Route>,
  ),
);

export default function App() {
  return (
    <div className="h-full w-full">
      <RouterProvider router={router} />
      <SpeedInsights />
    </div>
  );
}
