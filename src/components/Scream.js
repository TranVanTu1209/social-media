import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import * as dataActions from '../redux/action/dataAction';
import * as actionTypes from '../redux/types';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import ScreamDialog from '../components/ScreamDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '99%',
    marginBottom: '10px',
    display: 'flex',
    padding: '5px'
  },
  media: {
    height: 'auto',
    width: '200px',
    border: '1px solid #999',
    borderRadius: '3px'
  },
  avatar: {
    backgroundColor: '#89216b',
  },
  content: {
    lineHeight: '1.7'
  },
  count: {
    marginRight: '5px',
    fontSize: '17px',
    fontWeight: '600'
  },
  icon: {
    color: '#666'
  }
}));

const Scream = ({ scream }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const classes = useStyles();
  const { body, userHandle, createdAt, userImage, likesCount, commentsCount, screamId } = scream;
  const likes = useSelector(state => state.user.likes);
  const isLiked = likes.filter(like => like.screamId === screamId).length > 0 ? true : false;

  const toggleLikeScream = () => {
    if (!isLiked)
    {
      dispatch({
        type: actionTypes.LIKE_SCREAM,
        payload: scream
      });
      dispatch(dataActions.likeScream(screamId));

    } else
    {
      dispatch({
        type: actionTypes.UNLIKE_SCREAM,
        payload: scream
      });
      dispatch(dataActions.unlikeScream(screamId));
    }
  }
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={userImage} title="Profile Image" />
      <CardContent className={classes.content}>
        <Typography variant="h5" color="primary" component={Link} to={`/user/${userHandle}`} >
          @{userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {moment(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">
          {body}
        </Typography>
        {
          !user.authenticated ? <Typography variant="body1">
            Please login to have more actions
          </Typography> : <CardActions>
              <Button onClick={toggleLikeScream} >
                <span className={classes.count}> {likesCount} </span>
                {isLiked ? <FavoriteIcon color="secondary" /> :
                  <FavoriteBorderIcon className={classes.icon} />}
              </Button>
              <Button>
                <span className={classes.count}> {commentsCount} </span> <CommentIcon className={classes.icon} />
              </Button>
              {
                user.credentials.handle === userHandle ? <Button onClick={() => dispatch(dataActions.deleteScream(screamId))} color="secondary">
                  <DeleteIcon /> Delete
                  </Button> : null
              }
            </CardActions>
        }
        <ScreamDialog screamId={screamId} userHandle={userHandle} />
      </CardContent>
    </Card>
  );
}

export default Scream;
