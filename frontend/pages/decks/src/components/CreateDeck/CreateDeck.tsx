import { Button } from "primereact/button";

interface CreateDeckProps {
  handleCreateDeck: () => void;
}

export const CreateDeck = ({ handleCreateDeck }: CreateDeckProps) => {
  return (
    <Button label="Create Deck" onClick={handleCreateDeck} icon="pi pi-plus" />
  );
};
