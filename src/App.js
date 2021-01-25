import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TopNav from "./components/TopNav";
import FormRender from "./components/FormRender";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import Profile from "./components/Profile";
import Product from "./components/Product";
import NotFound from "./components/NotFound";

import DarkMode from "./components/DarkMode";


class App extends React.Component {
  state = {
    user: "",
    token: "",
    darkMode: false
  };

  componentDidMount() {
    if (localStorage.getItem("jwt")) {
      fetch("http://localhost:3000/getuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({ user: data.user, token: data.token, darkMode: data.darkMode });
          this.handleRefresh(data);
        });
    }
  }



  renderHome = () => (
    <Home
      loggedIn={!!this.state.user}
      user={this.state.user}
      token={localStorage.getItem("jwt")}
      refresh={this.handleRefresh}
      darkMode={this.state.darkMode}
    />
  );

  renderProductPage = (r_props) => {
    return (
      <Product productId={r_props.match.params.id} user={this.state.user} darkMode={this.state.darkMode}/>
    );
  };

  renderProductList = () => {
    return <ProductList createList={this.createList} user={this.state.user} darkMode={this.state.darkMode}/>;
  };

  renderProfilePage = () => {
    return (
      <Profile
        user={this.state.user}
        handleDelete={this.handleDelete}
        handleSubmit={this.handleUpdate}
        darkMode={this.state.darkMode}
      />
    );
  };

  renderForm = (routerProps) => {
    switch (routerProps.location.pathname) {
      case "/signup":
        return (
          <FormRender
            name="SignUp"
            handleSubmit={this.handleSignup}
            history={this.props.history}
            darkMode={this.state.darkMode}
          />
        );

      case "/login":
        return (
          <FormRender
            name="Login"
            handleSubmit={this.handleLogin}
            history={this.props.history}
            darkMode={this.state.darkMode}
          />
        );

      default:
        break;
    }
  };

  handleRefresh = (data) => {
    this.setState({ user: data.user, token: data.token, darkMode: data.darkMode }, () => {
      localStorage.getItem('theme')
    });
  };

  handleSignup = (info) => {
    let data = {
      name: info.name,
      username: info.username,
      skin_type: info.skin_type,
      age: parseInt(info.age),
      password: info.password,
    };
    this.handleAuth(data, "http://localhost:3000/users", "POST");
  };

  handleLogin = (info) => {
    let data = {
      username: info.username,
      password: info.password,
    };
    this.handleAuth(data, "http://localhost:3000/login", "POST");
  };

  handleUpdate = (info) => {
    let data = {
      username: info.username,
      password: info.password,
      age: parseInt(info.age),
    };

    this.handleAuth(data, `http://localhost:3000/users/${info.id}`, "PATCH");
  };

  handleDelete = () => {

    fetch(`http://localhost:3000/users/${this.state.user.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => {

        alert("Account deleted.");
        this.handleLogout();
      });
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({ user: "" }, () => {
      this.props.history.push("/");
    });
  };

  handleError = (data) => {
    alert(`${data.error}`);
    if (
      data.error ===
      "That username is already been used. Please specify another username."
    ) {
      this.props.history.push("/profile");
    } else {
      this.props.history.push(
        data.error === "Invalid credentials, please try again."
          ? "/login"
          : "/signup"
      );
    }
  };

  handleAuth = (data, resource, method) => {
    fetch(resource, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          this.handleError(data);
        } else if (method !== "PATCH") {
          this.setState({ user: data.user, token: data.token }, () => {
            if (data.token) {
              localStorage.setItem("jwt", data.token);
              this.props.history.push("/products");
            } else {
              alert("Profile Succesfully Updated!");
              this.props.history.push("/profile");
            }
          });
        } else {
          this.setState({ user: data }, () => {
            this.props.history.push("/profile");
          });
        }
      });
  };

  toggleDark = () => {

    this.state.darkMode ?
      this.setState({ darkMode: false }, () => {
        console.log("LET THERE BE LIGHT")

      })
      :
      this.setState({ darkMode: true }, () => {
        console.log("BROWNOUT AGAIN")
      })


  }

  render() {

    return (
      <div className={this.state.darkMode ? "darkApp" : "App"} >
        <TopNav
          loggedIn={!!this.state.user}
          handleLogout={this.handleLogout}
          renderProfilePage={this.renderProfilePage}
          toggleDark = {this.toggleDark}
          darkMode = {this.state.darkMode}
        />
        <DarkMode />
        <Switch>
          <Route exact path="/login">
            {!!localStorage.getItem("jwt") ? (
              <Redirect to="/products" />
            ) : (
              <Route path="/login" exact component={this.renderForm} />
            )}
          </Route>

          <Route exact path="/signup">
            {!!localStorage.getItem("jwt") ? (
              <Redirect to="/login" />
              ) : (
              <Route path="/signup" exact component={this.renderForm} />
            )}
          </Route>

          <Route exact path="/products">
            {!!localStorage.getItem("jwt") ? (
              <Route exact path="/products" render={this.renderProductList} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route exact path="/products/:id">
            {!!localStorage.getItem("jwt") ? (
              <Route
                exact
                path="/products/:id"
                render={this.renderProductPage}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route exact path="/">
            {!!localStorage.getItem("jwt") ? (
                <Redirect to="/login" />
              ) : (
                <Route path="/" render={this.renderHome} />
            )}
          </Route>

          <Route exact path="/profile">
            {!!localStorage.getItem("jwt") ? (
              <Route exact path="/profile" render={this.renderProfilePage} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
