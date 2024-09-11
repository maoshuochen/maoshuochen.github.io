import { Layout, Menu, theme, Space } from "antd";
import "./App.css";
import { articles } from "./data.tsx";
const { Header, Content, Footer } = Layout;

export default function App() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const covers = articles.map((article) => (
        <div
            style={{
                background: colorBgContainer,
                minHeight: 280,
                padding: 24,
                borderRadius: borderRadiusLG,
                backgroundImage: `url(${article.image_url})`,
            }}
        >
            {article.title}
        </div>
    ));

    return (
        <Layout style={{ width: "100%", minHeight: "100vh" }}>
            <Header
                style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#fff",
                }}
            >
                <div className="demo-logo" />
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={["2"]}
                    items={[
                        {
                            key: "1",
                            label: "11111",
                        },
                    ]}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>
            <Content style={{ padding: "48px" }}>
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
