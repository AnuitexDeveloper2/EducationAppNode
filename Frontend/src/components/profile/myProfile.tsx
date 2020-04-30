import React, { useState, useEffect } from "react"
import "./myProfile.css"
import anonymus from "../../assets/anonymus.png";
import pencil from "../../assets/pencilWhite.png"

export function MyProfile() {

    const [state,setState] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })
    const [showEdit,setShowEdit] = useState(false)

    const valueFirstName = React.createRef() as any;
    const valueEmail = React.createRef() as any;
    const valueLastName = React.createRef() as any;

    useEffect(()=>{getData()},[])

    function getData() {
        const user = JSON.parse(localStorage.getItem('User'))
        
        setState({
            firstName: user.firstName,
            lastName:user.lastName,
            email: user.email
        })
    }

    function save () {
        const firsstName = valueFirstName.current.value;
        const email = valueEmail.current.value;
        const lastEmail = valueLastName.current.value;
        
    }

    function changePasswordToggle() {
        setShowEdit(!showEdit)
    }

    return( 
    <div className="profile-container">
        <div className="profile-label">
            My Profile
        </div>
        <div className="profile-body">
            <div className="profile-foto">
                <img src={anonymus} className="profile-anonymus"/>
                <div className="profile-edit-label">
                    edit profile <img src={pencil} alt=""/>
                </div>
            </div>
            <div className="profile-data">
                <span className="profile-name-label">
                    Your First Name
                </span>
                <div className="profile-name-form">
                  <input type="text" defaultValue={state.firstName} ref={valueFirstName} className="profile-input"/>
                </div>
                <div className="profile-surname-label">
                    Your Last Name
                </div>
                <div className="profile-surname-form">
                    <input type="text" defaultValue={state.lastName} ref={valueLastName} className="profile-input" />
                </div>
                <div className="profile-email-label">
                    E-mail
                </div>
                <div className="profile-email-form">
                    <input type="text" defaultValue={state.email} ref={valueEmail} className="profile-input"/>
                </div>
                <div className="change-password-toggle" onClick={changePasswordToggle}>
                    Change Password
                </div>
                {showEdit&&<div>
                    
                <div className="profile-password">
                  Old Password 
                </div>
                <div className="profile-email-form">
                    <input type="password" className="profile-input"/>
                </div>
                <div className="profile-password">
                    New Password
                </div>
                <div className="profile-email-form">
                <input type="password" className="profile-input"/>
                </div >
                <div className="profile-password">
                    Confirm Password
                </div>
                <div className="profile-email-form">
                <input type="password" className="profile-input"/>
                </div>
                <button>Change Password</button>
                </div>
            }
                <div className="profile-button-area">
                    <button className="profile-save-button" onClick={save}>
                        Save
                   </button>
                </div>
            </div>
        </div>
    </div>
    )
}