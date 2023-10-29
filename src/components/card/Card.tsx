import React from 'react';
import { ShowData } from '../../types';
import styles from './Card.module.css';

type CardProps = {
  showData: ShowData;
};
function stripHTMLTags(text: string) {
  return text.replace(/<[^>]*>/g, '');
}

export class Card extends React.Component<CardProps> {
  render() {
    const { showData } = this.props;

    const shortDescription =
      showData.description && stripHTMLTags(showData.description).slice(0, 50);
    return (
      <div className={styles.block}>
        <span className={styles.title}>{showData.title} </span>
        {shortDescription ? <span> {shortDescription}...</span> : ''}
      </div>
    );
  }
}
