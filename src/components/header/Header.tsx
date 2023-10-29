import React, { ChangeEvent } from 'react';
import styles from './Header.module.css';
import { ShowData, TEXTS } from '../../types';
import { getQueryFromLS, saveNewQueryInLS } from '../../services/localStorage';
import { getDataFromApi } from '../../services/api';
import { ErrorComponent } from '../ErorrComponent';

type HeaderProps = {
  setItems: (data: ShowData[]) => void;
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
  }

  handleClickFind = async () => {
    const { query } = this.state;
    const { setItems } = this.props;
    const queryInLS = getQueryFromLS();
    if (queryInLS === query.trim()) return;
    saveNewQueryInLS(query);
    const data = await getDataFromApi(query);
    setItems(data);
  };

  handleQueryChange(event: ChangeEvent<HTMLInputElement>): void {
    this.setState((prevState) => ({ ...prevState, query: event.target.value }));
  }

  handleClickError = (): void => {
    this.setState((prevState) => ({ ...prevState, hasError: true }));
  };

  render() {
    const { query, hasError } = this.state;

    return (
      <header className={styles.header}>
        {hasError && <ErrorComponent />}
        <input
          type="text"
          className={styles.findInput}
          placeholder={TEXTS.INPUT_PLACEHOLDER}
          value={query}
          onChange={(e) => this.handleQueryChange(e)}
        />
        <button type="button" onClick={this.handleClickFind}>
          {TEXTS.BUTTON_FIND}
        </button>

        <button type="button" onClick={this.handleClickError}>
          {TEXTS.BUTTON_ERROR}
        </button>
      </header>
    );
  }
}
