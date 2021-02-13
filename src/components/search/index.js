import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
const top5Films = [
    { title: '', year: 1994 },
]

const useStyles = makeStyles((themes)=>({
  searchField: {
    backgroundColor: '#0F0F0F',
    borderColor: '#303030',
    height: 30,
    color: '#fff',
    textEmphasisColor: 'white'
    // #181818,#212121,#3d3d3d,#ffffff,#aaaaaa
  },
  searchButton: {
    backgroundColor: 'rgba(255,255,255, 0.08)',
    borderColor: '#303030',
    height: 30,
    borderRadius: '0, 0, 5px, 5px'
  },
  searchButtonContainer: {
  },
  searchContainer: {
    paddingTop: 15,
    display: 'flex',
    width: '50vw',
  },
  autoCompleteField: {
    flexGrow: 1,
    padding: 0,
    margin: 0
  }
}))

export default function Search ({handleSearch}) {
  const classes = useStyles()
  
   const [searchInput, setSearchInput] = useState('')

   const handleSearchInput = (event)=>{
     setSearchInput(event.target.value)
   }

   const executeSearch = (event) => {
     if(event.key === 'Enter') handleSearch(searchInput)
   }

    return ( 
    <div className={classes.searchContainer}>
      <Autocomplete
          className={classes.autoCompleteField}
          freeSolo
          id="searchField"
          disableClearable
          options={top5Films.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              // label="Search input"
              // margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: 'search', onChange: handleSearchInput, onKeyUp: executeSearch, className: classes.searchField }}
            />
          )}
        />
        <div className={classes.searchButtonContainer}>
      <Button variant="contained" className={classes.searchButton} onClick={()=>handleSearch(searchInput)}>
         <SearchIcon />
      </Button> 
      </div>
    </div>    
    )
}

