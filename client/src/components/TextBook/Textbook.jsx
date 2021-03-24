/* eslint-disable */ 
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
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
import styles from './Textbook.module.scss';

const TextBook = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const history = useHistory();
  let [defaultPage, setDefaultPage] = useState(localStorage.getItem('page') || 1);
  if (localStorage.getItem('page') !== id) {
   defaultPage = (Number(id[id.length-1]))
  }
  const [display, setDisplay] = useState(Array.from({ length: 20 }).map((x) => '0px'));
  const parentRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://react-learnwords-example.herokuapp.com/words?group=${id[0]}&page=${id[id.length-1]}`,
      );
      console.log(result.data);
      setData(result.data)
    };
    fetchData();
  }, [id]);

  const handleChangePage = (e) => {
    localStorage.setItem('page', e.target.textContent);
    history.push(`/textbook/${id[0]}${e.target.textContent}`);
  };
  function open(e) {
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
  if (isNaN(Number(id))) {
    return (
      <div>Page does not exist</div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <List component="div" ref={parentRef}>{
        data!==[]&&data.map((elem,index)=>{return(
          <div key={elem.id}>
          <ListItem component="div">
            <ListItemIcon><div className={styles.image} style={{ backgroundImage: `url(https://sashan.herokuapp.com/${elem.image})` }} /></ListItemIcon>
            <ListItemIcon><VolumeUpIcon data-name={index} onClick={(e) => { playWord(e); }} className={styles.icon} /></ListItemIcon>
            <ListItemText primary={(
              <div>
                <div className={styles.word}>{elem.word}</div>
                <div className={styles.translate}>{elem.wordTranslate}</div>
              </div>)}
            />
            <ListItemIcon><MenuBookIcon data-name={index} onClick={(e) => { open(e); }} className={styles.icon} /></ListItemIcon>
            <ListItemIcon><DeleteIcon className={styles.icon} /></ListItemIcon>
            <ListItemIcon><BookmarkBorderIcon className={styles.icon} /></ListItemIcon>
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
              <ListItemText className={styles.doEqual} style={{ textAlign: 'end' }} primary={ 
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
              <ListItemText className={styles.doEqual} style={{ textAlign: 'end' }} primary={elem.textExampleTranslate.replace('<b>', '').replace('</b>', '')} />
            </ListItem>
          </div>
        </div>
        )})}</List>
        <div className={styles.pagination}><Pagination count={6} defaultPage={Number(defaultPage)} size="large" color="primary" onChange={handleChangePage} /></div>
      </div>
    </div>
  );
};

export default TextBook;
