import { CreateDeck } from './components/CreateDeck/CreateDeck';
import { PageTitle } from './components/PageTitle/PageTitle';
import './PrimeReact.override.css';

interface DecksViewProps {
  DeckTemplate: React.FC;
  ToastComponent: React.FC;
  handleCreateDeck: () => void;
}

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
      <div className='grid align-items-center mt-3'>
        <div className='col-12 text-right'>
          <CreateDeck handleCreateDeck={handleCreateDeck} />
        </div>
      </div>
      <ToastComponent />
    </>
  );
};

export default DecksView;
