import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar as Bar} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Search from '../search';
import Logo from '../image/logos.png'
import Button from '@material-ui/core/Button'




const useStyles = makeStyles((themes)=>({
    root: {
        flexGrow: 1
    },
    textPrimary: {
        color: '#fff'
    },
    appBar: {
        backgroundColor: 'rgba(33, 33, 33, 0.95)',
    },
    search: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center' 
    },
    imgstyles: {
        height: '50px',
        width:'60px'

    }

}))


export default function AppBar({handleSearch}){
    const classes = useStyles()

return <div className={classes.root}>
    <Bar className={classes.appBar} position='static'>
        <Toolbar>
            <>
            <IconButton edge="start">
                <MenuIcon className={classes.textPrimary} />
            </IconButton>
            <Button>
                <img src={Logo} alt="image not found" className={classes.imgstyles}/>
            </Button>
             </>
            <div className={classes.search}>
                <Search handleSearch={handleSearch} />
            </div>
            <IconButton edge="end">
                <Avatar>J</Avatar>
            </IconButton>
        </Toolbar>
    </Bar>
</div>

}