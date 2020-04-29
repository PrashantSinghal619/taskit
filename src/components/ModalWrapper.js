import React, { Component } from "react";
import { connect } from "react-redux";
import { addTask, editTask, deleteTask, hideModal } from "../actions";
import { Modal, Header, Button } from "semantic-ui-react";
import _ from "lodash";
import { PropTypes } from "prop-types";
import "./ModalWrapper.scss";

class ModalWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      buttonText: "",
      validationClass: "",
    };
    this.options = [
      { key: "1", text: "John", value: "john" },
      { key: "2", text: "Bill", value: "bill" },
      { key: "3", text: "Donna", value: "donna" },
    ];
  }

  inputRef = null; // To reference task input textarea
  assigneeInputRef = null; // To reference assignee select field

  UNSAFE_componentWillMount() {
    if (this.props.actionType) {
      this.setState({
        title:
          this.props.actionType === "add"
            ? "Add Task"
            : this.props.actionType === "edit"
            ? "Edit Task"
            : "Delete Task",
        buttonText:
          this.props.actionType === "add"
            ? "Create"
            : this.props.actionType === "edit"
            ? "Update"
            : "Delete",
      });
    }
  }

  componentDidMount() {
    // Focus textarea field by default
    !!this.inputRef && this.inputRef.focus();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.actionType !== this.props.actionType) {
      this.setState({
        title:
          this.props.actionType === "add"
            ? "Add Task"
            : this.props.actionType === "edit"
            ? "Edit Task"
            : "Delete Task",
        buttonText:
          this.props.actionType === "add"
            ? "Create"
            : this.props.actionType === "edit"
            ? "Update"
            : "Delete",
      });
    }
  }

  // Remove validation class on modal hide
  removeValidationClass() {
    this.setState((prevState) => ({ ...prevState, validationClass: "" }));
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.props.actionType === "delete") {
      this.props.dispatch(deleteTask(this.props.itemId));
    } else {
      // Text area validation against empty input
      if (!this.inputRef.value.trim()) {
        this.setState((prevState) => ({
          ...prevState,
          validationClass: "error",
        }));
        return;
      }

      if (this.props.actionType === "add") {
        this.props.dispatch(
          addTask(this.inputRef.value.trim(), this.assigneeInputRef.value)
        );
      } else if (this.props.actionType === "edit") {
        this.props.dispatch(
          editTask(
            this.props.itemId,
            this.inputRef.value.trim(),
            this.assigneeInputRef.value
          )
        );
      }
    }

    this.removeValidationClass();
    this.props.dispatch(hideModal());
  }

  render() {
    return (
      <div className="ModalWrapper">
        <Modal
          size="mini"
          closeOnEscape={false}
          closeOnDimmerClick={false}
          open={this.props.showModal}
          onClose={() =>
            this.props.dispatch(this.hideModal()) &&
            this.removeValidationClass()
          }
        >
          <Modal.Content>
            <Modal.Description>
              <Header as="h2">{this.state.title}</Header>
              {this.props.actionType === "delete" && (
                <p className="description">Do you want to delete this task?</p>
              )}
              {this.props.actionType !== "delete" && (
                <div className="field-group">
                  <div className="field-set">
                    <label htmlFor="task-textarea">Task</label>
                    <textarea
                      id="task-textarea"
                      placeholder="Enter task details"
                      ref={(node) => (this.inputRef = node)}
                      defaultValue={this.props.currentTaskText}
                      className={this.state.validationClass}
                    />
                  </div>
                  <div className="field-set">
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
                </div>
              )}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <span
              className="button flat"
              onClick={() => this.props.dispatch(hideModal())}
            >
              Cancel
            </span>
            <Button primary onClick={(e) => this.handleSubmit(e)}>
              {this.state.buttonText}
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
    const taskIndex = _.findIndex(state.tasks, ["id", state.modal.itemId]);
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
