export const create = (side, team) => {
    const star = '&#11088;'
    const def = Math.min((Math.floor(team.profile.DEF-60)/5), 5);
    const mid = Math.min((Math.floor(team.profile.MID-60)/5), 5);;
    const att = Math.min((Math.floor(team.profile.ATT-60)/5), 5);;

    let tableMarkup = `
        <div class='rating-box'>Def:<br>${star.repeat(def)}</div>
        <div class='rating-box'>Mid:<br>${star.repeat(mid)}</div>
        <div class='rating-box'>Att:<br>${star.repeat(att)}</div>
    `
    document.querySelector(`#rating-${side}`).insertAdjacentHTML('beforeend', tableMarkup);
    
};