import {teamIds} from '../models/data/teamIds';

export const create = (side, teamProfiles) => {

    teamProfiles.forEach( (team) => {
        team.icon_id = teamIds.find( (t) => t.Name === team.Name ).icon_id;
    });

    teamProfiles.forEach( (team) => {
        const markup = `
            <li class='li-${side}'><img src='https://www.fifaindex.com/static/FIFA21/images/crest/2/light/${team.icon_id}.webp'></img>${team.Name}</li>
        `;

        document.querySelector(`.value-list-${side}`).insertAdjacentHTML('beforeend', markup);
    } );

    const inputField = document.querySelector(`.chosen-value-${side}`);
    const dropdown = document.querySelector(`.value-list-${side}`);
    const dropdownArray = [... document.querySelectorAll(`.li-${side}`)];

    let valueArray = [];
    dropdownArray.forEach(item => {
        valueArray.push(item.textContent);
    });

    inputField.addEventListener('input', () => {
        dropdown.classList.add('open');
        let inputValue = inputField.value.toLowerCase();
        if (inputValue.length > 0) {
            for (let j = 0; j < valueArray.length; j++) {
            if (!(inputValue.substring(0, inputValue.length) === valueArray[j].substring(0, inputValue.length).toLowerCase())) {
                dropdownArray[j].classList.add('closed');
            } else {
                dropdownArray[j].classList.remove('closed');
            }
            }
        } else {
            for (let i = 0; i < dropdownArray.length; i++) {
            dropdownArray[i].classList.remove('closed');
            }
        }
    });

    dropdownArray.forEach(item => {
        item.addEventListener('click', (evt) => {
            inputField.value = item.textContent;
            dropdownArray.forEach(dropdown => {
            dropdown.classList.add('closed');
            });
        });
    })

    inputField.addEventListener('focus', () => {
        inputField.placeholder = 'Type to Filter';
        dropdown.classList.add('open');
        dropdownArray.forEach(dropdown => {
            dropdown.classList.remove('closed');
        });
    });

    inputField.addEventListener('blur', () => {
        inputField.placeholder = `Select ${side} Team`;
        dropdown.classList.remove('open');
    });

    document.addEventListener('click', (evt) => {
        const isDropdown = dropdown.contains(evt.target);
        const isInput = inputField.contains(evt.target);

        if(evt.target.classList[0] === `li-${side}`){
            state[`${side}_chosen`] = evt.target.innerText.replaceAll(' ', '_');
        }
        if(!isDropdown && !isInput){
            dropdown.classList.remove('open');
        }

        window.location.hash = `${state.home_chosen ? state.home_chosen : 'H'}_vs_${state.away_chosen ? state.away_chosen : 'A'}`
    })
}