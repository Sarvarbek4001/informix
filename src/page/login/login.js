import React, {
  useState,
  useReducer,
  useEffect,
  useRef,
  useContext,
} from "react";
import LoginIcon from "@mui/icons-material/Login";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthenticationContext";

/* <-----Email----->*/
const emailReducer = (prevState, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isValid: action.value.includes("@"),
    };
  }

  if (action.type === "INPUT_BLUR") {
    return {
      value: prevState.value,
      isValid: prevState.value.includes("@"),
    };
  }
  return {
    value: "",
    isValid: false,
  };
};
/* </-----Email----->*/

/* <-----Password----> */
const passwordReducer = (prevState, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isValid: action.value.trim().length > 3,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: prevState.value,
      isValid: prevState.value.trim().length > 3,
    };
  }
  return {
    value: "",
    isValid: false,
  };
};
/* </-----Password----> */

function Login() {
  const [isSentences, setIsSentences] = useState(false);
  const [formIsValid, setFormIsValid] = useState(true);
  let navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const [emailState, dispatchEmailState] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });
  const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });

  const emailChangeHandler = (event) => {
    dispatchEmailState({ type: "USER_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordState({ type: "USER_INPUT", value: event.target.value });
  };

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [emailState, passwordIsValid]);

  const validateEmailHandler = () => {
    dispatchEmailState({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPasswordState({ type: "INPUT_BLUR" });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (formIsValid) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: emailState.value,
          password: passwordState.value,
        }),
      };
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/admin`,
        requestOptions
      );
      if (response.status === 201) {
        const data = await response.json();
        console.log(data);
        window.localStorage.setItem("token", JSON.stringify(data.token));
        ctx.setIsLoggedIn(true);
        window.localStorage.setItem("username", JSON.stringify(data.username));
        navigate("/admin");
      } else {
        setIsSentences(true);
        console.log(response.statusText);
      }
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <div className="login">
      <div className="login__wrapper">
        <div className="login__items">
          <form className="login__form" onSubmit={submitHandler}>
            <h1 className="login__form-title">Login</h1>
            <div
              className={`login__form-control ${
                emailIsValid === false ? "invalid" : ""
              }`}
            >
              <label htmlFor="username">Username</label>
              <input
                ref={emailInputRef}
                type="email"
                id="username"
                placeholder="Username"
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
                required
              />
            </div>

            <div
              className={`login__form-control ${
                passwordIsValid === false ? "invalid" : ""
              }`}
            >
              <label htmlFor="password">Password</label>
              <input
                ref={passwordInputRef}
                type="text"
                id="password"
                placeholder="Password"
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
                required
              />
            </div>
            {isSentences && (
              <div className="error_text">
                Sorry, this is not available in the user database.
              </div>
            )}
            <div className="login__form-btn-wrapper">
              <button type="submit" className="login__form-btn">
                LOGIN <LoginIcon fontSize="large" sx={{ marginLeft: "5px" }} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
