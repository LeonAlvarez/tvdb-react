import styled from 'styled-components';

const SearchBar = styled.form`
  width: 40rem;
  margin-right: auto;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: var(--text-color);
  transition: 0.2s ease;
  padding-left: 5rem;

  &:focus::placeholder {
    opacity: 0;
  }

  &::placeholder {
    opacity: 35%;
    color: var(--text-color);
    text-transform: uppercase;
    font-family: Montserrat;
  }
`;

const SearchIcon = styled.label`
  color: var(--color-red);
  margin-right: -3.5rem;
  font-size: 2.2rem;
  cursor: pointer;
  z-index: 999;
`;

export const Styled = {
  SearchBar,
  SearchInput,
  SearchIcon,
};