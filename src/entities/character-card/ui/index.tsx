import { MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Character } from '../model';

import './index.css';

type CharacterCardProps = Character & {
  onCardClick: (id: number) => void;
};

export const CharacterCard = ({
  id,
  name,
  image,
  onCardClick,
}: CharacterCardProps) => {
  const params = useParams();

  const selectedCharacterId = params.id;

  const handleCardClick = (event: MouseEvent) => {
    if (!selectedCharacterId) {
      event.stopPropagation();
    }
    onCardClick(id);
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
