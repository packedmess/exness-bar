import React from 'react';
import MuiList from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MuiIconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import MuiTypography from '@material-ui/core/Typography';
import MuiBox from '@material-ui/core/Box';

const ProfileComments = () => {
  return (
    <MuiBox pb={2}>
      <MuiTypography variant="h3" component="h2" gutterBottom>
        My comments
      </MuiTypography>
      <MuiList disablePadding>
        <MuiListItem button>
          <MuiListItemText>Beer Beer Beer Beer, Beer Beer Beer Beer, Beer Beer Beer Beer</MuiListItemText>
          <MuiListItemSecondaryAction>
            <MuiIconButton edge="end" aria-label="delete">
              <CancelIcon />
            </MuiIconButton>
          </MuiListItemSecondaryAction>
        </MuiListItem>
        <MuiListItem button>
          <MuiListItemText>Smoothie</MuiListItemText>
          <MuiListItemSecondaryAction>
            <MuiIconButton edge="end" aria-label="delete">
              <CancelIcon />
            </MuiIconButton>
          </MuiListItemSecondaryAction>
        </MuiListItem>
        <MuiListItem button>
          <MuiListItemText>Soda</MuiListItemText>
          <MuiListItemSecondaryAction>
            <MuiIconButton edge="end" aria-label="delete">
              <CancelIcon />
            </MuiIconButton>
          </MuiListItemSecondaryAction>
        </MuiListItem>
        <MuiListItem button>
          <MuiListItemText>Sport Nutrition</MuiListItemText>
          <MuiListItemSecondaryAction>
            <MuiIconButton edge="end" aria-label="delete">
              <CancelIcon />
            </MuiIconButton>
          </MuiListItemSecondaryAction>
        </MuiListItem>
      </MuiList>
    </MuiBox>
  );
};

export default ProfileComments;
