'use client';
import { useState, useEffect } from 'react'; 
import { endpoints } from '@/app/api/config';
import Styles from './Game.module.css';
import  NotFoundImage  from '../../NotFound/not-found.jsx';
import { Preloader } from '../../components/Preloader/preloader.jsx'; 
import { 
  getNormalizedGameDataById, 
  isResponseOk, 
  getMe, 
  getJWT, 
  removeJWT,
  handleVote 
} from '../../api/api-utils';
import { useRouter } from 'next/navigation';
import { checkIfUserVoted } from '@/app/api/api-utils';

import { useContext } from 'react';
import { AuthContext } from '@/app/context/app-context';

// const Game = () => {
export default function GamePage(props) {
  const [game, setGame] = useState(null);
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  // const [isAuthorized, setIsAuthorized] = useState(false);
  // const [currentUser, setCurrentUser] = useState(null);
  const [isVoted, setIsVoted] = useState(false);
  const authContext = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      setPreloaderVisible(true);
      const game = await getNormalizedGameDataById(
        endpoints.games, 
        props.params.id, 
      );
      isResponseOk(game) ? setGame(game) : setGame(null);
      setPreloaderVisible(false);
  //     game.error ? set setGame(null) : setGame(game);
    }
      fetchData();
  }, [])  

  useEffect(() => {
    // const jwt = getJWT();
    // if (jwt) {
    //   getMe(endpoints.me, jwt).then((userData) => {
    //     if (isResponseOk(userData)) {
    //       setIsAuthorized(true)
    //       setCurrentUser(userData);
    //     } else {
    //       setIsAuthorized(false)
    //       removeJWT()
    //     }
    //   })
    authContext.user && game ? setIsVoted(checkIfUserVoted(game, authContext.user.id)) : setIsVoted(false);
  }, [authContext.user, game]);

  useEffect(() => {
    if (currentUser && game) {
      setIsVoted(checkIfUserVoted(game, currentUser.id));
    } else {
      setIsVoted(false);
    }
  }, [currentUser, game]);

  const handleVote = async () => {
    const jwt = authContext.token;
    let userIdArray = game.users.length? game.users.map((user) => user.id)
    : [];
    usersIdArray.push(authContext.user.id);
    const response = await vote(
      `${endpoints.games}/${game.id}`,
      jwt,
      usersIdArray
    );
    if (isResponseOk(response)) {
      setGame(() => {
        // setIsVoted(true);
      // useSelectedLayoutSegment(() => {
          return {
              ...game,
              // users: [...game.users, currentUser],
              users: [...game.users, authContext.user],
          };
      });
         setIsVoted(true);
  }
  // const game = getNormalizedGameDataById(props.params.id, props.params.data)

          // console.log(props.game)

          // const [game, setGame] = useState(null)
          // const router = useRouter()

          // useEffect(() => {
          //   async function fetchData() {
          //     const game = await getNormalizedGameDataById(endpoints.games, props.params.id)
          //     console.log(game)
          //     setGame(game)
          //   }
          //   fetchData()
          // }, [])
          
  return (
    game ? (
      <main className="main">

      <section className={Styles["game"]}>
        <iframe
          className={Styles["game__iframe"]}
          src= {game.link}
        ></iframe>
      </section>
      <section className={Styles["about"]}>
        <h2 className={Styles["about__title"]}>{game.title}</h2>
        <div className={Styles["about__content"]}>
          <p className={Styles["about__description"]}>
            {game.description}
          </p>
          <div className={Styles["about__author"]}>
            <p>
              Автор:
              <span className={Styles["about__accent"]}>{game.developer}</span>
            </p>
          </div>
        </div>
        <div className={Styles["about__vote"]}>
          <p className={Styles["about__vote-amount"]}>
            За игру уже проголосовали:{' '}
            <span className={Styles["about__accent"]}>{game.users.length}</span>
          </p>
          <button 
            // disabled={!isAuthorized || isVoted}
            disabled={!authContext.isAuth || isVoted}
            className={`button ${Styles["about__vote-button"]}`} 
            onClick={handleVote}
            // onClick={() => {router.push('/login/')}}
          >
            {isVoted ? 'Голос учтен' : 'Голосовать'}
            {/* Голосовать */}
          </button>
        </div>
      </section>

      </main>
    ) : preloaderVisible ? (
      <Preloader />
    ) : (
      <section className={Styles['not-found']}>
          <NotFoundImage/>
          <h2 className={Styles['not-found__text']}>Такой игры не существует D:</h2>
      </section>
    )
)}
// export default Game
//   const game = getNormalizedGameDataById(data, id)
}