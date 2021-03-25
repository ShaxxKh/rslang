/* eslint-disable */ 
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch 
} from '@material-ui/core';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import DeleteIcon from '@material-ui/icons/Delete';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Pagination } from '@material-ui/lab';
import { useParams, useHistory } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import styles from './Textbook.module.scss';
import CloseIcon from '@material-ui/icons/Close';


const TextBook = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const history = useHistory();
  const [popup,setPopup] = useState(['none','none'])
  const [checked,setChecked] = useState([false,false,'block','block'])
  let [defaultPage, setDefaultPage] = useState(localStorage.getItem('page') || 1);
  if (localStorage.getItem('page') !== id) {
    if(id.length === 3){
      defaultPage = (Number(id[id.length-2]+''+id[id.length-1]))
    }
    else{
      defaultPage = Number(id[id.length-1])
    }
  }
  const [display, setDisplay] = useState(Array.from({ length: 20 }).map((x) => '0px'));

  useEffect(() => {
    const fetchData = async () => {
      let result;
      if(id.length === 3){
        result = await axios(
          `https://react-learnwords-example.herokuapp.com/words?group=${id[0]}&page=${`${id[id.length-2]}${id[id.length-1]}`-1}`,
        );
      }else{
        result = await axios(
          `https://react-learnwords-example.herokuapp.com/words?group=${id[0]}&page=${id[id.length-1]}`,
        );
      }
      console.log(result.data);
      setData(result.data)
    };
    fetchData();
    
  }, [id]);

  const handleChangePage = (e) => {
    localStorage.setItem('page', e.target.textContent);
    history.push(`/textbook/${id[0]}${e.target.textContent}`);
  };
  function openInfo(e) {
    const index = Number(e.currentTarget.getAttribute('data-name'));
    if (display[index] === '0px') {
      const newDisplay = [...display];
      newDisplay[index] = '250px';
      setDisplay(newDisplay);
    } else {
      const newDisplay = [...display];
      newDisplay[index] = '0px';
      setDisplay(newDisplay);
    }
  }
  const playWord=(e) => {
    const index = Number(e.currentTarget.getAttribute('data-name'));
    let audio = new Audio(`https://sashan.herokuapp.com/${data[index].audio}`)
    audio.play()
  }
  const playMeaning=(e) => {
    const index = Number(e.currentTarget.getAttribute('data-name'));
    let audio = new Audio(`https://sashan.herokuapp.com/${data[index].audioMeaning}`)
    audio.play()
  }
  const playExample=(e) => {
    const index = Number(e.currentTarget.getAttribute('data-name'));
    let audio = new Audio(`https://sashan.herokuapp.com/${data[index].audioExample}`)
    audio.play()
  }
  const openSetting = (e) => {
      setPopup(['popup','window'])
  }
  const exitSetting = () => {
    setPopup(['none','none'])
  }
  const removeTranslate = (e) =>{
      if(checked[0]){
        let newChecked =  [...checked];
        newChecked[0] = false
        newChecked[2] = 'block'
        setChecked(newChecked)
      }else{
        let newChecked =  [...checked];
        newChecked[0] = true
        newChecked[2] = 'none'
        setChecked(newChecked)
      }
  }
  const removeButtons = (e) =>{
    if(checked[1]){
      let newChecked =  [...checked];
      newChecked[1] = false;
      newChecked[3] = 'block'
      setChecked(newChecked)
    }else{
      let newChecked =  [...checked];
      newChecked[1] = true
      newChecked[3] = 'none'
      setChecked(newChecked)
    }
  }
  const [height,setHeight] = useState([['95px'],['80px'],['80px'],['80px'],['80px'],['80px']])
  const changeLevel = (e) => {
      let text = e.currentTarget.textContent;
      let index = Number(text[text.length-1] - 1);
      let newHeight = [...height.map((item,i)=>{
          if(item===height[index]){
             return item = ['95px']
          }else{
             return item = ['80px']
          }
      })]
      if(id.length===3){
        history.push(`/textbook/${index}${id[1]}${id[2]}`)
      }
      else{
        history.push(`/textbook/${index}${id[1]}`)
      }
  
      setHeight(newHeight)
   
  }
  if (isNaN(Number(id))) {
    return (
      <div>Page does not exist</div>
    );
  }

  return (
    <div className={styles.page}>
      <div className = {popup[0]}>
          <CloseIcon  className = {styles.exit} onClick = {()=>{exitSetting()}}></CloseIcon>
          <h2 className={styles.title}>Настройка</h2>
          <List component='div'>
            <ListItem component='div'>
              <ListItemText primary = 'Remove translation of words'/>
              <ListItemIcon><Switch onChange={(e)=>removeTranslate(e)} checked={checked[0]} color='primary'/> </ListItemIcon>
            </ListItem>
            <ListItem component='div'>
              <ListItemText primary = 'Remove delete and add buttons'/>
              <ListItemIcon><Switch onChange={(e)=>removeButtons(e)} checked={checked[1]} color='primary'/> </ListItemIcon>
            </ListItem>
          </List>
      </div>
      <div className = {popup[1]}></div>
    
      <div className ={`${styles.container} ${styles.containerLabels}`}> {/* There are settin icon and category navigation*/ }
        <div className = {styles.labels}>
        { ['#5ad13e','#31dbf0','#8e39f7','#f739cb','rgb(238 57 247)','red'].map((item,index)=>(
            <div key = {item} className = {styles.label}>
 
                    <div onClick={(e)=>changeLevel(e)} className={styles.text} style={{height:height[index][0],backgroundColor:item}}>
                        {`Page ${index+1}`}
                    </div>
                    <div className={styles.triangle}>
                        <div style={{borderTop: `10px solid ${item}`}} className={styles.arrowDown}></div>
                    </div>
                </div>
        ))}
        </div>
        <SettingsIcon onClick={(e)=>{openSetting(e)}} className = {`${styles.icon} ${styles.setting}`}></SettingsIcon></div>
      <div className={styles.container}>
        <List component="div" >{
        data!==[]&&data.map((elem,index)=>{return(
          <div key={elem.id}>
          <ListItem component="div">
            <ListItemIcon><div className={styles.image} style={{ backgroundImage: `url(https://sashan.herokuapp.com/${elem.image})` }} /></ListItemIcon>
            <ListItemIcon><VolumeUpIcon data-name={index} onClick={(e) => { playWord(e); }} className={styles.icon} /></ListItemIcon>
            <ListItemText primary={(
              <div>
                <div className={styles.word}>{elem.word}</div>
                <div style={{display:checked[2]}} className={styles.translate}>{elem.wordTranslate}</div>
              </div>)}
            />
            <ListItemIcon><MenuBookIcon data-name={index} onClick={(e) => { openInfo(e); }} className={styles.icon} /></ListItemIcon>
            <ListItemIcon style={{display:checked[3]}}><DeleteIcon className={styles.icon} /></ListItemIcon>
            <ListItemIcon style={{display:checked[3]}}><BookmarkBorderIcon className={styles.icon} /></ListItemIcon>
          </ListItem>
          <div className={styles.info} style={{ height: display[index] }}>
            <ListItem className={styles.sentences} component="div">
              <ListItemText primary={elem.transcription} />
            </ListItem>
            <div className={styles.meaning}>
              Meaning
            </div>
            <ListItem className={styles.sentences} component="div">
              <ListItemText className={styles.doEqual} primary={
                  <div className = {styles.listItem}>
                    <ListItemIcon>
                      <VolumeUpIcon data-name={index} onClick={(e) => { playMeaning(e); }} className={styles.icon} />
                    </ListItemIcon> 
                  <div>{elem.textMeaning.replace('<i>', '').replace('</i>', '')}</div></div>} />
              <ListItemText className={styles.doEqual} style={{ textAlign: 'end',display:checked[2] }} primary={ 
                  elem.textMeaningTranslate.replace('<i>', '').replace('</i>','')} />
            </ListItem>
            <div className={styles.meaning}>
              Example
            </div>
            <ListItem className={styles.sentences} component="div">
              <ListItemText className={styles.doEqual} primary={
                <div className = {styles.listItem}>
                  <ListItemIcon>
                    <VolumeUpIcon data-name={index} onClick={(e) => { playExample(e); }} className={styles.icon} />
                  </ListItemIcon> 
                  <div>{elem.textExample.replace('<b>', '').replace('</b>', '')}</div>
                </div>} />
              <ListItemText className={styles.doEqual} style={{ textAlign: 'end' ,display:checked[2] }} primary={elem.textExampleTranslate.replace('<b>', '').replace('</b>', '')} />
            </ListItem>
          </div>
        </div>
        )})}</List>
        <div className={styles.pagination}><Pagination count={30} defaultPage={Number(defaultPage)} size="large" color="primary" onChange={handleChangePage} /></div>
      </div>
    </div>
  );
};

export default TextBook;
