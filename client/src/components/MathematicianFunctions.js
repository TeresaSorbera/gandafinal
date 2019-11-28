import axios from 'axios'

export const register = newMathematician => {
    return axios
        .post('http://localhost:6001/mathematicians/register', {
            first_name: newMathematician.first_name,
            last_name: newMathematician.last_name,
            university: newMathematician.university,
            email: newMathematician.email,
            password: newMathematician.password,
        })
        .then(res => {
            console.log('Registered')
        })
}

export const login = mathematician => {
    return axios
        .post('mathematicians/login', {
            email: mathematician.email,
            password: mathematician.password
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}
