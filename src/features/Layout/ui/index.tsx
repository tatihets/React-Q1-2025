import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import CharacterList from '../../../entities/character-list';
import { Character } from '../../../entities/character-card/model';

interface LayoutProps {
  characters: Character[];
}

export const Layout = ({ characters }: LayoutProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const selectedCharacterId = params.id;

  const onLayoutClick = () => {
    if (selectedCharacterId) {
      navigate(`/?page=${searchParams.get('page')}`);
    }
  };

  return (
    <div className="layout">
      <div
        className="left-section"
        onClick={onLayoutClick}
        data-testid="layout"
      >
        <CharacterList characters={characters} />
      </div>
      <div className={`right-section ${selectedCharacterId && 'open'}`}>
        <Outlet />
      </div>
    </div>
  );
};
