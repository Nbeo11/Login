import React from "react";
import "../css/style.css";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  setParams = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  login = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", this.state.username);
    urlencoded.append("password", this.state.password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(
      "http://localhost/thule3/ProductionMove/public/api/auth/login",
      requestOptions
    )
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        throw Error(response.status);
      })
      .then((result) => {
        console.log(result);
        localStorage.setItem("status", result.status);
        alert("Thanh cong");
      })
      .catch((error) => {
        console.log("error", error);
        alert("Username, password are wrong");
      });
  };

  render() {
    return (
      <form>
        <h1>BIGCORP</h1>

        <div class="user-box">
          <label>Username:</label>
          <input type="text" name="username" onChange={this.setParams} />
        </div>
        <div class="user-box">
          <label>Username:</label>
          <input type="password" name="password" onChange={this.setParams} />
        </div>
        <div>
          <button type="button" name="username" onClick={this.login}>
            Login
          </button>
        </div>
      </form>
    );
  }
}
