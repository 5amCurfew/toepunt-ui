import Team from './Team';
import * as axios from 'axios';

//////////////////////////
// Local Functions
//////////////////////////
const outcome = (homeGoals, awayGoals) => {
    if(homeGoals > awayGoals){
        return 'HOME'
    } else if( homeGoals === awayGoals ){
        return 'DRAW'
    } else{
        return 'AWAY'
    };
};

const computeLambda = async (ATT, DEF, MID1, MID2, is_home) => {
    const config = {
        method: 'get',
        url: `https://toepunt-api.herokuapp.com/model`
    };

    try{
        const model = await axios(config);
        const M = model.data;
        return Math.exp( ( (M.intercept) + (M.is_home)*is_home + (M.AvD)*(ATT-DEF) + (M.MvM)*(MID1 - MID2)) );
    } catch(error){
        console.log(error);
    }
};

const factorial = (n) => {
    if(n === 0){
        return 1;
    }
    return (n != 1) ? n * factorial(n - 1) : 1;
};

const poissonPDF = (N, lambda) => {
    const expLambda = Math.exp(-lambda);
    const lambdaN = Math.pow(lambda, N);
    return ( (expLambda * lambdaN)/factorial(N) );
};

const poissonCDF = (N, lambda) => {
    let probs = []
    for(let i = 0; i <= N; i++){
        probs.push(poissonPDF(i, lambda))
    };
    return probs.reduce( (accumulator, current) => accumulator + current );
};

//////////////////////////
// GAME class
//////////////////////////
export default class Game {
    constructor(homeProfile, awayProfile) {
      this.home = new Team(homeProfile),
      this.away = new Team(awayProfile),
      this.updatedAt = new Date;
    }

    async predictScores(){

        const lambda_home = await computeLambda(this.home.profile.ATT, this.away.profile.DEF, this.home.profile.MID, this.away.profile.MID, 1);
        const lambda_away = await computeLambda(this.away.profile.ATT, this.home.profile.DEF, this.away.profile.MID, this.home.profile.MID, 0);
        let scores = [];

        // HOME, AWAY 0-4 goals
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                scores.push({
                    home: (i).toString(),
                    away: (j).toString(),
                    result: outcome(i,j),
                    probability: poissonPDF(i, lambda_home) * poissonPDF(j, lambda_away),
                })
            }
        }

        //// HOME with AWAY = 5+
        for(let i = 0; i < 5; i++){
            scores.push({
                home: (i).toString(),
                away: '5+',
                result: 'AWAY',
                probability: poissonPDF(i, lambda_home) * ( 1 - poissonCDF(4, lambda_away) ),
            })
        }

        //// AWAY with HOME = 5+
        for(let j = 0; j < 5; j++){
            scores.push({
                home: '5+',
                away: (j).toString(),
                result: 'HOME',
                probability: poissonPDF(j, lambda_away) * ( 1 - poissonCDF(4, lambda_home) ),
            })
        }

        // HOME & AWAY 5+
        scores.push({
            home: '5+',
            away: '5+',
            result: 'DRAW',
            probability: ( 1 - poissonCDF(4, lambda_home) ) * ( 1 - poissonCDF(4, lambda_away) ),
        })

        this.scores = scores;

    }
    
    async predictResults(){
        this.home_win = this.scores.filter( (score) => {return score.result == 'HOME'} ).reduce((acc, value) => acc + value.probability, 0);
        this.draw = this.scores.filter( (score) => {return score.result == 'DRAW'} ).reduce((acc, value) => acc + value.probability, 0);
        this.away_win = this.scores.filter( (score) => {return score.result == 'AWAY'} ).reduce((acc, value) => acc + value.probability, 0);
        this.both_to_score = this.scores.filter( (score) => {return score.home != "0" && score.away != "0"} ).reduce((acc, value) => acc + value.probability, 0);
    }

}