import React from 'react';
import './MainHeader.scss';

import SettingsIcon from '../../../assets/img/icons/settings.png';
import { Link } from 'react-router-dom';

const MainHeader = () => {
  return (
    <div className="main-header">
      <div className="main-header__container">
        <div className="main-header__title">
            <h2>Изучение</h2>
        </div>
        <div className="main-header__settings">
            <Link to="/settings" className="setting-icon">
            <img src={SettingsIcon} alt="" />
            </Link>
            <p className="main-header__settings-mail">azizbeksavkimov@mail.ru</p>
            <div className="main-header__logout">
            <svg
                data-v-301f475f=""
                xmlns="http://www.w3.org/2000/svg"
                width="34px"
                height="34px"
                viewBox="0 0 36 26"
                role="img"
            >
                <title data-v-301f475f="" lang="en">
                Выйти
                </title>
                <g data-v-301f475f="" fill="currentColor">
                <g data-v-301f475f="">
                    <g data-v-301f475f="" clip-path="url(#clip0)">
                    <path
                        data-v-301f475f=""
                        d="M4.47668 15.0303L10.1017 19.5303V16.1553H20.2267V13.9053H10.1017V10.5303L4.47668 15.0303Z"
                    ></path>
                    <path
                        data-v-301f475f=""
                        d="M16.8529 4.90385C15.5226 4.90016 14.2048 5.16047 12.9758 5.66971C11.7469 6.17894 10.6312 6.92697 9.69336 7.87047L11.2841 9.46122C12.7714 7.97397 14.7491 7.15385 16.8529 7.15385C18.9566 7.15385 20.9344 7.97397 22.4216 9.46122C23.9089 10.9485 24.729 12.9262 24.729 15.03C24.729 17.1337 23.9089 19.1115 22.4216 20.5987C20.9344 22.086 18.9566 22.9061 16.8529 22.9061C14.7491 22.9061 12.7714 22.086 11.2841 20.5987L9.69336 22.1895C11.6047 24.102 14.1472 25.1561 16.8529 25.1561C19.5585 25.1561 22.101 24.102 24.0124 22.1895C25.9249 20.2781 26.979 17.7356 26.979 15.03C26.979 12.3243 25.9249 9.78185 24.0124 7.87047C23.0746 6.92697 21.9589 6.17894 20.7299 5.66971C19.5009 5.16047 18.1831 4.90016 16.8529 4.90385Z"
                    ></path>
                    </g>
                    <defs data-v-301f475f="">
                    <clipPath data-v-301f475f="" id="clip0">
                        <rect
                        data-v-301f475f=""
                        width="35.5467"
                        height="24.94"
                        transform="translate(0.226685 0.530273)"
                        ></rect>
                    </clipPath>
                    </defs>
                </g>
                </g>
            </svg>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
