import { type JSX, type ReactNode, useId } from 'react';

interface LabelledControlProps {
  label: string;
  className?: string;
  labelClassName?: string;
  children: (id: string) => ReactNode;
}

/** Never wraps the control: implicit labelling reaches only a labelable element, which a Dropdown is not. */
export function LabelledControl({ label, className, labelClassName, children }: LabelledControlProps): JSX.Element {
  const id = useId();

  return (
    <div className={className}>
      <label className={labelClassName} htmlFor={id}>
        {label}
      </label>
      {children(id)}
    </div>
  );
}
