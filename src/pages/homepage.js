import React, { Component } from "react";
import UserImages from "../components/userimages";
import { Container, Row, Col } from "reactstrap";
import Image from "react-graceful-image";
import { Route, Link } from "react-router-dom";
import NavBar from "../container/NavBar";
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { users } = this.props;

    if (users) {
      return (
        <>
          <NavBar />
          <Container fluid>
            {users.map(user => (
              <Row
                key={user.id}
                style={{ backgroundColor: "#efefef", marginBottom: "25px" }}
              >
                <Col md="3">
                  <Link
                    style={{ display: "block", margin: "auto" }}
                    to={`/user/${user.id}`}
                  >
                    {user.username}
                  </Link>
                  <Image
                    src={user.profileImage}
                    width="150px"
                    alt=""
                    style={{
                      borderRadius: "50%",
                      border: "2px solid white",
                      margin: "auto"
                    }}
                  />
                </Col>
                <Col md="9">
                  <UserImages user_id={user.id} />
                </Col>
              </Row>
            ))}
          </Container>
        </>
      );
      return (
        <>
          <h2>Loading...</h2>
        </>
      );
    }
  }
}
