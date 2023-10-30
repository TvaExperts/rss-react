import React, { ChangeEvent } from 'react';
import styles from './Header.module.css';
import { ShowData, TEXTS } from '../../types';
import { getQueryFromLS, saveNewQueryInLS } from '../../utils/localStorage';
import { getDataFromApi } from '../../services/api';

type HeaderProps = {
  setItems: (data: ShowData[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
};

type HeaderState = {
  query: string;
  hasError: boolean;
};

export class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      query: '',
      hasError: false,
    };
  }

  componentDidMount() {
    const queryInLS = getQueryFromLS();
    this.setState({
      query: queryInLS,
    });
    this.getData(queryInLS);
  }

  handleClickFind = async () => {
    const { query } = this.state;
    const queryInLS = getQueryFromLS();
    const trimmedQuery = query.trim();
    if (queryInLS !== trimmedQuery) {
      this.getData(trimmedQuery);
    }
  };

  handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleClickError = () => {
    this.setState({ hasError: true });
  };

  getData(query: string) {
    const { setItems, setIsLoading } = this.props;
    setIsLoading(true);
    saveNewQueryInLS(query);
    getDataFromApi(query).then((data) => {
      setItems(data);
      setIsLoading(false);
    });
  }

  render() {
    const { query, hasError } = this.state;
    const { isLoading } = this.props;

    if (hasError) throw new Error(TEXTS.ERROR_TEXT);

    return (
      <header className={styles.header}>
        <input
          type="text"
          className={styles.findInput}
          placeholder={TEXTS.INPUT_PLACEHOLDER}
          value={query}
          onChange={this.handleQueryChange}
        />
        <button
          type="button"
          onClick={this.handleClickFind}
          disabled={isLoading}
        >
          {isLoading ? TEXTS.BUTTON_FIND_LOADING : TEXTS.BUTTON_FIND}
        </button>

        <button type="button" onClick={this.handleClickError}>
          {TEXTS.BUTTON_ERROR}
        </button>
      </header>
    );
  }
}
