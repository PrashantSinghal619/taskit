import moment from "moment";

/* Task actions */

export const addTask = (text, assignee) => ({
  type: "ADD_TASK",
  id: moment().format(),
  text,
  assignee,
});

export const editTask = (id, text, assignee) => ({
  type: "EDIT_TASK",
  id,
  text,
  assignee,
});

export const deleteTask = (id) => ({
  type: "DELETE_TASK",
  id,
});

/* Modal actions */

export const showModal = (actionType, itemId) => ({
  type: "SHOW_MODAL",
  showModal: true,
  actionType, // Type of task operation
  itemId, // Preserves the id of the item being edited while modal is open
});

export const hideModal = () => ({
  type: "HIDE_MODAL",
  showModal: false,
});

export const showOptions = (itemId) => ({
  type: "SHOW_OPTIONS",
  showOptions: true,
  itemId,
});

export const hideOptions = () => ({
  type: "HIDE_OPTIONS",
  showOptions: false,
});
