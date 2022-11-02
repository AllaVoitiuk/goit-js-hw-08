import Player from '@vimeo/player';
let throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const throttledSaveTime = throttle(setTimeToLocale,1000);

player.setCurrentTime(getTimeFromLocale());     
    
player.on('timeupdate', throttledSaveTime);

function setTimeToLocale(data) {

    return localStorage.setItem("videoplayer-current-time", JSON.stringify(data.seconds));
}

function getTimeFromLocale() {

    const seconds = localStorage.getItem("videoplayer-current-time");
    
    if (!seconds) {          
        return;
    }   
            
    return parseFloat(seconds);
}
    