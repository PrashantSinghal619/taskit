import React, { Component } from "react";
import { connect } from "react-redux";
import { addTask, editTask, deleteTask, hideModal } from "../actions";
import { Modal, Header, Button } from "semantic-ui-react";
import _ from "lodash";
import { PropTypes } from "prop-types";
import { store } from "../index.js";

class ModalWrapper extends Component {
  componentDidMount() {
    console.log("modal actionType: ", this.props);
    console.log("store: ", store.getState());
  }
  componentDidUpdate() {
    console.log("modal actionType: ", this.props);
    console.log("store: ", store.getState());
  }
  title =
    this.props.actionType === "add"
      ? "Add Task"
      : this.props.actionType === "edit"
      ? "Edit Task"
      : "Delete Task";

  buttonText =
    this.props.actionType === "add"
      ? "Create"
      : this.props.actionType === "edit"
      ? "Update"
      : "Delete";

  options = [
    { key: "1", text: "John", value: "john" },
    { key: "2", text: "Bill", value: "bill" },
    { key: "3", text: "Donna", value: "donna" },
  ];

  inputRef = null;
  assigneeInputRef = null;

  handleSubmit(e) {
    e.preventDefault();

    if (this.props.actionType === "delete") {
      this.props.dispatch(deleteTask(this.props.itemId));
    } else if (this.props.actionType === "add") {
      this.props.dispatch(
        addTask(this.inputRef.value, this.assigneeInputRef.value)
      );
    } else if (this.props.actionType === "edit") {
      this.props.dispatch(
        editTask(
          this.props.itemId,
          this.inputRef.value,
          this.assigneeInputRef.value
        )
      );
    }

    this.props.dispatch(hideModal());
  }

  render() {
    return (
      <div className="ModalWrapper">
        <Modal
          open={this.props.showModal}
          onClose={() => this.props.dispatch(this.hideModal())}
        >
          <Modal.Content>
            <Modal.Description>
              <Header as="h5">{this.title}</Header>
              {this.props.actionType === "delete" && (
                <p>Do you want to delete this Task</p>
              )}
              {this.props.actionType !== "delete" && (
                <div>
                  <label htmlFor="task-textarea">Task</label>
                  <textarea
                    id="task-textarea"
                    placeholder="Enter task details"
                    ref={(node) => (this.inputRef = node)}
                    defaultValue={this.props.currentTaskText}
                    required
                  />
                  <label htmlFor="assignee-select">Assign To</label>
                  <select
                    name="assignee"
                    id="assignee-select"
                    defaultValue={this.props.currentTaskAssignee}
                    ref={(node) => (this.assigneeInputRef = node)}
                    placeholder="Assignee"
                  >
                    {_.map(this.options, (option) => (
                      <option key={option.key} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <span onClick={() => this.props.dispatch(hideModal())}>Cancel</span>
            <Button primary onClick={(e) => this.handleSubmit(e)}>
              {this.buttonText}
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let currentTaskText = "",
    currentTaskAssignee = "";

  if (state.modal.itemId) {
    const taskIndex = _.findIndex(state.tasks, state.modal.itemId);
    const task = state.tasks[taskIndex];
    currentTaskText = task.text;
    currentTaskAssignee = task.assignee;
  }

  return {
    showModal: state.modal.showModal,
    actionType: state.modal.actionType,
    itemId: state.modal.itemId,
    currentTaskText: currentTaskText,
    currentTaskAssignee: currentTaskAssignee,
  };
};

ModalWrapper.propTypes = {
  showModal: PropTypes.bool.isRequired,
  actionType: PropTypes.string.isRequired,
  itemId: PropTypes.string,
  currentTaskText: PropTypes.string,
  currentTaskAssignee: PropTypes.string,
};

export default connect(mapStateToProps)(ModalWrapper);
