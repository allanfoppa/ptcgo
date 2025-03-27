import { MenuItem } from 'primereact/menuitem';
import { SplitButton } from 'primereact/splitbutton';


interface DeckCardFooterProps {
  model: MenuItem[];
  edit: () => void;
}

export const DeckCardFooterView = ({
  model,
  edit
}: DeckCardFooterProps) => {

  return (
    <div className="card flex justify-content-center">
      <SplitButton label="Edit" icon="pi pi-pencil" onClick={edit} model={model} severity="secondary" />
    </div>
  )
}
