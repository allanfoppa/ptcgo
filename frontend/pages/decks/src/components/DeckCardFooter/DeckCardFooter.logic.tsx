import { MenuItem } from 'primereact/menuitem';
import { DeckCardFooterView } from './DeckCardFooter.view';

interface DeckCardFooterControllerProps {
  handleDeleteDeck: () => void;
}

export const DeckCardFooterController = ({
  handleDeleteDeck
}: DeckCardFooterControllerProps) => {

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
      command: () => handleDeleteDeck()
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
