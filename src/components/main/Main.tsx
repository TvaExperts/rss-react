import React from 'react';
import { DataItem } from '../../types';
import { Card } from '../card/Card';

type MainProps = {
  data: DataItem[];
};

export class Main extends React.Component<MainProps> {
  render() {
    const { data } = this.props;
    return (
      <main>
        {data.map((item) => {
          return <Card dataItem={item} key={item.name} />;
        })}
      </main>
    );
  }
}
