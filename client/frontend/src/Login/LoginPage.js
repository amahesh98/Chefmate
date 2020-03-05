import React from 'react';
import logo from '../images/logo.png';
import LoginBox from './LoginBox';
// import './HomepageBackground.css';
import HomepageBackground from './HomepageBackground';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  img: {
    width: '650px',
    zIndex: '3',
    marginTop: '10px',
  },
}));

export default function Login(props) {
  const styles = useStyles();
  return (
    <>
      <HomepageBackground />
      <LoginBox>
        <img src={logo} className={styles.img} alt="Chefmate logo" />
        <a href="/auth/google">Login with Google</a>
        {/* <button id="btn"> LOGIN </button> <br></br>
        <button id="btn"> SIGN UP </button> */}
      </LoginBox>
    </>
  );
}
