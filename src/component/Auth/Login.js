import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { clientId } from '../../config/AppConfig';
import { useSelector, useDispatch } from "react-redux";
import { signIn, signInError } from '../../store/actions/auth';
import { message } from "antd";
import { customNotification, msgType } from '../../utils/notification/customNotification';

const Login = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth);
    // console.log(loading, "loading")

    const onSuccess = (res) => {
        console.log(res.profileObj, "login cred");
        customNotification({ message: "Login successful.", type: msgType.success });
        let profile = res.profileObj ? JSON.stringify(res.profileObj) : null;
        if (profile) {
            localStorage.setItem("profile", profile);

            // here dispatch login successfull action
            let data = { ...res.profileObj, userRole: "owner" };
            dispatch(signIn(data));

            // after navigate to dashboard page
        }
    }
    const onFailure = (res) => {
        console.log(res.error, "failure");
        // here dispatch login failure
        dispatch(signInError(res.error));
        message.error(res.error, 3, () => {
            customNotification({ message: "Please select a google account to login.", type: msgType.info })
        });
    }
    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login with google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login