// Obtenemos los elementos del DOM
const input = document.getElementById(`field`);
const button = document.getElementById(`btn`);
const gameContainer = document.getElementById(`game-container`);
// 

button.addEventListener(`click`, e => {
	e.preventDefault();
	getGame(input.value.toLowerCase());
});

// Funcion que utilizaremos para obtener la informacion (Juegos) desde la API
function getGame(platform) {

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '6cd7bf4f6dmsh72ad3a397810e67p1bad86jsn4fa8f654ea9f',
			'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
		}
	}; //Este objeto es para validacion ya que obtuvimos acceso a la API a traves de RAPID API. Esta funcion le pasa las credenciales al fetch

	fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}`, options) //Obtenemos desde la URL. FETCH es buscar. Busca la informacion en la URL dada.
		.then(response => response.json()) //Entonces, buscamos la respuesta y nos enviara un .JSON, nosotros no podemos trabajar con un .JSON sino que tenemos que pasarlo a String o array en este caso, y lo hacemos con respuesta.json().
		.then(data => {//Accedemos a la informacion y nos devuelve un array de objetos, en donde cada objeto es un juego.
			const data1 = data.slice(0, 10); //Limitamos la cantidad de objetos que mostramos en la pagina
			data1.forEach(game => {// Para cada objeto dentro del array, cada objeto se llamará game y accederemos a los propiedades individuales de cada uno a traves de la iteracion FOREACH.
				gameContainer.style.display = "flex";
				gameContainer.style.flexDirection = "column";
				gameContainer.style.alignItems = "center"; //Centramos los divs del Contenedor principal
				const divs = document.createElement(`div`); //Creamos DIV en HTML
				const img = document.createElement(`img`); //Creamos img en HTML
				img.src = game.thumbnail; //Añadimos la imagen del juego (propiedad de objeto) al src del elemento img
				const h3 = document.createElement(`h3`);
				h3.textContent = game.title;
				const description = document.createElement(`p`);
				description.textContent = game.short_description;
				const link = document.createElement(`a`);
				link.textContent = "Go";
				link.href = game.game_url;
				link.target = "_blank";
				divs.appendChild(img); //Agregamos img como hijo de div creado
				divs.appendChild(h3);
				divs.appendChild(description);
				divs.append(link);
				gameContainer.appendChild(divs); //Añadimos divs como hijo del contenedor principal. Esto hará que cada juego sea contenido en un div independiente que contenga lo creado anteriormente (Img, title y description)
			});

		});
};


