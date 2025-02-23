import { useDispatch, useSelector } from 'react-redux';
import { Download } from './Download';
import { Unselect } from './Unselect';
import { removeSelectedCharacters } from '../../../pages/main/reducer';
import { RootState } from '../../../store';
import { selectSelectedCharacters } from '../selector';

export const FlyoutSetting = () => {
  const dispatch = useDispatch();

  const selectedCharacters = useSelector((state: RootState) =>
    selectSelectedCharacters(state)
  );

  const handleUnselectClick = () => {
    dispatch(removeSelectedCharacters());
  };

  const selectedCharactersCount =
    selectedCharacters &&
    Object.values(selectedCharacters).reduce(
      (count, arr) => count + arr.length,
      0
    );

  if (!selectedCharacters || !selectedCharactersCount) {
    return <></>;
  }

  return (
    <div className="flyout">
      <p>
        Selected items on all pages:
        {selectedCharactersCount}
      </p>

      <Unselect onClick={handleUnselectClick} />
      <Download />
    </div>
  );
};
