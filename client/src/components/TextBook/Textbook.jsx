
import {List,ListItem,ListItemText,ListItemIcon} from '@material-ui/core'
import {useState,useEffect,useRef} from 'react'
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
    if(localStorage.getItem('page')!==id){
      history.push(`/textbook/${localStorage.getItem('page')}`)
    }
    const [display,setDisplay] = useState(Array.from({length:20}).map(x => 'none'))
    const parentRef = useRef();
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios(
            `https://react-learnwords-example.herokuapp.com/words?group=1&page=${id}`,
          );
          console.log(result.data)
          setData(result.data.map((elem,index)=>{
              return ( 
                <div  key = {elem.id}>
                <ListItem component = 'div'>
                  <ListItemIcon><div className = {styles.image} style={{backgroundImage:`url("https://raw.githubusercontent.com/arcanar7/rslang-data/master/files/01_0001.jpg")`}}></div></ListItemIcon>
                  <ListItemIcon><VolumeUpIcon  className = {styles.icon}/></ListItemIcon>
                  <ListItemText primary={<div><div className={styles.word}>{elem.word}</div><div className={styles.translate}>{elem.wordTranslate}</div></div>} />
                  <ListItemIcon><MenuBookIcon data-name = {index} onClick = {(e)=>{open(e)}} className = {styles.icon}/></ListItemIcon>
                  <ListItemIcon><DeleteIcon  className = {styles.icon}/></ListItemIcon>
                  <ListItemIcon><BookmarkBorderIcon  className = {styles.icon}/></ListItemIcon>
                </ListItem>
                <div style = {{display:display[index]}}>
                <ListItem className = {styles.sentences} component = 'div'>
                  <ListItemText primary ={elem.transcription} />
                </ListItem>
                <div className={styles.meaning}>
                  Meaning
                </div>
                <ListItem className = {styles.sentences} component = 'div'>
                  <ListItemText className ={styles.doEqual} primary ={elem.textMeaning.replace('<i>','').replace('</i>','')} />
                  <ListItemText className ={styles.doEqual} style={{textAlign:'end'}} primary ={elem.textMeaningTranslate.replace('<i>','').replace('</i>','')} />
                </ListItem>
                <div className={styles.meaning}>
                  Example
                </div>
                <ListItem className = {styles.sentences} component = 'div'>
                  <ListItemText className ={styles.doEqual} primary ={elem.textExample.replace('<b>','').replace('</b>','')} />
                  <ListItemText className ={styles.doEqual} style={{textAlign:'end'}} primary ={elem.textExampleTranslate.replace('<b>','').replace('</b>','')} />
                </ListItem>
                </div>
                </div>
              )
          }));
        };
     
        fetchData();
      }, [id,display]);
      
      const handleChangePage = (e) =>{
        localStorage.setItem('page',e.target.textContent)
        history.push(`/textbook/${e.target.textContent}`)
      }
      function open (e){
        console.log(e.currentTarget.getAttribute('data-name'))
        let index = Number(e.currentTarget.getAttribute('data-name'))
        if(display[index] === 'block'){
          let newDisplay = [...display]
          newDisplay[index] = 'none'
          console.log(newDisplay)
          setDisplay(newDisplay)
        }else{
          let newDisplay = [...display]
          newDisplay[index] = 'block'
          console.log(newDisplay)
          setDisplay(newDisplay)
        }
      }


      if(isNaN(Number(id))){
        return(
            <div>Page does not exist</div>
        )}

    return (
        <div className={styles.page} >
            <div className={styles.container}>
                <List component = 'div' ref = {parentRef}>{data}</List>
                <div className = {styles.pagination}><Pagination count={6} defaultPage={Number(defaultPage)} size="large" color="primary" onChange={handleChangePage}/></div>
            </div>
        </div>
    )
}

export default TextBook