"use strict";

// Consegna:
// Dato un array di oggetti letterali con:
//  - url dell’immagine
//  - titolo
//  - descrizione
// Creare un carosello come nella foto allegata.

// Milestone 0:
// Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.

// Milestone 1:
// Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
// Al click dell'utente sulle frecce verso l'alto o il basso, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.

// Milestone 2:
// Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso l'alto, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso il basso.

// BONUS 1:
// Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
// BONUS 2:
// Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.
// BONUS 3:
// Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.

const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, 
    {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, 
    {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, 
    {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, 
    {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];

/*------------------
    FUNCTIONS
--------------------*/
function changeImage(direction) {
    // rimuovo la classe active-preview all'immagine corrente
    previews[currentImageIndex].classList.remove('active-preview');
    // incremento l'indice per passare alla preview successiva
    if( direction === 'next') {
        if( currentImageIndex < images.length -1 ) {
            currentImageIndex++;
        } else {
            currentImageIndex = 0;
        }
    } else if ( direction === 'previous') {
        // decremento l'indice per passare alla preview precedente
        if( currentImageIndex > 0 ) {
            currentImageIndex--;
        } else {
            currentImageIndex = images.length - 1;
        }
    }
    // aggiungo la classe active-preview alla preview diventata immagine corrente
    previews[currentImageIndex].classList.add('active-preview');
    // cambio immagine principale nel box current image
    currentBoxImage.querySelector('.img-fluid').setAttribute("src", images[currentImageIndex].image);
    currentBoxImage.querySelector('.img-fluid').setAttribute("alt", images[currentImageIndex].title);
    currentBoxImage.querySelector('.info-image h3').innerHTML = images[currentImageIndex].title;
    currentBoxImage.querySelector('.info-image p').innerHTML = images[currentImageIndex].text;
}

/*----------------------
    MAIN VARIABLES
----------------------*/
// creo una variabile per selezionare l'immagine tramite il suo indice
let currentImageIndex = 0;
// seleziono il box current image salvandolo in una variabile
const currentBoxImage = document.querySelector('.box-current-image');
// seleziono il box previews salvandolo in una variabile
const boxPreviews = document.querySelector('.box-previews');

/*------------------
    MAIN
--------------------*/
// clono il template del box current image e stampo in HTML
const templateBoxImage = document.getElementById('template-box-current-image').content.cloneNode(true);
templateBoxImage.querySelector('.img-fluid').setAttribute("src", images[currentImageIndex].image);
templateBoxImage.querySelector('.img-fluid').setAttribute("alt", images[currentImageIndex].title);
templateBoxImage.querySelector('.info-image h3').innerHTML = images[currentImageIndex].title;
templateBoxImage.querySelector('.info-image p').innerHTML = images[currentImageIndex].text;
// appendo il template current box image
currentBoxImage.append(templateBoxImage);

// creo un ciclo forEach per ciclare le immagini del box previews
images.forEach((element, index) => {
    // clono il template del box previews e stampo in HTML
    const templateBoxPreviews = document.getElementById('template-box-previews').content.cloneNode(true);
    templateBoxPreviews.querySelector('.img-fluid').setAttribute("src", element.image);
    templateBoxPreviews.querySelector('.img-fluid').setAttribute("alt", element.title);
    if( index === currentImageIndex ) {
        templateBoxPreviews.querySelector('.item-preview').classList.add('active-preview');
    }
    // appendo il template box previews
    boxPreviews.append(templateBoxPreviews);
});

// creo una variabile per selezionare tutte le previews
const previews = document.querySelectorAll('.item-preview');

// creo evento click del button next
const btnNext = document.querySelector('.next').addEventListener('click', function() {
    changeImage('next');
});

// creo evento click del button previous
const btnPrevious = document.querySelector('.previous').addEventListener('click', function() {
    changeImage('previous');
});