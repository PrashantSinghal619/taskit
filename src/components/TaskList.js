import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";
import TaskItem from "./TaskItem";
import _ from "lodash";
import "./TaskList.scss";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isListEmpty: true,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.props.tasks.length !== 0 && this.setState({ isListEmpty: false });
    }
  }

  render() {
    return (
      <div className="task-list">
        {this.state.isListEmpty && (
          <Header as="h2" className="empty-list-message">
            No task added
          </Header>
        )}
        {!this.state.isListEmpty &&
          _.map(this.props.tasks, (task, index) => (
            <TaskItem key={task.id} task={task} />
          ))}
      </div>
    );
  }
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      assignee: PropTypes.string.isRequired,
    })
  ),
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

export default connect(mapStateToProps)(TaskList);
