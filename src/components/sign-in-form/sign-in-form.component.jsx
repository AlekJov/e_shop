import Button from "../button/button.component";
import { useState } from "react";
import { 
    crerateAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth,
    signInWithGooglePopup,  
    signInAuthUserWithEmailAndPasword}
     from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";     
import './sign-in-form.styles.scss'     




const defaultFormFields = {
    
    email:'',
    password:'',
  
}


const SignInForm = () =>{
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {email,password,} = formFields;
    const resetFormFields = ()=>{
        setFormFields(defaultFormFields)
    };

    const signInWithGoogle = async () =>{
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
      
     }
 

    const handleSubmit = async (event)=>{
         event.preventDefault();
       
         try {
             const response = await signInAuthUserWithEmailAndPasword(email,password)
            
             resetFormFields();
         }catch(error){
             switch(error.code){
                 case 'auth/wrong-password':
                     alert ('incorect password for email');
                     break
                  case 'auth/user-not-found':
                      alert ('no user assosisated with email')  
                  break;
                  default:
                      console.log(error)     
             }
           //  if(error.code === "auth/wrong-password"){
            //     alert('incoret password for email')
          //   }else if(auth/user-not-found)
    
         }
    };

    const handleChange = (event)=>{
      const {name,value}= event.target;
      setFormFields({...formFields,[name]:value})
    }
    return (
        <div className="sign-up-container">
             <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
              
                <FormInput 
                label="Email"
                type="email" 
                required 
                onChange={handleChange} 
                name="email" 
                value={email}/>

                <FormInput
                label="Password"
                 type="password"
                  required 
                  onChange={handleChange} 
                  name="password" 
                  value={password}/>

               
                 <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <button buttonType='google' onClick={signInWithGoogle}>Google sign in</button>
                 </div>
                
            </form>
        </div>
    );
};

export default SignInForm