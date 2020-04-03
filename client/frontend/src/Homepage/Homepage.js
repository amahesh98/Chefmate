import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { TextField, IconButton } from '@material-ui/core';
import { FaSearch } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../images/logo.png';
import axios from 'axios';

import HeaderSimple from '../Headers/HeaderSimple';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ReactPlayer from "react-player"

import { theme } from './theme';
import { connect } from 'react-redux';

const useStyles = (colors) =>
  makeStyles((theme) => ({
  container: {
    width: '100vw',
    height: '100vh',
    background: colors.background,
  },  
  searchField: {
    width: '80vw',
    maxWidth: '700px',
    marginBottom: '25px',
    background: colors.searchBarBackground,
  },
  logo: {
    width: '500px',
    height: '125px',
    marginBottom: '50px',
    //background: 'rgb(40,40,40)',
  },
  contents: {
    marginTop: '100px',
    //background: 'rgb(40,40,40)',
  },
  searchButton: {
    //fontSize: '22pt',
    fontSize: '22pt',
    marginLeft: '6px',
    //color: 'rgb(230, 95, 85)',
    color: 'rgb(230, 95, 85)',
    //background: 'rgb(40,40,40)',
  },
  music: {
    backgroundColor: 'red',
    bottom: '0',
    height: '100px',
    position: 'fixed'
  }
}));
type Props = {
  theme: String,
};
function Homepage(props: Props) {
  const colors = props.theme === 'light' ? theme.colors : theme.darkColors;
  const styles = useStyles(colors)();
  const [query, changeQuery] = useState('');
  const [loginRedirect, changeLoginRedirect] = useState(false);
  const [autocompleteData, changeAutocompleteData] = useState([]);

  async function checkAuthentication() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') return;
    const { data } = await axios.get('/checkAuthenticated');
    if (data.success === 0) {
      changeLoginRedirect(true);
    }
  }

  useEffect(() => {
    checkAuthentication();
  }, []);

  async function handleAutocompleteChange(_, newValue) {
    changeQuery(newValue);

    if (newValue.length >= 3) {
      const { data } = await axios.get(`/autocomplete/${newValue}`);
      if (data['success'] === 1) {
        const { queries } = data['content'];
        const queryTermList = [];
        for (var i = 0; i < queries.length; i++) {
          queryTermList.push(queries[i]['_id']);
        }
        changeAutocompleteData(queryTermList);
      }
    }
  }
  async function handleQueryChange(event) {
    changeQuery(event.target.value);

    if (event.target.value.length >= 3) {
      const { data } = await axios.get(`/autocomplete/${event.target.value}`);
      if (data['success'] === 1) {
        const { queries } = data['content'];
        const queryTermList = [];
        for (var i = 0; i < queries.length; i++) {
          queryTermList.push(queries[i]['_id']);
        }
        changeAutocompleteData(queryTermList);
      }
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && query.length !== 0) {
      window.location.href = `/result/${query}`;
    }
  }

  return (
    <div className={styles.container}>
      <HeaderSimple />
      {loginRedirect && <Redirect to="/login" />}
      <div className={styles.contents}>
        <img src={logo} className={styles.logo} alt="Chefmate logo" />
        <br />
        <Autocomplete
          freeSolo
          disableClearable
          options={autocompleteData.map((option) => option)}
          onChange={handleAutocompleteChange}
          onKeyDown={handleKeyDown}
          renderInput={(params) => (
            <>
              <TextField
                {...params}
                label="Search"
                type="search"
                variant="outlined"
                onChange={handleQueryChange}
                className={styles.searchField}
                value={query}
              />
              <a href={query.length !== 0 ? `/result/${query}` : undefined}>
                <IconButton
                  edge="start"
                  className={styles.searchButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <FaSearch />
                </IconButton>
              </a>
            </>
          )}
        />
      </div>
    </div> 
  );
}
const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps, {})(Homepage);

