import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '../List';
import { 
  addNewTask,
  combineAddTask, 
  editList, 
  removeListWithTasks, 
  combineRemoveSingleTask,
  getDataFromDb,
  editTask,
} from '../../actions';

class Board extends Component {
  componentDidMount() {
    const { getDataFromDb } = this.props;
    getDataFromDb();
  }
  render() {
    const {
      addNewTask,
      combineAddTask, 
      editList,
      lists,  
      removeListWithTasks, 
      combineRemoveSingleTask,
      editTask,
    } = this.props;
    const listsNumber = lists.length;
    return (
      <div className="container">
        <div className="row">
          {lists.map((list, index) => {
            return (
              <List
                combineAddTask={combineAddTask} 
                addNewTask={addNewTask} 
                editList={editList}
                editTask={editTask}
                removeListWithTasks={removeListWithTasks}
                combineRemoveSingleTask={combineRemoveSingleTask}
                key={list.id} 
                id={list.id} 
                name={list.name} 
                order={index} 
                listsNumber={listsNumber}
                tasks={list.tasks} 
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
  combineAddTask,
  addNewTask,
  editList,
  removeListWithTasks,
  editTask,
  combineRemoveSingleTask,
  getDataFromDb,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
