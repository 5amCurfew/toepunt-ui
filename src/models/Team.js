import * as axios from 'axios';
import {teamIds} from './data/teamIds';

//////////////////////////
// Local Functions
//////////////////////////


//////////////////////////
// TEAM class
//////////////////////////
export default class Team {
    constructor(teamProfile) {
      this.profile = teamProfile;
      this.icon_id = teamIds.find( (t) => t.Name === teamProfile.Name ).icon_id;
      this.api_id = teamIds.find( (t) => t.Name === teamProfile.Name ).api_id;
    };

    async getLatestFixtureId(){
        const config = {
            method: 'get',
            url: `https://toepunt-api.herokuapp.com/latest_fixture`,
            headers: { 
              'team_api_id': this.api_id
            }
        };
    
        try{
            const fixtureID = await axios(config);
            this.latest_fixture = fixtureID.data;
        } catch(error){
            console.log(error);
        }
    }

    async getLatestLineUp(){
        const config = {
            method: 'get',
            url: `https://toepunt-api.herokuapp.com/latest_line_up`,
            headers: { 
              'team_api_id': this.api_id,
              'latest_fixture_id': this.latest_fixture.id
            }
        };
    
        try{
            const lineup = await axios(config);
            this.latest_line_up = lineup.data;
        } catch(error){
            console.log(error);
        }
    }

}