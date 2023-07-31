import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import {
  startWithLoginEmailPassword,
  startLoginGoogle,
} from "../../R_actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const initialForm = {
  email: "fredes@gmail.com",
  password: "123456",
};

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  //#_useForm
  const [formValues, handleInputChange] = useForm(initialForm);
  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startWithLoginEmailPassword(email, password));
  };
  //#end_useForm

  const handleGoogleLogin = () => {
    dispatch(startLoginGoogle());
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form
        onSubmit={handleLogin}
        className="animate__animated animate__fadeIn animate__faster"
      >
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

        {/* boton login */}

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          login
        </button>

        {/* icono google */}
        <div className=" mb-3">
          <p className="mb-1 mt-3">login with social networks</p>

          <div className="google-btn" onClick={handleGoogleLogin}>
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

        <Link to="/auth/register" className="link">
          Create new account{" "}
        </Link>
      </form>
    </>
  );
};
