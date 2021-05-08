const fs = require('fs')
const axios = require('axios')



class Searchs {
    history = [];
    pathDB = './history/saved.json'

    constructor(){
        this.readHistoryDB()
    }
    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es' 
        }
    }
    get paramsWeather(){
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async city( city ) {
        try{
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
            params: this.paramsMapbox
        })   
        
        const resp = await instance.get()
        return resp.data.features.map( place => ({
            id: place.id,
            name: place.place_name,
            lng: place.center[0],
            lat: place.center[1],

        }))
        
        }catch(err){
            return[]
        }
    }

    async weather(lat, lon){
      
        try{
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeather, lat, lon}
            })
            const res = await instance.get()
            const {weather, main} = res.data
            return{
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        }catch(err){
            console.log(err)
        }
    }

    save(place){
        if(this.history.includes(place.toLowerCase())) return;
        this.history.unshift(place.toLowerCase());
        this.saveDB()
    }

    saveDB(){
        const payload = {
            history: this.history
        }
        fs.writeFileSync(this.pathDB, JSON.stringify( payload ))
    }
    readHistoryDB(){
        if(!fs.existsSync(this.pathDB)) return
        const info = fs.readFileSync(this.pathDB, {encoding: 'utf-8'});
        const data = JSON.parse(info)
        this.history = data.history
        console.log(this.history)

    }


}

module.exports = Searchs