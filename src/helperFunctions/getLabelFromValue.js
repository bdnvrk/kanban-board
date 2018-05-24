export default (value, items) => {
  const item = items.find(item => item.value === value);
  return item ? item.label : value;
};