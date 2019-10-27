const HomePageStyles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  media: {
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xl')]: {
      height: 700,
      flex: 0.5,
    },
    [theme.breakpoints.down('lg')]: {
      height: 600,
      flex: 0.5,
    },
    [theme.breakpoints.down('md')]: {
      height: 500,
      flex: 0.75,
    },
    [theme.breakpoints.down('sm')]: {
      height: 400,
      flex: 1,
    },
    [theme.breakpoints.down('xs')]: {
      height: 400,
      flex: 1,
    },
  },
  content: {
    padding: theme.spacing(2),
    flex: 1,
  },
  img: {
    objectFit: 'cover',
    maxHeight: '100%',
  },
});

export default HomePageStyles;
