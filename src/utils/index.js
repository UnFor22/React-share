export function formDate(unix) {
    function fixedZero(num) {
        return num >= 10 ? ('' + num) : ('0' + num)
    }

    let date = new Date(unix)

    let year = date.getFullYear()
    let month = fixedZero(date.getMonth() +1)
    let day = fixedZero(date.getDate())
    let hour = fixedZero(date.getHours())
    let min = fixedZero(date.getMinutes())
    let sec = fixedZero(date.getSeconds())

    let timeStr = `${year}-${month}-${day} ${hour}:${min}:${sec}`

    return timeStr
}

// const xhr = fetch.create({
//     baseURL: '',
//     timeout:15000
// })

// export const axios = {  
//     get(url,data,config){
        
//     }
// }
