
import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../images/logo.png';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    container: {
        textAlign: 'Left',
        marginLeft: '20px',
        marginTop: '150px'
    }
}));

function Result() {
    const styles = useStyles();
  return (
      //make this a for loop to iterate multiple search results in this format
    <div className = {styles.container}>
      <p> Insert website name here : www.chefmate.com</p>
      <p> <b> KEY WORDS that was searched</b></p>
      <p> small description of the website </p>
      <br></br>
      <p> Insert website name here : www.chefmate.com</p>
      <p> <b> KEY WORDS that was searched</b></p>
      <p> small description of the website </p>
      <br></br>
      <p> Insert website name here : www.chefmate.com</p>
      <p> <b> KEY WORDS that was searched</b></p>
      <p> small description of the website </p>
      <br></br>
    </div>
  );
}

export default Result;