// headers --> use these at your own discretion
const headers = {'Content-Type': 'application/json', 'Accepts': 'application/json'}
// urls
const url = "https://tamagotchi-simulator.herokuapp.com"
// const url = "http://localhost:4000"
const usersURL = `${url}/users`
const loginURL = `${url}/login`
const tamagotchisURL = `${url}/tamagotchis`
const statusesURL = `${url}/statuses`
const itemsURL = `${url}/items`
const inventoriesURL = `${url}/inventories`
// parse incoming data
const parseData = response => response.json()
// error handler
const catchError = error => {
    debugger
    alert(error)
    console.log(`%c${error}`, 'color: red;')
}

// Create User
export const createUser = (user) => fetch(`${usersURL}/create`, {
    method: 'POST',
    headers,
    body: JSON.stringify(user)
})
.then(parseData)
.catch(catchError)

// Login User
export const loginUser = (user) => fetch(`${loginURL}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(user)
})
.then(parseData)
.catch(catchError)

// Get all tamagotchis
export const getAllTamagotchis = () => fetch(`${tamagotchisURL}`)
.then(parseData)
.catch(catchError)

// Get tamagotchi
export const getTamagotchi = (id) => fetch(`${tamagotchisURL}/${id}`)
.then(parseData)
.catch(catchError)

// Choose tamagotchi
export const chooseTamagotchi = (status) => fetch(`${statusesURL}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(status)
})
.then(parseData)
.catch(catchError)

// Get status
export const getStatus = (statusId) => fetch(`${statusesURL}/${statusId}`)
.then(parseData)
.catch(catchError)

// Get all items
export const getAllItems = () => fetch(itemsURL)
.then(parseData)
.catch(catchError)

// Get all inventory item
export const getInventory = (statusId) => fetch(`${inventoriesURL}/${statusId}`)
.then(parseData)
.catch(catchError)

// Post buy item
export const buyItem = (item) => fetch(`${inventoriesURL}/buy`, {
    method: 'POST',
    headers,
    body: JSON.stringify(item)
})
.then(parseData)
.catch(catchError)

// Post sell item
export const sellItem = (item) => fetch(`${inventoriesURL}/sell`, {
    method: 'POST',
    headers,
    body: JSON.stringify(item)
})
.then(parseData)
.catch(catchError)

// Post feed
export const feedItem = (item) => fetch(`${inventoriesURL}/feed`, {
    method: 'POST',
    headers,
    body: JSON.stringify(item)
})
.then(parseData)
.catch(catchError)

// Post play
export const playItem = (item) => fetch(`${inventoriesURL}/play`, {
    method: 'POST',
    headers,
    body: JSON.stringify(item)
})
.then(parseData)
.catch(catchError)

// Get user statuses
export const getUserStatuses = (userId) => fetch(`${statusesURL}/user/${userId}`)
.then(parseData)
.catch(catchError)