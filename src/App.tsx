import React from 'react';
import { Header } from './components/header/Header';
import { ShowData } from './types';
import { Main } from './components/main/Main';

type DataState = {
  items: ShowData[];
};

export class App extends React.Component<object, DataState> {
  constructor(props: object) {
    super(props);
    this.state = { items: [] };
  }

  setDataItems = (data: ShowData[]) => {
    this.setState({ items: data });
  };

  render() {
    const { items } = this.state;
    return (
      <>
        <Header setItems={this.setDataItems} />
        <Main data={items} />
      </>
    );
  }
}
