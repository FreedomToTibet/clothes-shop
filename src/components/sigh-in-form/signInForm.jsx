import {useState} from 'react';

import FormInput from '../../ui/form-input/formInput';
import Button from '../../ui/button/button';

import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword
} from '../../utils/firebase';

import './signInForm.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

export const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {email, password} = formFields;

	const handleSubmit = async (event) => {
		event.preventDefault();
	
		try {
			const response = await signInAuthUserWithEmailAndPassword(email, password);
			console.log(response)
			setFormFields(defaultFormFields);
		} catch (error) {
			console.error(error);
		}
	};

	const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
		await createUserDocumentFromAuth(user);
  };
	
  const handleChange = async (event) => {
		const {name, value} = event.target;
		setFormFields({...formFields, [name]: value});
  };

  return (
    <div className='sign-up-container'>
			<h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
					label="Email"
					type="email" 
					required
					onChange={handleChange}
					name="email" 
					value={email} 
				/>
        <FormInput
					label="Password"
          type="password"
          required
					onChange={handleChange}
          name="password"
          value={password}
        />
				<div className='buttons-container'>
					<Button type="submit">Sign In</Button>
        	<Button type="button" buttonType="google" onClick={signInWithGoogle}>Google sign in</Button>
				</div> 
      </form>
    </div>
  );
};

export default SignInForm;