import React from 'react';
import { connect } from 'react-redux';
import map from 'lodash/fp/map';
import List from '../List';
import Header from '../Header';

const Board = ({ lists }) => (
  <div className="container">
    <Header />
    <div className="row">
      {map(list => {
        return (
          <List key={list.id} name={list.name} />
        );
      })(lists)}   
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  lists: state.lists,
});

export default connect(mapStateToProps)(Board);