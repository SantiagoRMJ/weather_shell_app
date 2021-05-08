require('dotenv').config()

const { readInput, menu, pause, listPlaces } = require("./helpers/inquirer");
const Searchs = require("./models/searchs");


const main = async() => {
const search = new Searchs()    
let opt;

do{
    opt = await menu()

    switch( opt ){
        case '1':
            const place = await readInput('City: ');
            const places = await search.city( place );
            const selectId = await listPlaces(places);
            if(selectId === '0') continue;
            const selectedPlace = places.find(place => place.id === selectId);
            search.save( selectedPlace.name )
            const weatherInPlace = await search.weather(selectedPlace.lat, selectedPlace.lng)
           
            console.log('City: ', selectedPlace.name.yellow)
            console.log('Latitude: ', selectedPlace.lat)
            console.log('Longitude: ', selectedPlace.lng)
            console.log('Temperature: ', weatherInPlace.temp,'ºC'.yellow )
            console.log('Max: ', weatherInPlace.max, 'ºC'.yellow )
            console.log('Min: ', weatherInPlace.min,'ºC'.yellow )
            console.log('Description: ', weatherInPlace.desc.yellow)
        break

        case '2':
            search.history.forEach((place, i) => {
                const index = `${i + 1}.`.green;
                console.log(`${index} ${place}`)
            })
        break
    }
    

    if(opt !== '0') await pause()
}while(opt !== '0')
    await pause()
}

main()