export const create = (game) => {
    const home_price = Math.round(1/game.home_win*10)/10;
    const draw_price = Math.round(1/game.draw*10)/10;
    const away_price = Math.round(1/game.away_win*10)/10;
    const both_to_score_price = Math.round(1/game.both_to_score*10)/10;
    document.querySelector('.probability-home-text').innerHTML = `${Math.round(game.home_win*100)}% (${home_price.toFixed(1)})`;
    document.querySelector('.probability-draw-text').innerHTML = `${Math.round(game.draw*100)}% (${draw_price.toFixed(1)})`;
    document.querySelector('.probability-away-text').innerHTML = `${Math.round(game.away_win*100)}% (${away_price.toFixed(1)})`;
    document.querySelector('.probability-both-to-score-text').innerHTML = `${Math.round(game.both_to_score*100)}% (${both_to_score_price.toFixed(1)})`;
}