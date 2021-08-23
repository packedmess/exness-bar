/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import MuiList from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import MuiTypography from '@material-ui/core/Typography';
import MuiGrid from '@material-ui/core/Grid';
import MuiAvatar from '@material-ui/core/Avatar';
import MuiTooltip from '@material-ui/core/Tooltip';
import Modal from '@/components/Modal';
import {makeStyles} from '@material-ui/core/styles';
import {connectMobX} from '@/mobx';
import {OrderStatus} from '@/utils/enums';
import {concatLinks} from '@/utils/url';
import Order from './Order';

const useStyles = makeStyles(theme => ({
  orderId: {
    width: theme.spacing(20),
  },
  customer: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {display: 'none'},
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  date: {
    flexGrow: 1,
    textAlign: 'right',
    marginRight: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {marginRight: 0},
  },
  buttonInProgress: {
    fill: theme.palette.info.main,
  },
}));

const OrderList = ({isBarman, isProfilePage, store}) => {
  const classes = useStyles();

  const [isModalOpened, setModalOpened] = React.useState(false);
  const [orderToEdit, setOrderToEdit] = React.useState({});

  const handleModalOpen = id => {
    setOrderToEdit(store.ordersStore.findItem(id));
    setModalOpened(true);
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  const renderDate = date => {
    return new Date(date).toLocaleString('en-GB', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderStatus = status => {
    switch (status) {
      case 1:
        return (
          <MuiTooltip title="New" arrow>
            <OfflineBoltIcon color="secondary" />
          </MuiTooltip>
        );
      case 2:
        return (
          <MuiTooltip title="In progress" arrow>
            <WatchLaterIcon className={classes.buttonInProgress} />
          </MuiTooltip>
        );
      case 3:
        return (
          <MuiTooltip title="Completed" arrow>
            <CheckCircleIcon />
          </MuiTooltip>
        );
      case 4:
        return (
          <MuiTooltip title="Declined" arrow>
            <CancelIcon color="error" />
          </MuiTooltip>
        );
      default:
        <MuiTooltip title="New" arrow>
          <OfflineBoltIcon color="secondary" />
        </MuiTooltip>;
    }
  };

  const renderTitleStatus = status => {
    switch (status) {
      case OrderStatus.NEW:
        return 'New';
      case OrderStatus.IN_PROGRESS:
        return 'In progress';
      case OrderStatus.COMPLETED:
        return 'Completed';
      case OrderStatus.DECLINED:
        return 'Declined';
      default:
        'New';
    }
  };

  return (
    <>
      <MuiList disablePadding>
        {store.ordersStore.items
          .slice()
          .reverse()
          .map(item => {
            return (
              <>
                <MuiListItem key={item.id} button onClick={() => handleModalOpen(item.id)}>
                  <MuiGrid container alignItems="center" spacing={2}>
                    <MuiGrid item className={classes.orderId}>
                      <MuiTypography>Order #{item.id}</MuiTypography>
                    </MuiGrid>
                    {isBarman && (
                      <MuiGrid item className={classes.customer}>
                        <MuiAvatar
                          src={concatLinks(process.env.NEXT_PUBLIC_API_STORAGE_URL, item.user.avatar)}
                          className={classes.avatar}
                        />
                        <MuiTypography>
                          {item.user['first_name']} {item.user['last_name']}
                        </MuiTypography>
                      </MuiGrid>
                    )}
                    <MuiGrid item className={classes.date}>
                      <MuiTypography>{renderDate(item['created_at'])}</MuiTypography>
                    </MuiGrid>
                    <MuiGrid item>{renderStatus(item.status)}</MuiGrid>
                  </MuiGrid>
                </MuiListItem>
              </>
            );
          })}
      </MuiList>
      {isModalOpened && (
        <Modal
          isModalOpened={isModalOpened}
          handleModalClose={handleModalClose}
          title={`Order #${orderToEdit.id}`}
          status={renderTitleStatus(orderToEdit.status)}
          isProfilePage={isProfilePage}>
          <Order
            order={orderToEdit}
            renderDate={renderDate}
            onModalClose={handleModalClose}
            isBarman={isBarman}
            isProfilePage={isProfilePage}
          />
        </Modal>
      )}
    </>
  );
};

OrderList.propTypes = {
  isBarman: PropTypes.bool,
  store: PropTypes.object,
  isProfilePage: PropTypes.bool,
};

export default connectMobX(OrderList);
