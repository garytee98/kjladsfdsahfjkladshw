import react from "react"
import Axios from "axios";

componentDidMount() {

    Axios.get("https://insta.nextacademy.com/api/v1/images?userId=")
    .then((response) => {
        console.log(response);
        
        this.setState({
          users: response.data
        })
      })
  
}