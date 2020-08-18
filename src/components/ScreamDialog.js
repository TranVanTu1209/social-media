import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import * as dataActions from '../redux/action/dataAction';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import * as actionTypes from '../redux/types';
import SendIcon from '@material-ui/icons/Send';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  center: {
    width: '150px',
    display: 'block',
    margin: '2rem auto '
  },
  screamImage: {
    width: '100%',
    paddingRight: '15px',
    borderRadius: '5px'
  },
  dialog: {
    minWidth: '300px !important',
    minHeight: '300px !important'
  },
  marginBottom: {
    marginTop: '10px'
  },
  count: {
    marginRight: '5px',
    fontSize: '17px',
    fontWeight: '600'
  },
  icon: {
    color: '#666'
  },
  comments: {
    padding: '1rem 0'
  },
  textBox: {
    fontSize: '1rem',
    padding: '8px',
    display: 'block',
    width: '100%',
    flex: '1'
  },
  submit: {
    backgroundColor: '#4b6cb7',
    color: '#fff',
    border: 'none',
    padding: '8px 25px',
    borderRadius: '3px',
    cursor: 'pointer'
  },
  form: {
    width: '100%',
    display: 'flex',
    marginBottom: '10px'
  }
}));

const ScreamDialog = ({ screamId }) => {
  const data = useSelector(state => state.data);
  const loading = useSelector(state => state.ui.loading);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [text, setText] = useState('');
  const isLiked = user.likes.filter(like => like.screamId === screamId).length > 0 ? true : false;

  const toggleLikeScream = () => {
    if (!isLiked)
    {
      dispatch({
        type: actionTypes.LIKE_SCREAM,
        payload: data.scream
      });
      dispatch(dataActions.likeScream(screamId));

    } else
    {
      dispatch({
        type: actionTypes.UNLIKE_SCREAM,
        payload: data.scream
      });
      dispatch(dataActions.unlikeScream(screamId));
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
    dispatch(dataActions.getScream(screamId));
  };

  const handleClose = () => {
    setOpen(false);
    dispatch({
      type: actionTypes.CLEAR_SCREAM
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(dataActions.addComment(screamId, { body: text }));
    setText('');
  };

  return (
    <div className={classes.screamDialog}>
      <Tooltip title="View scream details">
        <Button color="primary" onClick={handleClickOpen}>
          View Detail
        </Button>
      </Tooltip>
      <Dialog className={classes.dialog} open={open} onClose={handleClose}
        aria-labelledby="form-dialog-title">
        {
          loading ? <CircularProgress color="primary" className={classes.center} /> : null}
        {
          data.scream && <DialogContent>
            <Grid container>
              <Grid item xs={5}>
                <img src={data.scream.userImage} alt={data.scream.body} className={classes.screamImage} />
              </Grid>
              <Grid item xs={7}>
                <Typography variant="h5" color="primary" component={Link} to={`/user/${data.scream.userHandle}`} >
                  @{data.scream.userHandle}
                </Typography>
                <br />
                <Typography className={classes.marginBottom} variant="body2" >
                  {moment(data.scream.createdAt).format('h:mm:a, DD MM YYYY')}
                </Typography>
                <br />
                <Typography variant="body1">
                  {data.scream.body}
                </Typography>
              </Grid>
            </Grid>
            {
              !user.authenticated ? <Typography variant="body1">
                Please login to have more actions
              </Typography> : <Fragment>
                  <Button onClick={toggleLikeScream} >
                    <span className={classes.count}> {data.scream.likesCount} </span>
                    {isLiked ? <FavoriteIcon color="secondary" /> :
                      <FavoriteBorderIcon className={classes.icon} />}
                  </Button>
                  <Button>
                    <span className={classes.count}> {data.scream.commentsCount} </span> <CommentIcon className={classes.icon} />
                  </Button>
                  {
                    user.credentials.handle === data.scream.userHandle ? <Button
                      onClick={() => {
                        dispatch(dataActions.deleteScream(screamId));
                        handleClose();
                      }} color="secondary">
                      <DeleteIcon /> Delete
                  </Button> : null
                  }
                  <hr />
                  <div className={classes.comments}>
                    {
                      data && data.scream.comments.map((cmt, id) => (
                        <div key={id} className="media">
                          <img src={cmt.userImage} alt={cmt.body} />
                          <div className="content">
                            <Typography variant="h5" color="primary" component={Link} to={`/user/${cmt.userHandle}`}>
                              @{cmt.userHandle}
                            </Typography>
                            <p>
                              {moment(cmt.createdAt).fromNow()}
                            </p>
                            <p>
                              {cmt.body}
                            </p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </Fragment>
            }
          </DialogContent>
        }
        <DialogActions>
          <form className={classes.form} onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter comment..." className={classes.textBox}
              value={text} onChange={e => setText(e.target.value)} />
            <button disabled={!text ? true : false} type="submit" className={classes.submit}> <SendIcon /> </button>
          </form>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ScreamDialog;
