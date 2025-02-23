import { useDispatch } from 'react-redux';
import { Button } from '../../../../shared/ui';
import { removeSelectedCharacters } from '../../reducer';

export const Unselect = () => {
  const dispatch = useDispatch();
  const handleUnselectClick = () => {
    dispatch(removeSelectedCharacters());
  };
  return <Button onClick={handleUnselectClick}>Unselect</Button>;
};
