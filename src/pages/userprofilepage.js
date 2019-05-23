import React from "react";
import { Container, Row, Col } from "reactstrap";
import Image from "react-graceful-image";
import UserImages from "../components/userimages";
import axios from "axios";
import NavBar from "../container/NavBar";
class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.props;

    return (
      <>
        <NavBar />
        <Container fluid>
          <Row mb="5">
            <Col sm="3">
              <div>
                <Image
                  style={{
                    border: "2px solid white",
                    width: "100%"
                  }}
                  src={user.profileImage}
                  alt=""
                />
              </div>
            </Col>
            <Col-6>
              <h2>@{user.username}</h2>
            </Col-6>
            <Col sm="3">
              <div />
            </Col>
          </Row>
          <Row className="justify-content-center mt-5">
            <Col md="10" className="d-flex justify-content-center flex-wrap">
              <UserImages user_id={user.id} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default UserProfilePage;
