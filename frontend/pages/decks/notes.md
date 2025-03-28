# HANDLER LOGIC VIEW

## Overview

The `HandlerLogicView` component follows a structured design pattern that separates logic from UI rendering. This architecture ensures better maintainability, reusability, and testability of components within a React application.

## Components Breakdown

### 1. HandlerLogicView

The `HandlerLogicView` component acts as a bridge between logic and view components. It receives `Logic` and `View` as props and passes down data and functions from the logic layer to the view layer.

#### 1.1 Code Implementation

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface HandlerLogicViewProps {
  Logic: React.ComponentType<any>;
  View: React.ComponentType<any>;
}

const HandlerLogicView: React.FC<HandlerLogicViewProps> = ({ Logic, View }) => {
  return (
    <Logic>
      {(handler: any) => <View {...handler} />}
    </Logic>
  );
};

export default HandlerLogicView;
```

### 2. DecksHandler

The `DecksHandler` component integrates the `HandlerLogicView`, connecting the `DecksLogic` component with the `DecksView` component.

#### 2.1 Code Implementation

```tsx
import HandlerLogicView from "./handlers/HandlerLogicView";
import DecksLogic from "./Decks.logic";
import DecksView from "./Decks.view";

const DecksHandler = () => {
  return (
    <HandlerLogicView
      Logic={DecksLogic}
      View={DecksView}
    />
  );
};

export default DecksHandler;
```

### 3. DecksLogic

The `DecksLogic` component is responsible for handling business logic, fetching deck data, and managing state.

#### 3.1 Responsibilities

- Fetching decks from an API.
- Managing state for the list of decks.
- Handling the creation of a new random deck.
- Providing UI components who has some logic before printing (`DeckTemplate`, `ToastComponent`) and rendering in the view.

#### 3.2 Code Highlights

```tsx
const handleCreateDeck = async () => {
  const formData = new FormData();

  const randomDeck = pokemonDecksMock[Math.floor(Math.random() * pokemonDecksMock.length)];

  formData.append('name', randomDeck.name);
  formData.append('description', randomDeck.description || 'No description available');

  const newDeck = await createDecks({
    userId: userContext.userId,
    token: userContext.token,
    formData
  });

  setDecks((prevDecks) => [...prevDecks, ...(Array.isArray(newDeck.data) ? newDeck.data : [newDeck.data])]);
};
```

### 4. DecksView

The `DecksView` component is responsible for rendering the UI. It receives logic functions and state from `DecksLogic` via props.

#### 4.1 Responsibilities

- Rendering the page title.
- Displaying the deck list using `DeckTemplate`.
- Providing UI for creating a new deck.
- Rendering the toast notification component.

#### 4.2 Code Highlights

```tsx
const DecksView = ({
  DeckTemplate,
  handleCreateDeck,
  ToastComponent
}: DecksViewProps) => {
  return (
    <>
      <div className='grid align-items-center mb-3'>
        <div className='col-6'>
          <PageTitle />
        </div>
        <div className='col-6 text-right'>
          <CreateDeck handleCreateDeck={handleCreateDeck} />
        </div>
      </div>
      <div>
        <DeckTemplate />
      </div>
      <ToastComponent />
    </>
  );
};
```

## Conclusion

The `HandlerLogicView` pattern enhances separation of concerns, making the `DecksHandler` modular and easy to maintain. By keeping logic (`DecksLogic`) separate from the UI (`DecksView`), the application remains scalable and testable. A good approach at first sight...
