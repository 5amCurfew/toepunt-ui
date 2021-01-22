export const create = (side, latest_line_up) => {

    let tableMarkup = `
        <ul class="responsive-table-${side}">
            <li class="table-header-${side}">
            <div class="col col-1">No.</div>
            <div class="col col-2">Player</div>
            <div class="col col-3">Role</div>
            </li>
        </ul>
    `
    document.querySelector(`.teamTableContainer-${side}`).insertAdjacentHTML('beforeend', tableMarkup);

    //latest_line_up.startXI.forEach( (player) => {
    for(const i in latest_line_up.startXI){
        let markup = `
            <li class="table-row-${side}">
                <div class="col col-1" data-label="No.">${latest_line_up.startXI[i].player.number}</div>
                <div class="col col-2" data-label="Player">${latest_line_up.startXI[i].player.name}</div>
                <div class="col col-3" data-label="Role">${latest_line_up.startXI[i].player.pos}</div>
            </li>
        `
        document.querySelector(`.responsive-table-${side}`).insertAdjacentHTML('beforeend', markup);
    }
    
};