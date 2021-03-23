
import {List,ListItem,ListItemText,ListItemIcon} from '@material-ui/core'
import {useState,useEffect} from 'react'
import axios from 'axios'
import styles from './Textbook.module.scss'
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import DeleteIcon from '@material-ui/icons/Delete';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Pagination } from '@material-ui/lab';
import {useParams} from 'react-router-dom'
import { useHistory } from "react-router-dom";


const TextBook = () => {

    const {id} = useParams()
    const [data,setData] = useState([])
    const history = useHistory()
    const [defaultPage,setDefaultPage] = useState(localStorage.getItem('page')||1)
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios(
            `https://react-learnwords-example.herokuapp.com/words?group=1&page=${id}`,
          );
          console.log(result.data)
          setData(result.data.map((elem)=>{

              return ( 

                <ListItem key = {elem.id}>
                <ListItemIcon><div className = {styles.image} style={{backgroundImage:`url("https://raw.githubusercontent.com/arcanar7/rslang-data/master/files/01_0001.jpg")`}}></div></ListItemIcon>
                <ListItemIcon><VolumeUpIcon  className = {styles.icon}/></ListItemIcon>
                <ListItemText primary={<div><div className={styles.word}>{elem.word}</div><div className={styles.translate}>{elem.wordTranslate}</div></div>} />
                {/*<ListItemText > {elem.textMeaning.replace('</i>','').replace('<i>','')} </ListItemText >*/}
                <ListItemText > </ListItemText >
                <ListItemIcon><MenuBookIcon  className = {styles.icon}/></ListItemIcon>
                <ListItemIcon><DeleteIcon  className = {styles.icon}/></ListItemIcon>
                <ListItemIcon><BookmarkBorderIcon  className = {styles.icon}/></ListItemIcon>
                </ListItem>   
              )
          }));
        };
     
        fetchData();
      }, [id]);
      
      const handleChangePage = (e) =>{
        console.log(e.target.textContent)
        localStorage.setItem('page',e.target.textContent)
        history.push(`/textbook/${e.target.textContent}`)

      }

      if(isNaN(Number(id))){
        return(
            <div>Page does not exist</div>
        )}

    return (
        <div className={styles.page} >
            <div className={styles.container}>
                <List >{data}</List>
                <div className = {styles.pagination}><Pagination count={6} defaultPage={Number(defaultPage)} size="large" color="primary" onChange={handleChangePage}/></div>
            </div>
        </div>
    )
}

export default TextBook