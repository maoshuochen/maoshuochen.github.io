import { Layout, Menu, Space } from "antd";
import "./App.css";
import { articles } from "./data.tsx";
const { Header, Content, Footer } = Layout;

export default function App() {
    const covers = articles.map((article) => (
        <div
            className="rounded-xl min-h-72 p-12 cursor-pointer bg-white shadow-xl shadow-gray-100 hover:shadow-gray-200 duration-200"
            style={{
                backgroundImage: `url(${article.image_url})`,
            }}
        >
            <h2
                className="text-gray-900 text-3xl"
                style={{ fontFamily: '"Roboto", sans-serif' }}
            >
                {article.title}
            </h2>
        </div>
    ));

    return (
        <Layout style={{ width: "100%", minHeight: "100vh" }}>
            <Header className="flex items-center bg-white">
                <p
                    className="text-base mr-4 ml-1"
                    style={{ fontFamily: '"Roboto Condensed", sans-serif' }}
                >
                    MAOSHUO CHEN
                </p>
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={["1"]}
                    items={[
                        {
                            key: "1",
                            label: "Projects",
                        },
                    ]}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>
            <Content className="p-10">
                <Space direction="vertical" size={40} style={{ width: "100%" }}>
                    {covers}
                </Space>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Maoshuo Chen ©{new Date().getFullYear()}
            </Footer>
        </Layout>
    );
}
