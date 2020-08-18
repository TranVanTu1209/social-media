import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream';
import Profile from '../components/Profile';
import { useSelector, useDispatch } from 'react-redux';
import { getScreams } from '../redux/action/dataAction';
import spinner from '../assets/spinner.gif';

const Home = (props) => {
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getScreams());
  }, [dispatch]);
  let recentScreamMarkup = data.screams?.length > 0 && !data.loading ? (
    data.screams.map(scream => (<Scream key={scream.screamId} scream={scream} />))
  ) : <img src={spinner} alt="Loading" className="spinner" />;
  return (
    <Grid container >
      <Grid item sm={8} xs={12} >
        {
          recentScreamMarkup
        }
      </Grid>
      <Grid item sm={4} xs={12} >
        <Profile />
      </Grid>
    </Grid>
  );
}

export default Home;