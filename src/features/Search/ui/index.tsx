import { Component } from 'react';

import Button from '../../../shared/ui/Button';

import './index.css';

interface SearchProps {
  searchTerm: string;
  onSearch: () => void;
  onSearchTermChange: (term: string) => void;
}

class Search extends Component<SearchProps> {
  render() {
    return (
      <div className="search">
        <input
          type="text"
          value={this.props.searchTerm}
          onChange={(event) =>
            this.props.onSearchTermChange(event.target.value)
          }
          placeholder="Search..."
        />
        <Button onClick={this.props.onSearch} buttonContent="Search" />
      </div>
    );
  }
}

export default Search;
