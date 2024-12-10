import styled from 'styled-components';

import Button from '../button/Button';

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 3.5rem;
  right: 0.5rem;
  z-index: 5;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  ${Button} {
    margin-top: auto;
  }
`;

// export const EmptyMessage = styled.span`
//   font-size: 18px;
//   margin: 50px auto;
// `;

export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
	&::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
