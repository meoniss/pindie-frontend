'use client';
import { endpoints } from '@/app/api/config';
import { getNormalizedGamesDataByCategory } from '../data/data-utils';
import { CardsListSection } from '../components/CardsList/CardsListSection';

export default function Shooters() {
    const shootersGames = getNormalizedGamesDataByCategory(endpoints.games, 'shooters');

    return (
        <main className={'main-inner'}>
        {shootersGames ? (
            <CardsListSection id = 'shooters' title='Шутеры' data={shootersGames}/>
        ) : (
            <Preloader/>
        )}
        </main>
    )
}