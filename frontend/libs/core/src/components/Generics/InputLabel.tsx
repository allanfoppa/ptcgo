
type TInputLabelProps = {
  label: string;
  labelFor: string;
}

export const InputLabel: React.FC<TInputLabelProps> = ({ label, labelFor }) => {
  return(
    <label
      htmlFor={labelFor}
      className="block text-900 font-medium mb-2"
      data-testid={`input-label-${labelFor}`}
    >
      {label}
    </label>
  )
}
