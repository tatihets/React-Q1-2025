import { Fragment } from 'react';

import { Character } from '../../character-card/model';
import CharacterCard from '../../character-card';

import notFoundImg360 from '../../../assets/images/not-found-360.png';
import notFoundImg256 from '../../../assets/images/not-found-256.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { selectSelectedCharactersPerPage } from '../../../features/FlyoutButtons/selector';

type Characters = {
  characters: Character[];
};

export const CharacterList = ({ characters }: Characters) => {
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page');

  const charactersByPage = useSelector((state: RootState) =>
    selectSelectedCharactersPerPage(state, Number(page))
  );
  return (
    <Fragment>
      {characters.length ? (
        <div className="results">
          {characters.map(({ id, name, image }, index) => (
            <CharacterCard
              key={index}
              id={id}
              name={name}
              image={image}
              checked={charactersByPage.includes(+id)}
            />
          ))}
        </div>
      ) : (
        <picture>
          <source srcSet={notFoundImg360} media="(min-width: 768px)" />
          <source srcSet={notFoundImg256} media="(min-width: 540px)" />
          <img src={notFoundImg360} alt="Not found items" />
        </picture>
      )}
    </Fragment>
  );
};
