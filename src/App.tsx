import React from 'react';
import { Header } from './components/header/Header';
import { DataItem } from './types';
import { Main } from './components/main/Main';
import { Footer } from './components/footer/Footer';

type DataState = {
  items: DataItem[];
};

export class App extends React.Component<object, DataState> {
  constructor(props: object) {
    super(props);
    this.state = { items: [] };
  }

  setDataItems = (data: DataItem[]) => {
    this.setState({ items: data });
  };

  render() {
    const { items } = this.state;
    return (
      <>
        <Header setItems={this.setDataItems} />
        <Main data={items} />
        <Footer />
      </>
    );
  }
}
