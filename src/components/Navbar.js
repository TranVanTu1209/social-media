import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import * as dataActions from '../redux/action/dataAction';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '1.9'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '500px',
    height: '45vh'
  },
  textField: {
    marginBottom: '15px'
  },
  button: {
    marginBottom: '15px'
  }
}));


const Navbar = () => {
  const authenticated = useSelector(state => state.user.authenticated);
  const [body, setBody] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(dataActions.createScream({ body }));
    setOpen(false);
    setBody('');
  }
  return (
    <AppBar position="fixed">
      <Toolbar className="nav-container">
        {
          authenticated ? (<React.Fragment>
            <Tooltip title="Home">
              <IconButton component={Link} to="/">
                <HomeIcon color="action" /> 
              </IconButton>
            </Tooltip>
            <Tooltip title="Create a scream">
              <IconButton onClick={handleOpen} >
                <AddIcon color="action" /> 
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton>
                <NotificationsIcon color="action" /> 
              </IconButton>
            </Tooltip>
          </React.Fragment>
          ) : (
              <React.Fragment>
                <Button component={Link} to="/" color="inherit">
                  Home
                </Button>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={Link} to="/signup" color="inherit">
                  Sign Up
                </Button>
              </React.Fragment>
            )
        }
      </Toolbar>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Post a scream</h2>
            <form onSubmit={handleSubmit}>
              <TextField label="Scream Body..." className={classes.textField}
                fullWidth type="text" value={body} onChange={e => setBody(e.target.value)} />
              <Button disabled={!body ? true : false} variant="contained" className={classes.button} color="primary" size="large" type="submit">
                Submit
              </Button>
            </form>
            <Button style={{ float: 'right' }} className={classes.button} onClick={handleClose} color="secondary" variant="contained">
              Close
            </Button>
          </div>
        </Fade>
      </Modal>
    </AppBar>
  );
}
export default Navbar;
