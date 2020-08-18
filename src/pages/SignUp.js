import React, { useState } from 'react';
import { useStyles } from './Login';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import logo from '../assets/logo.png';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import spinner from '../assets/spinner.gif';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as userActions from '../redux/action/userAction';

const SignUp = ({ history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [handle, setHandle] = useState('');
  const ui = useSelector(state => state.ui);
  const { loading, errors } = ui;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password, confirmPassword, handle };
    dispatch(userActions.signup(userData, history));
  }
  return (
    <Grid container className={classes.form}>
      <Grid item sm bgcolor="blue" />
      {
        loading ? <img src={spinner} className={classes.spinner} alt="Spinner" /> : <Grid item sm bgcolor="red">
          <img className={classes.logo} src={logo} alt="Icon Logo" />
          <Typography variant="h4">
            Create An Account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField className={classes.textField} label="Handle User..."
              fullWidth type="text" helperText={errors?.handle}
              error={errors?.handle ? true : false}
              value={handle} onChange={e => setHandle(e.target.value)} />

            <TextField className={classes.textField} label="Email..."
              fullWidth type="email" helperText={errors?.email}
              error={errors?.email ? true : false}
              value={email} onChange={e => setEmail(e.target.value)} />

            <TextField className={classes.textField} label="Password..."
              error={errors?.password ? true : false}
              fullWidth type="password" helperText={errors?.password}
              value={password} onChange={e => setPassword(e.target.value)} />

            <TextField className={classes.textField} label="Confirm Password..."
              error={errors?.confirmPassword ? true : false}
              fullWidth type="password" helperText={errors?.confirmPassword}
              value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            {
              errors?.general && <Typography variant="body2" className={classes.error} >
                {errors.general}
              </Typography>
            }
            <Button variant="contained" color="secondary" size="large" type="submit" className={classes.button} >
              Sign Up
            </Button>
            <small className={classes.choice}>
              Already have an account ? <Link to="/login" >Sign In</Link>
            </small>
          </form>
        </Grid>
      }
      <Grid item sm bgcolor="green" />
    </Grid>
  );

}
export default SignUp;