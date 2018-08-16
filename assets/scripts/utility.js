import appConfig from './config';
import globalStates from './globalStates';

// Utility Module
const utilityModule = (() => {

    // Generic method to fetch data from an endpoint
    const fetchData = (url, credentials = 'include') => {
        return fetch(url, {
            credentials
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
                    let  { latitude, longitude } = position.coords;
                    globalStates.location  = {latitude, longitude};
                    let geoData = fetchData(`${appConfig.geoCodeUrl}?latlng=${latitude},${longitude}&key=${appConfig.geoCodeApiKey}`, 'omit');     
                    geoData.then((res) => {
                        console.log(res)
                        let address = res.results[res.results.length -1].formatted_address.split(',');
                        globalStates.location.address = `${address[address.length-3]}, ${address[address.length-1]}`;
                    }).catch((error) => {
                        console.log(error)
                    });
            });
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