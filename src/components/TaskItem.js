import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Item, Button, Icon } from "semantic-ui-react";
import { showOptions } from "../actions";

const TaskItem = ({ task, dispatch }) => {
  return (
    <Item>
      <Item.Content>
        <Item.Header as="h6" className="task-text">
          {task.text}
        </Item.Header>
        <Item.Description className="task-assignee">
          {task.assignee}
        </Item.Description>
        <Item.Extra className="task-created-date">{task.id}</Item.Extra>
        <Item.Extra>
          <Button basic color="grey">
            <Icon
              name="ellipsis vertical"
              onClick={() => dispatch(showOptions(task.id))}
            />
          </Button>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    assignee: PropTypes.string.isRequired,
  }),
};

export default connect()(TaskItem);
