const leagueID = 357;
const year = 2022;

async function getTeamsInLeague() {
    const allTeams = await fetchTeamsInLeague();
    console.log(allTeams);

    const teamContainer = document.createElement('div');
    teamContainer.className = 'team-container';
    document.body.appendChild(teamContainer)

    allTeams.response.forEach(i => {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';

        const teamImage = document.createElement('img');
        teamImage.src = i.team.logo;
        teamImage.alt = i.team.name;
        teamCard.appendChild(teamImage);

        const teamDetails = document.createElement('div');
        teamDetails.className = 'team-details';

        const teamName = document.createElement('h1');
        teamName.textContent = i.team.name;
        teamDetails.appendChild(teamName);

        const teamFounded = document.createElement('h3');
        teamFounded.textContent = "Founded: " + i.team.founded;
        teamDetails.appendChild(teamFounded);

        const stadiumName = document.createElement('h3');
        stadiumName.textContent = "Stadium Name: " + i.venue.name;
        teamDetails.appendChild(stadiumName);

        const stadiumCapacity = document.createElement('h3');
        stadiumCapacity.textContent = "Stadium Capacity: " + i.venue.capacity;
        teamDetails.appendChild(stadiumCapacity);

        const stadiumAddress = document.createElement('h3');
        stadiumAddress.textContent = "Stadium Address: " + i.venue.address + ", " + i.venue.city;
        teamDetails.appendChild(stadiumAddress);

        const teamButton = document.createElement('button');
        teamButton.id = i.team.id;
        teamButton.textContent = "See Players";
        teamButton.setAttribute('onclick', `getPlayersFromTeam(${i.team.id})`);
        teamDetails.appendChild(teamButton);

        teamCard.appendChild(teamDetails);
        teamContainer.appendChild(teamCard);
    });
};

async function fetchTeamsInLeague() {
    const url = `https://api-football-v1.p.rapidapi.com/v3/teams?league=${leagueID}&season=${year}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '12c3ec53b0msha444e311dcb662fp19498bjsn43c7861443f4',
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function getPlayersFromTeam(teamID) {
    if (!!document.getElementById('player-container-title')) {
        document.getElementById('player-container-title').remove();
    }
    const playerContainerTitle = document.createElement('h1');
    playerContainerTitle.innerHTML = 'All Players';
    playerContainerTitle.id = 'player-container-title';
    document.body.appendChild(playerContainerTitle);
    
    if (!!document.getElementById('player-container')) {
        document.getElementById('player-container').remove()
    }
    const playerContainer = document.createElement('div');
    playerContainer.id = 'player-container';
    playerContainer.className = 'player-container';
    document.body.appendChild(playerContainer);

    const teamInfo = await fetchPlayersFromTeam(teamID);
    console.log(teamInfo);

    teamInfo.response.forEach(i => {
        const playerCard = document.createElement('div');
        playerCard.classList = 'player-card';

        const playerImage = document.createElement('img');
        playerImage.src = i.player.photo;
        playerImage.alt = i.player.firstname + " " + i.player.lastname;
        playerCard.appendChild(playerImage);

        const playerDetails = document.createElement('div');
        playerDetails.className = 'player-details';

        const playerName = document.createElement('h3');
        playerName.textContent = i.player.firstname + " " + i.player.lastname;
        playerDetails.appendChild(playerName);

        const playerPosition = document.createElement('h3');
        playerPosition.textContent = "Position: " + i.statistics[0].games.position;
        playerDetails.appendChild(playerPosition);

        const playerAge = document.createElement('h3');
        playerAge.textContent = "Age: " + i.player.age;
        playerDetails.appendChild(playerAge);

        const playerNationality = document.createElement('h3');
        playerNationality.textContent = "Nationality: " + i.player.nationality;
        playerDetails.appendChild(playerNationality);

        const playerAppearences = document.createElement('h3');
        playerAppearences.textContent = `Appearances in the ${year} premier division: ${i.statistics[0].games.appearences}`;
        playerDetails.appendChild(playerAppearences);

        playerCard.appendChild(playerDetails);
        playerContainer.appendChild(playerCard);
    });
}

async function fetchPlayersFromTeam(teamID) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/players?team=${teamID}&season=${year}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '12c3ec53b0msha444e311dcb662fp19498bjsn43c7861443f4',
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}