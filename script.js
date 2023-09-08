const usernames = ["Gurkamal_brar", "TEJ-416", "PyroSama07", "shaifali_06","AM0312","shouryade","bhardwaj113yashasvi","abieynow","Aakash_8950","aditibinjola"];
const names=["GURKAMAL", "TEJVIR", "ROCHAK", "SHAIFALI", "ANSH", "SHOURYA", "YASHASVI", "ABHINAV", "AAKASH", "ADITI"];
const leaderboard = document.getElementById("leaderboard");
const table = document.querySelector("table"); // Get the table element
const loader = document.querySelector(".loader"); // Get the loader element

async function fetchUserData(username,name) {
    try {
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        const data = await response.json();
        return {
            username: username,
            name:name,
            totalSolved: data.totalSolved || 0,
            easySolved: data.easySolved || 0,
            mediumSolved: data.mediumSolved || 0,
            hardSolved: data.hardSolved || 0,
            ranking: data.ranking || 0,
        };
    } catch (error) {
        console.error(`Failed to fetch data for ${username}: ${error}`);
        return null;
    }
}
async function updateLeaderboard() {
    leaderboard.innerHTML = ''; // Clear previous data

    // Create an array to store user data with rank, name, and score
    const userDataArray = [];

    for (let i=0;i<usernames.length;i++) {
        const userData = await fetchUserData(usernames[i],names[i]);
        if (userData) {
            userDataArray.push(userData);
        }
    }

    // Sort the user data by score in ascending order
    userDataArray.sort((a, b) => a.ranking - b.ranking);
    let index=1;
    // Populate the leaderboard with the
    for (const userData of userDataArray) {
        const rank = index;
        index=index+1;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rank}</td>
            <td><a href="https://leetcode.com/${userData.username}/" target="_blank" <div class="button-borders">
                     <button class="primary-button">${userData.name}</div></button></a></td>
            <td>${userData.totalSolved}</td>
            <td>${userData.easySolved}</td>
            <td>${userData.mediumSolved}</td>
            <td>${userData.hardSolved}</td>
            <td>${userData.ranking}</td>
        `;
        leaderboard.appendChild(row);
    }

    // After loading rows, hide the loader and show the table
    loader.style.display = "none";
    table.style.display = "table";
}

updateLeaderboard();
