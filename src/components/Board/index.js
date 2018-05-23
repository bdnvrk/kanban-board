import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import List from '../List';
import Filters from '../Filters';
import { 
  addNewTask,
  combineAddTask, 
  editList, 
  removeListWithTasks, 
  combineRemoveSingleTask,
  getDataFromDb,
  editTask,
  moveTask,
} from '../../actions';
import './style.css';

class Board extends Component {
  componentDidMount() {
    const { getDataFromDb } = this.props;
    getDataFromDb();
  }
  render() {
    const { lists } = this.props;
    const listsNumber = lists.length;
    return (
      <div className="board">
        {lists.map((list, index) => {
          return (
            <List
              combineAddTask={this.props.combineAddTask} 
              addNewTask={this.props.addNewTask} 
              editList={this.props.editList}
              editTask={this.props.editTask}
              removeListWithTasks={this.props.removeListWithTasks}
              combineRemoveSingleTask={this.props.combineRemoveSingleTask}
              key={list.id} 
              id={list.id} 
              name={list.name} 
              order={index} 
              listsNumber={listsNumber}
              tasks={list.tasks} 
              lists={lists}
              moveTask={this.props.moveTask}
            />
          );
        })}   
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  lists: state.lists,
});

const mapDispatchToProps = {
  combineAddTask,
  addNewTask,
  editList,
  removeListWithTasks,
  editTask,
  combineRemoveSingleTask,
  getDataFromDb,
  moveTask,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Board);

export default DragDropContext(HTML5Backend)(ConnectedComponent);
