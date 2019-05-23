import React, { Component } from "react";
import axios from "axios";
import Image from "react-graceful-image";

export default class UserImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://insta.nextacademy.com/api/v1/images?userId=${
          this.props.user_id
        }`
      )
      .then(response => {
        // handle success
        console.log(response);
        this.setState({
          images: response.data
        });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  render() {
    const { images } = this.state;
    return (
      <>
        <div className="d-flex flex-row flex-wrap justify-content-flex-start align-items-flex-start">
          {images.map(image => (
            <Image
              src={image}
              width="280px"
              height="280px"
              style={{
                objectFit: "cover",
                paddingLeft: "10px",
                paddingRight: "10px",
                marginBottom: "8px"
              }}
            />
          ))}
        </div>
      </>
    );
  }
}
