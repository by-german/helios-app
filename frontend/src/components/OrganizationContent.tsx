import { Tabs, Typography, type TabsProps } from 'antd';
import { Division } from './Division';

const { Title } = Typography;

const tabs: TabsProps['items'] = [
  {
    key: '1',
    label: 'Divisiones',
    children: <Division />
  },
  {
    key: '2',
    label: 'Colaboradores',
    children: '-',
  },
];

export function OrganizationContent() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
      <Title level={4} style={{ textAlign: 'left'}}>Organización</Title>
      
      <Tabs
        defaultActiveKey='1'
        items={tabs}
      />
    </main>
  )
}