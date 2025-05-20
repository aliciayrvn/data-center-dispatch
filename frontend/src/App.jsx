// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { Layout, Menu, Typography } from 'antd';
// import { DesktopOutlined, HomeOutlined, CloudServerOutlined } from '@ant-design/icons';
// import ServerList from './components/ServerList';
// import VMManager from './components/VMManager';
// import LoginForm from './components/LoginForm';

// const { Header, Content, Footer, Sider } = Layout;
// const { Title } = Typography;

// function Home() {
//   return <Title level={2} style={{ margin: '24px 0' }}>Добро пожаловать!</Title>;
// }

// export default function App() {
//   const [isAuth, setIsAuth] = useState(false);

//   if (!isAuth) {
//     return <LoginForm onLogin={() => setIsAuth(true)} />;
//   }

//   return (
//     <Router>
//       <Layout style={{ minHeight: '100vh' }}>
//         <Sider breakpoint="lg" collapsedWidth="0">
//           <div style={{ height: 32, margin: 16, color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
//             Дата-центр
//           </div>
//           <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']}>
//             <Menu.Item key="home" icon={<HomeOutlined />}>
//               <Link to="/">Главная</Link>
//             </Menu.Item>
//             <Menu.Item key="servers" icon={<DesktopOutlined />}>
//               <Link to="/servers">Серверы</Link>
//             </Menu.Item>
//             <Menu.Item key="vms" icon={<CloudServerOutlined />}>
//               <Link to="/vms">Виртуальные машины</Link>
//             </Menu.Item>
//           </Menu>
//         </Sider>
//         <Layout>
//           <Header style={{ background: '#fff', padding: 0 }}>
//             <Title level={2} style={{ margin: '16px' }}>Диспетчер дата-центра</Title>
//           </Header>
//           <Content style={{ margin: '24px 16px 0', minHeight: 280 }}>
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/servers" element={<ServerList />} />
//               <Route path="/vms" element={<VMManager />} />
//             </Routes>
//           </Content>
//           <Footer style={{ textAlign: 'center' }}>
//             Data Center Dispatch ©2025
//           </Footer>
//         </Layout>
//       </Layout>
//     </Router>
//   );
// }


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import { DesktopOutlined, HomeOutlined, CloudServerOutlined } from '@ant-design/icons';
import ServerList from './components/ServerList';
import VMManager from './components/VMManager';
import LoginForm from './components/LoginForm';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph } = Typography;

function Home() {
  return (
    <div style={{
      maxWidth: 650,
      margin: '0 auto',
      background: 'rgba(255,255,255,0.85)',
      borderRadius: 12,
      padding: 32,
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
    }}>
      <Title level={2} style={{ margin: '24px 0' }}>Добро пожаловать!</Title>
      <Paragraph style={{ fontSize: 18 }}>
        Это клиент-серверное приложение для управления дата-центром.<br /><br />
        <b>Возможности:</b>
        <ul>
          <li>Просмотр и мониторинг серверов с наглядными графиками</li>
          <li>Управление виртуальными машинами: запуск, остановка, создание, удаление</li>
          <li>Авторизация для безопасного доступа</li>
        </ul>
      </Paragraph>
      <Paragraph style={{ fontSize: 18 }}>
        <b>Уникальный дизайн:</b><br />
        Интерфейс выполнен в стиле домовёнка Кузи — на фоне страницы изображён сам домовёнок, а рядом с каждым сервером вы увидите фирменный сундучок Кузи.<br />
        Такой подход делает работу с инфраструктурой не только удобной, но и уютной!
      </Paragraph>
    </div>
  );
}

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  if (!isAuth) {
    return <LoginForm onLogin={() => setIsAuth(true)} />;
  }

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider breakpoint="lg" collapsedWidth="0">
          <div style={{ height: 32, margin: 16, color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
            Дата-центр
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']}>
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to="/">Главная</Link>
            </Menu.Item>
            <Menu.Item key="servers" icon={<DesktopOutlined />}>
              <Link to="/servers">Серверы</Link>
            </Menu.Item>
            <Menu.Item key="vms" icon={<CloudServerOutlined />}>
              <Link to="/vms">Виртуальные машины</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Title level={2} style={{ margin: '16px' }}>Диспетчер дата-центра</Title>
          </Header>
          <Content style={{ margin: '24px 16px 0', minHeight: 280 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servers" element={<ServerList />} />
              <Route path="/vms" element={<VMManager />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Data Center Dispatch ©2025
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}