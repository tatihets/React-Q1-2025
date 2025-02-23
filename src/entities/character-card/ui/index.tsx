import { MouseEvent } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Character } from '../model';
import { useDispatch } from 'react-redux';
import { setSelectedCharacters } from '../../../pages/main/reducer';

export const CharacterCard = ({
  id,
  name,
  image,
  checked,
}: Character & { checked: boolean }) => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();

  const selectedCharacterId = params.id;
  const page = searchParams.get('page');

  const handleCardClick = (event: MouseEvent) => {
    if (!selectedCharacterId) {
      event.stopPropagation();
      navigate(`/characters/${id}?page=${page}`);
    } else {
      navigate(`/?page=${[page]}`);
    }
  };

  const handleCheckboxClick = (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(
      setSelectedCharacters({
        page: Number(page),
        id,
      })
    );
  };

  return (
    <div className="card" key={id} onClick={handleCardClick}>
      <img src={image} alt="card image" />
      <div>
        <h3>{name}</h3>
      </div>
      <input
        type="checkbox"
        onClick={handleCheckboxClick}
        checked={checked}
        readOnly
      />
    </div>
  );
};
