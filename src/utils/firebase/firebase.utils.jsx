
import {initializeApp} from 'firebase/app';
import {getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    crerateUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    
} from 'firebase/auth'



import {
    
    doc,
    getDoc,
    getFirestore,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBTASC8AIMpFhtYA41UrWw3rnzWWomFwPw",
    authDomain: "e-shop-76cff.firebaseapp.com",
    projectId: "e-shop-76cff",
    storageBucket: "e-shop-76cff.appspot.com",
    messagingSenderId: "485049946745",
    appId: "1:485049946745:web:b0bdae219882ecfda07aa8",
    measurementId: "G-9HXBT3ERJL"
  };
  
  // Initialize Firebase
  const firebase = initializeApp(firebaseConfig);
  

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      promt:"select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider); 
  export const db =  getFirestore();
  export const signInWithGoogleRedirect = ()=> signInWithRedirect(auth,provider)

  export const createUserDocumentFromAuth = async (
      userAuth,
      additionalInformation={displayName:'mike'}
      ) =>{
      if(!userAuth) return
      const userDocRef = doc(db,'users',userAuth.uid);
      console.log(userDocRef)
      const userSnapshot = await getDoc(userDocRef);
      console.log(userSnapshot.exists());
      
      if(!userSnapshot.exists()){
          const {displayName,email} = userAuth
          const createdAt = new Date()
  
      
      try{
          await setDoc(userDocRef, {
              displayName,
              email,
              createdAt,
              ...additionalInformation,
          })
      }catch(error){
        console.log('error creating the user',error.message)
      }
    }
      ///if user data not exist

      ///if user data exist

      //return userDocRef
      
  }
      export const crerateAuthUserWithEmailAndPassword = async (email,password) =>{
          if(!email || !password) return;
         return await crerateUserWithEmailAndPassword(auth,email,password)
      } 
      export const signInAuthUserWithEmailAndPasword = async (email,password) =>{
        if(!email || !password) return;
       return await  signInWithEmailAndPassword(auth,email,password)
    } 

    