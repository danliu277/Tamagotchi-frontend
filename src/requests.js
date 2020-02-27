// headers --> use these at your own discretion
const headers = {'Content-Type': 'application/json', 'Accepts': 'application/json'}
// urls
const usersURL = 'http://localhost:4000/users'
const tamagotchisURL = 'http://localhost:4000/tamagotchis'
const statusesURL = 'http://localhost:4000/statuses'
const itemsURL = 'http://localhost:4000/items'
// parse incoming data
const parseData = response => response.json()
// error handler
const catchError = error => console.log(`%c${error}`, 'color: red;')

// Create User
export const createUser = (user) => fetch(`${usersURL}/create`, {
    method: 'POST',
    headers,
    body: JSON.stringify(user)
})
.then(parseData)
.catch(catchError)

// Login User
export const loginUser = (user) => fetch(`${usersURL}/login`, {
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