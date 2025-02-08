import { ReactNode } from 'react';

import './index.css';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
}

export const Button = ({ onClick, children }: ButtonProps) => (
  <button onClick={onClick} className="button">
    {children}
  </button>
);
