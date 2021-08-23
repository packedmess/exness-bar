import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {},
}));

function ${TM:COMPONENT_NAME}Section() {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      ${TM:COMPONENT_NAME} section
    </section>
  );
}

export default ${TM:COMPONENT_NAME}Section;
