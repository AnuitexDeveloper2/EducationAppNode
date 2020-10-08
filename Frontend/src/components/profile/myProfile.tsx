import React, { useState, useEffect, ChangeEvent } from "react";
import "./myProfile.css";
import anonymus from "../../assets/anonymus.png";
import pencil from "../../assets/pencilWhite.png";
import { UserModelRequest, ResetPassword } from "../../shared/models/user/user";
import { editUser, getUser, changePassword } from "../../services/users";
// import { Formik } from "formik";

export function MyProfile() {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: 0,
  });
  const [showEdit, setShowEdit] = useState(false);
  const [isTruePassword, setIsTruePassword] = useState(true);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(true);
  const [isNewPasswordValid, setIsNewPassworValid] = useState(true);
  const [isOldPasswordValid, setIsOldPassworValid] = useState(true);


  const oldPassword = React.createRef() as any;
  const newPassword = React.createRef() as any;
  const confirmPassword = React.createRef() as any;

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const currentUser = JSON.parse(localStorage.getItem("User"));
    const user = await getUser(currentUser.id);

    setState({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user.id,
    });
  }

  async function handleChange( event: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  async function save() {
    const user: UserModelRequest = {
      firstName: state.firstName,
      email: state.email,
      lastName: state.lastName,
      id: state.id,
    };
    const result = await editUser(user);
    if (!result) {
      alert('Something went wrong');
    }
    if (result) {
      alert("Profile edited");
    }
    getData();
  }

  function changePasswordToggle() {
    setShowEdit(!showEdit);
  }

  async function changePass() {
    debugger
    const param: ResetPassword = {
      id: state.id,
      oldPassword: oldPassword.current.value,
      newPassword: newPassword.current.value,
    };

    param.oldPassword.toString().length < 6 ? setIsOldPassworValid(false) : setIsOldPassworValid(true);
    param.newPassword.toString().length < 6 ? setIsNewPassworValid(false) : setIsNewPassworValid(newPassword);
    param.newPassword !== confirmPassword.current.value?setIsPasswordConfirmed(false):setIsPasswordConfirmed(true);
    if (
      param.newPassword === confirmPassword.current.value &&
      param.newPassword.toString().length > 6
    ) {
      const result = await changePassword(param);
      if (!result) {
        setIsTruePassword(false)
      }

      if (result) {
        setIsTruePassword(true)
        alert("Password edited");
      }
      setIsPasswordConfirmed(true);
    }
  }

  return (

    <div className="profile-container">
      <div className="profile-wrapper">
        <div className='profile-title'>
          My Profile
          </div>
        <div></div>
        <div></div>
        <div className="profile-photo">
          <img src={anonymus} alt="" width={100} height={100} />
          <div className="edit-profile">edit profile  {" "}
            <img src={pencil} alt="" />
          </div>
        </div>
        <div className="profile-inputs">
          <div className="input-container">
            <label className="profile-input-label">Your First Name</label>
            <input
              type="text"
              name="firstName"
              className="profile-input"
              defaultValue={state.firstName}
              onChange={handleChange}
              />
          </div>
          <div className="input-container">
            <label className="profile-input-label">Your Last Name</label>
            <input
              type="text"
              className="profile-input"
              defaultValue={state.lastName}
              name='lastName'
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <label className="profile-input-label"> E-mail</label>
            <input
              type="text"
              className="profile-input"
              defaultValue={state.email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div
            className="change-password-toggle"
            onClick={changePasswordToggle}
          >
            Change Password
          </div>
        </div>
        <div></div>

        <div></div>
        <div className="profile-inputs edit">

        {showEdit && <div className="profile-inputs edit">
          <div className="input-container">
            <label className="profile-input-label">Old Password</label>
            <input type="text" className="profile-input" ref={oldPassword}/>
            {!isTruePassword&& <div className="confirm-validate">
                  invalid Password
              </div>}
              {!isOldPasswordValid && (
                  <div className="confirm-validate whitespace-no-wrap">
                    password must contain at least 6 charackters
                  </div>
                )}
          </div>
          <div className="input-container">
            <label className="profile-input-label">New Passwor</label>
            <input type="text" className="profile-input" ref={newPassword}/>
            {!isNewPasswordValid && (
                  <div className="confirm-validate whitespace-no-wrap">
                    password must contain at least 6 charackters
                  </div>
                )}
          </div>
          <div className="input-container">
            <label className="profile-input-label"> Confirm Password</label>
            <input type="text" className="profile-input" ref={confirmPassword}/>
            {!isPasswordConfirmed && (
                  <div className="confirm-validate">password did't match</div>
                )}
          </div>
        </div>}
        </div>
        <div></div>
        <div></div>
        <div className="profile-buttons">
        <div></div>
          {showEdit&&<button className="profile-cansel-button whitespace-no-wrap" onClick={changePass}>Change Password</button>}
          <button className="profile-save-button" onClick={save}>Save</button>
        </div>
      </div>
    </div>
    );
}
