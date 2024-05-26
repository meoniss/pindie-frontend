import Styles from './AuthForm.module.css';
import { useState, useEffect } from 'react'; 
import { endpoints } from '@/app/api/config';
import { authorize } from '@/app/api/api-utils';
import { isResponseOk, getMe } from '@/app/api/api-utils';

import { useContext } from 'react';
import { AuthContext } from '@/app/context/app-context';

export const AuthForm = (props) => {
  const [authData, setAuthData] = useState({identifier: '', password: ''});
  const [message, setMessage] = useState({status: null, text: null});
  const authContext = useContext(AuthContext);
  const handleInput = (e) => {
      /* 
          В объекте authData по ключу e.target.name находится 
          изменяемое значение и перезаписывается
          новым текстом из поля ввода (e.target.value). 
          Спред ... перед authData нужен, чтобы сохранить
          данные, не изменившиеся при вводе текста в одном из полей
      */
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      /* Предотвращаем стандартное поведение формы */
    e.preventDefault();
      /* Вызываем функцию authorize с данными из формы */
    const userData = await authorize(endpoints.auth, authData);
      /* Проверяем ответ сервера с помощью isResponseOk */
    if (isResponseOk(userData)) {
      // await getMe(endpoints.me, userData.jwt);
          /* Записываем в стейт данные пользователя с сервера */
      // setUserData(userData);
      // setJWT(userData.jwt);
      //     /*  */
      // props.setAuth(true);
      authContext.login(yserDAta.user, userData, jwt);
          /* Записываем сообщение об авторизации */
      setMessage({ status: "success", text: "Вы авторизовались!" });
    } else {
          /* Записываем сообщение об ошибке */
      setMessage({ status: "error", text: "Неверные почта или пароль" });
    }
  };

  useEffect(() => {
    let timer;
    // if (userData) {
    if (authContext.user) {
      timer = setTimeout(() => {
        setMessage({ status: null, text: null});
        props.close();
      }, 1000);
    }
    return () => clearTimeout(timer);
  // }, [userData])
  }, [authContext.user]);

  return (
    <form onSublit={handleSubmit} className={Styles['form']}>
      <h2 className={Styles['form__title']}>Авторизация</h2>
      <div className={Styles['form__fields']}>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Email</span>
          <input className={Styles['form__field-input']} type="email" placeholder="hello@world.com"/>
        </label>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Пароль</span>
          <input className={Styles['form__field-input']} type="password" placeholder='***********'/>
        </label>
      </div>
      {message.status && (
        <p className={Styles['form__message']}>{message.text}</p>
      )};
      <div className={Styles['form__actions']}>
        <button className={Styles['form__reset']} type="reset">Очистить</button>
        <button className={Styles['form__submit']} type="submit">Войти</button>
      </div>
    </form>
  ) 
};
