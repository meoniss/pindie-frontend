'use client';
import { endpoints } from '@/app/api/config';
import { getNormalizedGamesDataByCategory } from '../data/data-utils';
import { CardsListSection } from '../components/CardsList/CardsListSection';

export default function Runners() {
    const runnersGames = getNormalizedGamesDataByCategory(endpoints.games, 'runners');

    return (
        <main className={'main-inner'}>
            {runnersGames ? (
                <CardsListSection id = 'runners' title='Раннеры' data={runnersGames}/>
            ) : (
                <Preloader/>
            )}
        </main>
    )
}