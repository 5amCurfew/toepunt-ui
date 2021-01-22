import * as fixtures from './models/Fixtures';
import Game from './models/Game';
import {teamProfiles} from './models/data/teamProfiles';
import * as viewFixturesTicker from './views/viewFixturesTicker';
import * as viewGame from './views/viewGame.js';
import * as viewResults from './views/viewResults.js'
import * as viewMenu from './views/viewMenu.js';
import * as viewStartXi from './views/viewStartXi.js';
import * as viewStartXiTable from './views/viewStartXiTable.js';

const toepunt =
'   __                               __                    _  \n'+
'  / /_____  ___  ____  __  ______  / /_            __  __(_)\n'+
' / __/ __ \\/ _ \\/ __ \\/ / / / __ \\/ __/  ______   / / / / /\n'+ 
'/ /_/ /_/ /  __/ /_/ / /_/ / / / / /_   /_____/  / /_/ / /\n'+  
'\\__/\\____/\\___/ .___/\\__,_/_/ /_/\\__/            \\__,_/_/ \n'+  
'           /_/                                            \n'

let state = {"updatedAt": new Date};
window.state = state;

const clear = (div) => {
    document.querySelector(`${div}`).innerHTML = '';
};

///////////////////////////////////////////////
// GAME Controller
///////////////////////////////////////////////
const gameController = async (h, a) => {
    let homeProfile = teamProfiles.find( (team) => team.Name == h.replaceAll('_', ' ') );
    let awayProfile = teamProfiles.find( (team) => team.Name == a.replaceAll('_', ' ') );

    try{

        state.Game = new Game(homeProfile, awayProfile);

        await state.Game.predictScores();
        await state.Game.predictResults();
        clear('#goal-grid');
        viewGame.create(state.Game.scores, 'goal-grid');
        viewResults.create(state.Game);

        await state.Game.home.getLatestFixtureId();
        await state.Game.home.getLatestLineUp();
        clear('#pitch-home');
        viewStartXi.create('home', state.Game.home.latest_line_up);
        clear('.teamTableContainer-home');
        viewStartXiTable.create('home', state.Game.home.latest_line_up);

        await state.Game.away.getLatestFixtureId();
        await state.Game.away.getLatestLineUp();
        clear('#pitch-away');
        viewStartXi.create('away', state.Game.away.latest_line_up);
        clear('.teamTableContainer-away');
        viewStartXiTable.create('away', state.Game.away.latest_line_up);

    } catch(error){
        console.log(error)
    }
}

///////////////////////////////////////////////
// EVENT LISTENERS
///////////////////////////////////////////////
window.addEventListener('load', async () => {
    console.log(toepunt);

    viewMenu.create('home', teamProfiles);
    viewMenu.create('away', teamProfiles);

    state.fixtures = await fixtures.create(39);
    // Default load: 1. Set chosen defaults 2. Change hash which then calls gameController(h,a)
    state.home_chosen = 'Fulham';
    state.away_chosen = 'Tottenham Hotspur';

    viewFixturesTicker.create(state.fixtures);

    window.location.hash = `${state.home_chosen ? state.home_chosen : 'H'}_vs_${state.away_chosen ? state.away_chosen : 'A'}`;
 
});

window.addEventListener('hashchange', () => {
    if(state.home_chosen && state.away_chosen){
        gameController(state.home_chosen, state.away_chosen);
    }
});