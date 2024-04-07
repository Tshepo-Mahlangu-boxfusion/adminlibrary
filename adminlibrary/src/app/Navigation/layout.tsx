 "use client"


import { useStyles } from './style';
import React, { PropsWithChildren, useState } from 'react';
import { DesktopOutlined,MenuUnfoldOutlined,MenuFoldOutlined, BookOutlined, PieChartOutlined, TeamOutlined, LogoutOutlined, SettingFilled } from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import Link from 'next/link';
import { useLoginState, useUser } from '../../../providers/LoginProviders';
import { useRouter } from 'next/navigation';
import WithAuth from '../../../HOC/withAuth/page';

const { Header, Sider, Content } = Layout;

const App: React.FC<PropsWithChildren> = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const { push } = useRouter();
  const { styles } = useStyles();
  const state=useLoginState();
  const {logOutUser} =useUser();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navLinks = [
    { name: "Dashboard", href: "/Navigation/dashboard", icon: <PieChartOutlined /> },
    { name: "Shelves", href: "/Navigation/shelves", icon: <DesktopOutlined /> },
    { name: "Categories", href: "/Navigation/categories", icon: <TeamOutlined /> },
    { name: "Books", href: "/Navigation/book", icon: <BookOutlined /> },
  ];

  const handleSettings=(()=>{
    push('/Navigation/settings')
  })
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className={styles.side}>
        <div className="demo-logo-vertical" />
        <div className={styles.list}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {navLinks.map((link, index) => (
              <Menu.Item key={index} icon={link.icon}>
                <Link href={link.href}>{link.name}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </div>
        <div className={styles.ContainerButton}>
          <Button className={styles.logoutButton} onClick={logOutUser}>
            <LogoutOutlined />
          </Button>
          <Button className={styles.configButton} onClick={handleSettings}>
            <SettingFilled />
          </Button>
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          Dashboard
        </Header>
    {children}
      </Layout>
    </Layout>
  );
};

export default WithAuth(App);