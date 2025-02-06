import { Button as PrimeButton, type ButtonProps } from "primereact/button";

interface IButtonProps extends ButtonProps {
	id: string;
	label: string;
	icon?: string;
	isPending?: boolean;
	extraClass?: string;
}

export const Button: React.FC<IButtonProps> = ({
	id,
	label,
	icon,
	isPending = false,
	extraClass,
}) => (
	<PrimeButton
		id={id}
		data-testid={id}
		label={label}
		icon={icon}
		loading={isPending}
		className={extraClass}
	/>
);
