const initialState = {
  showOptions: false,
  itemId: "",
};

const options = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_OPTIONS":
      return {
        ...state,
        showOptions: action.showOptions,
        itemId: action.itemId,
      };

    case "HIDE_OPTIONS":
      return {
        ...state,
        showOptions: action.showOptions,
      };

    default:
      return state;
  }
};

export default options;
