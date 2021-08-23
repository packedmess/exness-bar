import React from 'react';
import PropTypes from 'prop-types';
import MuiGrid from '@material-ui/core/Grid';
import MuiContainer from '@material-ui/core/Container';
import MuiAvatar from '@material-ui/core/Avatar';
import MuiBox from '@material-ui/core/Box';
import MuiTypography from '@material-ui/core/Typography';
import MuiButton from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {makeStyles} from '@material-ui/core/styles';
import Page from '@/components/Page';
import ProfileComments from '@/sections/profileComments/ProfileComments';
import Orders from '@/sections/orders';
import {connectMobX} from '@/mobx';
import {concatLinks} from '@/utils/url';
import {roofBarApi} from '@/utils/api';
import {Role} from '@/utils/enums';

const useStyles = makeStyles(theme => ({
  profileWrapper: {display: 'flex', alignItems: 'center'},
  avatar: {
    marginRight: theme.spacing(2),
  },
  logout: {
    marginLeft: 'auto',
  },
}));

const Profile = ({store}) => {
  const classes = useStyles();
  const {authStore} = store;
  const {isBarman} = store.authStore.roleInfo;

  const fetchPageData = async () => {
    await Promise.all([store.ordersStore.fetchData()]);
  };

  React.useEffect(() => {
    fetchPageData();
  }, []);

  // Handlers
  const handleLogOutClick = () => {
    roofBarApi.removeToken();
    window.location.replace('/');
  };

  return (
    <Page title="User profile" access={[Role.BUYER, Role.BARMAN]}>
      <MuiContainer>
        <MuiBox py={2}>
          <MuiGrid container direction="column" spacing={2}>
            <MuiGrid item className={classes.profileWrapper}>
              <MuiAvatar
                src={concatLinks(process.env.NEXT_PUBLIC_API_STORAGE_URL, authStore.info.avatar)}
                className={classes.avatar}
              />
              <div>
                <MuiTypography variant="h5" component="h2">
                  {`${authStore.info['first_name']} ${authStore.info['last_name']}`}
                </MuiTypography>
                <MuiTypography variant="body2" component="p" color="textSecondary">
                  {authStore.info.role}
                </MuiTypography>
              </div>
              <MuiButton
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ExitToAppIcon />}
                className={classes.logout}
                onClick={handleLogOutClick}>
                Log out
              </MuiButton>
            </MuiGrid>
            {!isBarman && (
              <>
                <MuiGrid item>
                  <Orders isProfilePage />
                </MuiGrid>
                <MuiGrid item>
                  <ProfileComments />
                </MuiGrid>
              </>
            )}
          </MuiGrid>
        </MuiBox>
      </MuiContainer>
    </Page>
  );
};

Profile.propTypes = {
  store: PropTypes.object,
};

export default connectMobX(Profile);
