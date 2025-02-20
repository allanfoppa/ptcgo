import './Logo.css';
import logo from '../../assets/images/logo.png';

type TLogoProps = {
	extraClass?: string;
};

export const Logo: React.FC<TLogoProps> = ({ extraClass }) => {
	return <img src={logo} id="logo" data-testid="logo" height={'40px'} alt="PTCGO Logo" className={extraClass} />;
};
