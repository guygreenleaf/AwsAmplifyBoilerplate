import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  
function TopBar(props) {

  const classes = useStyles();
  const history = useHistory();

  const routeChange = () => {
    let path = `map`;
    history.push(path);
    };

    const goHome = () => {
      let path = `/`;
      history.push(path);
      };
      

    return (
    <>
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                   <div onClick = {goHome} style = {{cursor: 'pointer', fontSize: '25px'}}>
                    TrlBlzr
                    </div>
                  <Typography className={classes.title} variant="h6" onClick = {goHome} style = {{cursor: 'pointer'}} noWrap />
                  <Button variant="contained" 
                          color="secondary" 
                          className={classes.button} 
                          onClick = {props.onPress}
                  >
                   {props.text}
                  </Button>
                  
                </Toolbar>
            </AppBar>
        </div>
    </>
    )
}

export default TopBar
