import * as axios from 'axios';

export const create = async (leagueID) => {

    const config = {
        method: 'get',
        url: `https://toepunt-api.herokuapp.com/fixtures`,
        headers: { 
          'league_id': leagueID
        }
    };

    try{
        const fixtures = await axios(config);
        return fixtures.data;
    } catch(error){
        console.log(error);
    }
}