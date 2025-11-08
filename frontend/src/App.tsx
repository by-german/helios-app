// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Layout } from 'antd'
import { Navigation } from './components/Navigation';
import { OrganizationContent } from './components/OrganizationContent';
const { Header, Content } = Layout;

const layoutStyle: React.CSSProperties = {
  minHeight: '100vh',
  minWidth: '100vw'
}

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#1890FF',
  color: 'white',
  display: 'flex'
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  display: 'flex',
  paddingInline: 48
};

function App() {

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Navigation />
      </Header>
      <Content style={contentStyle}>
        <OrganizationContent />
      </Content>
    </Layout>
  )
}

export default App

