function play() {
    var audio = document.getElementById('audio1');
    if (audio.paused) {
        audio.play();
    }else{
        audio.currentTime = 0
    }
}
