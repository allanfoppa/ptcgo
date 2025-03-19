import { Button } from 'primereact/button';
import { DeckCard } from './components/DeckCard/DeckCard.view';

interface Deck {
  name: string;
  description: string;
}

interface DecksViewProps {
  list: Deck[];
}

const DecksView = ({
  list
}: DecksViewProps) => {

  const mainParagraph = <p>Your PTCG Decks</p>
  const createDeck = <Button label="Create Deck" onClick={() => alert('temp')} icon="pi pi-plus" />

  return (
    <div>
      <div className='flex justify-content-between mb-4'>
        {mainParagraph}
        {createDeck}
      </div>
      <div className="grid">
        {list.map((deck) => (
          <DeckCard
            key={deck.name}
            name={deck.name}
            description={deck.description}
          />
        ))}
      </div>
    </div>
  );
};

export default DecksView;
