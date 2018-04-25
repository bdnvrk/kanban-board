import React from 'react';
import List from '../List';
import Header from '../Header';

const Board = () => (
  <div className="container">
    <Header />
    <div className="row">
      <List />
    </div>
  </div>
);

export default Board;