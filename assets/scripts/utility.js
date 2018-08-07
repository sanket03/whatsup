import appConfig from './config';

// Utility Module
const utilityModule = (() => {

    // Generic method to fetch data from an endpoint
    const fetchData = (url) => {
        return fetch(url, {
            credentials: 'include'
        }). then((res) => {
            return res.json()
        }).then((res) => {
            return res;
        }).catch((error) => {
            console.log(error)
        })    
    }

    // Generic method for setting data in local storage
    const setLocalStorage = (key, value) => {
        localStorage.setItem(key, value);
    }

    // Generic method for getting data from local storage
    const getFromLocalStorage = (key) => {
        return localStorage.getItem(key);
    }

    // Generic method for getting location details
    const getUserLocation = () => {
        if('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                let geoData = fetchData(`${appConfig.geoCodeUrl}?latlng=${position.coords.latitude},${position.coords.longitude}&key=${appConfig.geoCodeApi}`);
                console.log(geoData);
            })
        }
    }

    return {
        fetchData,
        setLocalStorage,
        getFromLocalStorage,
        getUserLocation
    }
})();

export default utilityModule;