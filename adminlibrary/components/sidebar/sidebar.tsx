'use client'
import React, { useState } from 'react';
import { DesktopOutlined, BookOutlined, PieChartOutlined, TeamOutlined, LogoutOutlined, SettingFilled } from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import Link from 'next/link';
import { useStyles } from './styles/styles';

const { Content, Sider } = Layout;

const navLinks = [
  { name: "Dashboard", href: "/", icon: <PieChartOutlined /> },
  { name: "Shelves", href: "/shelves", icon: <DesktopOutlined /> },
  { name: "Categories", href: "/categories", icon: <TeamOutlined /> },
  { name: "Books", href: "/book", icon: <BookOutlined /> },
];

const SideBar = () => {
  const { styles } = useStyles();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className={styles.side}>
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
          <Button className={styles.logoutButton}>
            <LogoutOutlined />
          </Button>
          <Button className={styles.configButton}>
            <SettingFilled />
          </Button>
        </div>
      </Sider>
    </Layout>
  );
};

export default SideBar;
