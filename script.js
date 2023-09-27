console.log("Welcome to MyMusic");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs=[
    {songName:"Shiv Tandav Stotram", filePath:"songs/1.mp3", coverPath: "SongsCoverPic/1.jpeg"},
    {songName:"Subhanallah", filePath:"songs/2.mp3", coverPath: "SongsCoverPic/2.jpeg"},
    {songName:"Kahani Suno 2.0", filePath:"songs/3", coverPath: "SongsCoverPic/3.jpeg"},
    {songName:"Despacito", filePath:"songs/4.mp3", coverPath: "SongsCoverPic/4.jpeg"},
    {songName:"Tum hi ho", filePath:"songs/5.mp3", coverPath: "SongsCoverPic/5.jpeg"},
    {songName:"Khairiyat", filePath:"songs/6.mp3", coverPath: "SongsCoverPic/6.jpeg"},
    {songName:"Heeriye", filePath:"songs/7.mp3", coverPath: "SongsCoverPic/7.jpeg"},
    {songName:"295", filePath:"songs/8.mp3", coverPath: "SongsCoverPic/8.jpeg"},
    {songName:"Remember The Name", filePath:"songs/9.mp3", coverPath: "SongsCoverPic/9.jpeg"},
    {songName:"инимМум (Ramzan Abitov Remix)", filePath:"songs/10.mp3", coverPath: "SongsCoverPic/10.jpeg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        makeAllPlays();
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        if(audioElement.paused || audioElement.currentTime<=0){
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
        else{
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    makeAllPlays();
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
})

document.getElementById('previous').addEventListener('click', ()=>{
    makeAllPlays();
    if(songIndex<=0){
        songIndex = 9;
    }
    else{
        songIndex -= 1;
    }
    
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
})