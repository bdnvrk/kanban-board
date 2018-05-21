import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { 
  addNewTask, 
  editList, 
  removeListWithTasks, 
  removeSingleTask,
  moveTask,
} from '../../actions';
import List from '../List';

class Board extends Component {
  render () {
    const { lists } = this.props;
    const listsNumber = lists.length;
    return (
      <div className="container">
        <div className="row">
          {lists.map((list, index) => {
            return (
              <List 
                addNewTask={this.props.addNewTask} 
                editList={this.props.editList} 
                removeListWithTasks={this.props.removeListWithTasks}
                removeSingleTask={this.props.removeSingleTask}
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
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  lists: state.lists,
});

const mapDispatchToProps = {
  addNewTask,
  editList,
  removeListWithTasks,
  removeSingleTask,
  moveTask,
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Board);

export default DragDropContext(HTML5Backend)(ConnectedComponent);
