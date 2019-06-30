import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { HeaderDrawer } from '../';
import HeaderStlyes from './header.styles';

const useStyles = makeStyles(HeaderStlyes);

/**
 * Page Header component
 */
const Header = (props) => {
  const classes = useStyles();
  const { title, drawerIsOpen, handleToggleDrawer } = props;

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerIsOpen,
        })} >
        <Toolbar>
          <IconButton
            edge="start"
            className={clsx(classes.menuButton, drawerIsOpen && classes.hide)}
            color="inherit"
            aria-label="Menu"
            onClick={handleToggleDrawer} >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <HeaderDrawer 
        isOpen={drawerIsOpen}
        handleClose={handleToggleDrawer}/>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  drawerIsOpen: PropTypes.bool,
  handleToggleDrawer: PropTypes.func
};

export default Header;