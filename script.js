const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

 // Music
 const songs = [
   {
       name: 'thinking_out_loud',
       displayName: 'Thinking Out Loud',
       artist: 'Ed Sheeran',
   },
   {
       name: 'grenade',
       displayName: 'Grenade',
       artist: 'Bruno Mars',
   },
   {
       name: 'perfect',
       displayName: 'Perfect',
       artist: 'Ed Sheeran',
   },
   {
       name: 'blinding_lights',
       displayName: 'Blinding Lights',
       artist: 'The Weeknd',
   }, 
   {
        name: 'one_more_night',
        displayName: 'One More Night',
        artist: 'Maroon 5',
   },
   {
        name: '24k_magic',
        displayName: '24k Magic',
        artist: 'Bruno Mars',
   },
   {
        name: 'uptown_funk',
        displayName: 'Uptown Funk',
        artist: 'Mark Ronson',
   },
   {
       name: 'save_your_tears',
       displayName: 'Save Your Tears',
       artist: 'The Weeknd',
   },
   {
       name: 'what_makes_you_beautiful',
       displayName: 'What Makes You Beautiful',
       artist: 'One Direction',
   },
   {
       name: 'shallow',
       displayName: 'Shallow',
       artist: 'Lady Gaga, Bradley Cooper',
   }
 ]

// Check if Playing
let isPlaying = false;

// Play 
function playSong() {
 isPlaying = true;
 playBtn.classList.replace('fa-play', 'fa-pause');
 playBtn.setAttribute('title', 'Pause');
 music.play();
}

// Pause 
function pauseSong() {
 isPlaying = false;
 playBtn.classList.replace('fa-pause', 'fa-play');
 playBtn.setAttribute('title', 'Play');
 music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
 title.textContent = song.displayName;
 artist.textContent = song.artist;
 music.src = `music/${song.displayName}.mp3`;
 image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
 songIndex--;
 if(songIndex < 0) {
  songIndex = songs.length -1;
 }
 loadSong(songs[songIndex]);
 playSong();
}

// Next Song
function nextSong() {
 songIndex++;
 if(songIndex > songs.length -1) {
  songIndex = 0;
 }
 loadSong(songs[songIndex]);
 playSong();
}

// On Load - Select first song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
   if (isPlaying) {
     const {duration, currentTime} = e.srcElement;
     // Update progress bar width
     const progressPercent = (currentTime/duration) *100;
     progress.style.width = `${progressPercent}%`;
     // Calculate display for duration
     const durationMinutes = Math.floor(duration / 60);
     let durationSeconds = Math.floor(duration % 60);
     if(durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
     }
     // Delay switching duration Element to avoid NaN
     if(durationSeconds) {
       durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
     }
      // Calculate display for current
     const currentMinutes = Math.floor(currentTime / 60);
     let currentSeconds = Math.floor(currentTime% 60);
     if(currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
     }
     currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
   }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration} = music;
  music.currentTime = ((clickX / width) * duration);
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);