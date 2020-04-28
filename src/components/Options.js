import React from "react";
import { connect } from "react-redux";
import { List } from "semantic-ui-react";
import { showModal, hideOptions } from "../actions";
import { PropTypes } from "prop-types";

const Options = ({ taskId, dispatch }) => {
  function handleEdit() {
    dispatch(showModal("edit", taskId));
    dispatch(hideOptions());
  }

  function handleDelete() {
    dispatch(showModal("delete", taskId));
    dispatch(hideOptions());
  }

  return (
    <List>
      <List.Item onClick={() => handleEdit()}>Edit Task</List.Item>
      <List.Item onClick={() => handleDelete()}>Delete Task</List.Item>
    </List>
  );
};

Options.propTypes = {
  taskId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    taskId: state.options.itemId,
  };
};

export default connect(mapStateToProps)(Options);
