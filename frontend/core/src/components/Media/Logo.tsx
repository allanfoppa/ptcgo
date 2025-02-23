import { useRouterContext } from '../../contexts/RouterContext';
import { RoutePaths } from '../../enums/route-paths';
import './Logo.css';

import logo from '../../assets/images/logo.png';

type TLogoProps = {
	extraClass?: string;
};

export const Logo: React.FC<TLogoProps> = ({ extraClass }) => {

	const routerContext = useRouterContext();

	return (
		<img
			src={logo}
			id="logo"
			data-testid="logo"
			height={'40px'}
			alt="PTCGO Logo"
			className={`cursor-pointer ${extraClass}`}
			onClick={() => routerContext.navigate(RoutePaths.HOME)}
		/>
	);
};
