import React, { useState } from 'react';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useStyles } from './styles/styles';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Manage', 'sub2', <TeamOutlined />, [getItem('Shelf', '6'), getItem('Category', '8'),getItem('book', '9')]),
  getItem('User', 'sub1', <UserOutlined />), 
  getItem('Files', '10', <FileOutlined />),
];

const SideBar = ({ children }: { children: React.ReactNode }) => {
  const{styles}=useStyles();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={styles.layout}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Content className={styles.content}>
          
            {children}
       
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideBar;
