
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu8RaMMg3tntCmSM2BQx46gVCoRCWJTbo",
  authDomain: "krflixer.firebaseapp.com",
  projectId: "krflixer",
  storageBucket: "krflixer.firebasestorage.app",
  messagingSenderId: "702256919414",
  appId: "1:702256919414:web:ee9e3e46ed78937304c057"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc (collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider : "local",
            email,
        });
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }

}

const login =  async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }

}

const logout = ()=>{
    signOut(auth);

}

export {auth,db,login,signup,logout};
