import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Slide } from '@material-ui/core';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import axios from 'axios';

import LikeDislikeSnackbar from './LikeDislikeSnackbar';
const useStyles = makeStyles((theme) => ({
  thumbsUp: {
    fontSize: '14pt',
  },
  thumbsDown: {
    fontSize: '14pt',
  },
  green: {
    color: 'green',
  },
  red: {
    color: 'rgb(210, 0, 0)',
  },
  neutral: {
    color: 'rgb(200,200,200)',
  },
}));

type Props = {
  url: String,
  likeStatus: -1 | 0 | 1,
  size?: Number,
};

export default function LikeDislikeButtons(props: Props) {
  const styles = useStyles();
  const [currentLikeStatus, changeLikeStatus] = useState(props.likeStatus);
  const [snackbarMode, setSnackbarMode] = useState(null);
  const [transition, setTransition] = useState(undefined);

  async function likePressed() {
    const { data } = await axios.post('/changeLikeStatus', {
      likeStatus: currentLikeStatus === 1 ? 0 : 1,
      url: props.url,
    });
    if (data['success'] === 1) {
      changeLikeStatus(data['content']['newLikeStatus']);
      setSnackbarMode(
        data['content']['newLikeStatus'] === 1 ? 'like' : 'likeNeutral'
      );
      setTransition(() => slideRight);
    }
  }

  async function dislikePressed() {
    const { data } = await axios.post('/changeLikeStatus', {
      likeStatus: currentLikeStatus === -1 ? 0 : -1,
      url: props.url,
    });
    if (data['success'] === 1) {
      changeLikeStatus(data['content']['newLikeStatus']);
      setSnackbarMode(
        data['content']['newLikeStatus'] === -1 ? 'dislike' : 'dislikeNeutral'
      );
      setTransition(() => slideRight);
    }
  }

  function handleSnackbarClose(event, reason) {
    setSnackbarMode(null);
  }

  function slideRight(props) {
    return <Slide {...props} direction="right" />;
  }

  return (
    <>
      <LikeDislikeSnackbar
        mode={snackbarMode}
        handleClose={handleSnackbarClose}
        transition={transition}
      />
      <IconButton aria-label="Like" onClick={likePressed}>
        <FaThumbsUp
          className={[
            props.size ? null : styles.thumbsDown,
            currentLikeStatus === 1 ? styles.green : styles.neutral,
          ].join(' ')}
        />
      </IconButton>
      <IconButton aria-label="Dislike" onClick={dislikePressed}>
        <FaThumbsDown
          className={[
            props.size ? null : styles.thumbsDown,
            currentLikeStatus === -1 ? styles.red : styles.neutral,
          ].join(' ')}
        />
      </IconButton>
    </>
  );
}
