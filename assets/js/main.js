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
	total:null,
	contador: 0,
	correctas: 0,
	respuestas: [],
	crearPregunta : ()=>{
		quizz.barraProgreso();
		quizz.eventos();
		$("#prueba").empty();
		let preguntaActual = quizz.preguntas[quizz.contador];
		$("#prueba").append(
			`<img src="${preguntaActual.imagen}">
			<h4> ${preguntaActual.pregunta} </h4>`
		)
		$.each(preguntaActual.opciones, (i,l)=>{
			$('<div>').html(
				`<div class="well">${l}</div>`
			).appendTo("#prueba").click(()=>{
				quizz.respuestas[quizz.contador]=l;
				quizz.siguiente();
			})
		})
	},
	siguiente : ()=>{
		quizz.contador++;
		if(quizz.contador<quizz.total){
			quizz.crearPregunta();
		}else{
			quizz.mostrarRespuestas();
		}
	},
	anterior: ()=>{
		quizz.contador--;
		quizz.crearPregunta();
	},
	barraProgreso: ()=>{
		$('.progress-label').html(`${quizz.respuestas.length} of ${quizz.total} answered`);
		let mm = 20*quizz.respuestas.length;
		$(".progress-bar").width(`${mm}%`);
	},
	mostrarRespuestas: ()=>{
		$('#prueba').empty();
		quizz.barraProgreso();
		$.each(quizz.respuestas, (i,l)=>{
			$("#prueba").append(`<p >${i+1}. ${quizz.preguntas[i].pregunta} <strong>${l}</strong></p>`)
		})
		$('<button>').addClass('btn').html('Submit').appendTo("#prueba").click(quizz.comparar)
	},
	comparar:()=>{
		$('#progreso').hide();
		$('#flechas').hide();
		$('#prueba').empty();
		$.each(quizz.respuestas, (i,l)=>{
			if(l==quizz.preguntas[i].respuesta){
				quizz.correctas++;
				$("#prueba").append(`<p class='text-success'>${i+1}. ${quizz.preguntas[i].pregunta} <strong>${l}</strong></p>`)
			}else{
				$("#prueba").append(
					`<p class='text-danger'>${i+1}. ${quizz.preguntas[i].pregunta} <strong><strike>${l}</strike></strong> ${quizz.preguntas[i].respuesta}</p>`
				)
			}
		})
		let dd= `${quizz.correctas} out of ${quizz.total} correct!`;
		if(quizz.correctas==0){
			$('#prueba').prepend(`<h3 class="text-center">Ooops, ${dd}</h3>`);
		} else if(quizz.correctas==quizz.total) {
			$('#prueba').prepend(`<h3 class="text-center">Wow, ${dd}</h3>`);
		} else {
			$('#prueba').prepend(`<h3 class="text-center">${dd}</h3>`);
		}
		
	},
	eventos: ()=>{
		$('#siguiente').off('click');
		$('#anterior').off('click');
		if(quizz.respuestas.length>quizz.contador){
			$('#siguiente').removeClass('disabled').click(quizz.siguiente);
		}else{
			$('#siguiente').addClass('disabled');
		}
		if(quizz.respuestas.length>=quizz.contador && quizz.contador!=0){
			$('#anterior').removeClass('disabled').click(quizz.anterior);
		}else{
			$('#anterior').addClass('disabled');
		}
	},
	iniciar : ()=>{
		quizz.total= Object.keys(quizz.preguntas).length;
		quizz.crearPregunta();
	}
}

$(document).ready(quizz.iniciar)
