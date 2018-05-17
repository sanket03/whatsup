// Utility Module
const utilityModule = (() => {

    // Generic method to fetch data from an endpoint
    const fetchData = (url) => {
        return fetch(`${url}userProfile`, {
            credentials: 'include'
        }). then((res) => {
            return res.json()
        }).then((res) => {
            return res;
            console.log('USER ID : ' + data.userId)
        }).catch((error) => {
            console.log(error)
        })    
    }
    return {
        fetchData
    }
})();

export default utilityModule;