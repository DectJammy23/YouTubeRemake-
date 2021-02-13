import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import {capFirstLetter, convertNum} from '../../helpers/formatting';

const useStyles = makeStyles((themes)=>({
    paper: {
        textAlign: 'left',
        color: '#fff',
        background: 'transparent',
        marginBottom: '20px',
        fontFamily: 'Roboto, Arial, sans-serif',
        cursor: 'pointer',
        '&:hover':{
            backgroundColor: "#181818",
            color: '#aaa'
        }
    },
    info: {
        // paddingLeft: '5px',
        height: '94px',
        maxHeight: '94px',
        maxWidth: '200px'
    },
    thumbnail: {
        margin: 'auto',
        display: 'block',
        height: '94px',
    },
    title: {
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: '1.4rem',
        fontSize: '1.2rem',
        fontWeight: '600',
        '-webkit-line-clamp':2,
        '-webkit-box-orient':'vertical',
        whiteSpace: 'normal'
    },
    channel: {
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: '1rem',
        '-webkit-line-clamp':1,
        '-webkit-box-orient':'vertical',
        whiteSpace: 'nowrap',
        flexGrow: 1,
    },
    toBottom: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end'
    }
}))




export default function VideoListEntry(props){
    
    const classes = useStyles()
    // console.log(props.data)
    let title = capFirstLetter(props.data.snippet.title)
    let channel = capFirstLetter(props.data.snippet.channelTitle)
    let views = props.data.statistics ? convertNum(props.data.statistics.viewCount, 1) : 'some'
    function handlePlayVideo (){
        props.handlePlayVideo(props.data)
    }
    return (
    <Paper className={classes.paper} elevation={0} onClick={handlePlayVideo} >
        <Grid container direction="row" justify="flex-start" alignItems="center">
            <Grid item xs={5}>
                <ButtonBase>
                    <img alt='thumbnail' className={classes.thumbnail} src={props.data.snippet.thumbnails.medium.url} />
                </ButtonBase>
            </Grid>
            <Grid item xs={6} container spacing={0} className={classes.info}>
                <Grid item xs={12}>
                    <div className={classes.title}>{title}</div>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.channel}>{channel}</div>
                </Grid>
                <Grid item xs={12} >
                    <div className={classes.views}>{views} views •</div>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
    )
}