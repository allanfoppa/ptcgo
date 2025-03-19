import { MenuItem } from 'primereact/menuitem';
import { DeckCardFooterView } from './DeckCardFooter.view';

export const DeckCardFooterController = () => {

  const items: MenuItem[] = [
    {
      label: 'Match Results',
      icon: 'pi pi-fw pi-chart-bar',
      command: () => {
        console.log('update');
      }
    },
    {
      label: 'Delete',
      icon: 'pi pi-times',
      command: () => {
        console.log('delete');
      }
    }
  ];

  const edit = () => {
    console.log('edit');
  };

  return (
    <DeckCardFooterView
      model={items}
      edit={edit}
    />
  )
}
