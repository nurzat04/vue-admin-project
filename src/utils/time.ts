//获取当前时间，早上好，下午好，晚上好
export const getTimeOfDay = () => {
    let date = new Date()
    let hours = date.getHours()
    if (hours < 12) {
        return 'Good morning!'
    } else if (hours < 18) {
        return 'Good afternoon!'
    } else {
        return 'Good evening!'
    }
}
