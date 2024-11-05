import {useState} from 'react';

import FormInput from '../../ui/form-input/formInput';
import Button from '../../ui/button/button';

import { createAuthUserWithEmailAndPassword, 
createUserDocumentFromAuth } from '../../utils/firebase';

import './signUpForm.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {displayName, email, password, confirmPassword} = formFields;

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}
	
		try {
			const {user} = await createAuthUserWithEmailAndPassword(email, password);
			await createUserDocumentFromAuth(user, {displayName});
			setFormFields(defaultFormFields);
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('Email already in use');
			} else {
				console.error("user creation encountered an error", error);
			}
		}
	};

  const handleChange = async (event) => {
		const {name, value} = event.target;
		setFormFields({...formFields, [name]: value});
  };

  return (
    <div className='sign-up-container'>
			<h2>Don&apos;t have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
					label={"Display Name"}
          type="text"
          required
          name="displayName"
					onChange={handleChange}
          value={displayName}
        />
        <FormInput
					label={"Email"}
					type="email" 
					required
					onChange={handleChange}
					name="email" 
					value={email} 
				/>
        <FormInput
					label={"Password"}
          type="password"
          required
					onChange={handleChange}
          name="password"
          value={password}
        />
        <FormInput
				label={"Confirm Password"}
          type="password"
          required
					onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;