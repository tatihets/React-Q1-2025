import { useSelector } from 'react-redux';
import { Download } from './Download';
import { Unselect } from './Unselect';
import { RootState } from '../../../store';
import { selectSelectedCharacters } from '../selector';
import { selectCharacters } from '../../../pages/main/selector';

export const FlyoutSetting = () => {
  const selectedCharacters = useSelector((state: RootState) =>
    selectSelectedCharacters(state)
  );
  const characters = useSelector(selectCharacters);

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

      <Unselect />
      <Download
        ids={selectedCharacters}
        characters={characters}
        count={selectedCharactersCount}
      />
    </div>
  );
};
