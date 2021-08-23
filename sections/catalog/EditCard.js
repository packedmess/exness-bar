import React from 'react';
import PropTypes from 'prop-types';
import {Switches as MuiSwitch, TextField as MuiTextField, Select as MuiSelect} from 'mui-rff';
import {Form} from 'react-final-form';
import MuiButton from '@material-ui/core/Button';
import MuiFormControl from '@material-ui/core/FormControl';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiTypography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {DropzoneArea} from 'material-ui-dropzone';
import {roofBarApi} from '@/utils/api';
import {connectMobX} from '@/mobx';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& .MuiTextField-root, & .MuiFormControl-root': {
      margin: theme.spacing(1),
    },
    '& .MuiFormControlLabel-root': {
      marginRight: 0,
    },
    '& .MuiDropzoneArea-root': {
      margin: theme.spacing(1),
      minHeight: theme.spacing(18),
      border: '1px dashed rgba(0, 0, 0, 0.23)',
      '&:hover, &:focus': {
        border: '1px dashed rgba(0, 0, 0, 0.87)',
      },
      '& .MuiDropzoneArea-text': {
        fontWeight: 'normal',
        color: theme.palette.text.grey,
      },
      '& .MuiDropzoneArea-icon': {
        color: theme.palette.text.grey,
      },
      '& .MuiDropzonePreviewList-root': {
        width: '100%',
        margin: 0,
        justifyContent: 'center',
      },
      '& .MuiDropzonePreviewList-imageContainer': {
        padding: 0,
        maxWidth: '100%',
        flexBasis: 'auto',
        '&:hover .MuiDropzonePreviewList-image': {
          opacity: 1,
        },
      },
      '& .MuiDropzonePreviewList-image': {
        display: 'block',
        marginBottom: theme.spacing(2),
      },
      '& .MuiDropzonePreviewList-removeButton': {
        display: 'none',
      },
    },
  },
  volume: {
    display: 'flex',
    width: theme.spacing(16),
    marginRight: theme.spacing(1),
  },
  volumeMl: {marginTop: 16},
  category: {
    width: theme.spacing(30),
    '& .MuiFormControl-root': {
      margin: 0,
    },
    '& .MuiOutlinedInput-input': {
      paddingTop: 10.5,
      paddingBottom: 10.5,
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 12px) scale(1)',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
    },
  },
  alcohol: {},
  hot: {},
  dropzone: {width: '100%'},
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
}));

const EditCard = ({drink, store}) => {
  const classes = useStyles();

  const [success, setSuccess] = React.useState(false);

  const [file, setFile] = React.useState(null);

  const validate = values => {
    const errors = {};

    if (!values.title) {
      errors.title = 'Required';
    }

    if (!values.description) {
      errors.description = 'Required';
    }

    if (!values['category_id']) {
      errors['category_id'] = 'Required';
    }

    return errors;
  };

  const handleFormSubmit = async values => {
    const data = {
      picture: file,
      ...values,
    };

    const response = drink ? await roofBarApi.editDrink(drink.id, data) : await roofBarApi.addDrink(data);

    if (response.success) {
      setSuccess(true);
      await store.drinksStore.fetchFilteredData();
    } else {
      alert(JSON.stringify(response.payload));
    }
  };

  const initialValues = {
    ['has_alcohol']: false,
    ['is_hot']: false,
    ['is_out_of_stock']: false,
  };

  const drinkValues = {
    title: drink?.title,
    description: drink?.description,
    volume: drink?.volume,
    ['category_id']: drink?.category?.id,
    ['has_alcohol']: drink?.['has_alcohol'],
    ['is_hot']: drink?.['is_hot'],
    ['is_out_of_stock']: drink?.['is_out_of_stock'],
  };

  return (
    <>
      {success ? (
        <>
          <MuiTypography variant="body1" align="center" gutterBottom>
            {drink ? 'Drink edited successfully' : 'Drink added successfully'}
          </MuiTypography>
        </>
      ) : (
        <Form
          validate={validate}
          onSubmit={handleFormSubmit}
          initialValues={drink ? drinkValues : initialValues}
          render={({handleSubmit, submitting}) => (
            <form id="add-drink" noValidate autoComplete="off" onSubmit={handleSubmit} className={classes.root}>
              <MuiTextField id="title" label="Title" variant="outlined" size="small" fullWidth name="title" />
              <MuiTextField
                id="description"
                label="Description"
                variant="outlined"
                size="small"
                fullWidth
                name="description"
                multiline
                rows={4}
              />
              <div className={classes.volume}>
                <MuiTextField id="volume" label="Volume" variant="outlined" size="small" name="volume" />
                <MuiTypography variant="body1" className={classes.volumeMl}>
                  ml
                </MuiTypography>
              </div>
              <div>
                <MuiSwitch
                  name="has_alcohol"
                  data={{label: 'Alcohol', value: 'has_alcohol'}}
                  className={classes.alcohol}
                />
                <MuiSwitch name="is_hot" data={{label: 'Hot', value: 'is_hot'}} className={classes.hot} />
              </div>
              <DropzoneArea
                name="picture"
                acceptedFiles={['image/*']}
                filesLimit={1}
                dropzoneText={'Drag and drop image of drink here or click'}
                showAlerts={false}
                onChange={files => setFile(files[0])}
                className={classes.dropzone}
              />
              <MuiFormControl className={classes.category}>
                <MuiSelect name="category_id" label="Category" variant="outlined">
                  {store.categoriesStore.categories.map(category => {
                    return (
                      <MuiMenuItem key={category.id} value={category.id}>
                        {category.title}
                      </MuiMenuItem>
                    );
                  })}
                </MuiSelect>
              </MuiFormControl>
              <MuiSwitch name="is_out_of_stock" data={{label: 'Out of stock', value: 'is_out_of_stock'}} />
              <div className={classes.footer}>
                <MuiButton variant="contained" color="primary" type="submit" disabled={submitting}>
                  Save changes
                </MuiButton>
              </div>
            </form>
          )}
        />
      )}
    </>
  );
};

EditCard.propTypes = {
  handleModalClose: PropTypes.func,
  store: PropTypes.object,
  drink: PropTypes.object,
};

export default connectMobX(EditCard);
