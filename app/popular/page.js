'use client';
import { getNormalizedGamesDataByCategory } from '../data/data-utils';
import { endpoints } from '../api/config.js'
import { CardsListSection } from '../components/CardsList/CardsListSection';

// export default function Popular() {
//     const popularGames = getNormalizedGamesDataByCategory('popular');
export default function Popular() {
    const popularGames = getNormalizedGamesDataByCategory(
        endpoints.games,
        'popular'
    );

    return (
        <main className={'main-inner'}>
            <CardsListSection id = 'popular' title='Популярные' data={popularGames}/>
        </main>
    )
}