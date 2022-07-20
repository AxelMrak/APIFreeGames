// DOM Elements
const input = document.getElementById(`field`);
const button = document.getElementById(`btn`);
const gameContainer = document.getElementById(`game-container`);


// Event Mouse
button.addEventListener(`click`, e => {
	e.preventDefault();
	getGame(input.value.toLowerCase());
});

// Function get games to API
function getGame(platform) {

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '6cd7bf4f6dmsh72ad3a397810e67p1bad86jsn4fa8f654ea9f',
			'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
		}
	};

	fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}`, options)
		.then(response => response.json())
		.then(data => {
			const data1 = data.slice(0, 10); //Data Limiter
			data1.forEach(game => {
				//Add elements to DOM and add styles for elements
				gameContainer.style.display = "flex";
				gameContainer.style.flexDirection = "column";
				gameContainer.style.alignItems = "center";
				const divs = document.createElement(`div`);
				const img = document.createElement(`img`);
				img.src = game.thumbnail;
				const h3 = document.createElement(`h3`);
				h3.textContent = game.title;
				const description = document.createElement(`p`);
				description.textContent = game.short_description;
				const link = document.createElement(`a`);
				link.textContent = "Go";
				link.href = game.game_url;
				link.target = "_blank";
				divs.appendChild(img);
				divs.appendChild(h3);
				divs.appendChild(description);
				divs.append(link);
				gameContainer.appendChild(divs);
			});
		});
};


