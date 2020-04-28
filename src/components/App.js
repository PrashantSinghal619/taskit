import React from "react";
import { connect } from "react-redux";
import "./App.scss";
import TaskListHeader from "./TaskListHeader";
import { Grid } from "semantic-ui-react";
import TaskList from "./TaskList";
import ModalWrapper from "./ModalWrapper";

// The top-level Taskit application component
function App() {
  return (
    <div className="App">
      <Grid>
        <Grid.Column mobile={16} computer={4}></Grid.Column>
        <Grid.Column mobile={16} computer={8}>
          <div className="tasks-wrapper">
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <TaskListHeader />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <TaskList />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <ModalWrapper />
          </div>
        </Grid.Column>
        <Grid.Column mobile={16} computer={4}></Grid.Column>
      </Grid>
    </div>
  );
}

export default connect()(App);
