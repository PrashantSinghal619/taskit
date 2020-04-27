const initialState = {
  showModal: false,
  actionType: "",
  itemId: "",
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_MODAL":
      return {
        ...state,
        showModal: action.showModal,
        actionType: action.actionType,
        itemId: action.itemId,
      };

    case "HIDE_MODAL":
      return {
        ...state,
        showModal: action.showModal,
      };
    default:
      return state;
  }
};

export default modal;
