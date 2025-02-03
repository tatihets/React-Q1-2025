import { Component } from 'react';

import CardList from '../CardList';
import Search from '../Search';
import Spinner from '../../components/Spinner/Spinner';

import { fetchTasks } from '../../services/api';
import './styles.scss';

interface MainState {
  items: { title: string; opening_crawl: string }[];
  loading: boolean;
  error: string | null;
  hasError: boolean;
}
class Main extends Component<object, MainState> {
  constructor(props: object) {
    super(props);
    this.state = {
      items: [],
      loading: false,
      error: null,
      hasError: false,
    };
  }

  handleSearch = async (searchTerm: string) => {
    this.setState({ loading: true });
    await this.fetchData(searchTerm);
  };

  fetchData = async (searchTerm: string) => {
    this.setState({ loading: true });
    try {
      const response = await fetchTasks(searchTerm);
      console.log('RECEIVED RESPONSE', response);
      this.setState({
        items: response.results,
        loading: false,
        error: null,
        hasError: false,
      });
    } catch (error: unknown) {
      const { message } = error as Record<string, string>;
      this.setState({ loading: false, error: message, hasError: true });
    }
  };

  triggerError = () => {
    this.setState({
      hasError: true,
    });
  };

  render() {
    const { loading, items, error, hasError } = this.state;
    if (hasError) {
      throw new Error('Test Error Boundary');
    }
    return (
      <div className="main">
        <Search onSearch={this.handleSearch} />
        {loading && <Spinner />}
        {error && <div className="error-message">{error}</div>}
        {!loading && !error && <CardList items={items} />}
        <button onClick={this.triggerError}>Trigger Error</button>
      </div>
    );
  }
}
export default Main;
