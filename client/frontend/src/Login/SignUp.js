import React from 'react';
import LoginBox from './LoginBox';
import HomepageBackground from './HomepageBackground';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  login: {
    fontSize: '25px',
    letterSpacing: '3px',
    color: '#DC1F06',
    marginBottom: '-10px',
    fontWeight: 'bold',
  },
  creds: {
    width: '400px',
    height: '5px',
    borderRadius: '2px',
    padding: '2%',
    margin: '10px',
    marginLeft: '20px',
  },
  creds2: {
    width: '400px',
    height: '5px',
    borderRadius: '2px',
    padding: '2%',
    margin: '10px',
    marginLeft: '20px',
  },
  label: {
    marginLeft: '-500px',
    color: '#DC1F06',
  },
  label2: {
    marginLeft: '-470px',
    color: '#DC1F06',
  },
  submit: {
    backgroundColor: '#38698E',
    height: '30px',
    width: '180px',
    fontSize: '16px',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '4px',
    marginTop: '5px',
  },
}));

export default function SignUp(props) {
  const styles = useStyles();

  return (
    <>
      <HomepageBackground />
      <LoginBox>
        <form>
          <p className={styles.login}> L O G I N</p>
          <br></br>
          <label className={styles.label}>
            Name <br></br>
            <input
              className={styles.creds}
              type="text"
              placeholder="Enter Name"
              name="name"
              required
            ></input>
          </label>
          <br></br>
          <label className={styles.label}>
            Email <br></br>
            <input
              className={styles.creds}
              type="text"
              placeholder="Enter Email"
              name="name"
              required
            ></input>
          </label>
          <br></br>
          <label className={styles.label2}>
            Password <br></br>
            <input
              className={styles.creds2}
              type="password"
              placeholder="Enter password"
              name="password"
            ></input>
          </label>
          <br></br>
          <input type="submit" className={styles.submit} value="Submit" />
        </form>
      </LoginBox>
    </>
  );
}
