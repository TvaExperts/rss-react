import React from 'react';
import { ShowData, TEXTS } from '../../types';
import { Card } from '../card/Card';

type MainProps = {
  data: ShowData[];
  isLoading: boolean;
};

export class Main extends React.Component<MainProps> {
  render() {
    const { data, isLoading } = this.props;
    if (isLoading) {
      return <main>{TEXTS.MAIN_LOADING}</main>;
    }
    return (
      <main>
        {data.length ? (
          data.map((item) => {
            return <Card showData={item} key={item.id} />;
          })
        ) : (
          <p>{TEXTS.NOT_FOUND}</p>
        )}
      </main>
    );
  }
}
