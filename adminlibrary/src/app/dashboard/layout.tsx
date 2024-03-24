'use client'
import { Layout } from 'antd';
import SideBar from '../../../components/sidebar/sidebar';

const { Sider, Content } = Layout;

export default function AdminLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            
            
            
            <Layout>
                <SideBar>
                    <Content style={{ padding: '0 24px' }}>
                        {children}
                    </Content>
                </SideBar>
            </Layout>
        </Layout>
    );
}
