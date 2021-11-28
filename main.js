// https://teachablemachine.withgoogle.com/models/LGltoHkef/model.json //

p1="";
p2="";

var web= document.getElementById("web1");

Webcam.set({
    width:360,
    height: 250,
    image_format:"png",
    png_quality:100
});

Webcam.attach("#web1");

function take(){
    Webcam.snap(function(data_uri){
        document.getElementById("preview").innerHTML= "<img id='photo' src='"+data_uri+"'>'";
    } );
}

var classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/LGltoHkef/model.json" , modelLoaded());

function modelLoaded(){
      console.log("model loaded");
}

function speak(){
    lbphoto = window.speechSynthesis;
    data1= "the first prodiction is"+p1;
    data2= " and the second prodiction is"+p2;

    thisp = new SpeechSynthesisUtterance( data1 + data2);
    lbphoto.speak(thisp);
}

function check(){
    img = document.getElementById("photo");
    classifier.classify(img , gotresult);
    speak();
}

function gotresult(error , result){
    if (error) {
        console.error(error);
    }

    else{
        console.log(result);
        p1= result[0].label;
        p2= result[1].label;
        document.getElementById("e1").innerHTML=p1;
        document.getElementById("e2").innerHTML=p2;

        if (p1 == "happy") {
            document.getElementById("e1").innerHTML= p1+"'<span>'&#128512;'</span>'";
        }

        if (p1 == "sad") {
            document.getElementById("e1").innerHTML= p1+"'<span>'&#128532;'</span>'";
        }

        if (p1 == "angry") {
            document.getElementById("e1").innerHTML= p1+"'<span>'&#128545;'</span>'";
        }

        if (p1 == "afraid") {
            document.getElementById("e1").innerHTML= p1+"'<span>'&#128534;'</span>'";
        }

        if (p1 == "bored") {
            document.getElementById("e1").innerHTML= p1+"'<span>'&#128530;'</span>'";
        }
    
    }

    
}