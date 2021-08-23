/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import MuiTypography from '@material-ui/core/Typography';
import MuiBox from '@material-ui/core/Box';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiListItem from '@material-ui/core/ListItem';
import MuiTooltip from '@material-ui/core/Tooltip';
import CancelIcon from '@material-ui/icons/Cancel';
import MuiAvatar from '@material-ui/core/Avatar';
import MuiTextField from '@material-ui/core/TextField';
import MuiDivider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import {connectMobX} from '@/mobx';
import {OrderItemStatus} from '@/utils/enums';

const useStyles = makeStyles(theme => ({
  item: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto auto',
    gridTemplateRows: 'auto auto',
    gap: theme.spacing(1),
  },
  itemImageWrapper: {
    gridRow: '1/-1',
    width: 100,
    height: 100,
    [theme.breakpoints.down('sm')]: {
      gridRow: '1/2',
      width: 50,
      height: 50,
    },
  },
  itemImage: {objectFit: 'contain'},
  itemTitle: {},
  itemQuantity: {
    [theme.breakpoints.down('sm')]: {
      gridColumn: '3/4',
      gridRow: '1/2',
    },
  },
  itemCancel: {
    marginRight: -12,
    [theme.breakpoints.down('sm')]: {
      gridColumn: '3/-1',
      gridRow: '1/2',
    },
  },
  itemCancelBarman: {
    marginRight: -12,
    [theme.breakpoints.down('sm')]: {
      gridColumn: '4/-1',
      gridRow: '1/2',
    },
  },
  itemComment: {
    gridColumn: '2/-1',
    [theme.breakpoints.down('sm')]: {
      gridColumn: '1/-1',
    },
  },
}));

const OrderItem = ({isProfilePage, onChange, onBlur, onFocus, name, value, error}) => {
  const classes = useStyles();

  return (
    <>
      <MuiListItem className={classes.item}>
        <MuiAvatar
          variant="rounded"
          src={value.drink.picture}
          classes={{root: classes.itemImageWrapper, img: classes.itemImage}}
        />
        <MuiTypography>{value.drink.title}</MuiTypography>
        <MuiTypography className={classes.itemQuantity}>&#215;{value.quantity}</MuiTypography>
        {isProfilePage && value.status !== OrderItemStatus.DECLINED ? null : (
          <MuiIconButton
            color="default"
            className={classes.itemCancel}
            disabled={isProfilePage}
            onClick={() =>
              onChange({
                ...value,
                status: OrderItemStatus.DECLINED,
              })
            }>
            <MuiTooltip title="Decline" arrow>
              <CancelIcon color={value.status === OrderItemStatus.DECLINED ? 'error' : 'default'} />
            </MuiTooltip>
          </MuiIconButton>
        )}
        <MuiBox className={classes.itemComment}>
          <MuiTypography variant="body2">Additional comments:</MuiTypography>
          <MuiTypography variant="body2" color="textSecondary">
            {value.comment !== '' ? value.comment : 'None'}
          </MuiTypography>
          {isProfilePage ? (
            <>
              <MuiTypography variant="body2">Barman comments:</MuiTypography>
              <MuiTypography variant="body2" color="textSecondary">
                {value.reason !== null ? value.reason : 'None'}
              </MuiTypography>
            </>
          ) : (
            value.status === OrderItemStatus.DECLINED && (
              <MuiBox mt={1}>
                <MuiTextField
                  label="Reason for decline"
                  variant="outlined"
                  size="small"
                  fullWidth
                  autoFocus
                  name={name}
                  error={Boolean(error)}
                  helperText={error}
                  value={value.reason}
                  onChange={event =>
                    onChange({
                      ...value,
                      reason: event.target.value,
                    })
                  }
                  onFocus={event =>
                    onFocus({
                      ...value,
                      reason: event.target.value,
                    })
                  }
                  onBlur={event =>
                    onBlur({
                      ...value,
                      reason: event.target.value,
                    })
                  }
                />
              </MuiBox>
            )
          )}
        </MuiBox>
      </MuiListItem>
      <MuiDivider />
    </>
  );
};

OrderItem.propTypes = {
  isProfilePage: PropTypes.bool.isRequired,
  error: PropTypes.string,

  // Final Form FieldRenderProps
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
};

export default connectMobX(OrderItem);
