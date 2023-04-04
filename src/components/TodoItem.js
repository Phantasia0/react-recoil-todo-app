import React from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "../todoAtom";

const TodoItem = ({ item }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const idx = todoList.findIndex((todo) => todo === item);

  const editItemText = ({ target: { value } }) => {
    const newList = replaceItemAtIndex(todoList, idx, { ...item, text: value });
    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, idx, { ...item, isComplete: !item.isComplete });
    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, idx);
    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input type="checkbox" checked={item.isComplete} onChange={toggleItemCompletion} />
      <button onClick={deleteItem}>X</button>
    </div>
  );
};

export default TodoItem;

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), { ...newValue }, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
