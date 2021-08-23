/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import MuiInputBase from '@material-ui/core/InputBase';
import MuiIconButton from '@material-ui/core/IconButton';
import Modal from '@/components/Modal';
import {fade, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: 'auto',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  searchMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: theme.spacing(20),
    '&:focus': {
      width: theme.spacing(30),
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

const Search = ({searchValue}) => {
  const classes = useStyles();

  const [isModalOpened, setModalOpened] = React.useState(false);

  const handleModalOpen = () => {
    setModalOpened(true);
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  const [value, setValue] = React.useState('');

  const handleSearchChange = event => {
    const value = event.target.value ? `q=${event.target.value}` : null;
    setValue(event.target.value);
    searchValue(value);
  };

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <MuiInputBase
          placeholder="Search…"
          onChange={handleSearchChange}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </div>
      <MuiIconButton color="inherit" className={classes.searchMobile} onClick={handleModalOpen}>
        <SearchIcon />
      </MuiIconButton>
      <Modal isModalOpened={isModalOpened} handleModalClose={handleModalClose} title="Search" submitTitle="">
        <MuiInputBase
          placeholder="Search…"
          onChange={handleSearchChange}
          autoFocus
          value={value}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </Modal>
    </>
  );
};

Search.propTypes = {
  searchValue: PropTypes.func,
};

export default Search;
