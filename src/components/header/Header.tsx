import React from 'react';
import { DataItem } from '../../types';
import { getFromLSValue, setNewValueInLS } from '../../services/localStorage';
import { getDataFromApi } from '../../services/api';

type HeaderProps = {
  setItems: (data: DataItem[]) => void;
};

type HeaderState = {
  query: string;
};

export class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      query: getFromLSValue(),
    };
  }

  componentDidMount() {
    this.setState({
      query: getFromLSValue(),
    });
  }

  handleClickFind = async () => {
    const { query } = this.state;
    const { setItems } = this.props;
    setNewValueInLS(query);
    const data = await getDataFromApi(query);
    setItems(data);
  };

  render() {
    const { query } = this.state;

    return (
      <header>
        <input
          type="text"
          placeholder="Type query here"
          value={query}
          onChange={(e) => this.setState({ query: e.target.value })}
        />
        <button type="button" onClick={this.handleClickFind}>
          Find
        </button>
      </header>
    );
  }
}
