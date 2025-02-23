import { Button } from '../../../../shared/ui';

interface UnselectProps {
  onClick: () => void;
}

export const Unselect = ({ onClick }: UnselectProps) => {
  return <Button onClick={onClick}>Unselect</Button>;
};
