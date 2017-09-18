'use strict'
const trivia = {
	preguntas:{
		0:{
			pregunta: 'Which is the oldest airline in the world?',
			opciones: {A:'Avianca', B:'KLM', C:'Qantas'},
			respuesta: 'KLM',
			imagen: 'assets/img/plane.svg'
		},
		1:{
			pregunta: 'Which is the largest port in the world?',
			opciones: {A:'Port of Shanghai', B:'Port of Singapore', C:'Port of Rotterdam'},
			respuesta: 'Port of Shanghai',
			imagen: 'assets/img/ship.svg'
		},
		2:{
			pregunta: 'What is the longest distance cycling backwards?',
			opciones: {A:'89.30 km', B:'675.10 km', C:'337.60 km'},
			respuesta: '337.60 km',
			imagen: 'assets/img/bycicle.svg'
		},
		3:{
			pregunta: 'What is the highest speed ever reached by a school bus?',
			opciones: {A:'590 km/h', B:'320 km/h', C:'245 km/h'},
			respuesta: '590 km/h',
			imagen: 'assets/img/bus.svg'
		},
		4:{
			pregunta: 'What is the longest car trip on one tank of gas?',
			opciones: {A:'2617 km', B:'3568 km', C:'1732 km'},
			respuesta: '2617 km',
			imagen: 'assets/img/car.svg'
		}
	},
	flecha: {
		siguiente: null,
		anterior: null
	},
	contar: {
		total:null,
		pregunta: 0,
		correctas: 0
	},
	respuestas: [],
	marcar: true,
	crearPregunta : ()=>{
		trivia.barraProgreso();
		trivia.eventosFlechas();
		$("#prueba").empty();
		let preguntaActual = trivia.preguntas[trivia.contar.pregunta];
		$("header").html(`<img src="${preguntaActual.imagen}">`);
		$("#prueba").append(
			`<h1 class="text-center"> ${preguntaActual.pregunta} </h1>
			<div class="opciones row"></div>`
		)
		$.each(preguntaActual.opciones, (key,value)=>{
			let clase = '';
			if (trivia.respuestas[trivia.contar.pregunta]==value) {
				clase = 'seleccionado';
			} 
			$('<div>').addClass(`col-md-4 ${clase}`).html(
				`<button class="btn"><span class='letra'>${key}</span>${value}</button>`
			).appendTo(".opciones").click((e)=>{
				trivia.guardarRespuesta(e.currentTarget, value);
			})
		})
	},
	guardarRespuesta: (d, value)=>{
		if(trivia.marcar){
			$(d).addClass('seleccionado');
			trivia.marcar=false;
			trivia.respuestas[trivia.contar.pregunta]=value;
			let t = setTimeout(()=>{
				trivia.marcar=true;
				trivia.siguiente();
			}, 900);
		}
	},
	siguiente : ()=>{
		trivia.contar.pregunta++;
		if(trivia.contar.pregunta<trivia.contar.total){
			trivia.crearPregunta();
		}else {
			trivia.mostrarRespuestas();
		}
	},
	anterior: ()=>{
		trivia.contar.pregunta--;
		trivia.crearPregunta();
	},
	barraProgreso: ()=>{
		$('.progress-label').html(`${trivia.respuestas.length} of ${trivia.contar.total} answered`);
		let multiplo = 20*trivia.respuestas.length;
		$(".progress-bar").width(`${multiplo}%`);
	},
	listaRespuestas:(comparar, boton, funcion)=>{
		$('#prueba').empty().append('<div id="respuestas"></div>');
		$.each(trivia.respuestas, (i,l)=>{
			let estilo = '';
			let contenido=l;
			if(comparar && l==trivia.preguntas[i].respuesta){
				trivia.contar.correctas++;
				estilo='class="text-success"';
			}else if(comparar){
				estilo=`class='text-danger'`;
				contenido = `<strike>${l}</strike> ${trivia.preguntas[i].respuesta}`;
			}
			$("#respuestas").append(`<p ${estilo}>${i+1}. ${trivia.preguntas[i].pregunta} <strong>${contenido}</strong></p>`)
		})
		$('<div>').addClass('text-center').append(
			$('<button>').addClass('btn-lg btn-dark').html(boton).click(funcion)
		).appendTo("#respuestas");
	},
	mostrarRespuestas: ()=>{
		$("header").html(`<img src="assets/img/truck.svg">`);
		trivia.barraProgreso();
		trivia.listaRespuestas(false, 'Submit', trivia.comparar);
		trivia.flecha.siguiente.addClass('disabled').off('click');
		$('#respuestas').prepend(`<h1 class="text-center">Here are your answer:</h1>`);
	},
	comparar:()=>{
		$('#progreso').hide();
		$('#flechas').hide();
		trivia.listaRespuestas(true, 'Star Again', trivia.jugarOtravez);
		let expresion='';
		if(trivia.contar.correctas==0){
			expresion='Ooops, ';
		} else if(trivia.contar.correctas==trivia.contar.total) {
			expresion='Wow, ';
		} 
		let titulo=`${expresion}${trivia.contar.correctas} out of ${trivia.contar.total} correct!`;
		$('#respuestas').prepend(`<h1 class="text-center">${titulo}</h1>`);
	},
	eventosFlechas: ()=>{
		trivia.flecha.siguiente.off('click');
		trivia.flecha.anterior.off('click');
		if(trivia.respuestas.length>trivia.contar.pregunta){
			trivia.flecha.siguiente.removeClass('disabled').click(trivia.siguiente);
		}else{
			trivia.flecha.siguiente.addClass('disabled');
		}
		if(trivia.respuestas.length>=trivia.contar.pregunta && trivia.contar.pregunta!=0){
			trivia.flecha.anterior.removeClass('disabled').click(trivia.anterior);
		}else{
			trivia.flecha.anterior.addClass('disabled');
		}
	},
	jugarOtravez:()=>{
		$('#progreso').show();
		$('#flechas').show();
		trivia.respuestas=[];
		trivia.contar.pregunta=0;
		trivia.contar.correctas=0;
		trivia.crearPregunta();
	},
	iniciar : ()=>{
		trivia.contar.total= Object.keys(trivia.preguntas).length;
		trivia.flecha.siguiente=$('#siguiente');
		trivia.flecha.anterior=$('#anterior');
		trivia.crearPregunta();
	}
}

$(document).ready(trivia.iniciar)
