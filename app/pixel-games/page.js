'use client';
import { endpoints } from '@/app/api/config';
import { getNormalizedGamesDataByCategory } from '../data/data-utils';
import { CardsListSection } from '../components/CardsList/CardsListSection';
import { Preloader } from './components/Preloader/Preloader';

export default function Pixel() {
    const pixelGames = getNormalizedGamesDataByCategory(endpoints.games, 'pixel');

    return (
        <main className={'main-inner'}>
            {pixelGames ? (
                <CardsListSection id = 'pixel-games' title='Пиксельные' data={pixelGames}/>
            ) : (
                <Preloader/>
            )}
        </main>
    )
}