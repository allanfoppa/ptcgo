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
}

export default DecksHandler;
