let songs = [
    {
        songName : "Blinding Lights",
        filePath: "bl",
        coverPath:"covers/cover.png"

    },
    {
        songName : "Sanam Re",
        filePath: "sanamre",
        coverPath:"covers/sanam.jpg"

    },
    {
        songName : "Chale Aana",
        filePath: "chaleaana",
        coverPath:"covers/chale.jpeg"

    }
]

//Initialization
let songIndex =0 ;
let audioElement = new Audio('songs/bl.mp3');
const masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");

let songItems = document.querySelectorAll('.songItems');

let songItemPlay= document.querySelectorAll(".songItemPlay");

let songInfoName = document.querySelector('.songInfoName');



masterPlay.addEventListener('click',()=>{
    if(audioElement.paused ||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity =1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity =0;

    }
})

audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');

    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})


songItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

const makeAllPlays=()=>{
    Array.from(songItemPlay).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}
Array.from(songItemPlay).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        index = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        playSong(index);
        
    });
});


//handling btns

const  prevBtn= document.getElementById('prevBtn');
const  nextBtn= document.getElementById('nextBtn');

prevBtn.addEventListener('click',()=>{
    if(index == 0){
        index =3;
    }
    else{
        index--;
    }
    playSong(index);
})
nextBtn.addEventListener('click',()=>{
    if(index == 3){
        index =0;
    }
    else{
        index++;
    }
    playSong(index);
})


//setting up function

function playSong(index){
    audioElement.src = `songs/${songs[index].filePath}.mp3`;
        audioElement.currentTime =0;
        audioElement.play();
        songInfoName.innerText=`${songs[index].songName}`;

        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity =1;
}