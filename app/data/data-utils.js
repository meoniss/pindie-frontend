import { data } from './data.js'
export const getNormalizedGamesDataByCategory = (category) => {
    return data.filter ((game) => {
        return game.category.find ((item) => item.name === category);
    });
};

export const getNormalizedGameDataById = (id) => {
    return data.find ((game => game.id === Number(id)));
};