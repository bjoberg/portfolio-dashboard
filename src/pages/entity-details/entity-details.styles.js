import { headerHeight } from '../../utils/styles/theme';

const EntityDetailsStyles = theme => ({
  container: {
    marginTop: headerHeight,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: theme.spacing(2),
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
  },
  details: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
  },
  photo: {
    margin: theme.spacing(2),
    maxWidth: '600px !important',
    maxHeight: '400px !important',
    alignSelf: 'center',
  },
  inputButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  progressBarContainer: {
    marginTop: headerHeight,
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
});

export default EntityDetailsStyles;
