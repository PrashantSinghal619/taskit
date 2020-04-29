import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Item, Button, Image } from "semantic-ui-react";
import { showOptions, hideOptions } from "../actions";
import Options from "./Options";
import "./TaskItem.scss";
import moment from "moment";
import more from "../images/More.svg";

const TaskItem = ({ task, displayOptions, optionsTaskId, dispatch }) => {
  function handleClick() {
    !displayOptions ? dispatch(showOptions(task.id)) : dispatch(hideOptions());
  }

  // Extract date and time of task creation from task id
  const dateCreated = moment(task.id).format("DD MMM YYYY, hh:mm a");

  return (
    <Item className="task-item">
      <Item.Content>
        <Item.Header as="h3" className="task-text">
          {task.text}
        </Item.Header>
        <Item.Description className="task-assignee">
          {task.assignee}
        </Item.Description>
        <Item.Extra className="task-created-date">{dateCreated}</Item.Extra>
        <Item.Extra>
          <Button basic color="grey" onClick={() => handleClick()}>
            <Image src={more} size="mini" />
          </Button>
          {displayOptions && optionsTaskId === task.id && (
            <Options key={task.id} />
          )}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

const mapStateToProps = (state) => {
  return {
    displayOptions: state.options.showOptions,
    optionsTaskId: state.options.itemId,
  };
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    assignee: PropTypes.string,
  }),
  displayOptions: PropTypes.bool.isRequired,
  optionsTaskId: PropTypes.string,
};

export default connect(mapStateToProps)(TaskItem);
