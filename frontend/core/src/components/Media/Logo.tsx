import logo from "../../assets/images/logo.png";

type TLogoProps = {
	extraClass?: string;
};

export const Logo: React.FC<TLogoProps> = ({ extraClass }) => {
	return <img src={logo} alt="PTCGO Logo" className={extraClass} />;
};
