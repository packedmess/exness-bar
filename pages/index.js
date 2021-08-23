import React from 'react';
import PropTypes from 'prop-types';
import MuiBox from '@material-ui/core/Box';
import MuiButton from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import {makeStyles} from '@material-ui/core/styles';

import Page from '@/components/Page';
import {connectMobX} from '@/mobx';
import {roofBarApi} from '@/utils/api';
import GoogleIcon from '@/public/assets/icons/google.svg';
import {Role} from '@/utils/enums';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: 'calc(100vh - 64px)', // TODO: replace headerHeight by variable
    backgroundColor: theme.palette.secondary.main,
    flexDirection: 'column',
  },
  button: {
    minWidth: 220,
    marginBottom: 15,
    '&:last-child': {
      marginBottom: 0,
    },
  },
}));

const Index = ({store}) => {
  const {authStore} = store;
  const classes = useStyles();

  return (
    <Page title="Home" accessRedirectTo={authStore.info.role === Role.BARMAN ? '/orders' : '/catalog'} publicAccessOnly>
      <MuiBox className={classes.root}>
        <MuiButton
          className={classes.button}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<FacebookIcon />}
          onClick={roofBarApi.openFbLoginDialog}>
          Log in with FaceBook
        </MuiButton>
        <MuiButton
          className={classes.button}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<GoogleIcon width={22} height={22} />}
          onClick={roofBarApi.openGoogleLoginDialog}>
          Log in with Google
        </MuiButton>
      </MuiBox>
    </Page>
  );
};

Index.propTypes = {
  store: PropTypes.object,
};

export default connectMobX(Index);
