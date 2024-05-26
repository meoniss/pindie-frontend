"use client";

import { getNormalizedGamesDataByCategory } from './data/data-utils.js'

import { Banner } from './components/Banner/Banner.jsx'
import { Promo } from './components/Promo/Promo.jsx'
import { CardsList} from './components/CardsList/CardsList.jsx'
import { useEffect } from 'react'
import Styles from './globals.css';

// export const getData = async (url) => {
//   try {
//     const response = await fetch(url)
//     if (response.status !== 200) {
//       throw new Error('Ошибка получения данных!')
//     }
//     const data = await response.json()
//     return data
//   } catch (error) {
//     return error
//   }
// }
// export default async function Home() {
// const dataFromUrl = await getData('https://api-code-2.practicum-team.ru/games')
export default function Home() {

  useEffect(() => {
    const getData = async (url) => {
      try {
        const response = await fetch(url);
        if (response.status !== 200) {
          throw new Error('Ошибка получения данных!');
        }
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        return error;
      }
    };
    getData('https://api-code-2.practicum-team.ru/games')
  }, []);

  const popularGames = getNormalizedGamesDataByCategory("popular");
  
  const newGames = getNormalizedGamesDataByCategory("new");

  return (
    <main className = {Styles['main']}>
      <Banner/>
      <CardsList id = 'popular' title='Популярные' data = {popularGames}/>
      <CardsList id = 'new' title='Новинки' data = {newGames}/>
      <Promo/>
    </main>
  );
}
