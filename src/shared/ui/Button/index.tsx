import { ReactNode } from 'react';

import './index.css';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
}

export const Button = ({
  onClick,
  disabled = false,
  children,
}: ButtonProps) => (
  <button onClick={onClick} className="button" disabled={disabled}>
    {children}
  </button>
);
