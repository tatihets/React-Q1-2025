import { useNavigate, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { CharacterDetails } from '../model';

import { useLoadingError } from '../../../app/hooks/use-loading-error';
import { fetchCharacter } from '../../character-details/api/fetch-character';

import './index.css';
import { Button } from '../../../shared/ui';

export const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<CharacterDetails | null>(null);
  const { loading, error, setLoading, setError } = useLoadingError();
  const navigate = useNavigate();
  console.log('DETAILLLLLLLLLLLLLL');

  useEffect(() => {
    setLoading(true);
    try {
      const fetchData = async () => {
        if (id) {
          const data = (await fetchCharacter(Number(id))) as CharacterDetails;
          setCharacter(data);
        } else {
          console.log('ERROORRR');
        }
      };
      fetchData();
    } catch (err: unknown) {
      const { message } = err as Record<string, string>;
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleCloseDetailSection = () => {
    navigate(`/`);
  };

  return (
    !loading &&
    !error &&
    character && (
      <div className="details">
        <Button onClick={handleCloseDetailSection}>Close</Button>
        <div>
          <img src={character.image} alt="card image" />
          <h3>{character.name}</h3>
          <p>Status: {character.status}</p>
          <p>Status: {character.gender}</p>
          <p>Type: {character.type}</p>
        </div>
      </div>
    )
  );
};
