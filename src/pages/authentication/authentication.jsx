import SignUpForm from '../../components/sigh-up-form/signUpForm';
import SignInForm from '../../components/sigh-in-form/signInForm';

const Authentication = () => {
  return (
    <div >
      <h1>Sign In Page</h1>
			<div style={{display: "flex", justifyContent: "space-around"}}>
				<SignInForm />
				<SignUpForm />
			</div>
      
    </div>
  );
};

export default Authentication;