import { Character } from '../../../../entities/character-card/model';
import { Button } from '../../../../shared/ui';
import { downloadCsv } from '../../utils/json-to-csv';

type DownloadProps = {
  ids: { [key: number]: number[] };
  characters: { [key: number]: Character[] };
  count: number;
};

export const Download = ({ ids, characters, count }: DownloadProps) => {
  const handleDownload = () => {
    const arr: Character[] = [];
    Object.entries(ids).map(([key, value]: [string, number[]]) => {
      let character;
      value.forEach((id: number) => {
        character = characters[Number(key)].find(
          (character: Character) => character.id === id
        );
      });
      if (character) {
        arr.push(character);
      }
    });

    downloadCsv<Character>(arr, `${count}_characters.csv`);
  };
  return <Button onClick={handleDownload}>Download</Button>;
};
