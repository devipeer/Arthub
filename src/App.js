import React, { useState, useEffect } from 'react'; 
import './App.css';
import logo from './logo.png';
import Post from './Post';
import { auth, db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed'

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
    backgroundColor: '#fff',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '30px 30px',
    margin: '10px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [openSignIn, setOpenSignIn] = useState('');
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => { // listens for changes on frontend
    const unsubscribe = auth.onAuthStateChanged((authUser) => { // listens for changes on backend
      if(authUser) {
        //user logged in
        console.log(authUser);
        setUser(authUser);
      } else {
      //user logged out
      setUser(null);
      }
    })
    return () => {
      //perform some clean up
      unsubscribe();
    }
  }, [user, username]);

  useEffect(() => { // useEffect runs a piece on a specific condition
    // code runs here 
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
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
      event.preventDefault();
      auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
         return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));
  };

  const signIn = (event) => {
    event.preventDefault();
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))
  };

  return (
    <div className="app">

      <Modal
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
            <Button type="submit" onClick={signUp}>Sign Up</Button>     
        </form>  
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
            <Button type="submit" onClick={signIn}>Log In</Button>     
        </form>  
        </div>
      </Modal>

      <div className="app__header">
        <img className="app__headerImage"
          src={logo}
          alt=""
        />
        {user?.displayName ? (
      <ImageUpload username={user.displayName} />
      ) : (
        <h3>Login to upload!</h3>
      )}
        {user ? (
          <StyledButton onClick={() => auth.signOut()}>Logout</StyledButton>
        ): (
          <div className="app__loginContainer">
          <StyledButton onClick={(signIn) => setOpenSignIn(true)}>Log In</StyledButton>
          <StyledButton onClick={(signUp) => setOpen(true)}>Sign Up</StyledButton>
          </div>
        )}
      </div>

      <div className="app__posts">
        <div className="app__postsLeft">
        {
          posts.map(({ id, post }) => (
            <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          ))
        }
        </div>
      </div>

      {user?.displayName ? (
      <ImageUpload username={user.displayName} />
      ) : (
        <h3>Login to upload!</h3>
      )}
    </div>
  );
}

export default App;