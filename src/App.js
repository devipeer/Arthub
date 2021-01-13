import React, { useState, useEffect } from 'react'; 
import './App.css';
import logo from './logo.png';
import Post from './Post';
import { db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  Button: {
    color: '#ffffff'
  }
}));

const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => { // useEffect runs a piece on a specific condition
    // code runs here 
    db.collection('posts').onSnapshot(snapshot => {
    // everytime a post is added, this code runs
      setPosts(snapshot.docs.map(doc => ({ 
        id: doc.id,
        post: doc.data()
        })));
    })
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const signUp = (event) => {

  }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={handleClose}
      >
        {<div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Im a modal</h2>      
    </div>}
      </Modal>

      <div className="app__header">
        <img className="app__headerImage" src={logo} alt=""/>
        <StyledButton className="signUpButton" onClick={() => setOpen(true)}>Sign Up</StyledButton>
      </div>
     
      {
        posts.map(({ id, post }) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }

    </div>
  );
}

export default App;