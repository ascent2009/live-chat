import { auth } from "../firebase";
import { useState, useEffect } from "react";
import { observer, useLocalObservable  } from "mobx-react-lite";
import { myUser } from '../store/User';
import { RecaptchaVerifier, signInWithPhoneNumber  } from "firebase/auth";
import { Link, useNavigate } from "react-router";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { FormGroup, FormHelperText, TextField, FormControlLabel, Checkbox } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Box } from '@mui/material';
import CheckPhonePng from "../assets/enterphone.png";
import SmsPng from "../assets/sms.png";
import { toJS } from 'mobx';
import { getDatabase, ref, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import ModalAlias from "./Modal";

const Login = observer(() => {

    const user = useLocalObservable(() => myUser);
    
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [show, setShow] = useState(false);
    const [confirm, setConfirm] = useState(null);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    const checkName = toJS(user.users).flat().some(cn => cn.name === phone);
    const findID = toJS(user.users).flat().find(cn => cn.name === phone ? cn.id : '');
    
    const setUpRecaptcha = (phoneNumber) => {
        const recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
            'size': 'invisible',
        });
        recaptchaVerifier.render();
        return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    }

    const handleChange = (e) => {
        setChecked(e.target.checked);
    }

    const openModal = () => {
        checked && setOpen(true);
    }
    
    const getOTP = async (e) => {
        e.preventDefault();
        setError("")
        if (!phone) {
            return setError("Please enter a valid phone number")
        };
        if (checkName) {
            user.setAuthenticate = true;
            navigate(`/user/${findID.id}`)
            console.log(findID.id);
        };
        try {
            const response = await setUpRecaptcha(phone)
            setConfirm(response);
            openModal();
            setShow(true);
        } catch(err) {
            setError(err.message)
        }
    }

    const writeUserData = () => {
        user.setUserID = uuidv4();
        user.setUserName(phone);
        user.setAuthenticate = true;
        const obj = {
            id: user.user.id,
            name: user.user.name,
            nickname: user.user.nickname,
            isAuthenticated: user.user.isAuthenticated
        }
        console.log(obj);
        set(ref(getDatabase(), `users/${user.user.id}`), obj);
    }

    const verifyOTP = async (e) => {
        e.preventDefault();
        if (!otp) return setError("Please enter correct SMS code");
        try {
            setError("")
            await confirm.confirm(otp);
            writeUserData();
            navigate(`/user/${user.userID}`);
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
            phoneInputCSS.style.border = "2px solid #afaeaeff";
            phoneInputCSS.style.outline = "none";
            phoneInputCSS.style.backgroundColor = "#ffff";
        };
        user.fetchUsers;
    }, [])

    

    return (
        <>
        <Container component="section" maxWidth="xl" sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            width: '100vw',
            height: '100vh',
            gap: 5
        }}>
        {!show ? <>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <img width="90%" src={CheckPhonePng} alt="check phone"/>
            </Box>
            <FormGroup as="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: '90%',
                    height: '37vh',
                    gap: 5,
                    background: "rgba(255, 255, 255, 0.8)",
                    p: 5,
                    borderRadius: 10,
                    border: "1px solid grey"
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
                    <FormControlLabel
                        disabled={checkName && true}
                        control={<Checkbox onChange={handleChange} 
                        color="secondary" />}
                        label="Check if you want to use a nickname as login (phone number is used by default)" 
                        sx={{
                            '& .css-rizt0-MuiTypography-root': {
                                fontWeight: "bold",
                                color: "#555353ff",
                                textAlign: "center",
                                width: "100%"
                            }
                        }}
                    />
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
        </FormGroup></> : null}
        {show ? <>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <img width={250} height={300} src={SmsPng} alt="check sms"/>
            </Box>
            <FormGroup as="form" onSubmit={verifyOTP}  sx={{
                display: "flex",
                flexDirection: "column",
                width: '60vw',
                height: '30vh',
                gap: 5,
                background: "#fff 0.5",
            }}>
                    <TextField
                        type="text"
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter your SMS code"
                        min={6}
                        max={6}
                        sx={{
                            '& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input': {
                                textAlign: 'center',
                                fontSize: '20px',
                                color: '#4c4040de',
                                background: '#ffff'
                            }
                        }} 
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
                        Verify OTP
                    </Button>
        </FormGroup></> : null}
        {show && <Button variant="contained" color="secondary" onClick={openModal}>Modal</Button>}
        <Link to="/">
            <Typography variant="h6" color="secondary" align='center'>Cancel</Typography>
        </Link>
        </Container>
        {open ? <ModalAlias open={open} setOpen={setOpen} />  : null}
        </>
    );
});

export default Login;