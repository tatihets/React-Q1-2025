import { useEffect, useState } from 'react';
import { Character } from '../model';

import { useLoadingError } from '../../../app/hooks/use-loading-error';
import { fetchCharacter } from '../api/fetch-character';

import './index.css';

type CharacterCardProps = {
  id: number;
};

export const CharacterCard = ({ id }: CharacterCardProps) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const { loading, error, setLoading, setError } = useLoadingError();

  useEffect(() => {
    setLoading(true);
    try {
      const fetchData = async () => {
        const data = (await fetchCharacter(id)) as Character;
        setCharacter(data);
        setLoading(false);
      };
      fetchData();
    } catch (err: unknown) {
      const { message } = err as Record<string, string>;
      setLoading(false);
      setError(message);
    }
  }, [id]);

  return (
    !loading &&
    !error &&
    character && (
      <div className="card">
        <img src={character.image} alt="card image" />
        <div>
          <h3>{character.name}</h3>
          <p>Status: {character.status}</p>
        </div>
      </div>
    )
  );
};
