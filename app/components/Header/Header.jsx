'use client';
import { useState, useEffect } from 'react'; 

import { Overlay } from '../Overlay/Overlay';
import { Popup } from '../Popup/Popup.jsx';
import { AuthForm } from '../AuthForm/AuthForm';

// import { useContext } from 'react';
// import { AuthContext } from '@/app/context/app-context';
import { useStore } from './store/app-store';
import Styles from './Header.module.css';

import Link from 'next/link';
import { usePathname } from "next/navigation";

export const Header = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [popupIsOpened, setPopupIsOpened] = useState(false);
    // const authContext = useContext(AuthContext);
    const authContext = useStore();

    function openPopup () {
      setPopupIsOpened(true);
    };

    function closePopup () {
      setPopupIsOpened(false);
      // popupIsOpened === false && setPopupIsOpened(true);
    };

    const pathname = usePathname();
    useEffect(() => {
      const jwt = getJWT();
      if (jwt) {
        getMe(endpoints.me, jwt).then((userData) => {
          if (isResponseOk(userData)) {
            setIsAuthorized(true)
          } else {
            setIsAuthorized(false)
            removeJWT()
          }
        })
      }
    }, [])

    const handleLogout = () => {
      // setIsAuthorized(false);
      // removeJWT();
      authContext.logout();
    };
    // const handleClick = () => {
    //   popupIsOpened === false
    //     ? setPopupIsOpened(true)
    //     : setPopupIsOpened(false);
    // };
  

    return (
      <header className = {Styles['header']}>
        {pathname === "/" ? (
        <span className = {Styles['logo']}>
          <img className = {Styles['logo__image']} 
            src="/images/logo.svg" 
            alt="Логотип Pindie"
          /> 
        </span>
        ) : (
          <Link href="/" className = {Styles['logo']}>
            <img 
              className = {Styles['logo__image']}
              src="/images/logo.svg" 
              alt="Логотип Pindie" 
              />
          </Link>
        )}

        <nav className = {Styles['menu']}>
          <ul className = {Styles['menu__list']}>
            <li className = {Styles['menu__item']}>
              <Link 
                href="/new" 
                className={`${Styles["menu__link"]} ${
                  pathname === "/new" ? Styles["menu__link_active"] : ""
                  }`}
              > 
                Новинки
              </Link>
              
            </li>
            <li className = {Styles['menu__item']}>
              < Link href="/popular" className={`${Styles["menu__link"]} ${pathname === "/popular" ? Styles["menu__link_active"] : ""}`}>
                Популярные
              </Link>
            </li>
            <li className = {Styles['menu__item']}>
              <Link href="/shooters" className={`${Styles["menu__link"]} ${pathname === "/shooters" ? Styles["menu__link_active"] : ""}`}>
                Шутеры
              </Link>
            </li>
            <li className = {Styles['menu__item']}>
              <Link href="/runners" className={`${Styles["menu__link"]} ${pathname === "/runners" ? Styles["menu__link_active"] : ""}`}>
                Раннеры
              </Link>
            </li>
            <li className = {Styles['menu__item']}>
              <Link href="/pixel-games" className={`${Styles["menu__link"]} ${pathname === "/pixel-games" ? Styles["menu__link_active"] : ""}`}>
                Пиксельные
              </Link>
            </li>
            <li className = {Styles['menu__item']}>
              <Link href="/tds" className={`${Styles["menu__link"]} ${pathname === "/tds" ? Styles["menu__link_active"] : ""}`}>
                TDS
              </Link>
            </li>
          </ul>

          <div className={Styles["auth"]}>
            {/* {isAuthorized ? ( */}
            {authContext.isAuth ? (
              <button className={Styles["auth__button"]} onClick={handleLogout} >
                Выйти
              </button>
            ) : (
              <button className={Styles["auth__button"]} onClick={openPopup} >
                Войти
              </button>
            )}
          </div>
        </nav>
        <Overlay close={closePopup} open={popupIsOpened}/>
        <Popup close={closePopup} open={popupIsOpened} >
            <AuthForm close={closePopup} setAuth={setIsAuthorized}/>
        </Popup>
      </header>
    );
  }