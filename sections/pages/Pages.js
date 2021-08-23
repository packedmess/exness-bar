import React from 'react';
import PropTypes from 'prop-types';
import MuiList from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MuiCollapse from '@material-ui/core/Collapse';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  innerListItem: {
    paddingLeft: theme.spacing(4),
  },
}));

const Pages = ({isCatalogPage}) => {
  const classes = useStyles();

  const [isCollapseOpened, setCollapseOpened] = React.useState(true);

  const handleClick = () => {
    setCollapseOpened(!isCollapseOpened);
  };

  return (
    <div>
      <MuiListItem button onClick={handleClick}>
        <MuiListItemText>Pages</MuiListItemText>
        {isCollapseOpened ? <ExpandLess /> : <ExpandMore />}
      </MuiListItem>
      <MuiCollapse in={isCollapseOpened} timeout="auto" unmountOnExit>
        <MuiList disablePadding>
          <MuiListItem button selected={!isCatalogPage} className={classes.innerListItem}>
            <Link href="orders">
              <MuiListItemText>Orders</MuiListItemText>
            </Link>
          </MuiListItem>
          <MuiListItem button selected={isCatalogPage} className={classes.innerListItem}>
            <Link href="catalog">
              <MuiListItemText>Catalog</MuiListItemText>
            </Link>
          </MuiListItem>
        </MuiList>
      </MuiCollapse>
    </div>
  );
};

Pages.propTypes = {
  isCatalogPage: PropTypes.bool,
};

export default Pages;
