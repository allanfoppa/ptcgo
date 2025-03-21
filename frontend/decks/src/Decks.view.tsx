import { CreateDeck } from './components/CreateDeck/CreateDeck';
import { PageTitle } from './components/PageTitle/PageTitle';

interface DecksViewProps {
  DeckTemplate: React.FC;
}

const DecksView = ({
  DeckTemplate
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
      <div>
        <DeckTemplate />
      </div>
    </>
  );
};

export default DecksView;
