import React, { useEffect, useState } from "react";
import "./CSS/confirmedEmail.css";
import shape from "../../assets/Shape Orange.png";
import spinner from "../../assets/spinner.gif";
import { confirmedEmail } from "../../services/auth";
import { useDispatch } from "react-redux";
import { showSignInAction } from "../../Redux/header/actions";

export default function ConfirmedEmail() {
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const [state, setState] = useState({
    isLoaded: false,
    user: null,
  });

  async function getData() {
    const id = decodeURI(window.location.search)
      .replace("?", "")
      .split("&")
      .map((param) => param.split("="))
      .reduce((values, [key, value]) => {
        values[key] = value;
        return values;
      }, {}) as any;
    debugger;
    const user = await confirmedEmail(id.user);
    if (user !== null) {
      setState({ isLoaded: true, user: user });
    }
  }

  function moveToSignIn() {
    dispatch(showSignInAction());
  }

  if (!state.isLoaded) {
    return (
      <div className="loading-data">
        <div className="spinner-grow text-primary" role="status">
          <span className="sr-only">
            <img src={spinner} alt="spinner"></img>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmed-email">
      <div>
        <img src={shape} alt="shape" className="confirmed-email-image" />
      </div>
      <div className="confirmed-email-text">
        Dear {state.user.firstName} {state.user.lastName} <br />
        Thank you for your registratition
      </div>
      <div>
        <button className="confirmed-email-button" onClick={moveToSignIn}>
          Continue
        </button>
      </div>
    </div>
  );
}
