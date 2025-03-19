import DecksView from './Decks.view';

const DecksLogic = () => {

  const decksLists = [
    {
      name: 'Deck 1',
      description: 'Description 1 lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.',
    },
    {
      name: 'Deck 2',
      description: 'Description 2',
    },
    {
      name: 'Deck 3',
      description: 'Description 3 lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.',
    },
    {
      name: 'Deck 4',
      description: 'Description 4',
    },
    {
      name: 'Deck 5',
      description: 'Description 5',
    },
  ]

  return (
    <DecksView
      list={decksLists}
    />
  );
};

export default DecksLogic;
