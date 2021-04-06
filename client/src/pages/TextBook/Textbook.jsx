/* eslint-disable */ 
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { useState, useEffect } from 'react';
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
import Popup from '../../components/Popup/Popup'
import Labels from '../../components/Labels/Lebels'
import { Context } from '../../context/index'
import React from 'react'
import {getSetting,getWords,setChosedWord,delateMark,delateWord} from './responses'


const TextBook = (props) => {
  const {
    words,
  } = React.useContext(Context)

  const { id } = useParams();
  const [data, setData] = useState([]);
  const history = useHistory();
  const [popup,setPopup] = useState(['none','none'])
  const [checked,setChecked] = useState([false,false,'block','block'])
  const [icon,setIcon] = useState(Array.from({ length: 20 }).map((x) => 0))
  const [delateStyle,SetDelateStyle] = useState(Array.from({ length: 20 }).map((x) => 'block'))
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
      let checked = await getSetting()
      setChecked(checked)
      let result;
      if(id.length === 3){
        result = await axios(
          `https://sashan.herokuapp.com/words?group=${id[0]}&page=${`${id[id.length-2]}${id[id.length-1]}`-1}`,
        );
      }else{
        result = await axios(
          `https://sashan.herokuapp.com/words?group=${id[0]}&page=${id[id.length-1]}`,
        );
      }
      setData(result.data)
    };
    fetchData();
    
  }, [id]);
  useEffect(()=>{
    const fetchChosedWords = async () =>{
      if(data.length !==0){
        let userWord = await getWords()
        let choosedWord = userWord.filter((elem)=>elem.difficulty==='easy')
        choosedWord=choosedWord.map((e)=>{
          return e.optional.word
        })
        let newDelateStyle = Array.from({ length: 20 }).map((x) => 'block')
        for(let i = 0;i<choosedWord.length;i++){
          let index = data.findIndex((e)=>{
            return e.id===choosedWord[i].id
          })
          if(index>-1){
            newDelateStyle[index] = 'none'
          }
        }
        SetDelateStyle(newDelateStyle)
      }
    }
    fetchChosedWords()
  },[data,id])
  useEffect(()=>{
    const fetchChosedWords = async () =>{
      let userWord = await getWords()
      let choosedWord = userWord.filter((elem)=>elem.difficulty==='hard')
      choosedWord=choosedWord.map((e)=>{
        return e.optional.word
      })
      let newData = [...data]
      let newIcon = [...icon]
      for(let i = 0;i<choosedWord.length;i++){
        let index = newData.findIndex((e)=>{
          return e.id===choosedWord[i].id
        })
        newIcon[index] = 1;
      }
     setIcon(newIcon)
    }
    fetchChosedWords()
  },[data])
  const handleChangePage = (e) => {
    localStorage.setItem('page', e.target.textContent);
    history.push(`/textbook/${id[0]}${e.target.textContent}`);
  };
  function openInfo(e) {
    const index = Number(e.currentTarget.getAttribute('data-name'));
    if (display[index] === '0px') {
      const newDisplay = [...display];
      newDisplay[index] = '370px';
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
  const addMark = async (index) => {
   let newIcon = [...icon]; 
   newIcon[index] = 1
   setIcon(newIcon)
   await setChosedWord(data[index].id,data[index])
  }
  const removeMark = async (index) =>{
   let newIcon = [...icon]; 
   newIcon[index] = 0
   setIcon(newIcon)
   await delateMark(data[index].id)
  }
  const removeWord = async (index) => {
    let newDelateStyle = [...delateStyle];
    newDelateStyle[index] = 'none';
    SetDelateStyle(newDelateStyle)
    await delateWord(data[index].id,data[index])
  }
  if (isNaN(Number(id))) {
    return (
      <div>Page does not exist</div>
    );
  }
  

  return (
    <div className={styles.page}>
      <Popup popup={popup} setPopup = {setPopup} checked = {checked} setChecked={setChecked} />
      <div className ={`${styles.container} ${styles.containerLabels}`}>
        <div className = {styles.labels}>
       <Labels/>
        </div>
        <SettingsIcon onClick={(e)=>{openSetting(e)}} className = {`${styles.icon} ${styles.setting}`}></SettingsIcon></div>
      <div className={styles.container}>
        <List component="div" >{
        data!==[]&&data.map((elem,index)=>{return(
          <div style={{display:delateStyle[index]}}  key={elem.id}>
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
            <ListItemIcon style={{display:checked[3]}}><DeleteIcon onClick={()=>{removeWord(index)}} className={styles.icon} /></ListItemIcon>
            <ListItemIcon style={{display:checked[3]}}>
               {icon[index]?<BookmarkIcon onClick={()=>{removeMark(index)}} className={styles.icon} />:
               <BookmarkBorderIcon onClick={()=>{addMark(index)}} className={styles.icon} />}
            </ListItemIcon>
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
