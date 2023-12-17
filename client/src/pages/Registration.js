import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import bear from "../img/bear.png"


function Registration() {
  const [initialValues, setInitialValues] = useState({
    username: "",
    password: "",
  });

const history = useHistory()

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      username: Yup.string().min(3).max(15).required("username must not be empty"),
      password: Yup.string().min(4).max(20).required("password must not be empty"),
    }),
    onSubmit: (data) => {
      axios.post("http://localhost:3001/auth", data).then(() => {
        console.log(data);
        history.push("/login")
      }).catch((err) => {
        console.log(err);
        alert(err.response.data.error)
      });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="formContainer">
        
        <div className="welcomeMessage">
        <img className="bearLogo" src={bear}></img>
        <h1 className="welcomeh1">Welcome to BearSpace!</h1>
        <p className="registrationText">Register your account here to start posting!</p>
        </div>

        <br></br><br></br>

        <label>Username: </label>
        <span style={{ color: "red" }}>{formik.errors.username}</span>
        <input
          autoComplete="off"
          id="inputLoginRegistration"
          name="username"
          placeholder="(Ex. John123...)"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />

        <br></br><br></br>

        <label>Password: </label>
        <span style={{ color: "red" }}>{formik.errors.password}</span>
        <input
          autoComplete="off"
          type="password"
          id="inputLoginRegistration"
          name="password"
          placeholder="Your Password..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        
        <br></br><br></br>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Registration;