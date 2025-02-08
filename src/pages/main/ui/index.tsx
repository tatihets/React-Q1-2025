import { Component } from 'react';

import CharacterList from '../../../entities/character-list';
import { Character } from '../../../entities/character-card/model';
import Search from '../../../features/Search';
import { Spinner, Button } from '../../../shared/ui';

import { fetchCharacters } from '../../../shared/api/characters-list';
import { getFromLC, setToLC } from '../../../shared/utils/local-storage';

import notFoundImg360 from '../../../assets/images/not-found-360.png';
import notFoundImg256 from '../../../assets/images/not-found-256.png';

import './index.css';

interface MainState {
  searchTerm: string;
  items: Character[];
  loading: boolean;
  error: string | null;
}

class Main extends Component<object, MainState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: getFromLC('searchTerm'),
      items: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount(): void {
    this.fetchData();
  }

  handleSearchTermChange = (value: string) => {
    this.setState({ searchTerm: value });
  };

  private fetchData = async () => {
    this.setState({ loading: true });
    setToLC('searchTerm', this.state.searchTerm);
    try {
      const response = await fetchCharacters(this.state.searchTerm);
      this.setState({
        items: response,
        loading: false,
        error: null,
      });
    } catch (error: unknown) {
      const { message } = error as Record<string, string>;
      this.setState({ loading: false, error: message });
    }
  };

  private triggerError = () => {
    this.setState({
      error: 'Test Error Boundary',
    });
  };

  render() {
    const { loading, items, error } = this.state;
    if (error) {
      throw new Error(error);
    }
    return (
      <section className="main">
        <Search
          searchTerm={this.state.searchTerm}
          onSearch={this.fetchData}
          onSearchTermChange={this.handleSearchTermChange}
        />
        <Button onClick={this.triggerError} buttonContent="Trigger Error" />
        <div className="search-content">
          {loading && <Spinner />}
          {!loading &&
            !error &&
            (items.length ? (
              <CharacterList characters={items} />
            ) : (
              <picture>
                <source srcSet={notFoundImg360} media="(min-width: 768px)" />
                <source srcSet={notFoundImg256} media="(min-width: 540px)" />
                <img src={notFoundImg360} alt="Not found items" />
              </picture>
            ))}
        </div>
      </section>
    );
  }
}
export default Main;
