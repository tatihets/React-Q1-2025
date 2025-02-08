import { PureComponent, ReactNode } from 'react';

import './index.css';

interface ButtonProps {
  onClick: () => void;
  buttonContent: ReactNode;
}

class Button extends PureComponent<ButtonProps> {
  render() {
    const { onClick, buttonContent } = this.props;
    return (
      <button onClick={onClick} className="button">
        {buttonContent}
      </button>
    );
  }
}
export default Button;
