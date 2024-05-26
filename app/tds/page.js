'use client';
import { endpoints } from '@/app/api/config';
import { getNormalizedGamesDataByCategory } from '../data/data-utils';
import { CardsListSection } from '../components/CardsList/CardsListSection';

export default function Tds() {
    const tdsGames = getNormalizedGamesDataByCategory(endpoints.games, 'tds');

    return (
        <main className={'main-inner'}>
            {tdsGames ? (
                <CardsListSection id = 'tds' title='TDS' data={tdsGames}/>
            ) : (
                <Preloader/>
            )}
        </main>
    )
}