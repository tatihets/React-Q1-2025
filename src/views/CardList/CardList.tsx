import { PureComponent } from 'react';

import Card from '../../components/Card';
import './styles.scss';

interface CardListProps {
  items: { title: string; opening_crawl: string }[];
}

class CardList extends PureComponent<CardListProps> {
  render() {
    const { items } = this.props;
    console.log('ITEMS', items);
    return (
      <div className="results">
        {items.length ? (
          <p>No results found.</p>
        ) : (
          items.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              opening_crawl={item.opening_crawl}
            />
          ))
        )}
      </div>
    );
  }
}
export default CardList;
