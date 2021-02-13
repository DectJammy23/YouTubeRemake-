import React, {useState, useEffect} from 'react'
import {getComments} from '../../helpers/youtubeHelper'
import {makeStyles} from "@material-ui/core/styles"
import Grid from '@material-ui/core/Grid'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'
import Avatar from '@material-ui/core/Avatar'
import {capFirstLetter} from '../../helpers/formatting'


const useStyles = makeStyles ((theme)=>({

    commentsContainer: {
        background: 'transparent',
        margin: 0,
        color: '#fff',
        maxWidth: '100%',
        padding:'10px 0 10px 0',
    },
    avatar: {
        minWidth: '50px'
    },
    authorInfo: {
        padding:'0 0 8px 0',
    },
    authorName: {
        fontWeight: 'bold'
    },
    time: {
        color: "#aaa"
    },
    commentsTitle:{
        background: 'transparent',
        margin: 0,
        color: '#fff',
        maxWidth:'100%',
        fontSize: '1.7 rem',
        padding:'5px',
        borderBottom: '0.07px solid #fff',
        fontWeight: 600,
        fontFamily: 'Roboto, Lucida Handwriting, cursive',
        lineHeight: '2.0rem'


    }
      
  })) 

export default function Comments(props){
    const [comments, setComments] = useState(null)
    const classes = useStyles()
    useEffect(()=>{
        getComments(props.id)
        .then((result)=>{
            setComments(result.data.items)
            console.log(result.data)
        })
        .catch((err)=>console.log(err))

    },[])

   return (
       <div>  
           <div className={classes.commentsTitle}> Comments</div>
           {comments && comments.map((item)=>{
               const commentInfo = item.snippet.topLevelComment.snippet
            return (
            <div key={item.etag} className={classes.commentsContainer} > 
                <Grid container spacing={0} directon="column" justify='flex-start'>
                    <Grid item className={classes.avatar}>
                        <Avatar alt={commentInfo.authorDisplayName} src={commentInfo.authorProfileImageUrl} />
                    </Grid>
                    <Grid item container direction='row' xs={8}>
                        <Grid item xs={12}>
                            <div className={classes.authorInfo} style={{whiteSpace: 'pre-line'}}>
                                <span className={classes.authorName}>{capFirstLetter(commentInfo.authorDisplayName) + " "}</span>
                                <span className={classes.time}>{moment(commentInfo.publishedAt).fromNow()}</span>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div>
                                {ReactHtmlParser(commentInfo.textDisplay)}
                            </div>
                        </Grid>   
                    </Grid>
                </Grid>
            </div>
                )
        })}
        </div>
    )
       
}