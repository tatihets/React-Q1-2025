import { PureComponent } from 'react';

import { Character } from '../../character-card/model';
import CharacterCard from '../../character-card';

import './index.css';

interface CharacterListProps {
  characters: Character[];
}

class CardList extends PureComponent<CharacterListProps> {
  render() {
    const { characters } = this.props;
    return (
      <div className="results">
        {characters.map((character, index) => (
          <CharacterCard
            key={index}
            name={character.name}
            image={character.image}
            status={character.status}
          />
        ))}
      </div>
    );
  }
}
export default CardList;
