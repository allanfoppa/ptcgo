import React, { useEffect, useRef, useState, useCallback } from "react";
import { NoDecksAvailable } from "./components/NoDecksAvailable/NoDecksAvailable";
import { DeckCard } from "./components/DeckCard/DeckCard.view";
import { useUserContext } from "core/UserContext";
import { fetchDecks } from "./requests/decks.request";
import { createDeck } from "./requests/create-deck.request";
import { pokemonDecksMock } from "./requests/create-deck.mock";
import { Toast } from 'primereact/toast';
import { deleteDeck } from "./requests/delete-deck.request";

interface DecksComponentProps {
  children: (props: unknown) => React.ReactNode;
}

interface Deck {
  id: number;
  userId: string;
  name: string;
  description: string;
  createdAt: string;
}

const DecksLogic: React.FC<DecksComponentProps> = ({
  children
}) => {
  const toast = useRef<Toast>(null);
  const userContext = useUserContext();

  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchDecks({
        userId: userContext.userId,
        token: userContext.token
      });
      setDecks(data.data);
    };

    fetch();
  }, [userContext.token, userContext.userId]);


  /**
   * CREATE A RANDOM DECK FROM THE POKEMONDECKSMOCK LIST.
   * ATTENCION: I ALREADY STUDY AND VALIDATED REACT 19 FORM,THAT'S WHY I'M NOT WILL
   * CREATE A FORM LOGIC HERE.
   */
  const handleCreateDeck = async () => {
    const formData = new FormData();

    const randomDeck = pokemonDecksMock[Math.floor(Math.random() * pokemonDecksMock.length)];

    formData.append('name', randomDeck.name);
    formData.append('description', randomDeck.description || 'No description available');

    const newDeck = await createDeck({
      userId: userContext.userId,
      token: userContext.token,
      formData
    });

    toast.current?.show({
      severity: 'info',
      summary: 'Info',
      detail: 'I ALREADY STUDY AND VALIDATED REACT 19 FORM,THAT\'S WHY I\'M NOT WILL CREATE A FORM LOGIC HERE.',
      sticky: true
    });

    setDecks((prevDecks) => [...prevDecks, ...(Array.isArray(newDeck.data) ? newDeck.data : [newDeck.data])]);
  };

  const handleDeleteDeck = async (deckId: number) => {
    console.log('deckId', deckId);
    
    const response = await deleteDeck({
      deckId: String(deckId),
      token: userContext.token
    });

    if (response.metadata.statusCode === 200) {
      setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
      toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Deck deleted successfully' });
    } else {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete deck' });
    }
  }

  const DeckTemplate = useCallback(() => {
    return (
      <>
        {decks.length === 0 ? (
          <NoDecksAvailable />
        ) : (
          <div className="grid">
            {decks.map((deck) => (
              <DeckCard
                key={deck.id}
                name={deck.name}
                description={deck.description}
                handleDeleteDeck={() => handleDeleteDeck(deck.id)}
              />
            ))}
          </div>
        )}
      </>
    );
  }, [decks]);

  const ToastComponent = useCallback(() => {
    return <Toast ref={toast} position="top-center" />;
  }, []);

  return (
    <>
      {children({
        DeckTemplate,
        handleCreateDeck,
        ToastComponent
      })}
    </>
  );
};

export default DecksLogic;
