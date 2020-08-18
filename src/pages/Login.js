import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import logo from '../assets/logo.png';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import spinner from '../assets/spinner.gif';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as userActions from '../redux/action/userAction';

export const useStyles = makeStyles((theme) => ({
  form: {
    textAlign: 'center',
    margin: 'auto'
  },
  logo: {
    width: '150px',
    margin: '20px auto'
  },
  textField: {
    marginBottom: '15px'
  },
  button: {
    display: 'block',
    width: '100%',
    marginTop: '20px'
  },
  error: {
    color: 'red',
    marginTop: '10px'
  },
  choice: {
    fontSize: '15px',
    marginTop: '10px',
    display: 'block'
  }
}));

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const ui = useSelector(state => state.ui);
  const { loading, errors } = ui;
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(userActions.login(userData, history));
  }
  return (
    <Grid container className={classes.form}>
      <Grid item sm bgcolor="blue" />
      {
        loading ? <img src={spinner} className="spinner" alt="Spinner" /> : <Grid item sm bgcolor="red">
          <img className={classes.logo} src={logo} alt="Icon Logo" />
          <Typography variant="h4" >
            Login As User
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField className={classes.textField} label="Email..."
              fullWidth type="email" helperText={errors?.email}
              error={errors?.email ? true : false}
              value={email} onChange={e => setEmail(e.target.value)} />
            <TextField className={classes.textField} label="Password..."
              error={errors?.password ? true : false}
              fullWidth type="password" helperText={errors?.password}
              value={password} onChange={e => setPassword(e.target.value)} />
            {
              errors?.general && <Typography variant="body2" className={classes.error} >
                {errors.general}
              </Typography>
            }
            <Button variant="contained" color="secondary" size="large" type="submit" className={classes.button} >
              Login
            </Button>
            <small className={classes.choice}>
              Do not have an account ? <Link to="/signup" >Sign Up</Link>
            </small>
          </form>
        </Grid>
      }
      <Grid item sm bgcolor="green" />
    </Grid>
  );
}

export default Login;
