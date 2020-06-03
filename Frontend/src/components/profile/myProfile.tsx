import React, { useState, useEffect } from "react";
import "./myProfile.css";
import anonymus from "../../assets/anonymus.png";
import pencil from "../../assets/pencilWhite.png";
import { UserModelRequest, ResetPassword } from "../../shared/models/user/user";
import { editUser, getUser, changePassword } from "../../services/users";

export function MyProfile() {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: "",
  });
  const [showEdit, setShowEdit] = useState(false);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(true);
  const [isPasswordValid, setIsPassworValid] = useState(true);

  const valueFirstName = React.createRef() as any;
  const valueEmail = React.createRef() as any;
  const valueLastName = React.createRef() as any;
  const oldPassword = React.createRef() as any;
  const newPassword = React.createRef() as any;
  const confirmPassword = React.createRef() as any;

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const currentUser = JSON.parse(localStorage.getItem("User"));
    const user = await getUser(currentUser._id);
    setState({
      firstName: user.user.firstName,
      lastName: user.user.lastName,
      email: user.user.email,
      id: user.user._id,
    });
  }

  async function save() {
    debugger;
    const user: UserModelRequest = {
      firstName: valueFirstName.current.value,
      email: valueEmail.current.value,
      lastName: valueLastName.current.value,
      id: state.id,
    };
    const result = await editUser(user);
    if (result.err.error) {
      let message;
      result.err.error.forEach((item) => {
        message = item.stack;
      });
      alert(message);
    }
    if (result.err.status === true) {
      alert("Profile edited");
    }
    getData();
  }

  function changePasswordToggle() {
    setShowEdit(!showEdit);
  }

  async function changePass() {
    const param: ResetPassword = {
      id: state.id,
      oldPassword: oldPassword.current.value,
      newPassword: newPassword.current.value,
    };

    if (param.newPassword.toString().length < 6) {
      setIsPassworValid(false);
    }

    if (
      param.newPassword === confirmPassword.current.value &&
      param.newPassword.toString().length > 6
    ) {
      const result = await changePassword(param);
      if (result.err.error) {
        let message;
        result.err.error.forEach((item) => {
          message = item.stack;
        });
        alert(message);
      }
      if (result.err.status === true) {
        alert("Password edited");
      }
      setIsPasswordConfirmed(true);
    }
    if (param.newPassword !== confirmPassword.current.value) {
      setIsPasswordConfirmed(false);
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-label">My Profile</div>
      <div className="profile-body">
        <div className="profile-foto">
          <img src={anonymus} className="profile-anonymus" alt="user" />
          <div className="profile-edit-label">
            edit profile <img src={pencil} alt="" />
          </div>
        </div>
        <div className="profile-data">
          <span className="profile-name-label">Your First Name</span>
          <div className="profile-name-form">
            <input
              type="text"
              defaultValue={state.firstName}
              ref={valueFirstName}
              className="profile-input"
            />
          </div>
          <div className="profile-surname-label">Your Last Name</div>
          <div className="profile-surname-form">
            <input
              type="text"
              defaultValue={state.lastName}
              ref={valueLastName}
              className="profile-input"
            />
          </div>
          <div className="profile-email-label">E-mail</div>
          <div className="profile-email-form">
            <input
              type="text"
              defaultValue={state.email}
              ref={valueEmail}
              className="profile-input"
            />
          </div>
          <div
            className="change-password-toggle"
            onClick={changePasswordToggle}
          >
            Change Password
          </div>
          {showEdit && (
            <div>
              <div className="profile-password">Old Password</div>
              <div className="profile-email-form">
                <input
                  type="password"
                  className="profile-input"
                  ref={oldPassword}
                />
              </div>
              <div className="profile-password">
                New Password
                {!isPasswordValid && (
                  <div className="confirm-validate">
                    password contain 6 charackters
                  </div>
                )}
              </div>
              <div className="profile-email-form">
                <input
                  type="password"
                  className="profile-input"
                  ref={newPassword}
                />
              </div>
              <div className="profile-password">
                Confirm Password
                {!isPasswordConfirmed && (
                  <div className="confirm-validate">password did't match</div>
                )}
              </div>
              <div className="profile-email-form">
                <input
                  type="password"
                  className="profile-input"
                  ref={confirmPassword}
                />
              </div>
              <button onClick={changePass}>Change Password</button>
            </div>
          )}
          <div className="profile-button-area">
            <button className="profile-save-button" onClick={save}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
