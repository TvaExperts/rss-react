import { Component } from 'react';

export class ErrorComponent extends Component {
  render() {
    throw new Error('Это ошибка в дочернем компоненте');
    return <p>ErrorComponent</p>;
  }
}
