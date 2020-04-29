import _ from "lodash";

const tasks = (state = [], action) => {
  let tasks = [...state];
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          assignee: action.assignee,
        },
      ];

    case "EDIT_TASK":
      const taskIndex = _.findIndex(tasks, ["id", action.id]);
      tasks[taskIndex] = { ...tasks[taskIndex], text: action.text };
      if (tasks[taskIndex].assignee !== action.assignee) {
        tasks[taskIndex].assignee = action.assignee;
      }
      return tasks;

    case "DELETE_TASK":
      _.remove(tasks, ["id", action.id]);
      return tasks;
    default:
      return state;
  }
};

export default tasks;
