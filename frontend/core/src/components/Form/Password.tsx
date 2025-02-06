import {
	Password as PrimePassword,
	type PasswordProps,
} from "primereact/password";

interface IPassword extends PasswordProps {
	id: string;
	name: string;
	placeholder?: string;
	wrapExtraClass?: string;
	inputExtraClass?: string;
}

export const Password: React.FC<IPassword> = ({
	id,
	name,
	placeholder,
	wrapExtraClass,
	inputExtraClass,
}) => {
	return (
		<PrimePassword
			id={id}
			name={name}
			data-testid={id}
			placeholder={placeholder}
			className={wrapExtraClass}
			inputClassName={inputExtraClass}
		/>
	);
};
