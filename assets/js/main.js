const quizz = {
	preguntas:{
		0:{
			pregunta: 'Which is the oldest airline in the world?',
			opciones: ['Avianca', 'KLM', 'Qantas'],
			respuesta: 'KLM',
			imagen: 'assets/img/plane.svg'
		},
		1:{
			pregunta: 'Which is the largest port in the world?',
			opciones: ['Port of Shanghai', 'Port of Singapore', 'Port of Rotterdam'],
			respuesta: 'Port of Shanghai',
			imagen: 'assets/img/ship.svg'
		},
		2:{
			pregunta: 'What is the longest distance cycling backwards?',
			opciones: ['89.30 km', '675.10 km', '337.60 km'],
			respuesta: '337.60 km',
			imagen: 'assets/img/bycicle.svg'
		},
		3:{
			pregunta: 'What is the highest speed ever reached by a school bus?',
			opciones: ['590 km/h', '320 km/h', '245 km/h'],
			respuesta: '590 km/h',
			imagen: 'assets/img/bus.svg'
		},
		4:{
			pregunta: 'What is the longest car trip on one tank of gas?',
			opciones: ['2617 km', '3568 km', '1732 km'],
			respuesta: '2617 km',
			imagen: 'assets/img/car.svg'
		}
	},
	contador: 0,
	respuestas: [],
	crearPregunta : ()=>{
		$("#prueba").empty();
		let preguntaActual = quizz.preguntas[quizz.contador];
		$("#prueba").append(
			`<img src="${preguntaActual.imagen}">
			<h1> ${preguntaActual.pregunta} </h1>`
		)
		$.each(preguntaActual.opciones, (i,l)=>{
			$('<button>').addClass('btn').html(l).appendTo("#prueba").click(()=>{
				quizz.respuestas[quizz.contador]=l;
				quizz.siguiente();
			})

		})

	},
	siguiente : ()=>{
		let total= Object.keys(quizz.preguntas).length;
		quizz.contador++;
		if(quizz.contador<total){
			quizz.crearPregunta();
		}else{
			quizz.mostrarRespuestas();
		}

	},
	eventos: ()=>{
		$(".btn").click(()=>{quizz.siguiente(this)});
	},
	mostrarRespuestas: ()=>{
		$('#prueba').empty();
		$.each(quizz.respuestas, (i,l)=>{
			$("#prueba").append(
				`<p>${i+1}. ${quizz.preguntas[i].pregunta} <strong>${l}</strong></p>`
			)
		})
		$('<button>').addClass('btn').html('Submit').appendTo("#prueba").click()
	},
	iniciar : ()=>{
		console.log();
		quizz.crearPregunta();
	}

}

$(document).ready(quizz.iniciar)