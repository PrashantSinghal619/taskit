import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Item, Button, Icon } from "semantic-ui-react";
import { showOptions, hideOptions } from "../actions";
import Options from "./Options";
import "./TaskItem.scss";

const TaskItem = ({ task, displayOptions, dispatch }) => {
  function handleClick() {
    !displayOptions ? dispatch(showOptions(task.id)) : dispatch(hideOptions());
  }
  return (
    <Item className="task-item">
      <Item.Content>
        <Item.Header as="h3" className="task-text">
          {task.text}
        </Item.Header>
        <Item.Description className="task-assignee">
          {task.assignee}
        </Item.Description>
        <Item.Extra className="task-created-date">{task.id}</Item.Extra>
        <Item.Extra>
          <Button basic color="grey" onClick={() => handleClick()}>
            <Icon name="ellipsis vertical" />
          </Button>
          {displayOptions && <Options taskId={task.id} />}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

const mapStateToProps = (state) => {
  return {
    displayOptions: state.options.showOptions,
  };
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    assignee: PropTypes.string,
  }),
  displayOptions: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(TaskItem);
