import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import {
  removeError,
  setError,
  startRegister,
} from "../../R_actions/authActions";
import { Link } from "react-router-dom";
import { useState } from "react";

const initialForm = {
  name: "fredes",
  email: "fredes@gmail.com",
  password: "123456",
  password2: "123456",
};

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.auth);

  // //#_useForm
  const [formValues, setValues] = useState(initialForm);
  const handleInputChange = ({ target }) => {
    setValues({ ...formValues, [target.name]: target.value });
  };
  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startRegister(email, password, name));
    }
  };
  //#end_useForm

  //#_validacion
  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("name is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("email not valid"));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(setError("password not valid"));
      return false;
    }

    dispatch(removeError());
    return true;
  };
  //#end_validacion

  return (
    <>
      <h3 className="auth__title">Register </h3>

      <form
        onSubmit={handleRegister}
        className="animate__animated animate__fadeIn animate__faster"
      >
        {msgError && <div className="auth__alert-error">{msgError}</div>}

        {/* input name */}
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />

        {/* input email */}
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />

        {/* input password */}
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          autoComplete="off"
          value={password}
          onChange={handleInputChange}
        />

        {/* input password2 */}
        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          autoComplete="off"
          value={password2}
          onChange={handleInputChange}
        />

        {/* boton register */}
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>

        {/* icono google */}
        <div className=" mb-3">
          <p className="mb-1 mt-3">login with social networks</p>
          <div className="google-btn">
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
                width={200}
                height={200}
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link to="/auth/login" className="link">
          Already Register{" "}
        </Link>
      </form>
    </>
  );
};
