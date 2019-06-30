const ImageFormStyles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: theme.spacing(2),
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1)
  },
  details: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1)
  },
  photo: {
    margin: "20px 0px 20px 0px",
    maxWidth: "600px !important",
    maxHeight: "400px !important",
    alignSelf: "center"
  },
  inputButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  progressBarContainer: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  snackbarMargin: {
    margin: theme.spacing(1),
  }
});

export { ImageFormStyles };