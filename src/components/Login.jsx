import { auth } from "../firebase";
import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber  } from "firebase/auth";
import { Link, useNavigate } from "react-router";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { FormGroup, FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import OtpInput from 'react-otp-input';


export default function Login () {
    // Inputs
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [show, setShow] = useState(false);
    const [confirm, setConfirm] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const setUpRecaptha = (phoneNumber) => {
        const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
        recaptchaVerifier.render();
        return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    }


    // Sent OTP
    // const signin = () => {
    //     if (phone === "" || phone.length < 10) return;

    //     const verify =  new RecaptchaVerifier(
    //         "recaptcha-container"
    //     );
    //     auth.signInWithPhoneNumber(phone, verify)
    //         .then((result) => {
    //             setFinal(result);
    //             console.log("code sent");
    //             setShow(true);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //             window.location.reload();
    //         });
    // };

    // // Validate OTP
    // const ValidateOtp = () => {
    //     if (otp === null || final === null) return;
    //     final
    //         .confirm(otp)
    //         .then((result) => {
    //             console.log('result: ', result);
    //             // success
    //         })
    //         .catch((err) => {
    //             console.error("Wrong code:", err);
                
    //         });
    // };

    const getOTP = async (e) => {
        // e.preventDefault();
        setError("")
        if (!phone) return setError("Please enter a valid phone number");
        try {
            const response = await setUpRecaptha(phone)
            console.log('response: ', response);
            setConfirm(response);
            setShow(true);
        } catch(err) {
            setError(err.message)
        }
        console.log(phone);
    }

    const verifyOTP = async (e) => {
        e.preventDefault();
        console.log(otp);
        if (!otp) return;
        try {
            setError("")
            await confirm.confirm(otp);
            navigate("/")
        } catch(err) {
            setError(err.message);
        }
    }

    return (
        <Box component="section">
        <Box>
            {error && <Box variant="error">{error}</Box>}
        </Box>
        {!show ? <FormGroup>
     
                {/* <div
                    style={{
                        display: !show ? "block" : "none",
                    }}
                > */}
                    <PhoneInput
                        defaultCountry="RU"
                        value={phone}
                        onChange={setPhone}
                        placeholder="Enter your phone number"
                    />
                    <br />
                    <br />
                    <Box id="recaptcha-container"></Box>
                    <Button variant="contained" color="secondary" onClick={getOTP}>
                        Send OTP
                    </Button>
                    <Link to="/">
                        Cancel
                    </Link>
                {/* </div> */}
                {/* <div
                    style={{
                        display: show ? "block" : "none",
                    }}
                > */}
                    {/* <input
                        type="text"
                        placeholder={"Enter your OTP"}
                        onChange={(e) => {
                            setOtp(e.target.value);
                        }}
                    ></input>
                    <br />
                    <br />
                    <button onClick={ValidateOtp}>
                        Verify
                    </button>
                </div> */}
        
        </FormGroup> : null}
        {show ? <FormGroup>
            <FormControl>
                
                    {/* <Input
                        type="text"
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter your SMS code"
                    />
                    <br />
                    <br /> */}
                    <OtpInput
                        value={"123456"}
                        // onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span></span>}
                        // renderInput={(props) => <input {...props} />}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <Button variant="contained" color="secondary" onClick={verifyOTP}>
                        Verify OTP
                    </Button>
                    <Link to="/">
                        Cancel
                    </Link>
            </FormControl>
        </FormGroup> : null}
            
        </Box>
    );
};