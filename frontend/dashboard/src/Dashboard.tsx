import { useContext } from 'react';
import './App.css';
import { GlobalContext } from 'core/GlobalContext'
import { PlaceholderText } from 'core/Placeholder'

const Dashboard = () => {

  const { text }: { text: string } = useContext(GlobalContext);

  return (
    <p>
      <b>DASHBOARD:</b>
      <br />
      {text || <PlaceholderText />}
    </p>
  );
};

export default Dashboard;
