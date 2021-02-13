import axios from 'axios';

export const getInitData = ()=>{
  return axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=20&chart=mostPopular&regionCode=US&key=${process.env.REACT_APP_YOUTUBE_KEY}`)
  
}

export const getNextPage = (nextPageToken)=>{
  return axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&pageToken=${nextPageToken}&key=${process.env.REACT_APP_YOUTUBE_KEY}`)
}

export const searchFor = (searchCriteria)=>{
  return axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${searchCriteria}&type=video&key=${process.env.REACT_APP_YOUTUBE_KEY}`)
}

export const searchRelatedVideo =(videoId)=>{
  return axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&maxResults=20&type=video&key=${process.env.REACT_APP_YOUTUBE_KEY}`)
}

export const getComments = (videoId) =>{
  return axios.get(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&videoId=${videoId}&key=${process.env.REACT_APP_YOUTUBE_KEY}`)
}