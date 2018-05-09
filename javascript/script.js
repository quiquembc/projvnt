(function() {

	/******************************************************************************************

	######## #### ##       ######## ########   #######   ######  
	##        ##  ##          ##    ##     ## ##     ## ##    ## 
	##        ##  ##          ##    ##     ## ##     ## ##       
	######    ##  ##          ##    ########  ##     ##  ######  
	##        ##  ##          ##    ##   ##   ##     ##       ## 
	##        ##  ##          ##    ##    ##  ##     ## ##    ## 
	##       #### ########    ##    ##     ##  #######   ###### 

	******************************************************************************************/

	let search = document.getElementById('search');

	let reset = document.getElementById('reset');

	//var tamaño = matchMedia("max-width: 1000px");

	//	console.log(tamaño);

	let objFilters = {
		'audiencia' : [],
		'distrito' : [],
		'tipo' : [],
		'fecha-evento' : [],
		'fecha-fin-evento' : [],
		'gratuito' : []
	}

	/******************************
		active filters
	******************************/

	function activeFilters() {

		let filters = document.getElementsByClassName('element-list-element-filters');

		for (let i = 0; i < filters.length; i++) {

			filters[i].addEventListener("click", function() {

				// Agrego al filtro seleccionado la clase active
				filters[i].classList.toggle('activeFilter');
			});
		}
	}

	activeFilters();

	/******************************
		reset filters
	******************************/

	function resetFilters() {

		reset.addEventListener("click", function() {

			let filters = document.getElementsByClassName('element-list-element-filters');

			for (let i = 0; i < filters.length; i++) {

				filters[i].classList.remove('activeFilter');
			}

			// Oculto filtros
			let accordions = document.getElementsByClassName('accordion');

			for (let i = 0; i < accordions.length; i++) {

				accordions[i].nextElementSibling.style.display = 'none';
			}

			// vacio el objeto
			for(let propiedad in objFilters) {

				objFilters[propiedad] = [];
			}

			document.getElementById('content').innerHTML = "";
			//Creado Juan
			document.getElementById('map').innerHTML = "";
			
			document.getElementById('map').style.display = "none";

			// if (tamaño = false) {

			// 	let nodeUL =  document.getElementsByClassName('list-element-filters');

			// 	for (let i = 0; i <  nodeUL.length; i++) {

			// 		nodeUL[i].style.width = "99%";

			// 		nodeUL[i].style.left = "0.3%";
			// 	}
		
			// 	document.getElementById('form-date').style.width = "99%";

			// 	document.getElementById('form-date').style.left = "0.3%";

			// }
				
		});
	}

	resetFilters();

	/******************************
		create obj filters
	******************************/

	search.addEventListener("click", createObjFilters, true);

	function createObjFilters(a) {
		
		// Oculto filtros
		let accordions = document.getElementsByClassName('accordion');

		for (let i = 0; i < accordions.length; i++) {

			accordions[i].nextElementSibling.style.display = 'none';
		}

		// vacio el objeto
		for(let propiedad in objFilters) {

			objFilters[propiedad] = [];
		}

		// filtros activos
		let activeFilter = document.getElementsByClassName('activeFilter');

		for (let i = 0; i < activeFilter.length; i++) {

			for(let propiedad in objFilters) {

				if (propiedad == activeFilter[i].dataset.filter) {

					objFilters[propiedad].push(activeFilter[i].dataset.slug);
				}
			}
		}

		// check gratis
		let inputFree = document.getElementById('input-free');

		if (inputFree.checked) {

			objFilters.gratuito.push(1);

		} else {

			objFilters.gratuito.push(0);
		}

		// date
		let dateStart = document.getElementById('date-start');

		let dateEnd = document.getElementById('date-end');

		if (dateStart.value.length > 0) {

			objFilters['fecha-evento'].push(dateStart.value +  " 00:00:00.0");

		} else {

			// Agregar error
		}

		if (dateEnd.value.length > 0) {

			objFilters['fecha-fin-evento'].push(dateEnd.value + " 23:59:00.0");

		} else {
			// Agregar error
		}

		// Llamar a funcion para filtrar el DOM pasandole el objeto de los filtros.
		filterActivities(objFilters);
	}

	/******************************
		filter activities
	******************************/

	// Retornar un DOM con las actividades filtradas y llamar a paintDOM.
	function filterActivities(filtros) {

		// Guardo el DOM del XML
		let objDOM = saveXHR("http://localhost/Proyecto-nuevo/xml/300107-0-agenda-actividades-eventos.xml");

		/******************
		DISTRITOS
		******************/

		// Creo nuevo objeto DOM de actividades
		let distritosDOM = document.implementation.createHTMLDocument('Distritos');

		// Guardo las actividades del objDOM por cada propiedad
		let distritos = objDOM.querySelectorAll('atributo[nombre="DISTRITO"]');

		for (let i = 0; i < distritos.length; i++) {

			if (filtros.distrito.length > 0) {

				filtros.distrito.forEach(function(distrito) {

					// Selecciono los distritos iguales al distrito seleccionado.
					if (distritos[i].innerHTML == distrito) {

						// Agrego al objeto DOM distritosDOM los distritos coincidentes con los filtros.
						distritosDOM.body.appendChild(distritos[i].parentElement.parentElement.parentElement);

					} else {

						// Aviso no hay eventos.
					}
				});

			} else {

				// Si no hay ningun filtro, copio el objDOM.
				distritosDOM = objDOM;
			}
		}

		/******************
		AUDIENCIA
		******************/

		// Creo nuevo objeto DOM de audiencia
		let audienciaDOM = document.implementation.createHTMLDocument('Audiencia');

		// Guardo las actividades del objDOM por cada propiedad
		let audiencias = distritosDOM.querySelectorAll('atributo[nombre="AUDIENCIA"]');

		for (let i = 0; i < audiencias.length; i++) {

			if (filtros.audiencia.length > 0) {

				filtros.audiencia.forEach(function(aud) {

					let splitAud = aud.split(",");

					splitAud.forEach(function(elemento) {

						// Selecciono los distritos iguales al audiencia seleccionado.
						if (audiencias[i].textContent.indexOf(elemento) != -1) {

							// Agrego al objeto DOM distritosDOM los distritos coincidentes con los filtros.
							audienciaDOM.body.appendChild(audiencias[i].parentElement.parentElement);

						} else {

							// Aviso no hay eventos.
						}
					});
				});

			} else {

				// Si no hay ningun filtro.
				audienciaDOM = distritosDOM;
			}
		}

		/******************
		TIPO
		******************/

		// Creo nuevo objeto DOM de audiencia
		let tiposDOM = document.implementation.createHTMLDocument('Audiencia');

		// Guardo las actividades del objDOM por cada propiedad
		let tipos = audienciaDOM.querySelectorAll('atributo[nombre="TIPO"]');

		for (let i = 0; i < tipos.length; i++) {

			if (filtros.tipo.length > 0) {

				filtros.tipo.forEach(function(tipo) {

					// Selecciono los distritos iguales al tipo seleccionado.
					if (tipos[i].textContent.indexOf(tipo) != -1) {

						// Agrego al objeto DOM distritosDOM los distritos coincidentes con los filtros.
						tiposDOM.body.appendChild(tipos[i].parentElement.parentElement);

					} else {

						// Aviso no hay eventos.
					}
				});

			} else {

				// Si no hay ningun filtro
				tiposDOM = audienciaDOM;
			}
		}

		/******************
		GRATUITO
		******************/

		// Creo nuevo objeto DOM de audiencia
		let gratuitosDOM = document.implementation.createHTMLDocument('Gratuito');

		// Guardo las actividades del objDOM por cada propiedad
		let gratuitos = tiposDOM.querySelectorAll('atributo[nombre="GRATUITO"]');

		for (let i = 0; i < gratuitos.length; i++) {

			if (filtros.gratuito == 1) {

				// Selecciono los distritos iguales al tipo seleccionado.
				if (gratuitos[i].innerHTML == 1) {

					// Agrego al objeto DOM distritosDOM los distritos coincidentes con los filtros.
					gratuitosDOM.body.appendChild(gratuitos[i].parentElement.parentElement);

				} else {

					// Aviso no hay eventos.
				}

			} else {

				// Si no hay ningun filtro
				gratuitosDOM = tiposDOM;
			}
		}

		/******************
		FECHA
		******************/

		// Creo nuevo objeto DOM de fechas
		let fechasDOM = document.implementation.createHTMLDocument('Fechas');

		if ((filtros['fecha-evento'].length > 0 )&& (filtros['fecha-fin-evento' ].length > 0 )) {

			let filtroFechaEvento = new Date(filtros['fecha-evento'][0]);

			let filtroFechaFinEvento = new Date(filtros['fecha-fin-evento'][0]);

			let actividadesFechas = gratuitosDOM.querySelectorAll('contenido');

			for (let i = 0; i < actividadesFechas.length; i++) {

				let nodeFechaEvento = new Date(actividadesFechas[i].querySelector('atributo[nombre="FECHA-EVENTO"]').textContent);

				let nodeFechaFinEvento = new Date(actividadesFechas[i].querySelector('atributo[nombre="FECHA-FIN-EVENTO"]').textContent);

				// Si la fecha esta en el rango de fechas de cada evento.
				if (nodeFechaFinEvento >= filtroFechaEvento && nodeFechaEvento <= filtroFechaFinEvento) {

					fechasDOM.body.appendChild(actividadesFechas[i]);
				}
			}

		} else {

			// Si no hay ningun filtro
			fechasDOM = gratuitosDOM;
		}

		finalDOM = fechasDOM;

		// Cierro todos los objetos.

		objDOM = null;

		distritosDOM = null;

		audienciaDOM = null;

		tiposDOM = null;

		gratuitosDOM = null;

		fechasDOM = null;

		// Llamo a la funcion para pintar el DOM final
		paintDOM(finalDOM);

		// Llamo a la funcion para pintar el DOM final
		initMap(finalDOM);
	}

	/******************************************************************************************

	########   #######  ##     ## 
	##     ## ##     ## ###   ### 
	##     ## ##     ## #### #### 
	##     ## ##     ## ## ### ## 
	##     ## ##     ## ##     ## 
	##     ## ##     ## ##     ## 
	########   #######  ##     ##

	******************************************************************************************/

	/******************************
		paint DOM
	******************************/

	// Pintar el objeto DOM
	function paintDOM(dom) {

		document.getElementById('content').innerHTML = "";

		let contenido = dom.querySelectorAll('contenido');

		// Mapa en display block - Creado Juan
		document.getElementById('map').style.display = "block";

		/*let nodeUL =  document.getElementsByClassName('list-element-filters');

		for (let i = 0; i <  nodeUL.length; i++) {

			nodeUL[i].style.width = "50%";

			nodeUL[i].style.left = "0.8%";
		}
		
		document.getElementById('form-date').style.width = "50%";

		document.getElementById('form-date').style.left = "0.8%";*/
		

		for (let i = 0; i < contenido.length; i++) {

			// Estructura HTML
			let nodeArticle = document.createElement('article');

			// Titulo

			// Div titulo - Creado Juan
			let divTitulo = document.createElement('div');
			//*
			divTitulo.setAttribute('id','titulo');

			let nodeSpan = document.createElement('span');

			let atributoTitulo = contenido[i].querySelectorAll('atributo[nombre="TITULO"]')[0].textContent;

			let nodePTitulo = document.createElement('p');

			nodePTitulo.innerHTML = atributoTitulo;
			//*
			divTitulo.appendChild(nodeSpan);
			//*
			divTitulo.appendChild(nodePTitulo);

			nodeArticle.appendChild(divTitulo);

			// Div Contenido - Creado Juan

			let divContenido = document.createElement('div');
			//*
			divContenido.setAttribute('id','contenido');

			// Descripción Evento
			let atributoDescripcion = contenido[i].querySelectorAll('atributo[nombre="DESCRIPCION"]')[0].textContent;

			let nodePDescripcion = document.createElement('p');

			if (!atributoDescripcion == "") {

				nodePDescripcion.innerHTML = atributoDescripcion;

			}
			else{

				nodePDescripcion.innerHTML = "";
			}

			divContenido.appendChild(nodePDescripcion);

			// Fecha Inicio / Fin
			let atributoFechaInicio = contenido[i].querySelectorAll('atributo[nombre="FECHA-EVENTO"]')[0].textContent;

			let atributoFechaFin = contenido[i].querySelectorAll('atributo[nombre="FECHA-FIN-EVENTO"]')[0].textContent;

			let nodePFecha = document.createElement('p');
			//*
			nodePFecha.appendChild(document.createElement('span'));
			//*
			nodePFecha.appendChild(document.createTextNode(atributoFechaInicio + " - " + atributoFechaFin));

			divContenido.appendChild(nodePFecha);

			// Hora Evento

			let atributoHora = contenido[i].querySelectorAll('atributo[nombre="HORA-EVENTO"]')[0].textContent;
			//*
			let nodePHora = document.createElement('p');

			nodePHora.appendChild(document.createElement('span'));

			nodePHora.appendChild(document.createTextNode(atributoHora));

			divContenido.appendChild(nodePHora);

			//Lugar
			// MIRAR POSIBLE FALLO
			let atributoLugar = contenido[i].querySelectorAll('atributo[nombre="NOMBRE-INSTALACION"]')[0].textContent;

			let nodePLugar = document.createElement('p');

			nodePLugar.appendChild(document.createElement('span'));

			nodePLugar.appendChild(document.createTextNode(atributoLugar));

			divContenido.appendChild(nodePLugar);

			// Distrito
			let atributoDistrito = contenido[i].querySelectorAll('atributo[nombre="DISTRITO"]')[0].textContent;

			let nodeDivHijo = document.createElement('div');

			let nodePDistrito = document.createElement('p');

			let nodeA = document.createElement('a');

			nodeA.appendChild(document.createTextNode('Ver actividad'));

			nodeA.setAttribute('href', '#');

			nodePDistrito.innerHTML = atributoDistrito;

			nodeDivHijo.appendChild(nodePDistrito);

			nodeDivHijo.appendChild(nodeA);

			divContenido.appendChild(nodeDivHijo);

			nodeArticle.appendChild(divContenido);

			// if (contenido[i].querySelectorAll('atributo[nombre="DISTRITO"]')[0]) {

			// 	// Lugar
			// 	let atributoDistrito = contenido[i].querySelectorAll('atributo[nombre="DISTRITO"]')[0].textContent;

			// 	let nodeH6 = document.createElement('h6');

			// 	nodeH6.innerHTML = atributoDistrito;

			// 	nodeArticle.appendChild(nodeH6);
			// }

			// Agregar articulo al section
			document.getElementById('content').appendChild(nodeArticle);
		}
	}

	/******************************************************************************************

	##     ##    ###    ########  
	###   ###   ## ##   ##     ## 
	#### ####  ##   ##  ##     ## 
	## ### ## ##     ## ########  
	##     ## ######### ##        
	##     ## ##     ## ##        
	##     ## ##     ## ##  

	******************************************************************************************/

	function initMap(dom) {

		let localizaciones = [];

		let contenidoMAP = dom.querySelectorAll('contenido');

		for (let i = 0; i < contenidoMAP.length; i++) {

			if (contenidoMAP[i].querySelector('atributo[nombre="LOCALIZACION"]')) {

				if (contenidoMAP[i].querySelector('atributo[nombre="TITULO"]')) {

					var atributoTitulo = contenidoMAP[i].querySelector('atributo[nombre="TITULO"]').innerHTML;
				}

				if (contenidoMAP[i].querySelector('atributo[nombre="LATITUD"]')) {

					var atributoLatitud = contenidoMAP[i].querySelector('atributo[nombre="LATITUD"]').innerHTML;
				}

				if (contenidoMAP[i].querySelector('atributo[nombre="LONGITUD"]')) {

					var atributoLongitud = contenidoMAP[i].querySelector('atributo[nombre="LONGITUD"]').innerHTML;
				}

				localizaciones.push([atributoTitulo, parseFloat(atributoLatitud), parseFloat(atributoLongitud)]);
			}
		}

		let madrid = {lat: localizaciones[0][1], lng: localizaciones[0][2]};

		let map = new google.maps.Map(document.getElementById('map'), {

			zoom: 14,

			center: madrid
		});

		var infowindow = new google.maps.InfoWindow();

		var marker, i;

	   	for (var i = 0; i < localizaciones.length; i++) {

	   		console.log(localizaciones[i][1], localizaciones[i][2]);

			marker = new google.maps.Marker({

				position: new google.maps.LatLng(localizaciones[i][1], localizaciones[i][2]),

				icon: './images/icon-map.png',

				map: map
			});

		    google.maps.event.addListener(marker, 'click', (function(marker, i) {

		    	return function() {

		        	infowindow.setContent(localizaciones[i][0]);

		          	infowindow.open(map, marker);

		          	// Señalar actividad clickada.
		        }

		    })(marker, i));
	   	}
	}

	/******************************************************************************************

	 ######   ######## ##    ## ######## ########     ###    ##       
	##    ##  ##       ###   ## ##       ##     ##   ## ##   ##       
	##        ##       ####  ## ##       ##     ##  ##   ##  ##       
	##   #### ######   ## ## ## ######   ########  ##     ## ##       
	##    ##  ##       ##  #### ##       ##   ##   ######### ##       
	##    ##  ##       ##   ### ##       ##    ##  ##     ## ##       
	 ######   ######## ##    ## ######## ##     ## ##     ## ######## 

	******************************************************************************************/

	/******************************
		accordion
	******************************/

	function accordion() {

		let accordions = document.getElementsByClassName('accordion');

		for (let i = 0; i < accordions.length; i++) {

			accordions[i].addEventListener("click", function() {

				let selectedPanel = this.nextElementSibling;

				for (let j = 0; j < accordions.length; j++) {

					let otherPanel = accordions[j].nextElementSibling;

					if (otherPanel === selectedPanel) {

						if (selectedPanel.style.display === 'flex') {

							selectedPanel.style.display = 'none';

						} else {

							selectedPanel.style.display = 'flex';
						}

					} else {

						otherPanel.style.display = 'none';
					}
				}
			});
		}
	};

	accordion();

	/******************************
		XMLHttpRequest
	******************************/

	function saveXHR(url) {

		let xhr = new XMLHttpRequest();

		xhr.open("GET", url, false);

		xhr.onload = function (e) {

			if (xhr.readyState === 4) {

				if (xhr.status === 200) {

					console.log("XML guardado");

				} else {

					console.error(xhr.statusXML);
				}
			}
		};

		xhr.onerror = function (e) {

			console.error(xhr.statusXML);
		};

		xhr.send();	

		return xhr.responseXML;
	}

})();