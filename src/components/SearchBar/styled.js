import styled from 'styled-components';

const SearchBar = styled.form`
  width: 30rem;
  margin-right: auto;
  display: flex;
  align-items: center;

  @media ${(props) => props.theme.mediaQueries.tabLand} {
    flex: 1;
    margin-left: 3rem;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: var(--color-text);
  transition: background-color 0.2s ease, color 0.2s ease;
  padding-left: 5rem;
  font-family: Montserrat;
  font-weight: 500;

  &:focus::placeholder {
    opacity: 0;
  }
  &:focus {
    outline: none;
  }

  &::placeholder {
    opacity: 40%;
    text-transform: uppercase;
    font-family: Montserrat;
    transition: 0.2s ease;

    @media ${(props) => props.theme.mediaQueries.phone} {
      opacity: 80%;
    }
  }
`;

const SearchIcon = styled.label`
  color: var(--color-red);
  margin-right: -3.5rem;
  margin-top: 3px;
  font-size: 2.2rem;
  cursor: pointer;
  z-index: 999;
  transition: 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Styled = {
  SearchBar,
  SearchInput,
  SearchIcon,
};
