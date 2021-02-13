import React, {useState, useEffect} from 'react'
import Paper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles'
import VideoListEntry from '../videoListEntry'
import {getInitData, getNextPage} from '../../helpers/youtubeHelper'


const useStyles = makeStyles ((themes)=>({

  videoListContainer: {
      background: 'transparent',
      margin: 0,
      minHeight: '100%'
  }
    
})) 

export default function VideoList(props){
    const classes = useStyles()
    // const [initData, setInitData] = useState(null)
    const [error, setError] = useState(null)
    // useEffect(async ()=>{
    //     await getInitData()
    //     .then((result)=>{
    //           setInitData([...result.data.items])
    //     })
    //   .catch((err)=>{
    //     setError(err) 
    //   })
    // },[])
    return(
    <Paper className={classes.videoListContainer} elevation={0} square>
      {props.videoListItems && props.videoListItems.map((item)=>{
        return <VideoListEntry data={item} key={item.id} handlePlayVideo={props.handlePlayVideo} />
      })}
    
      
    </Paper>
    )
}