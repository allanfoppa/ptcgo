import { Card } from 'primereact/card';
import { PlaceholderImage } from 'core/Placeholder';
import { DeckCardFooterController } from '../DeckCardFooter/DeckCardFooter.logic';

interface DeckCardProps {
  name: string;
  description: string;
}

export const DeckCard = ({
  name,
  description
}: DeckCardProps) => {

  const header = PlaceholderImage;

  return (
    <div className="col-3">
      <div className="card flex justify-content-center text-center">
        <Card
          header={header}
          title={name}
          footer={<DeckCardFooterController />}
        >
          <p className="m-0 h-3rem">
            {description}
          </p>
        </Card>
      </div>

    </div>
  )
}
