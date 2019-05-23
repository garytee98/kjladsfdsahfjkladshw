import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";
import Loginmodal from "./Loginmodal";
import Signupmodal from "./Signupmodal";
import UserProfilePage from "../pages/userprofilepage";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      loginmodal: false,
      signupmodal: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  loginmodaltoggle = () => {
    this.setState(prevState => ({
      signupmodal: false,
      loginmodal: !prevState.loginmodal
    }));
  };
  signupmodaltoggle = () => {
    this.setState(prevState => ({
      loginmodal: false,
      signupmodal: !prevState.signupmodal
    }));
  };
  handleLogout = () => {
    localStorage.removeItem("JWT");
    localStorage.removeItem("current_user");
    this.forceUpdate();
  };
  render() {
    console.log(localStorage.current_user);

    return (
      <>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  GitHub
                </NavLink>
              </NavItem>
              <NavItem>
                {localStorage.JWT ? null : (
                  <Button color="danger" onClick={this.loginmodaltoggle}>
                    Login
                  </Button>
                )}
              </NavItem>
              <NavItem>
                {localStorage.JWT ? null : (
                  <Button color="danger" onClick={this.signupmodaltoggle}>
                    Sign Up
                  </Button>
                )}
              </NavItem>
              <NavItem>
                {localStorage.JWT ? (
                  <Button onClick={this.handleLogout} href="/">
                    Logout
                  </Button>
                ) : null}
              </NavItem>
              <NavItem>
                {localStorage.JWT ? (
                  <Button>
                    <a
                      href={`/user/${JSON.parse(localStorage.current_user).id}`}
                    >
                      My profile
                    </a>
                  </Button>
                ) : null}
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <Loginmodal
          loginmodaltoggle={this.loginmodaltoggle}
          loginmodal={this.state.loginmodal}
          signupmodaltoggle={this.signupmodaltoggle}
        />
        <Signupmodal
          signupmodaltoggle={this.signupmodaltoggle}
          signupmodal={this.state.signupmodal}
          loginmodaltoggle={this.loginmodaltoggle}
        />
      </>
    );
  }
}
