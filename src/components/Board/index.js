import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  addNewTask,
  combineAddTask, 
  editList, 
  removeListWithTasks, 
  combineRemoveSingleTask,
  getDataFromDb 
} from '../../actions';
import List from '../List';

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
  combineRemoveSingleTask,
  getDataFromDb
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
