import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';
import { Logo } from '@components/Media/Logo';
import { RoutePaths } from '@enums/route-paths';
import { useRouterContext } from '@contexts/RouterContext';
import { useContext } from 'react';
import { GlobalContext } from '@contexts/GlobalContext';

export const Header = () => {
  const routerContext = useRouterContext();
  const { isLogged, user } = useContext(GlobalContext);

  const firstLetter = user.charAt(0).toUpperCase();

  const itemRenderer = (item: any) => (
    <div className='p-menuitem-content'>
      <a
        className="flex align-items-center p-menuitem-link"
        onClick={() => routerContext.navigate(item.url)}
      >
        <span className={item.icon} />
        <span className="mx-2">{item.label}</span>
      </a>
    </div>
  );

  const items: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-chart-bar',
      url: RoutePaths.HOME,
      template: itemRenderer
    },
    ...(isLogged
      ? [{
          label: 'Decks',
          icon: 'pi pi-th-large',
          url: RoutePaths.DECKS,
          template: itemRenderer
        }]
      : []),
    {
      label: 'About',
      icon: 'pi pi-info-circle',
      url: RoutePaths.NOT_FOUND,
      template: itemRenderer
    },
  ];

  return (
    <Menubar
      className='mx-2 mb-4 mt-2 gap-3'
      model={items}
      start={<Logo extraClass='max-h-full' />}
      end={isLogged &&
        <Avatar
          label={firstLetter}
          shape="circle"
          size="large"
          className="p-mr-2"
        />
      }
    />
  )
}
