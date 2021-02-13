import {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
// import axios from 'axios';
import {getInitData, searchFor, searchRelatedVideo} from './helpers/youtubeHelper'
import AppBar from './components/appBar';
import VideoPlayer from './components/videoPlayer';
import VideoList from './components/videoList';
import VideoListEntry from './components/videoListEntry';
import './App.css'


const useStyles = makeStyles((themes)=>({
  App: {
    backgroundColor: 'rgba(33, 33, 33, 1)',
  color: '#fff',
  minHeight: '100vh',
  minWidth: '100vw'
  }
}))


function App() {
  const classes = useStyles()
  const [searchResultData, setSearchResultData] = useState(null)
  const [videoListItems, setVideoListItems] = useState(null)
  const [currentVideo, setCurrentVideo] = useState(null)
  useEffect(async ()=>{
    await getInitData()
    .then((result)=>{
      setVideoListItems([...result.data.items])
    })
  .catch((err)=>{
    console.log(err) 
  })
},[])
  function handlePlayVideo(currentVideo){
    setCurrentVideo(currentVideo)
    searchRelatedVideo(currentVideo.id)
    .then((result)=>{
      console.log('results from related video')
      console.log(result)
      const list = result.data.items.reduce((acc, item)=>{
        console.log(item)
        item.id = item.id.videoId
        if(item.snippet) acc.push(item) 
        return acc
      }, []) 
      setVideoListItems(list)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  function handleSearch(searchCriteria){
    searchFor(searchCriteria).then((result)=>{
      console.log('result from search:', searchCriteria)
      console.log(result)
      setSearchResultData(result.data.items)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  function playFromSearch(video){
    console.log('vid to play')
    console.log(video)
    setSearchResultData(null)
    handlePlayVideo({...video, id: video.id.videoId})
  }
  return (
    <Paper elevation={0} square className={classes.App}>
      
        {/* so instead of if we do not have a search result then we will display video and sidebar */}
        {searchResultData ?
        <Grid container spacing={4} justify="center">
            <Grid item xs={12}>
              <AppBar handleSearch={handleSearch} />
            </Grid>
            <Grid item xs={6} >
            {searchResultData.map((item)=>{
        return <VideoListEntry data={item} key={item.id.videoId} handlePlayVideo={playFromSearch} />
      })}
            </Grid>
        </Grid>
       : 
        <Grid container spacing={4} justify="space-around">
            <Grid item xs={12}>
              <AppBar handleSearch={handleSearch} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <VideoPlayer currentVideo={currentVideo}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <VideoList videoListItems={videoListItems} handlePlayVideo={handlePlayVideo} />
          </Grid>
        </Grid>
        }
      
    </Paper> 
  );
}

export default App;
