import React from 'react';
import { connect } from 'react-redux';
import { 
  addNewTask, 
  editList, 
  removeListWithTasks, 
  removeSingleTask,
  editTask,
} from '../../actions';
import List from '../List';

const Board = ({ 
  lists, 
  addNewTask, 
  editList, 
  removeListWithTasks, 
  removeSingleTask,
  editTask,
}) => {
  const listsNumber = lists.length;
  return (
    <div className="container">
      <div className="row">
        {lists.map((list, index) => {
          return (
            <List 
              addNewTask={addNewTask} 
              editList={editList}
              editTask={editTask}
              removeListWithTasks={removeListWithTasks}
              removeSingleTask={removeSingleTask}
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
};

const mapStateToProps = (state) => ({
  lists: state.lists,
});

const mapDispatchToProps = {
  addNewTask,
  editList,
  removeListWithTasks,
  removeSingleTask,
  editTask,
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
