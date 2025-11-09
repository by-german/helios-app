import { Button, Tabs, Typography, type TabsProps } from 'antd';
import { Division } from './Division';
import { DownloadOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

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
    <main style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Title level={4} style={{ textAlign: 'left' }}>Organización</Title>

      <Tabs
        defaultActiveKey='1'
        items={tabs}
        tabBarExtraContent={<div style={{ display: 'flex', gap: '8px', }}>
          <Button type="primary" shape="default" icon={<PlusOutlined />} />
          <Button shape="default" icon={
            <UploadOutlined style={{ color: '#1890FF' }} />}
          />
          <Button shape="default" icon={
            <DownloadOutlined style={{ color: '#1890FF' }} />}
          />
        </div>}
      />
    </main>
  )
}