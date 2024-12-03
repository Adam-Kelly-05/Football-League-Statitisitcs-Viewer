const year = 2022;

function getChosenLeague() { // league id's never change, so their hard coded
    if (document.getElementById("PremierLeague").checked) // if the radio button is clicked...
        return 39; // return the league id
    if (document.getElementById("LaLiga").checked)
        return 140;
    if (document.getElementById("Bundesliga").checked)
        return 78;
    if (document.getElementById("SerieA").checked)
        return 135;
    if (document.getElementById("Ligue1").checked)
        return 61;
    if (document.getElementById("Eredivisie").checked)
        return 88;
    if (document.getElementById("PremierDivision").checked)
        return 357;
}

function resetPlayerContainer() {
    if (!!document.getElementById('playerContainerTitle')) { //  this only runs if the playerContainerTitle has been made
        document.getElementById('playerContainerTitle').remove(); // delete the playerContainerTitle element
    }

    if (!!document.getElementById('playerContainer')) { //  this only runs if the playerContainerTitle has been made
        document.getElementById('playerContainer').remove();
    }
}

async function fetchData(object, ID) {
    url = "";
    if (object == "Teams") // I use the same fetch function twice, by haveing both links in the one function
        url = `https://api-football-v1.p.rapidapi.com/v3/teams?league=${ID}&season=${year}`;
    else if (object == "Players")
        url = `https://api-football-v1.p.rapidapi.com/v3/players?team=${ID}&season=${year}`;

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

async function getTeamsInLeague() {
    const chosenLeague = getChosenLeague();

    if (!!document.getElementById('teamContainer')) { //  this only runs if the teamContainer has been made
        document.getElementById('teamContainer').remove() // delete the teamContainer element
    }

    resetPlayerContainer();

    const allTeams = await fetchData("Teams", chosenLeague);
    console.log(allTeams);

    const teamContainer = document.createElement('div')
    teamContainer.className = 'team-container';
    teamContainer.id = 'teamContainer'
    document.body.appendChild(teamContainer)

    allTeams.response.forEach(i => { // for every team in the response
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
        teamButton.setAttribute('onclick', `getPlayersFromTeam(${i.team.id})`); // make the button, when clicked it runs the getPlayersFromTeam function, with the team id passed in as a arguement
        teamDetails.appendChild(teamButton);

        teamCard.appendChild(teamDetails);
        teamContainer.appendChild(teamCard);
    });
}

async function getPlayersFromTeam(teamID) {
    resetPlayerContainer();

    const playerContainerTitle = document.createElement('h1');
    playerContainerTitle.innerHTML = 'All Players';
    playerContainerTitle.id = 'playerContainerTitle';
    document.body.appendChild(playerContainerTitle);
    
    const playerContainer = document.createElement('div');
    playerContainer.id = 'playerContainer';
    playerContainer.className = 'player-container';
    document.body.appendChild(playerContainer);

    const teamInfo = await fetchData("Players", teamID);
    console.log(teamInfo);

    teamInfo.response.forEach(i => {  // for every team in the response
        if (document.getElementById(i.statistics[0].games.position + "Checkbox").checked) {
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
            playerPosition.textContent = "Position: " + i.statistics[0].games.position; // statistics is divivied by leagues, but premier division is alwats first, so it's set to check [0]
            playerDetails.appendChild(playerPosition);
    
            const playerAge = document.createElement('h3');
            playerAge.textContent = "Age: " + i.player.age;
            playerDetails.appendChild(playerAge);
    
            const playerNationality = document.createElement('h3');
            playerNationality.textContent = "Nationality: " + i.player.nationality;
            playerDetails.appendChild(playerNationality);
    
            playerCard.appendChild(playerDetails);
            playerContainer.appendChild(playerCard);
        }
    });
}
