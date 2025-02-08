import { PureComponent } from 'react';

import { Character } from '../model';

import './index.css';

class CharacterCard extends PureComponent<Character> {
  render() {
    const { name, status, image } = this.props;
    return (
      <div className="card">
        <img src={image} alt="card image" />
        <div>
          <h3>{name}</h3>
          <p>Status: {status}</p>
        </div>
      </div>
    );
  }
}
export default CharacterCard;
