import { useDispatch, useSelector } from 'react-redux';
import { Download } from './Download';
import { Unselect } from './Unselect';
import { selectSelectedCharacters } from '../../../pages/main/selector';
import { removeSelectedCharacters } from '../../../pages/main/reducer';
import { RootState } from '../../../store';

export const FlyoutSetting = () => {
  const dispatch = useDispatch();

  const selectedCharacters = useSelector((state: RootState) =>
    selectSelectedCharacters(state)
  );

  const handleUnselectClick = () => {
    dispatch(removeSelectedCharacters());
  };

  if (!selectedCharacters) {
    return <></>;
  }

  return (
    <div className="flyout">
      <p>
        Selected items on all pages:
        {selectedCharacters &&
          Object.values(selectedCharacters).reduce(
            (count, arr) => count + arr.length,
            0
          )}
      </p>

      <Unselect onClick={handleUnselectClick} />
      <Download />
    </div>
  );
};
