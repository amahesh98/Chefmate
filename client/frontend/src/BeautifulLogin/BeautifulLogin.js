import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import logo from '../images/logo.png';
import clsx from 'clsx';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  card: {
    width: '450px',
    paddingTop: '30px',
  },
  logo: {
    height: '40px',
  },
  header: {
    fontSize: '14pt',
    fontWeight: 'bold',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  emailField: {
    width: '375px',
    marginTop: '30px',
  },
  passwordField: {
    marginTop: '20px',
    width: '375px',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12 + 155,
    marginLeft: -12,
  },
  button: {
    marginTop: '40px',
    width: '275px',
    fontSize: '12pt',
    height: '50px',
  },
  signup: {
    display: 'block',
    marginTop: '20px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '13pt',
    '&:hover': {
      textDecoration: 'underline',
    },
    marginBottom: '15px',
  },
}));

export default function BeautifulLogin() {
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = React.useState(false);
  const [username, changeUsername] = useState('');
  const [password, changePassword] = useState('');
  const [usernameErr, changeUsernameErr] = useState(false);
  const [passwordErr, changePasswordErr] = useState(false);

  const timer = React.useRef();

  const buttonClassname = clsx({
    [styles.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleLoginClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
    changeUsernameErr(true);
    changePasswordErr(true);
  };

  function handleUsernameChange(event) {
    changeUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    changePassword(event.target.value);
  }

  return (
    <div className={styles.wrapper}>
      <Card raised className={styles.card}>
        <CardContent>
          <img src={logo} alt="Chefmate Logo" className={styles.logo} />
          <p className={styles.header}>Sign in to Continue</p>
          <TextField
            error={usernameErr}
            label="Email"
            variant="outlined"
            className={styles.emailField}
            onChange={handleUsernameChange}
            helperText={usernameErr ? 'Email not found' : ' '}
          />
          <TextField
            error={passwordErr}
            label="Password"
            variant="outlined"
            className={styles.passwordField}
            type="password"
            onChange={handlePasswordChange}
            helperText={passwordErr ? 'Password is invalid' : ' '}
          />

          <Button
            variant="contained"
            color="primary"
            className={[buttonClassname, styles.button].join(' ')}
            disabled={loading}
            onClick={handleLoginClick}
          >
            Login
          </Button>
          {loading && (
            <CircularProgress size={24} className={styles.buttonProgress} />
          )}
          <a className={styles.signup} href="/#">
            Create an account
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
