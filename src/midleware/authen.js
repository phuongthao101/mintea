const ROLE = {
    admin: 1,
    viewer: 2,
    editor: 3
}
let isAPIRequest = (url) => {
    return url.startsWith('/api')
}
let role = (...params) => {
    return (req, res, next) => {
        const { user } = req.session
        if (user) {
            const roleId = req.session.user.roleId
            for (let i = 0; i < params.length; i++) {
                if (params[i] == roleId) {
                    return next()
                }
            }
            if (isAPIRequest(req.originalUrl)) {

                return res.status(res.status(200).json({ 'message': 'Premission denied' })) // ask
            }
            return res.redirect('/404')
        }
        //not sign in user
        if (isAPIRequest(req.originalUrl)) {
            return res.status(res.status(200).json({ 'message': 'You need sign in' }))
        }
        return res.redirect('/login')
    }

}
// let role = (...params) => {
//     return (req, res, next) => {

//         //check is login
//         const { user } = req.session

//         if (user) {
//             const roleId = req.session.user.roleId

//             for (let i = 0; i < params.length; i++) {
//                 if (params[i] == roleId) {
//                     return next()
//                 }
//             }
//             if (isAPIRequest(req.originalUrl)) {
//                 return res.status(res.status(200).json({ 'message': 'Premission denied' }))
//             }
//             return res.redirect('/404')
//         }
//         //return login
//         if (isAPIRequest(req.originalUrl)) {
//             return res.status(res.status(200).json({ 'message': 'You need sign in' }))
//         }
//         return res.redirect('/login')
//     }
// }

export default { role }
export { ROLE }