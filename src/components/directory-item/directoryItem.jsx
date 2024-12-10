import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from './directoryItem-styled';

const DirectoryItem = ({ category: {imageUrl, title} }) => {
  
  return (
    <DirectoryItemContainer>
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

export default DirectoryItem;