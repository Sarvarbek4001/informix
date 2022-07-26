import React, { useEffect, useReducer, useRef, useState } from "react";
import "./Form.scss";
import Button from "../button/button";
import Checkmark from "../checkmark/checkmark";
import swal from "sweetalert";
const firstNameReducer = (prevState, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isValid: action.value.length > 2,
    };
  }

  if (action.type === "INPUT_BLUR") {
    return {
      value: prevState.value,
      isValid: prevState.value.length > 2,
    };
  }
  return {
    value: "",
    isValid: false,
  };
};

const lastNameReducer = (prevState, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isValid: action.value.length > 5,
    };
  }

  if (action.type === "INPUT_BLUR") {
    return {
      value: prevState.value,
      isValid: prevState.value.length > 5,
    };
  }
  return {
    value: "",
    isValid: false,
  };
};

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

/* <-----PhoneNumber----->*/
const phoneReducer = (prevState, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.value,
      isValid: action.value.length > 11,
    };
  }

  if (action.type === "INPUT_BLUR") {
    return {
      value: prevState.value,
      isValid: prevState.value.length > 11,
    };
  }
  return {
    value: "",
    isValid: false,
  };
};
/* </-----PhoneNumber----->*/

function Form(props) {
  const [formIsValid, setFormIsValid] = useState(true);
  const [firstNameState, dispatchFirstNameState] = useReducer(
    firstNameReducer,
    {
      value: "",
      isValid: undefined,
    }
  );
  const [lastNameState, dispatchLastNameState] = useReducer(lastNameReducer, {
    value: "",
    isValid: undefined,
  });

  const [emailState, dispatchEmailState] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });

  const [phoneNumberState, dispatchPhoneNumberState] = useReducer(
    phoneReducer,
    {
      value: "",
      isValid: undefined,
    }
  );

  // firstName
  const firstNameChangeHandler = (event) => {
    dispatchFirstNameState({ type: "USER_INPUT", value: event.target.value });
  };

  const validateFirstNameHandler = () => {
    dispatchFirstNameState({ type: "INPUT_BLUR" });
  };
  // firstName

  // lastName
  const lastNameChangeHandler = (event) => {
    dispatchLastNameState({ type: "USER_INPUT", value: event.target.value });
  };

  const validateLastNameHandler = () => {
    dispatchLastNameState({ type: "INPUT_BLUR" });
  };
  // lastName

  // emailState
  const emailChangeHandler = (event) => {
    dispatchEmailState({ type: "USER_INPUT", value: event.target.value });
  };
  const validateEmailHandler = () => {
    dispatchEmailState({ type: "INPUT_BLUR" });
  };
  //emailState

  //phoneNumberState
  const phoneNumberChangeHandler = (event) => {
    dispatchPhoneNumberState({ type: "USER_INPUT", value: event.target.value });
  };
  const validatePhoneNumberChangeHandler = () => {
    dispatchPhoneNumberState({ type: "INPUT_BLUR" });
  };
  //phoneNumberState

  const { isValid: firstNamIsValid } = firstNameState;
  const { isValid: lastNamIsValid } = lastNameState;
  const { isValid: emailIsValid } = emailState;
  const { isValid: phoneNumberIsValid } = phoneNumberState;

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneNumberInputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(
        firstNamIsValid && lastNamIsValid && emailIsValid && phoneNumberIsValid
      );
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [firstNameState, lastNameState, emailState, phoneNumberState]);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (formIsValid) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstNameState.value,
          lastName: lastNameState.value,
          email: emailState.value,
          phoneNumber: phoneNumberState.value,
        }),
      };
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/users`,
        requestOptions
      );
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        swal({
          title: "Good job!",
          text: "We will contact you soon😊",
          icon: "success",
        });
        firstNameInputRef.current.value = "";
        lastNameInputRef.current.value = "";
        emailInputRef.current.value = "";
        phoneNumberInputRef.current.value = "";
      } else {
        console.log(response.statusText);
      }
    } else if (!firstNamIsValid) {
      firstNameInputRef.current.focus();
    } else if (!lastNamIsValid) {
      lastNameInputRef.current.focus();
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      phoneNumberInputRef.current.focus();
    }
  };

  return (
    <>
      <form className="form" onSubmit={submitHandler}>
        <div
          className={`form__control form__control-input1 ${
            firstNamIsValid === false ? "invalid" : ""
          }`}
        >
          <input
            ref={firstNameInputRef}
            type="text"
            name="firstName"
            placeholder={props.content[props.lang].form.firstName}
            onChange={firstNameChangeHandler}
            onBlur={validateFirstNameHandler}
            required
          />
        </div>
        <div
          className={`form__control form__control-input2 ${
            lastNamIsValid === false ? "invalid" : ""
          }`}
        >
          <input
            ref={lastNameInputRef}
            type="text"
            name="lastName"
            placeholder={props.content[props.lang].form.lastName}
            onChange={lastNameChangeHandler}
            onBlur={validateLastNameHandler}
            required
          />
        </div>
        <div
          className={`form__control form__control-input3 ${
            emailIsValid === false ? "invalid" : ""
          }`}
        >
          <input
            ref={emailInputRef}
            type="email"
            name="email"
            placeholder={props.content[props.lang].form.companyEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            required
          />
        </div>

        <div
          className={`form__control form__control-input4 ${
            phoneNumberIsValid === false ? "invalid" : ""
          }`}
        >
          <input
            ref={phoneNumberInputRef}
            type="text"
            name="phoneNumber"
            placeholder={props.content[props.lang].form.phoneNumber}
            onChange={phoneNumberChangeHandler}
            onBlur={validatePhoneNumberChangeHandler}
            required
          />
        </div>
        <div className="form__control-input5">
          <Button className="btn" type="submit">
            {props.content[props.lang].form.buttonName}
          </Button>

          <Checkmark>
            <i className="bi bi-check2 left-checkmark"></i>{props.content[props.lang].form.aboutPayment}
          </Checkmark>
        </div>
      </form>
    </>
  );
}

export default Form;
