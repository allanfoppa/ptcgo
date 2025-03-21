import { CreateDeck } from './components/CreateDeck/CreateDeck';
import { DeckCard } from './components/DeckCard/DeckCard.view';
import { NoDecksAvailable } from './components/NoDecksAvailable/NoDecksAvailable';
import { PageTitle } from './components/PageTitle/PageTitle';

interface DecksViewProps {
  decks: {
    id: number;
    name: string;
    description: string;
  }[];
  decksLength: number;
}

const DecksView = ({
  decks
}: DecksViewProps) => {
  return (
    <>
      <div className='grid align-items-center mb-3'>
        <div className='col-6'>
          <PageTitle />
        </div>
        <div className='col-6 text-right'>
          <CreateDeck />
        </div>
      </div>

      {decks.length === 0
        ? <NoDecksAvailable />
        : (
          <div className="grid">
            {
              decks.map((deck) => (
                <DeckCard
                  key={deck.id}
                  name={deck.name}
                  description={deck.description}
                />
              ))
            }
          </div>
        )
      }
    </>
  );
};

export default DecksView;
