import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as userActions from '../redux/action/userAction';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '500px',
    height: '55vh'
  },
  textField: {
    marginBottom: '15px'
  },
  button: {
    marginBottom: '15px'
  }
}));

const EditDetail = () => {
  const dispatch = useDispatch();
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userActions.editUserDetail({ bio, website, location }));
    setOpen(false);
  }

  return (
    <React.Fragment>
      <div>
        <Tooltip title="Edit Profile">
          <IconButton onClick={handleOpen}>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
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
              <h2 id="transition-modal-title">Edit your profile for more infomation</h2>
              <form onSubmit={handleSubmit}>
                <TextField label="Bio..." className={classes.textField}
                  fullWidth type="text" value={bio} onChange={e => setBio(e.target.value)} />

                <TextField label="Website..." className={classes.textField}
                  fullWidth type="text" value={website} onChange={e => setWebsite(e.target.value)} />

                <TextField label="Location..." className={classes.textField}
                  fullWidth type="text" value={location} onChange={e => setLocation(e.target.value)} />
                <Button variant="contained" className={classes.button} color="primary" size="large" type="submit">
                  Submit
                </Button>
              </form>
              <Button style={{ float: 'right' }} className={classes.button} onClick={handleClose} color="secondary" variant="contained">
                Close
              </Button>
            </div>
          </Fade>
        </Modal>
      </div>
    </React.Fragment>
  )
}

export default EditDetail;
