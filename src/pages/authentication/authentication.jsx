import SignUpForm from '../../components/sigh-up-form/signUpForm';
import SignInForm from '../../components/sigh-in-form/signInForm';

import './authentication.scss';

const Authentication = () => {
  return (
    <div className='authentication-container'>
			<SignInForm />
			<SignUpForm />
		</div>
  );
};

export default Authentication;