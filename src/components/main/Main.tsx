import React from 'react';
import { ShowData } from '../../types';
import { Card } from '../card/Card';

type MainProps = {
  data: ShowData[];
};

export class Main extends React.Component<MainProps> {
  render() {
    const { data } = this.props;
    return (
      <main>
        {data.map((item) => {
          return <Card showData={item} key={item.id} />;
        })}
      </main>
    );
  }
}
