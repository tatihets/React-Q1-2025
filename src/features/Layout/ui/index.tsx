import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import CharacterList from '../../../entities/character-list';
import { Character } from '../../../entities/character-card/model';

import './index.css';

interface LayoutProps {
  characters: Character[];
  onCardClick: (id: number) => void;
}

export const Layout = ({ characters, onCardClick }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const selectedCharacterId = params.id;
  console.log('SELECTED', location);
  //   const selectedCharacterId = params.get('id');

  const onLayoutClick = () => {
    if (selectedCharacterId) {
      handleCloseDetailSection();
    }
  };

  const handleCloseDetailSection = () => {
    navigate(`/`);
  };

  return (
    <div className="layout">
      <div className="left-section" onClick={onLayoutClick}>
        <CharacterList characters={characters} onCardClick={onCardClick} />
      </div>
      <div className={`right-section ${selectedCharacterId && 'open'}`}>
        <Outlet />
      </div>
    </div>
  );
};
