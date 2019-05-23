import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Switch, Route, Link } from "react-router-dom";
import HomePage from "./pages/homepage";
import UserProfilePage from "./pages/userprofilepage";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true
    };
  }

  componentDidMount() {
    axios
      .get("https://insta.nextacademy.com/api/v1/users")
      .then(response => {
        console.log(response);

        // handle success
        this.setState({
          users: response.data,
          loading: false
        });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  render() {
    const { users } = this.state;
    return (
      <>
        {this.state.loading ? (
          <div
            style={{
              height: "100vh",
              width: "100vw",
              backgroundColor: "black"
            }}
          >
            <img
              style={{ height: "100%", display: "block", margin: "auto" }}
              src="https://2eu.funnyjunk.com/gifs/High+quality+gif_cc8a97_5077704.gif"
            />
          </div>
        ) : (
          <Switch>
            <Route
              exact
              path="/"
              render={props => <HomePage {...props} users={users} />}
            />
            <Route
              exact
              path="/user/:id"
              render={props => (
                <UserProfilePage
                  {...props}
                  user={users.find(
                    u => u.id === parseInt(props.match.params.id)
                  )}
                />
              )}
            />
          </Switch>
        )}
      </>
    );
  }
}
