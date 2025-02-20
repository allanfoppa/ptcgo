import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';
import { Logo } from '../components/Media/Logo';

export const Header = () => {

  const items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
    },
    {
      label: 'Decks',
      icon: 'pi pi-th-large',
    },
    {
      label: 'About',
      icon: 'pi pi-info-circle',
    },
  ];

  return (
    <Menubar
      className='mx-2 mb-4 mt-2'
      model={items}
      start={<Logo extraClass='max-h-full' />}
      end={<Avatar
        icon="pi pi-user"
        shape="circle"
        size="large"
        className="p-mr-2"
      />}
    />
  )
}
