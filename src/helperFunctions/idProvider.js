function idProvider(initialValue, prefix) {
  let i = initialValue;
  return function() {
    i++;
    return `${prefix}_${i}`
  }
};

function initializeIdProviders (values) {
  if (!values) {
    window.getListId = idProvider(0, 'list');
    window.getTaskId = idProvider(0, 'task');
    return;
  }

  const { lists, tasks } = values;

  if (!lists) {
    window.getListId = idProvider(0, 'list');
  } else {
    const lastListId = lists.pop().id;
    const initialListId = parseInt(lastListId.slice(-1), 10);
    window.getListId = idProvider(initialListId, 'list');
  }

  if (!tasks) {
    window.getTaskId = idProvider(0, 'task');
  } else {
    const lastTaskId = Object.keys(tasks).sort().pop();
    const initialTaskId = parseInt(lastTaskId.slice(-1), 10);
    window.getTaskId = idProvider(initialTaskId, 'task');
  }
}

export default initializeIdProviders;