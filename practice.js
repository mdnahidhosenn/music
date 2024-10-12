const wrapper = document.querySelector('.wrapper'),
musicImg = document.querySelector('.img-area img'),
musicName = document.querySelector('.song-details .name'),
musicArtist = document.querySelector('.song-details .artist'),
playPauseBtn = document.querySelector('.play-pause'),
playPauseBtnLi = document.querySelector('.play-pause i')
nextBtn = document.querySelector('#next'),
prevBtn = document.querySelector('#prev'),
moreMusicBtn = document.querySelector('#more-music'),
musicList = document.querySelector('.music-list'),
closemoreMusic = document.querySelector('#close')
repeatBtn = document.querySelector('#repeat-plist')
progressArea = document.querySelector('.progress-area'),
progressBar = document.querySelector('.progress-bar')
ulTag = document.querySelector('ul'),

mainAudio = document.querySelector('#main-audio')
let adDuration  = wrapper.querySelector('.max-duration')
let adcurrentTime = wrapper.querySelector('.current-time')


let musicIndex = Math.floor(Math.random()*allMusic.length)+1;
let clone =''

window.addEventListener('load',()=>{
 loadMusic(musicIndex)
 playingSong()
})

function loadMusic(indexNumb){
 musicName.innerText =allMusic[indexNumb - 1].name;
 musicArtist.innerText =allMusic[indexNumb - 1].artist;
 musicImg.src = `images/${allMusic[indexNumb - 1].src}.jpg`
 mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`
}

function playMusic(){
 wrapper.classList.add('pause')
 playPauseBtnLi.innerText = 'pause'
 mainAudio.play()
}
function pauseMusic(){
 mainAudio.pause()
 wrapper.classList.remove('pause');
 playPauseBtnLi.innerText = 'play_arrow'
}

playPauseBtn.addEventListener('click',()=>{
 let isMusicPlay = wrapper.classList.contains('pause');
 isMusicPlay ? pauseMusic() : playMusic()
 playingSong()
})

function prevMusic(){
 musicIndex--;
 if(musicIndex < 1 ){
  musicIndex =allMusic.length
 }else{
  musicIndex = musicIndex;
 }
 loadMusic(musicIndex)
 playMusic()
 playingSong()
}

function nextMusic(){
 musicIndex++;
 musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex
 loadMusic(musicIndex)
 playMusic()
 playingSong()
}

prevBtn.addEventListener('click',prevMusic)
nextBtn.addEventListener('click',nextMusic)

repeatBtn.addEventListener('click',()=>{
 let getText = repeatBtn.innerText;
 switch(getText){
  case 'repeat' : 
   repeatBtn.innerText = 'repeat_one'
   break;
   case 'repeat_one': 
   repeatBtn.innerText = 'shuffle'
   break;
   default : repeatBtn.innerText = 'repeat'
 }
})

mainAudio.addEventListener('timeupdate',(e)=>{
 let currentTime =e.target.currentTime;
 let duration = e.target.duration
 let progressWidth =(currentTime / duration) * 100;
 progressBar.style.width = `${progressWidth}%`


 mainAudio.addEventListener('loadeddata',()=>{
  let mainAdDuration = mainAudio.duration;
  let totalMin = Math.floor((mainAdDuration / 60))
  let totalSec = Math.floor((mainAdDuration % 60))
  
  adDuration.innerText =`${totalMin}:${totalSec}`
 })
 let currentMin =Math.floor(currentTime / 60);
 let currentSec = Math.floor(currentTime % 60)
 // currentSec < 10 ? `0${currentSec}` : currentSec
 if(currentSec < 10){
  currentSec = `0${currentSec}`
 }
 clone = adcurrentTime.innerText = `${currentMin}:${currentSec}`
})

mouseDown = false
progressArea.addEventListener('mousemove',(e)=>{
 if(!mouseDown) return
 let progressWidth = progressArea.clientWidth;
 let clickedOffsetX = e.offsetX;
 let songDuration = mainAudio.duration
 mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
 playMusic()
})
progressArea.addEventListener('mousedown',()=>mouseDown=true)
progressArea.addEventListener('mouseup',()=>mouseDown=false)

mainAudio.addEventListener('ended',()=>{
 switch(repeatBtn.innerText){
  case 'repeat': 
  nextMusic();
  playMusic()
  break;
  case 'repeat_one':
   mainAudio.currentTime = 0
   playMusic()
   break;
   case 'shuffle' : 
   let randomIndex;
   do{
    randomIndex = Math.floor(Math.random()*allMusic.length)+1;
   }while(musicIndex == randomIndex)
    musicIndex = randomIndex
    loadMusic(musicIndex)
    playMusic()
    playingSong()
 }
})
moreMusicBtn.addEventListener('click',()=>{
 musicList.classList.toggle('show')
 closemoreMusic.addEventListener('click',()=>{
  moreMusicBtn.click()
 })
})

for(let i = 0 ; i<allMusic.length; i++){
 let liTag = `<li li-index="${i + 1}">
 <div class="row">
   <span>${allMusic[i].name}</span>
   <p>${allMusic[i].artist}</p>
 </div>
 <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
 <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
</li>`;

ulTag.insertAdjacentHTML('beforeend',liTag);


let liAudio =ulTag.querySelector(`.${allMusic[i].src}`)
let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`)
liAudio.addEventListener('loadeddata',()=>{
 let mainAdDuration = liAudio.duration;
 let totalMin = Math.floor((mainAdDuration / 60))
 let totalSec = Math.floor((mainAdDuration % 60))
 if(totalSec < 10){
  totalSec = `0${totalSec}`
 }
 liAudioDuartionTag.innerText =`${totalMin}:${totalSec}`
})
}
 function playingSong(){
  const allLiTag = ulTag.querySelectorAll("li");
  for (let j = 0; j < allLiTag.length; j++) {
   let audioTag = allLiTag[j].querySelector(".audio-duration");
   
   if(allLiTag[j].classList.contains("playing")){
    
   }
   allLiTag[j].classList.remove('playing')


   //if the li tag index is equal to the musicIndex then add playing class in it
   if(allLiTag[j].getAttribute("li-index") == musicIndex){
    allLiTag[j].classList.add('playing')
    if(playPauseBtn.querySelector('i').innerText == 'play_arrow'){

     audioTag.innerText ='Pause'
    }else {
     audioTag.innerText ='playing'
    }
   }

   allLiTag[j].setAttribute('onclick',"clicked(this)");
 }
 }

 function clicked(e){
  let getLiIndex = e.getAttribute("li-index");
  musicIndex = getLiIndex;
  loadMusic(musicIndex);
  playMusic()
  playingSong()
 }


