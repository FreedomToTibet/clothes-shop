import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import FormInput from '../../ui/form-input/formInput';
import Button from '../../ui/button/Button';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase';

import './signUpForm.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
	const [error, setError] = useState('');
  const {displayName, email, password, confirmPassword} = formFields;
	const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
		setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
		setError('');

		if (!displayName || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(email, password);

      if (!response || !response.user) {
        throw new Error('Failed to create user account');
      }

      await createUserDocumentFromAuth(response.user, { displayName });
      resetFormFields();
			navigate('/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email is already registered. Please use a different email.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else {
        setError('Error creating account. Please try again.');
        console.error('User creation error:', error);
      }
    }
  };

  const handleChange = async (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
		setError('');
  };

  return (
    <div className="sign-up-container">
      <h2>Don&apos;t have an account?</h2>
      <span>Sign Up with your email and password</span>
			{error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <FormInput
          label={'Display Name'}
          type="text"
          required
          name="displayName"
          onChange={handleChange}
          value={displayName}
        />
        <FormInput
          label={'Email'}
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label={'Password'}
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <FormInput
          label={'Confirm Password'}
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
