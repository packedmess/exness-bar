import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import MuiLink from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles({
  link: {
    cursor: 'pointer',
  },
});

const Pages = ({isCatalogPage}) => {
  const classes = useStyles();

  const page = (
    <Link href={isCatalogPage ? 'orders' : 'catalog'}>
      <MuiLink color="inherit" className={classes.link}>
        <Typography variant="body1">{isCatalogPage ? 'Оrders' : 'Сatalog'}</Typography>
      </MuiLink>
    </Link>
  );

  return page;
};

Pages.propTypes = {
  isCatalogPage: PropTypes.bool,
};

export default Pages;
