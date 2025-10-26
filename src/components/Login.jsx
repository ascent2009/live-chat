import { auth } from "../firebase";
import { useState, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber  } from "firebase/auth";
import { Link, useNavigate } from "react-router";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { FormGroup, FormControl, FormHelperText } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Box } from '@mui/material';
import Input from '@mui/material/Input';

export default function Login () {
    
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [show, setShow] = useState(false);
    const [confirm, setConfirm] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const setUpRecaptha = (phoneNumber) => {
        const recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
            'size': 'normal',
        });
        recaptchaVerifier.render();
        return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    }

    const getOTP = async (e) => {
        e.preventDefault();
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

    useEffect(() => {
        const phoneInputCSS = document.querySelector(".PhoneInputInput");
        if (phoneInputCSS) {
            phoneInputCSS.style.borderRadius = "20px";
            phoneInputCSS.style.padding = "10px";
            phoneInputCSS.style.fontSize = "1rem";
            phoneInputCSS.style.border = "none";
            phoneInputCSS.style.outline = "none";
        }
        
    })

    return (
        <Container component="section" maxWidth="xl" sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            width: '100vw',
            height: '100vh',
            background: "pink",
            gap: 5
        }}>
        {!show ? <FormGroup as="form"
            sx={{
                display: "flex",
                flexDirection: "column",
                // margin: "auto",
                width: '60vw',
                height: '30vh',
                gap: 5,
                // justifyContent: "space-around",
                background: "transparent",
            }}
            onSubmit={getOTP}
        >
                    <PhoneInput
                        defaultCountry="RU"
                        value={phone}
                        onChange={setPhone}
                        placeholder="Enter your phone number"
                    />
                    <Box sx={{
                        height: 20,
                        mt: -4,
                    }}>
                        {error && <FormHelperText sx={{
                            fontSize: 14,
                            textAlign: "center",
                            color: "red"
                        }}>{error}</FormHelperText>}
                    </Box>
                    <Button variant="contained" color="secondary" type="submit">
                        Send OTP
                    </Button>
                        <Box  sx={{
                            display: 'flex',
                            width: 'inherit',
                            justifyContent: 'center'
                        }}>
                    <Box id="sign-in-button"></Box>
                    </Box>
                  
                        
                  
                </FormGroup> : null}
        {show ? <FormGroup as="form" onSubmit={verifyOTP}>
            <FormControl>
                
                    <Input
                        type="text"
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter your SMS code"
                    />
                    <br />
                    <br />
                    <Button variant="contained" color="secondary" type="submit">
                        Verify OTP
                    </Button>
                    
            </FormControl>
        </FormGroup> : null}
            <Link to="/">
                            <Typography variant="h6" color="secondary" align='center'>Cancel</Typography>
                        </Link>
        </Container>
    );
};