import { PureComponent } from 'react';

import './styles.scss';

interface CardProps {
  title: string;
  opening_crawl: string;
}

class Card extends PureComponent<CardProps> {
  render() {
    const { title, opening_crawl } = this.props;
    return (
      <div className="card">
        <h3>{title}</h3>
        <p>{opening_crawl}</p>
      </div>
    );
  }
}
export default Card;
