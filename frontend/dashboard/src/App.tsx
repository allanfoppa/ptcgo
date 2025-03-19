import { useContext } from 'react';
import { GlobalContext } from 'core/GlobalContext'
import { PlaceholderText } from 'core/Placeholder'

const Dashboard = () => {

  const { text }: { text: string } = useContext(GlobalContext);

  return (
    <div>
      <b>DASHBOARD:</b>
      <br />
      {text || <PlaceholderText />}
    </div>
  );
};

export default Dashboard;
