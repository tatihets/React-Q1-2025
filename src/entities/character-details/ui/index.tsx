import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Button, Spinner } from '../../../shared/ui';
import { useGetCharacterDetailQuery } from '../../../shared/api/characters-list';
import { Character } from '../../character-card/model';

export const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const {
    data: character,
    isLoading,
    isFetching,
    isError,
    error = {},
  } = useGetCharacterDetailQuery(id, {
    skip: !id,
  });

  const { data: errorData } = error as { data: Character };

  const handleCloseDetailSection = () => {
    navigate(`/?page=${searchParams.get('page')}`);
  };

  return (
    character && (
      <div className="details">
        <Button onClick={handleCloseDetailSection}>Close</Button>
        <div>
          <img src={character.image} alt="card image" />
          <h3>{character.name}</h3>
          {character.status && <p>Status: {character.status}</p>}
          {character.gender && <p>Gender: {character.gender}</p>}
          {character.type && <p>Type: {character.type}</p>}
        </div>
        {(isLoading || isFetching) && <Spinner />}
        {isError && !errorData?.name && (
          <div className="error-message">{JSON.stringify(errorData)}</div>
        )}
      </div>
    )
  );
};
