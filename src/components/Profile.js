import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import * as userActions from '../redux/action/userAction';
import EditDetail from './EditDetail';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '10px',
    lineHeight: '1.9',
    position: 'relative'
  },
  imageProfile: {
    width: '150px',
    borderRadius: '50%',
    height: '130px'
  },
  buttons: {
    margin: '10px 0',
    textAlign: 'center'
  },
  button: {
    marginRight: '10px'
  },
  icon: {
    fontSize: "18px"
  },
  edit: {
    position: 'absolute',
    top: '50px',
    right: '100px'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
}));
const Profile = () => {
  const classes = useStyles();
  const user = useSelector(state => state.user);
  const { credentials: { handle, imageUrl, bio, website, location, createdAt }, loading, authenticated } = user;
  const dispatch = useDispatch();
  const editImageProfile = () => {
    const profileInput = document.getElementById('imageProfileInput');
    profileInput.click();
  }
  const handleChangeImage = e => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    dispatch(userActions.uploadProfileImage(formData));
  }
  let profileMarkup = !loading ? (authenticated ? (
    <Paper className={classes.paper}>
      <div className={classes.profile} >
        <img className={classes.imageProfile} src={imageUrl} alt={handle} />
        <br />
        <input type="file" id="imageProfileInput" hidden="hidden" onChange={handleChangeImage} />
        <Tooltip title="Change Profile Image" >
          <IconButton className={classes.edit} onClick={editImageProfile} >
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <div className={classes.profileDetails} >
          <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
            @{handle}
          </MuiLink>
          <hr />
          {
            bio && <Typography variant="body2"> {bio}</Typography>
          }
          {
            location && (
              <React.Fragment>
                <LocationOnIcon className={classes.icon} color="primary" /> <span> {location} </span>
                <hr />
              </React.Fragment>
            )
          }
          {
            website && (
              <React.Fragment>
                <LinkIcon color="primary" className={classes.icon} /> <a href={website} rel="noopener noreferrer" target="_blank"> {website} </a>
                <hr />
              </React.Fragment>
            )
          }
          <div>
            <CalendarTodayIcon color="primary" className={classes.icon} /> <span> Joined {moment(createdAt).format('DD-MM-YYYY')} </span>
          </div>
        </div>
        <div className={classes.actions} >
          <Tooltip title="Logout" >
            <IconButton onClick={() => dispatch(userActions.logout())} >
              <ExitToAppIcon color="primary" />
            </IconButton>
          </Tooltip>
          <EditDetail />
        </div>
      </div>
    </Paper>
  ) : (<Paper className={classes.paper}>
    <Typography>
      No profile found.Please login again
    </Typography>
    <div className={classes.buttons} >
      <Button variant="contained" color="primary" component={Link} to="/login" className={classes.button} >
        Login
      </Button>
      <Button variant="contained" color="secondary" component={Link} to="/signup" >
        Sign Up
      </Button>
    </div>
  </Paper>)) : (<h3>Loading...</h3>);
  return profileMarkup;
}

export default Profile;
