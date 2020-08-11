// let token
// const user = localStorage.getItem('token')

// if (user) {

//     const jsonparsed = JSON.parse(user)

//     if (typeof jsonparsed === 'object') {
//         token = { Authorization: 'Bearer ' + user.token };
//     } else {
//         token = {};
//     }
// } else {
//     token = {};
// }

// export default token

export default function authHeader() {
    // const user = JSON.parse(localStorage.getItem('token'));
    const user = localStorage.getItem('token');
    // console.log(user.accessToken)
    if (user) {
        return { Authorization: 'Bearer ' + user };
    } else {
        return {};
    }
}