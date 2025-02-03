import React, { Component } from 'react';

interface SearchProps {
  onSearch: (term: string) => void;
}

class Search extends Component<SearchProps> {
  state = {
    searchTerm: localStorage.getItem('searchTerm') || '',
  };

  componentDidMount(): void {
    this.props.onSearch(this.state.searchTerm);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('TARGET VALUE');
    this.setState({ searchTerm: e.target.value });
  };

  handleSearch = () => {
    const searchTerm = this.state.searchTerm.trim();
    localStorage.setItem('searchTerm', searchTerm);
    this.props.onSearch(searchTerm);
  };

  render() {
    return (
      <div className="search">
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleChange}
          placeholder="Search..."
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default Search;
