import './button.scss';
import PropTypes from 'prop-types';

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};
Button.propTypes = {
  children: PropTypes.node.isRequired,
  buttonType: PropTypes.oneOf(['google', 'inverted']),
};

export default Button;