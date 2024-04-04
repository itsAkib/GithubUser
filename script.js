const form = document.getElementById('user-form');
const usernameInput = document.getElementById('username');
const userCard = document.getElementById('user-card');
const avatarImage = document.getElementById('avatar');
const usernameInfo = document.getElementById('username-info');
const nameInfo = document.getElementById('name-info');
const reposInfo = document.getElementById('repos-info');
const gistsInfo = document.getElementById('gists-info');
const createdAtInfo = document.getElementById('created-at-info');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = usernameInput.value;

  fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(data => {
      if (data.message === "Not Found") {
        alert("User not found!");
        return;
      }

      userCard.classList.remove('hidden'); // Show the user card

      avatarImage.src = data.avatar_url;
      usernameInfo.textContent = `Username: ${data.login}`;
      nameInfo.textContent = `Name: ${data.name}`;
      reposInfo.textContent = `Public Repos: ${data.public_repos}`;
      gistsInfo.textContent = `Public Gists: ${data.public_gists}`;
      createdAtInfo.textContent = `Profile Created At: ${data.created_at.slice(0, 10)}`;  // Extract date only (YYYY-MM-DD)
    })
    .catch(error => {
      console.error(error);
      alert("Error fetching user data!");
    });
});
