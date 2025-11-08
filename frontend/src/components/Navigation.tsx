// import logo
import { Menu } from 'antd'
import logo from '../assets/react.svg'

const items = [
  {
    key: 1,
    label: 'Dashboard',
  },
  {
    key: 2,
    label: 'Organización',
  },
  {
    key: 3,
    label: 'Modelos'
  },
  {
    key: 4,
    label: 'Seguimiento'
  }
]

export function Navigation() {

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />

      <Menu 
        theme='dark'
        mode='horizontal'
        items={items}
        style={{ flex: 1, minWidth: 0, backgroundColor: '#1890FF', color: 'white'}}
        selectedKeys={['2']}
      />
    </>
  )
}
