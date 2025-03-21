import { useEffect, useState } from "react";
import { NoDecksAvailable } from "./components/NoDecksAvailable/NoDecksAvailable";
import { DeckCard } from "./components/DeckCard/DeckCard.view";

interface DecksComponentProps {
  children: (props: unknown) => React.ReactNode;
}

interface Deck {
  id: number;
  name: string;
  description: string;
}

const DecksLogic: React.FC<DecksComponentProps> = ({
  children
}) => {

  const [ decks, setDecks ] = useState<Deck[]>([]);

  useEffect(() => {
    const decksData = [
      {
        id: 1,
        name: 'Deck 1',
        description: 'Description 1 lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.',
      },
      {
        id: 2,
        name: 'Deck 2',
        description: 'Description 2',
      },
      {
        id: 3,
        name: 'Deck 3',
        description: 'Description 3 lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.',
      },
      {
        id: 4,
        name: 'Deck 4',
        description: 'Description 4',
      },
      {
        id: 5,
        name: 'Deck 5',
        description: 'Description 5',
      },
    ]

    setDecks(decksData);
  }, [])

  const DeckTemplate = () => {
    return (
      decks.length === 0
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
    );
  }

  return (
    <>
      {children({
        DeckTemplate
      })}
    </>
  );
};

export default DecksLogic;
