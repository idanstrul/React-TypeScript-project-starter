//An exemple for a user service (with local storage) 
//from MisterBitcoin React project. 

import { storageService } from './async-storage.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY_USERS = 'user'

export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser,
    addMove
}

//User service architecture: 
//The user is saved in 3 different places and should be updated in all 3,
//1st the data base - which is currently the local-storage, all the users are saved there,
//2nd the sesseion storage - where the currently loggedin user is saved in order to keep log-in throughout the session,
//And 3rd - the app store - there the currently loggedin user is saved as a mutable mutaul state for all the components, to access
//This user service is mainly responsible for updating the user in the data base and in the session-storage
//The management of the loggedinuser in the store is done by the user actions module


//Login - looks for the user in the data base and if exists, saves it to the session storage
async function login(userCred) {
    try {
        const user = await getByUsername(userCred.username)
        if (!user) return Promise.reject('Invalid username')
        return _saveLocalUser(user)
    } catch (err) {
        console.log('userService: Error in login user', err)
        throw err
    }
}

//Signup - looks for the user in the data base and if not exists creates a new user and only saves it to the data base - not responsible for setting the loggedin user
async function signup(userCred) {
    try {
        // const user = await getByUsername(userCred.username)
        // if (user) return Promise.reject('Username already exists')
        const user = await addUser(userCred)
        return _saveLocalUser(user) ////Delete this for realistic auth
    } catch (err) {
        console.log('userService: Error in signup user', err)
        throw err
    }
}

//Logout - only removes the loggedin user from the session storage
async function logout() {
    return sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

//GetLoggedinUser - only returns the currently loggedin user from the session storage
async function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}

// addMove - adds a move to the currently loggedin user, and updates the user in the data base and the session storage
async function addMove(contact, amount) {
    try {
        const user = await getLoggedinUser()
        if (!user) return Promise.reject('Not loggedin')
        if (user.coins - amount < 0) return Promise.reject('Not enough coins')
        user.coins -= amount
        user.moves.push({
            toId: contact._id,
            to: contact.name,
            at: Date.now(),
            amount
        })
        // await storageService.put(STORAGE_KEY_USERS, user)
        return _saveLocalUser(user)
    } catch (error) {
        console.error('Failed to addMove', error)
        throw error
    }
}

async function addUser({ username }) {
    try {
        // const newUser =
        return {
            name: username,
            coins: 100,
            moves: []
        }
        // return storageService.post(STORAGE_KEY_USERS, newUser)
    } catch (err) {
        console.error('cannot insert user', err)
        throw err
    }
}

async function getByUsername(username) {
    try {
        const users = await storageService.query(STORAGE_KEY_USERS)
        return users.find(u => u.name === username)
    } catch (err) {
        console.error(`while finding user ${username}`, err)
        throw err
    }
}


function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}