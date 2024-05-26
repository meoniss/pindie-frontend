import { useState, useEffect } from 'react'; 

export const getData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const normalizeDataObject = (obj) => {
    let str = JSON.stringify(obj)
    
    str = str.replaceAll('_id', 'id');
    const newObj = JSON.parse(str)
    const result = { ...newObj, category: newObj.categories }
    return result;
  }

export const normalizeData = (data) => {
    return data.map((item) => {
        return normalizeDataObject(item)
    })
}

export const getNormalizedGamesDataByCategory = async (url, category) => {
    const data = await getData(`${url}?categories.name=${category}`);
    return normalizeData(data);
}

export const getNormalizedGameDataById = async (url, id) => {
    const data = await getData (`${url}/${id}`)
    return normalizeDataObject(data);
}

export const authorize = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    if (response.status != 200) {
        throw new Error('Ошибка авторизации!');
    }
    const result = await response.json();
    return result;
    } catch (error) {
        return error;
    }
};

/**
 * 
 * URL-адрес в виде строки, куда будет выполнен запрос
 * JWT–токен в виде строки
 */
export const getMe = async (url, jwt) => {
    useEffect(() => {
        authorize(endpoints.auth, {indetifier: 'aski@example.com', password: 'ilovehtml'})
        .then(res => console.llllog(res))
    }, [])
    
    try {
      // Выполняем запрос
      const response = await fetch(url, {
        // Запрос выполняется методом GET
        method: "GET",
        // JWT-токен передаётся в специальном заголовке Authorization
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (response.status !== 200) {
        throw new Error("Ошибка получения данных");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
};


export const setJWT = (jwt) => {
    localStorage.setItem("jwt", jwt);
};
  
export const getJWT = () => {
    return localStorage.getItem("jwt");
};

export const removeJWT = () => {
    localStorage.removeItem("jwt");
};
  
export const checkIfUserVoted = (game, userId) => {
    return game.users.find((user) => user.id === userId);
};

export const vote = async (url, jwt, usersArray) => {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ user_permissions_users: usersArray }),
        })
        if (response.status !== 200) {
            throw new Error('Ошибка голосования')
        }
        const result = await response.json()
        return result
    } catch (error) {
        return error
    }
}

body: JSON.stringify({ users: usersArray })