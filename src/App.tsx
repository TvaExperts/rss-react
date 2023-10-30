import React from 'react';
import { Header } from './components/header/Header';
import { ShowData } from './types';
import { Main } from './components/main/Main';

type DataState = {
  items: ShowData[];
  isLoading: boolean;
};

export class App extends React.Component<object, DataState> {
  constructor(props: object) {
    super(props);
    this.state = { items: [], isLoading: false };
  }

  setIsLoading = (isLoading: boolean) => {
    this.setState(() => ({ isLoading }));
  };

  setDataItems = (data: ShowData[]) => {
    this.setState(() => ({ items: data }));
  };

  render() {
    const { items, isLoading } = this.state;
    return (
      <>
        <Header
          setItems={this.setDataItems}
          setIsLoading={this.setIsLoading}
          isLoading={isLoading}
        />
        <Main data={items} isLoading={isLoading} />
      </>
    );
  }
}
