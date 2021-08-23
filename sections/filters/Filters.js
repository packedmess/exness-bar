import React from 'react';
import PropTypes from 'prop-types';
import MuiList from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemText from '@material-ui/core/ListItemText';
// import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
// import MuiSwitch from '@material-ui/core/Switch';
import MuiDivider from '@material-ui/core/Divider';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MuiCollapse from '@material-ui/core/Collapse';
import {makeStyles} from '@material-ui/core/styles';
import {connectMobX} from '@/mobx';
import {Link as LinkTo} from 'react-scroll';

const useStyles = makeStyles(theme => ({
  innerListItem: {
    paddingLeft: theme.spacing(4),
  },
  link: {
    display: 'block',
  },
  active: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
}));

const Filters = ({store}) => {
  const classes = useStyles();

  const [isCollapseOpened, setCollapseOpened] = React.useState(false);

  const handleClick = () => {
    setCollapseOpened(!isCollapseOpened);
  };

  // const [isChecked, setChecked] = React.useState({
  //   ['has_alcohol=1']: false,
  //   ['is_hot=1']: false,
  // });

  // const handleSwitchChange = event => {
  //   setChecked({
  //     ...isChecked,
  //     [event.target.name]: event.target.checked,
  //   });
  // };

  // React.useEffect(() => {
  //   const filter = Object.keys(isChecked)
  //     .filter(key => isChecked[key] === true)
  //     .join('&');
  //   filters(filter);
  // }, [isChecked]);

  return (
    <div>
      <MuiList disablePadding>
        <MuiDivider />
        <MuiListItem button onClick={handleClick}>
          <MuiListItemText>Categories</MuiListItemText>
          {isCollapseOpened ? <ExpandLess /> : <ExpandMore />}
        </MuiListItem>
        <MuiCollapse in={isCollapseOpened} timeout="auto" unmountOnExit>
          <MuiList disablePadding>
            {store.categoriesStore.categories.map(category => {
              const drinks = store.drinksStore.filterDrinksByCategory(category.id);

              if (drinks.length === 0) {
                return null;
              }

              return (
                <LinkTo
                  key={category.id}
                  className={classes.link}
                  activeClass={classes.active}
                  to={category.title}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}>
                  <MuiListItem button className={classes.innerListItem}>
                    <MuiListItemText>{category.title}</MuiListItemText>
                  </MuiListItem>
                </LinkTo>
              );
            })}
          </MuiList>
        </MuiCollapse>
        {/* <MuiDivider />
        <MuiListItem dense>
          <MuiFormControlLabel
            control={
              <MuiSwitch name="has_alcohol=1" checked={isChecked['has_alcohol']} onChange={handleSwitchChange} />
            }
            label="Alcohol"
          />
        </MuiListItem>
        <MuiListItem dense>
          <MuiFormControlLabel
            control={<MuiSwitch name="is_hot=1" checked={isChecked['is_hot']} onChange={handleSwitchChange} />}
            label="Hot"
          />
        </MuiListItem> */}
      </MuiList>
    </div>
  );
};

Filters.propTypes = {
  store: PropTypes.object,
  filters: PropTypes.func,
};

export default connectMobX(Filters);
