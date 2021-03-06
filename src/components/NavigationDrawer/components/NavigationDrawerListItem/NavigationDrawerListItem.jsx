import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  ListItem, ListItemIcon, ListItemText, Typography,
} from '@material-ui/core';

import NavigationDrawerListItemStyles from './NavigationDrawerListItem.styles';

const useStyles = makeStyles(NavigationDrawerListItemStyles);

const NavigationDrawerListItem = (props) => {
  const classes = useStyles();
  const { item, handleClose } = props;

  return (
    <Typography
      component="a"
      href={item.route}
      onClick={handleClose}
      className={classes.link}
    >
      <ListItem button className={classes.listItem}>
        <ListItemIcon className={classes.listIcon}>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.title} />
      </ListItem>
    </Typography>
  );
};

NavigationDrawerListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.element,
    route: PropTypes.string,
  }).isRequired,
  handleClose: PropTypes.func,
};

NavigationDrawerListItem.defaultProps = {
  handleClose: () => { },
};

export default NavigationDrawerListItem;
