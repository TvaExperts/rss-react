import React from 'react';
import { DataItem } from '../../types';

type CardProps = {
  dataItem: DataItem;
};

export class Card extends React.Component<CardProps> {
  render() {
    const { dataItem } = this.props;
    return (
      <div>
        {dataItem.name} {dataItem.age}
      </div>
    );
  }
}
