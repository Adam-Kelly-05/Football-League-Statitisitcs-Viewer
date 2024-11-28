document.getElementById('getTeams').addEventListener('click', async () => {
    const leagueID = 357;
    const year = 2022;
    const allTeams = await fetchData(leagueID, year);
    console.log(allTeams);

    allTeams.response.forEach(i => {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';

        const teamImage = document.createElement('img');
        teamImage.src = i.team.logo;
        teamImage.alt = i.team.name;
        teamCard.appendChild(teamImage)

        const teamDetails = document.createElement('div');
        teamDetails.className = 'team-details'

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
        teamButton.textContent = "Learn more"
        teamDetails.appendChild(teamButton);

        teamCard.appendChild(teamDetails);
        document.body.appendChild(teamCard);
    });
});

async function fetchData(leagueID, season) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/teams?league=${leagueID}&season=${season}`;
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