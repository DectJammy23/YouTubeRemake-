import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper'
import {makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import YouTube from 'react-youtube';
import VideoInfo from '../videoInfo'
import useWindowDimensions from '../../helpers/useWindowDimensions'


const useStyles = makeStyles ((theme)=>({

  videoContainer: {
    backgroundColor: 'rgba(33, 33, 33, 0.98)',
      marginLeft: theme.spacing(4),
      // minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
  }
    
})) 
export default function VideoPlayer(props){
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const {height, width} = useWindowDimensions()
  console.log('is mobile: ', isMobile)
  console.log('height: ', height, ' width: ',width)
  console.log(width * (60/100))
  console.log(height * (90/100))
  const [videoId, setVideoId] = useState('2g811Eo7K8U')
  function _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const opts = {
    //543
    //966
    height: isMobile ? height * (60/100) : height * (60/100),
    width: isMobile ? width : width * (60/100),
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
    const classes = useStyles()
    useEffect(()=>{
      if(props.currentVideo && props.currentVideo.id !== videoId){
        setVideoId(props.currentVideo.id)
      } 
    })
    
    return (
    <div className={classes.videoContainer}>
      <YouTube videoId={videoId} opts={opts} onReady={_onReady} />
      <VideoInfo currentVideo={props.currentVideo}/>
     </div>
    )
}