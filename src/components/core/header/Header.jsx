import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_ROUTES, NAV_LINKS, ROLES, THEME } from '../../../constants';
import { 
  StyledPrimaryLink,
  StyledSecondaryLink,
} from '../../common/styled/StyledComponents';
import './Header.css';
import { logoutUser } from '../../../reducers/user/actionCreator';
import Button from '../../common/button/Button';
import { toggleTheme } from '../../../reducers/theme/actionCreator';
import messages from '../../../nls/en.json';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { theme, user: { userType, isLoggedIn } } = useSelector(state => state);
  const handleLogoutClick = () => {
    dispatch(logoutUser());
    navigate(DEFAULT_ROUTES[ROLES.DEFAULT]);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <header>
      <div className='header-title-container'>
        <Link to={DEFAULT_ROUTES[userType]}>
          <span className='navbar-brand'>{messages.BRAND_NAME}</span>
        </Link>
      </div>
      <div className='header-nav-container'>
        <div>
          {NAV_LINKS.filter(item => userType === item.role).map((item, index) => (
            <NavLink
              key={index}
              to={item.url}
              className={`header-nav`}
            >
              {item.title}
            </NavLink>
          ))}
        </div>
        <div>
          {!isLoggedIn ? (
            <>
              <StyledPrimaryLink theme={theme} to={'/sign-in'}>{messages.SIGN_IN}</StyledPrimaryLink>
              <StyledSecondaryLink theme={theme} to={'/sign-up'}>{messages.SIGN_UP}</StyledSecondaryLink>
            </>
          ) : (
            <>
              <NavLink
                to={'/my-profile'}
                className={`header-nav`}
              >
                {messages.MY_PROFILE}
              </NavLink>
              <Link
                to={'/'}
                onClick={handleLogoutClick}
                className={`header-nav`}
              >
                {messages.LOGOUT_TEXT}
              </Link>
            </>
          )}
          <Button
            type="button"
            name="toggleThemeBtn"
            onClick={handleThemeToggle}
            priority="primary"
            theme={theme}
            label={theme === THEME.LIGHT ? messages.DARK_THEME : messages.LIGHT_THEME}
          />
        </div>
      </div>
    </header>
  )
}

export default Header;