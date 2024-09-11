import { Layout, Menu, theme, Space, Typography } from "antd";
import "./App.css";
import { articles } from "./data.tsx";
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export default function App() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const covers = articles.map((article) => (
        <div
            className="cover"
            style={{
                background: colorBgContainer,
                minHeight: "30vh",
                padding: "24px 48px",
                borderRadius: borderRadiusLG,
                cursor: "pointer",
                backgroundImage: `url(${article.image_url})`,
            }}
        >
            <Title
                level={2}
                className="cover-title"
                style={{
                    color: "#222",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 500,
                }}
            >
                {article.title}
            </Title>
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
                <p
                    style={{
                        marginRight: "30px",
                        fontSize: "16px",
                        fontWeight: 700,
                        fontFamily: "Montserrat, sans-serif",
                    }}
                >
                    Maoshuo Chen
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
