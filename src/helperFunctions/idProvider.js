function idProvider(initialValue, prefix) {
  let i = initialValue;
  return function() {
    i++;
    return `${prefix}_${i}`
  }
};

function initializeIdProviders (values) {
  const { lists, tasks } = values;

  const lastListId = lists.pop().id;
  const initialListId = parseInt(lastListId.slice(-1), 10);

  const lastTaskId = Object.keys(tasks).sort().pop();
  const initialTaskId = parseInt(lastTaskId.slice(-1), 10);
  
  window.getListId = idProvider(initialListId, 'list');
  window.getTaskId = idProvider(initialTaskId, 'task');
}

export default initializeIdProviders;