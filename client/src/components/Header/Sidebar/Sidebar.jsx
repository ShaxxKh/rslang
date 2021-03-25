import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as LogoutIcon } from '../../../assets/img/icons/logout.svg';
import { ReactComponent as LearnIcon } from '../../../assets/img/sidebar/1.svg';
import { ReactComponent as VocabluryIcon } from '../../../assets/img/sidebar/2.svg';
import { ReactComponent as MiniGamesIcon } from '../../../assets/img/sidebar/3.svg';
import { ReactComponent as StatisticIcon } from '../../../assets/img/sidebar/4.svg';
import { ReactComponent as TeamIcon } from '../../../assets/img/sidebar/5.svg';
import { ReactComponent as SettingIcon } from '../../../assets/img/sidebar/6.svg';

import './Sidebar.scss';

const list = [
    {
        title: 'Изучение',
        img: LearnIcon,
        to: '/'
    },
    {
        title: 'Словарь',
        img: VocabluryIcon,
        to: '/'
    },
    {
        title: 'Мини-игры',
        img: MiniGamesIcon,
        to: '/'
    },
    {
        title: 'Статистика',
        img: StatisticIcon,
        to: '/'
    },
    {
        title: 'Команда',
        img: TeamIcon,
        to: '/'
    },
    {
        title: 'Настройки',
        img: SettingIcon,
        to: '/'
    },
];

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className={open ? 'sidebar sidebar-opened' : 'sidebar'}>
            <div className="sidebar__title">
                <div className="sidebar__btn" onClick={() => setOpen(!open)}>
                    <div className="burger-icon">
                        <span className="burger-icon-line"></span>
                    </div>
                </div>
                <h2>RSLang</h2>
            </div>
            <div className="sidebar__nav">
                <nav className="nav">
                    {list.map((item, idx) => {
                        return (
                            <Link to={item.to} className={'nav__link'} key={item.title + idx}>
                                <item.img />
                                <span className="nav__item-title">{item.title}</span>
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div className="sidebar__footer"><LogoutIcon className="logout-icon" /> <span>Выйти</span></div>
        </div>
    );
};

export default Sidebar;