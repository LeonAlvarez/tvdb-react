import React, { useContext } from 'react';
import { MyThemeContext } from 'contexts/myThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { Styled } from './styled';

//TODO animate with framer motion

const ThemeToggler = () => {
  const themeContext = useContext(MyThemeContext);

  const handleToggle = () => {
    themeContext.themeToggler();
  };
  return (
    <Styled.Wrapper themeColor={themeContext.theme}>
      <Styled.CheckBox
        type="checkbox"
        checked={themeContext.theme === 'dark'}
        onChange={handleToggle}
      />
      <Styled.Toggler>
        <FontAwesomeIcon icon={themeContext.theme === 'dark' ? faMoon : faSun} />
      </Styled.Toggler>
    </Styled.Wrapper>
  );
};

export default ThemeToggler;
