import React from 'react';
import { connect } from 'react-redux';
import map from 'lodash/fp/map';
import { Button } from 'react-bootstrap';
import { addNewList } from '../../actions';
import List from '../List';
import Header from '../Header';

const Board = ({ lists, addNewList }) => {
  return (
    <div className="container">
      <Header />
      <Button bsStyle="primary" onClick={() => addNewList("placeholder")}>Dodaj nową listę</Button>
      <div className="row">
        {map(list => {
          return (
            <List key={list.id} name={list.name} />
          );
        })(lists)}   
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lists: state.lists,
});

const mapDispatchToProps = {
  addNewList,
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);