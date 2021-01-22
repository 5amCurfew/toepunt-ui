import * as dayjs from 'dayjs';
var calendar = require('dayjs/plugin/calendar')
dayjs.extend(calendar)

export const create = (fixtures) => {
    //latest_line_up.startXI.forEach( (player) => {
    for(const i in fixtures){
        let formattedDate = dayjs(fixtures[i].fixture.date).calendar();
        let markup = `
            <div class="ticker__item">
                <img src=${fixtures[i].league.logo} class='ticker__img'>
                <div class="ticker__text">
                    ${fixtures[i].teams.home.name} vs ${fixtures[i].teams.away.name},  ${formattedDate}<br>
                    ${fixtures[i].fixture.venue.name}
                </div>
            </div>
        `
        document.querySelector(`.ticker`).insertAdjacentHTML('beforeend', markup);
    }
}