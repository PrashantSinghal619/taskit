import React from "react";
import { connect } from "react-redux";
import { Header, Button } from "semantic-ui-react";
import { showModal } from "../actions";

const TaskListHeader = ({ dispatch }) => {
  return (
    <div className="task-list-header">
      <Header as="h1" floated="left">
        Task list
      </Header>
      <Button
        basic
        color="blue"
        floated="right"
        onClick={() => dispatch(showModal())}
      >
        New task
      </Button>
    </div>
  );
};

export default connect()(TaskListHeader);
