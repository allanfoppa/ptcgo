import {
	InputText as PrimeInputText,
	type InputTextProps,
} from "primereact/inputtext";

interface IInputText extends InputTextProps {
	id: string;
	name: string;
	placeholder?: string;
	extraClass?: string;
}

export const InputText: React.FC<IInputText> = ({
	id,
	name,
	placeholder,
	extraClass,
}) => {
	return (
		<PrimeInputText
			id={id}
			name={name}
			data-testid={id}
			placeholder={placeholder}
			className={extraClass}
		/>
	);
};
