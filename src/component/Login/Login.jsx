import React, { useState } from "react";
import user from "./user.svg";
import { Helmet } from "react-helmet";
import authService from "../../services/auth.service";
import checkToken from "../../services/user.service";
import { Redirect } from "react-router-dom";

function Login(props) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const checkUser = () => {
    checkToken().then((res) => {
      if (res.data === true) {
        props.history.push("/dashboard");
      }
    });
  };

  if (localStorage.getItem("token")) {
    return <Redirect to="/dashboard" />;
  }

  const login = (e) => {
    e.preventDefault();
    authService
      .login(data.email, data.password)
      .then(() => {
        checkUser();
      })
      .catch((err) => {
        alert("user yang anda masukan tidak ada");
      });
  };

  const handleChange = (nama, value) => {
    setData({
      ...data,
      [nama]: value,
    });
  };

  return (
    <div className="container cardnya">
      <Helmet>
        {" "}
        {/* yang nge errorin */}
        <title>Login</title>
      </Helmet>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card cardlogin">
            <div className="card-body">
              <h1 className="text-center login-title">Please Login</h1>
              <div className="account-wall">
                <div className="row mb-3">
                  <div className="col-md-6 offset-md-3 text-center">
                    <img src={user} alt="" width="70%" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8 offset-md-2 text-center">
                    <form className="form-signin" onSubmit={login}>
                      <div className="form-group">
                        <input
                          type="text"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          required
                          autoFocus
                          value={data.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Password"
                          required
                          value={data.password}
                          onChange={(e) =>
                            handleChange("password", e.target.value)
                          }
                        />
                      </div>
                      <button
                        className="btn btn-lg btn-primary btn-blok"
                        type="submit"
                      >
                        Log in
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
