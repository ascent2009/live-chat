import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, getPhoneNumberFromUserInput, getCodeFromUserInput} from "firebase/auth";


const phoneNumber = getPhoneNumberFromUserInput();
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
const appVerifier = window.recaptchaVerifier;

const auth = getAuth();

signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      console.error(error);
    }
);

const code = getCodeFromUserInput();
window.confirmationResult.confirm(code).then((result) => {
    // User signed in successfully.
    const user = result.user;
    console.log(user);
    }).catch((error) => {
    // User couldn't sign in (bad verification code?)
    console.error(error);
    }
);
