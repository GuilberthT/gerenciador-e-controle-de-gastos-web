import axios from '../axiosInstance.js'

export async function getUsers() {
    const data = await axios.get('users')

    return data.data.users
}