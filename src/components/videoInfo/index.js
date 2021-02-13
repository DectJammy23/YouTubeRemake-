import React, {useEffect, useState} from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from "@material-ui/core/styles"
import useWindowDimensions from '../../helpers/useWindowDimensions'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import moment from 'moment'
import Comments from '../comments'

const useStyles = makeStyles((theme)=>({
    container: {
        fontFamily: 'Roboto, Arial, sans-serif',
        color: '#fff',
        background: 'transparent'
    },
    title: {
        fontSize: '1.6rem',
        fontWeight: 600,
        lineHeight: '2.4rem'
    },
    description: {
        borderTop: '2px solid #181818',
        borderBottom: '2px solid #181818',
    }
}))

export default function VideoInfo({currentVideo}){
    const {height, width} = useWindowDimensions()
    const [video, setVideo] = useState(null)
    const [showMore, setShowMore] = useState(false)
    const classes = useStyles()
    useEffect(()=>{
        if(currentVideo) setVideo(currentVideo)
    })

    const handleShowMore = () => {
        setShowMore((previousState)=>!previousState)
    }

    return (
    <>
    {video ? 
    <Paper style={{width: width * (60/100)}} className={classes.container} elevation={0} square>
        <Grid container direction='column' spacing={1} style={{padding: '8px 0 8px 0'}}>
            <Grid item>
                <div className={classes.title}>{video.snippet.title} </div>
            </Grid>
            <Grid item>
                <div className={classes.time}>{moment(video.snippet.publishedAt).format('MMM D, YYYY')} </div>
            </Grid>
        </Grid>
        <Grid container direction='column' spacing={1} className={classes.description}>
            <Grid item>
                <Collapse in={showMore} collapsedHeight={48}>
                    <div style={{whiteSpace: 'pre-line', padding: '8px 0 8px 0'}}>{video.snippet.description} </div>
                </Collapse>
                <Button color="primary" onClick={handleShowMore}>{showMore ? 'Show Less':'Show More'}</Button>
            </Grid>
        </Grid>
        <Grid container>
        <Grid item>
            <Comments id={video.id} />
        </Grid>

        </Grid>

    </Paper>
    :
    <div>KITTY vid</div>
    }
    </>
    )
}