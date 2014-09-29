function play() {
    var audio = document.getElementById('audio1');
    if (audio.paused) {
        audio.play();
    }else{
        if (audio.play) {
        audio.pause();
    }
    }
}
