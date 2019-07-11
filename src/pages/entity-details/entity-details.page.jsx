import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import AlertDialog from '../../components/alert-dialog/alert-dialog.component';
import SnackbarContentWrapper from '../../components/snackbar-content/snackbar-content.component';
import GroupFormContent from '../../components/group-form-content/group-form-content.component';
import ImageFormContent from '../../components/image-form-content/image-form-content.component';
import ImageFormActions from '../../components/image-form-actions/image-form-actions.component';
import ImageService from '../../services/image.service';
import GroupService from '../../services/group.service';
import imageObj from '../../models/image.model';
import groupObj from '../../models/group.model';
import EntityType from '../../utils/enums/entity-type.enum';
import EntityDetailsStyles from './entity-details.styles';

const imageService = new ImageService();
const groupService = new GroupService();
const useStyles = makeStyles(EntityDetailsStyles);

const EntityDetailsPage = (props) => {
  const classes = useStyles();
  const { entityType, history, match } = props;
  const routeId = match.params.id;

  // Entity object being displayed
  const entityObj = entityType === 'image' ? imageObj : groupObj;
  const [entity, setEntity] = useState(entityObj);

  // Are we creating a new image, or modifying an existing one?
  const [isValidEntity, setIsValidEntity] = useState(false);

  // Page loading status
  const [pageIsLoaded, setPageIsLoaded] = useState(false);

  // Should input buttons be disabled?
  const [inputIsDisabled, setInputIsDisabled] = useState(false);

  // Visibility state of the alert dialog
  const [alertIsOpen, setAlertIsOpen] = useState(false);

  // Status of the snackbar
  const [snackbarStatus, setSnackbarStatus] = useState('success');

  // Content of the snackbar
  const [snackbarContent, setSnackbarContent] = useState('');

  // Visibility state of the snackbar
  const [snackbarIsOpen, setSnackBarIsOpen] = useState(false);

  /**
   * Open the snackbar as a notification
   * @param {string} variant of the snackbar to display
   * @param {string} message to display in the snackbar
   */
  const openSnackbar = (variant, message) => {
    setSnackbarStatus(variant);
    setSnackbarContent(message);
    setSnackBarIsOpen(true);
  };

  useEffect(() => {
    /**
     * Get an image with the provided id
     * @param {string} id is the id of the image to fetch
     */
    const getImageAsync = async (id) => {
      try {
        setPageIsLoaded(false);
        setEntity(await imageService.getImage(id));
      } catch (error) {
        openSnackbar('error', error.message);
      } finally {
        setPageIsLoaded(true);
      }
    };

    /**
     * Get a group with the provided id
     * @param {string} id is the id of the group to fetch
     */
    const getGroupAsync = async (id) => {
      try {
        setPageIsLoaded(false);
        setEntity(await groupService.getGroup(id));
      } catch (error) {
        openSnackbar('error', error.message);
      } finally {
        setPageIsLoaded(true);
      }
    };

    // Make the request for entity data
    // Determine what request to make based on the type of entity being displayed
    switch (entityType) {
      case EntityType.IMAGE:
        getImageAsync(routeId);
        break;
      case EntityType.GROUP:
        getGroupAsync(routeId);
        break;
      default:
        openSnackbar('error', `${entityType} is an invalid entityType.`);
        break;
    }
  }, [entityType, routeId]);

  const handleDeleteAsync = async () => {
    console.log('deleting...');
  };

  const handleUpdateAsync = async () => {
    console.log('updating...');
  };

  const handleCreateAsync = async () => {
    console.log('creating...');
  };

  const handleTextFieldChange = (e) => {
    setEntity({
      ...entity,
      [e.target.id]: e.target.value,
    });
  };

  if (!pageIsLoaded) {
    return (
      <div className={classes.progressBarContainer}>
        <LinearProgress />
      </div>
    );
  }
  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.main}>
          <img
            id="thumbnail"
            className={classes.photo}
            src={entity.thumbnailUrl}
            alt="thumbnail"
          />
          <img
            id="image"
            className={classes.photo}
            src={entity.imageUrl}
            alt="img"
          />
        </div>
        <form className={classes.details} autoComplete="off">
          {(() => {
            switch (entityType) {
              case EntityType.IMAGE: return (
                <ImageFormContent
                  image={entity}
                  isDisabled={inputIsDisabled}
                  textFieldHandler={handleTextFieldChange}
                />
              );
              case EntityType.GROUP: return (
                <GroupFormContent
                  group={entity}
                  isDisabled={inputIsDisabled}
                  textFieldHandler={handleTextFieldChange}
                />
              );
              default: return 'Error';
            }
          })()}
          <div className={classes.inputButtonGroup}>
            <ImageFormActions
              imageExists={isValidEntity}
              isDisabled={inputIsDisabled}
              handleDelete={() => setAlertIsOpen(true)}
              handleUpdate={handleUpdateAsync}
              handleCreate={handleCreateAsync}
            />
          </div>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbarIsOpen}
      >
        <SnackbarContentWrapper
          className={classes.snackbarMargin}
          onClose={() => setSnackBarIsOpen(false)}
          variant={snackbarStatus}
          message={snackbarContent}
        />
      </Snackbar>
      <AlertDialog
        isOpen={alertIsOpen}
        handleClose={() => setAlertIsOpen(false)}
        title={`Delete ${entityType}`}
        body={`You are about to delete this ${entityType}. Are you sure you want to continue?`}
        handleConfirm={handleDeleteAsync}
      />
    </Fragment>
  );
};

EntityDetailsPage.propTypes = {
  entityType: PropTypes.oneOf([EntityType.IMAGE, EntityType.GROUP]).isRequired,
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      state: PropTypes.string,
      key: PropTypes.string,
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default EntityDetailsPage;
