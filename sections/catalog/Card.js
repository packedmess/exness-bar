import PropTypes from 'prop-types';
import MuiCard from '@material-ui/core/Card';
import MuiCardContent from '@material-ui/core/CardContent';
import MuiCardMedia from '@material-ui/core/CardMedia';
import MuiButton from '@material-ui/core/Button';
import MuiTypography from '@material-ui/core/Typography';
import MuiBox from '@material-ui/core/Box';
import MuiGrid from '@material-ui/core/Grid';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MuiTooltip from '@material-ui/core/Tooltip';
import {makeStyles} from '@material-ui/core/styles';
import {connectMobX} from '@/mobx';
import {Role} from '@/utils/enums';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto 1fr',
    '&:hover, &:active': {
      boxShadow: '0px 2px 4px 0px rgb(0 0 0 / 20%), 0px 2px 3px 0px rgb(0 0 0 / 14%), 0px 1px 6px 0px rgb(0 0 0 / 12%)',
    },
  },
  icons: {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
  },
  image: {
    width: '100%',
    height: 0,
    paddingBottom: '100%',
    backgroundSize: 'contain',
  },
  content: {
    display: 'grid',
    gridTemplateRows: 'auto auto 1fr auto',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  button: {
    '&:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
    flexGrow: 1,
  },
  buttonFullWidth: {
    width: '100%',
  },
}));

const Card = ({drink, handleModalOpen, handleDrinkDelete, handleAddToCart, isInCart, store}) => {
  const classes = useStyles();

  const isBarman = store.authStore.info.role === Role.BARMAN;

  return (
    <MuiCard className={classes.root}>
      <MuiGrid container className={classes.icons}>
        {drink['has_alcohol'] && (
          <MuiGrid item>
            <MuiTooltip title="Alcohol" arrow>
              <LocalBarIcon color="secondary" />
            </MuiTooltip>
          </MuiGrid>
        )}
        {drink['is_hot'] && (
          <MuiGrid item>
            <MuiTooltip title="Hot" arrow>
              <WhatshotIcon color="secondary" />
            </MuiTooltip>
          </MuiGrid>
        )}
      </MuiGrid>
      <MuiCardMedia className={classes.image} image={drink.picture} />
      <MuiCardContent className={classes.content}>
        <MuiTypography variant="h4" gutterBottom>
          {drink.title}
        </MuiTypography>
        <MuiTypography variant="body2" color="textSecondary" gutterBottom>
          {drink.volume ? `${drink.volume} ml` : null}
        </MuiTypography>
        <MuiTypography variant="body2">{drink.description}</MuiTypography>
        <MuiBox className={classes.buttons}>
          {isBarman ? (
            <>
              <MuiButton
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => handleModalOpen(drink.id)}>
                Edit
              </MuiButton>
              <MuiButton
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => handleDrinkDelete(drink.id)}>
                Delete
              </MuiButton>
            </>
          ) : (
            <MuiButton
              variant="contained"
              color="secondary"
              className={classes.buttonFullWidth}
              onClick={() => handleAddToCart(drink.id)}>
              {isInCart ? 'In сart' : 'Add to cart'}
            </MuiButton>
          )}
        </MuiBox>
      </MuiCardContent>
    </MuiCard>
  );
};

Card.propTypes = {
  handleModalOpen: PropTypes.func,
  handleDrinkDelete: PropTypes.func,
  handleAddToCart: PropTypes.func,
  drink: PropTypes.object,
  isInCart: PropTypes.bool,
  store: PropTypes.object,
};

export default connectMobX(Card);
