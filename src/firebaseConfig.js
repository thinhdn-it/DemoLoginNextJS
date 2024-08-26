import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCnRPoXQmkt8zNIcnLNC1yeXpi9whkN7yo",
    authDomain: "demologin-74fdb.firebaseapp.com",
    projectId: "demologin-74fdb",
    storageBucket: "demologin-74fdb.appspot.com",
    messagingSenderId: "1038467669028",
    appId: "1:1038467669028:web:318a8db42db1f75a56ccb1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

export { auth, googleProvider, facebookProvider, appleProvider };
