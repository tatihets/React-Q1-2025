import { Fragment } from 'react';

import { Character } from '../../character-card/model';
import CharacterCard from '../../character-card';

import notFoundImg360 from '../../../assets/images/not-found-360.png';
import notFoundImg256 from '../../../assets/images/not-found-256.png';

import './index.css';

type Characters = {
  characters: Character[];
  onCardClick: (id: number) => void;
};

export const CharacterList = ({ characters, onCardClick }: Characters) => (
  <Fragment>
    {characters.length ? (
      <div className="results">
        {characters.map(({ id, name, image }, index) => (
          <CharacterCard
            key={index}
            id={id}
            name={name}
            image={image}
            onCardClick={onCardClick}
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
