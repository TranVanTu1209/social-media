import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Scream from '../components/Scream';
import { useSelector, useDispatch } from 'react-redux';
import * as dataActions from '../redux/action/dataAction';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import spinner from '../assets/spinner.gif';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import StreetviewIcon from '@material-ui/icons/Streetview';
import LanguageIcon from '@material-ui/icons/Language';
import EmailIcon from '@material-ui/icons/Email';
import { Link } from 'react-router-dom';
import { baseUrl } from '../config/API_URL';

const UserDetail = () => {
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();
  const handle = useParams().userHandle;
  const [profile, setProfile] = useState(null);
  const loading = useSelector(state => state.data.loading);

  useEffect(() => {
    dispatch(dataActions.getUserData(handle));
    axios.get(`${baseUrl}/user/${handle}`)
      .then(res => {
        setProfile(res.data.user);
      }).catch(err => console.log(err));
  }, [handle, dispatch]);
  return (
    <Grid container >
      <Grid item sm={8} xs={12} >
        {
          loading && <img src={spinner} className="spinner" alt="Spinner" />
        }
        {
          data ? data.screams.map(scream => (
            <Scream key={scream.screamId} scream={scream} />
          )) : <h3>No scream found</h3>
        }
      </Grid>
      <Grid item sm={4} xs={12} >
        <Card>
          {
            profile && <CardContent>
              <div className="media">
                <img src={profile.imageUrl} alt={profile.bio && profile.bio} />
                <div className="content">
                  <Typography color="textSecondary" gutterBottom>
                    {profile.bio && profile.bio}
                  </Typography>
                  <Typography variant="h5" >
                    <EmailIcon color="primary" fontSize="small" /> {profile.email}
                  </Typography>
                </div>
              </div>

              <Typography variant="h6" component="h2">
                <StreetviewIcon color="primary" fontSize="small" /> {profile.location && profile.location}
              </Typography>
              {
                profile.webiste && <Typography color="textSecondary">
                  <LanguageIcon color="primary" fontSize="small" /> {profile.webiste}
                </Typography>
              }
            </CardContent>
          }
          <CardActions>
            <Button component={Link} variant="contained" color="primary" to="/">Go back home </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserDetail;
