import { MouseEvent } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Character } from '../model';

export const CharacterCard = ({ id, name, image }: Character) => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const selectedCharacterId = params.id;

  const handleCardClick = (event: MouseEvent) => {
    if (!selectedCharacterId) {
      event.stopPropagation();
      navigate(`/characters/${id}?page=${searchParams.get('page')}`);
    } else {
      navigate(`/?page=${searchParams.get('page')}`);
    }
  };
  return (
    <div className="card" key={id} onClick={handleCardClick}>
      <img src={image} alt="card image" />
      <div>
        <h3>{name}</h3>
      </div>
    </div>
  );
};
