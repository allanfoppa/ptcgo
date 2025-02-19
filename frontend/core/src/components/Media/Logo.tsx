import logo from '../../assets/images/logo.png';

type TLogoProps = {
	extraClass?: string;
};

export const Logo: React.FC<TLogoProps> = ({ extraClass }) => {
	return <img src={logo} data-testid="logo" alt="PTCGO Logo" className={extraClass} />;
};
