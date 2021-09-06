import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import MuiBadge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiAppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import MuiLink from '@material-ui/core/Link';
import MuiGrid from '@material-ui/core/Grid';
import MuiContainer from '@material-ui/core/Container';
import LogoIcon from 'public/assets/icons/logo.svg';
import LogoMobileIcon from 'public/assets/icons/logo-mobile.svg';
import Modal from '@/components/Modal';
import Cart from '@/components/Cart';
import EditCard from '@/sections/catalog/EditCard';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {makeStyles} from '@material-ui/core/styles';
import MuiAvatar from '@material-ui/core/Avatar';
import Search from '@/components/Search';
import Pages from '@/sections/pages/Pages';
import MuiTooltip from '@material-ui/core/Tooltip';
import {concatLinks} from '@/utils/url';
import {connectMobX} from '@/mobx';
import theme from '@/styles/theme';

const useStyles = makeStyles(theme => ({
  logo: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  logoMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  logoWrapper: {
    marginRight: 'auto',
  },
  page: {
    marginRight: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(2),
    },
  },
}));

const Header = ({isLoggedIn, isCatalogPage, avatar, store}) => {
  const classes = useStyles();

  const {isBarman} = store.authStore.roleInfo;

  const [isModalOpened, setModalOpened] = React.useState(false);

  const handleModalOpen = () => {
    setModalOpened(true);
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  const cartCount = store.cartStore.items.length;

  const [searchQuery, setSearchQuery] = React.useState(null);

  const searchValue = value => {
    setSearchQuery(value);
  };







  React.useEffect(() => {
    if (store.authStore.isLoggedIn) {
      store.drinksStore.fetchFilteredData(searchQuery);
    }
  }, [searchQuery]);

  return (
    <MuiAppBar position="sticky">
      <MuiContainer maxWidth="xl">
        <MuiToolbar disableGutters={true}>
          <MuiGrid container direction="row" alignItems="center" spacing={theme.breakpoints.down('sm') ? 0 : 2}>
            <MuiGrid item className={classes.logoWrapper}>
              <MuiLink href={isBarman ? 'orders' : 'catalog'} color="inherit">
                <LogoIcon width={144} height={18} className={classes.logo} />
                <LogoMobileIcon width={45} height={18} className={classes.logoMobile} />
              </MuiLink>
            </MuiGrid>
            {isLoggedIn && (
              <>
                {isBarman && (
                  <MuiGrid item className={classes.page}>
                    <Pages isCatalogPage={isCatalogPage} />
                  </MuiGrid>
                )}
                {isCatalogPage && (
                  <MuiGrid item>
                    <Search searchValue={searchValue} />
                  </MuiGrid>
                )}

                <MuiGrid item>
                  {isBarman ? (
                    isCatalogPage && (
                      <MuiIconButton onClick={handleModalOpen}>
                        <MuiTooltip title="Add a drink" arrow>
                          <AddCircleIcon color="secondary" />
                        </MuiTooltip>
                      </MuiIconButton>
                    )
                  ) : (
                    <MuiIconButton onClick={cartCount > 0 ? handleModalOpen : null} color="inherit">
                      <MuiBadge color="secondary" badgeContent={cartCount}>
                        <MuiTooltip title={cartCount > 0 ? 'Cart' : 'Cart is empty'} arrow>
                          <ShoppingCartIcon />
                        </MuiTooltip>
                      </MuiBadge>
                    </MuiIconButton>
                  )}
                </MuiGrid>
                <MuiGrid item>
                  <Link href="profile">
                    <MuiIconButton href="">
                      <MuiAvatar src={concatLinks(process.env.NEXT_PUBLIC_API_STORAGE_URL, avatar)} />
                    </MuiIconButton>
                  </Link>
                </MuiGrid>
              </>
            )}
          </MuiGrid>
        </MuiToolbar>
      </MuiContainer>
      <Modal
        isModalOpened={isModalOpened}
        handleModalClose={handleModalClose}
        title={isBarman ? 'Add new drink' : 'Your order'}>
        {isBarman ? <EditCard handleModalClose={handleModalClose} /> : <Cart handleModalClose={handleModalClose} />}
      </Modal>
    </MuiAppBar>
  );
};

Header.propTypes = {
  isCatalogPage: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  avatar: PropTypes.string,
  store: PropTypes.object,
};

export default connectMobX(Header);
