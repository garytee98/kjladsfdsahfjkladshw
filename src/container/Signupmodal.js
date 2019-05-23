import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import * as EmailValidator from "email-validator";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Signupmodal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: ""
    };
  }

  handleUsername = event => {
    this.setState({
      username: event.target.value
    });
  };

  handleEmail = event => {
    this.setState({
      email: event.target.value
    });
  };

  handlePassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (EmailValidator.validate(this.state.email)) {
      axios({
        method: "post",
        url: "https://insta.nextacademy.com/api/v1/users/",
        header: { "Content-Type": "application/json" },
        data: {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        }
      }).then(response => {
        let user = JSON.stringify(response.data.user);
        localStorage.setItem("JWT", response.data.auth_token);
        localStorage.setItem("current_user", user);
        this.props.signupmodaltoggle();
        this.props.history.push(
          `/user/${JSON.parse(localStorage.current_user).id}`
        );
      });
    }
  };

  render() {
    const { signupmodal, signupmodaltoggle, loginmodaltoggle } = this.props;
    const { password, email, username } = this.state;
    return (
      <div>
        <Modal
          isOpen={signupmodal}
          toggle={signupmodaltoggle}
          className={this.props.className}
        >
          <ModalHeader toggle={signupmodaltoggle}>Sign up</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  onChange={this.handleEmail}
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@email.com"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleUserName">User Name</Label>
                <Input
                  onChange={this.handleUsername}
                  value={username}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  onChange={this.handlePassword}
                  value={password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={loginmodaltoggle}>
              Login
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Signupmodal);
