import { useNavigate } from 'react-router-dom';

import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from './directoryItem-styled';

import PropTypes from 'prop-types';

const DirectoryItem = ({ category: {imageUrl, title, route } }) => {
	const navigate = useNavigate();
  
  return (
    <DirectoryItemContainer onClick={() => navigate(route)}>
      <BackgroundImage
        className='background-image'
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

DirectoryItem.propTypes = {
  category: PropTypes.shape({
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    route: PropTypes.string,
  }).isRequired,
};

export default DirectoryItem;