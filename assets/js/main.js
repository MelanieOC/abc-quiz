const quizz = {
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
	total:null,
	contador: 0,
	correctas: 0,
	respuestas: [],
	marcar: true,
	crearPregunta : ()=>{
		quizz.barraProgreso();
		quizz.eventos();
		$("#prueba").empty();
		let preguntaActual = quizz.preguntas[quizz.contador];
		$("header").html(`<img src="${preguntaActual.imagen}">`);
		$("#prueba").append(
			`<h1 class="text-center"> ${preguntaActual.pregunta} </h1>
			<div class="opciones row"></div>`
		)
		$.each(preguntaActual.opciones, (key,value)=>{
			let clase = '';
			if (quizz.respuestas[quizz.contador]==value) {
				clase = 'select';
			} 
			$('<div>').addClass(`col-md-4 ${clase}`).html(
				`<button class="btn"><span class='letra'>${key}</span>${value}</button>`
			).appendTo(".opciones").click((e)=>{
				quizz.guardarRespuesta(e.currentTarget, value);
			})
		})
	},
	guardarRespuesta: (d, value)=>{
		if(quizz.marcar){
			$(d).addClass('select');
			quizz.marcar=false;
			quizz.respuestas[quizz.contador]=value;
			let t = setTimeout(()=>{
				quizz.marcar=true;
				quizz.siguiente();
			}, 900);
		}
	},
	siguiente : ()=>{
		quizz.contador++;
		if(quizz.contador<quizz.total){
			quizz.crearPregunta();
		}else {
			quizz.mostrarRespuestas();
		}
	},
	anterior: ()=>{
		quizz.contador--;
		quizz.crearPregunta();
	},
	barraProgreso: ()=>{
		$('.progress-label').html(`${quizz.respuestas.length} of ${quizz.total} answered`);
		let multiplo = 20*quizz.respuestas.length;
		$(".progress-bar").width(`${multiplo}%`);
	},
	mostrarRespuestas: ()=>{
		$("header").html(`<img src="assets/img/truck.svg">`);
		$('#prueba').empty().append('<div id="respuestas"></div>');
		quizz.barraProgreso();
		quizz.listaRespuestas(false, 'Submit', quizz.comparar);
		$('#respuestas').prepend('<h1 class="text-center">Here are your answer:</h1>');
	},
	listaRespuestas:(comparar, boton, funcion)=>{
		$('#prueba').empty().append('<div id="respuestas"></div>');
		$.each(quizz.respuestas, (i,l)=>{
			let estilos = '';
			let contenido=l;
			if(comparar && l==quizz.preguntas[i].respuesta){
				quizz.correctas++;
				estilos='class="text-success"';
			}else if(comparar){
				estilos=`class='text-danger'`;
				contenido = `<strike>${l}</strike> ${quizz.preguntas[i].respuesta}`;
			}
			$("#respuestas").append(`<p ${estilos}>${i+1}. ${quizz.preguntas[i].pregunta} <strong>${contenido}</strong></p>`)
		})
		$('<button>').addClass('btn-lg btn-dark').html(boton).appendTo("#respuestas").click(funcion)
	},
	comparar:()=>{
		$('#progreso').hide();
		$('#flechas').hide();
		quizz.listaRespuestas(true, 'Star Again', quizz.jugarOtravez);
		let expresion='';
		if(quizz.correctas==0){
			expresion='Ooops, ';
		} else if(quizz.correctas==quizz.total) {
			expresion='Wow, ';
		} 
		$('#respuestas').prepend(`<h1 class="text-center">${expresion}${quizz.correctas} out of ${quizz.total} correct!</h1>`);
	},
	eventos: ()=>{
		quizz.flecha.siguiente.off('click');
		quizz.flecha.anterior.off('click');
		if(quizz.respuestas.length>quizz.contador){
			quizz.flecha.siguiente.removeClass('disabled').click(quizz.siguiente);
		}else{
			quizz.flecha.siguiente.addClass('disabled');
		}
		if(quizz.respuestas.length>=quizz.contador && quizz.contador!=0){
			quizz.flecha.anterior.removeClass('disabled').click(quizz.anterior);
		}else{
			quizz.flecha.anterior.addClass('disabled');
		}
	},
	jugarOtravez:()=>{
		$('#progreso').show();
		$('#flechas').show();
		quizz.respuestas=[];
		quizz.contador=0;
		quizz.correctas=0;
		quizz.crearPregunta();
	},
	iniciar : ()=>{
		quizz.total= Object.keys(quizz.preguntas).length;
		quizz.flecha.siguiente=$('#siguiente');
		quizz.flecha.anterior=$('#anterior');
		quizz.crearPregunta();
	}
}

$(document).ready(quizz.iniciar)
