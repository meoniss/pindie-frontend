'use client';
import { endpoints } from '@/app/api/config';
import { useGetDataByCategory } from '.api/api-hooks';
// import { getNormalizedGamesDataByCategory } from '../data/data-utils';
import { CardsListSection } from '../components/CardsList/CardsListSection';
import { Preloader } from './components/Preloader/Preloader';
// export default function New() {
//      const newGames = getNormalizedGamesDataByCategory('new');
// export default async function New(endpoints) {
    
export default function New() {
    // const newGames = await getNormalizedGamesDataByCategory(endpoints.games, 'new')
    // console.log(newGames)
    const newGames = useGetDataByCategory(endpoints.games, 'new')
    return (
        <main className={'main-inner'}>
            {newGames ? (
                <CardsListSection id = 'new' title='Новинки' data={newGames}/>
            ) : (
                <Preloader/>
            )}
        </main>
    );
}