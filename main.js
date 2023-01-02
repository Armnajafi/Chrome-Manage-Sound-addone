function run() {
    setInterval(function () {
        let audios = document.getElementsByTagName("audio");
        for(let i = 0; i < audios.length; i++){
            if(audios[i].duration > 0 && !audios[i].paused){
                audios[i].setAttribute('isPlaying' , 'true');  
            } else {
                audios[i].setAttribute('isPlaying' , 'false');
            }
        }
        let audiosPlaying = [];
        let audiosStoped = [];
        for(let i = 0; i < audios.length; i++){
            if(audios[i].getAttribute("isPlaying") == "true"){
                audiosPlaying.push(audios[i]);
            } else if(audios[i].getAttribute("isPlaying") == "false") {
                audiosStoped.push(audios[i]);
            }
        }
        console.log("Playing " + audiosPlaying);
        console.log("Stoped " + audiosStoped);

        for(let i = 0; i < audiosPlaying.length; i++){
            if(i == 1){
                audiosPlaying[1].play();
                audiosPlaying[0].pause();
                audiosPlaying.shift();
            } 
            //  else if(i == 1){
            //     audiosPlaying[0].play();
            // }
        }
    } , 1000)

    let audios = document.getElementsByTagName("audio");
    audios[0].play();
    for(let i = 0; i < audios.length; i++){
        audios[i].addEventListener("ended", function(){
            audios[i].pause();
            audios[i+1].play();
       });
    }

    var speechRecognition = window.webkitSpeechRecognition
    var recognition = new speechRecognition()
    var content = ''
    recognition.continuous = true
    setInterval(function () {
        recognition.start();
    } , 10000)
        recognition.onresult = function(event) {
         var current = event.resultIndex;
         var transcript = event.results[current][0].transcript
            if(transcript.includes("hello")){
                let audios = document.getElementsByTagName("audio");
                for(let i = 0; i < audios.length; i++){
                    if(audios[i].duration > 0 && !audios[i].paused){
                        audios[i].pause();
                        audios[i+1].play();
                    }
                }
            }
            if(transcript.includes("nice")){
                let audios = document.getElementsByTagName("audio");
                for(let i = 0; i < audios.length; i++){
                    if(audios[i].duration > 0 && !audios[i].paused){
                        audios[i].pause();
                        audios[i-1].play();
                    }
                }
            }
        }

}

  chrome.action.onClicked.addListener((tab) => {
    if(!tab.url.includes("chrome://")) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: run
      });
    }
  });
