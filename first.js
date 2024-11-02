let btn=document.querySelector("button");
let cont=document.querySelector("#cnt");

 function speak(text)
 {
    let str=new SpeechSynthesisUtterance(text);
    str.rate=1;
    str.volume=1;
    str.pitch=1;
    str.lang="hi-EN";
    window.speechSynthesis.speak(str);
 }
 function wish()
 {
    let d=new Date();
    let h=d.getHours();
    let m=d.getMinutes();
    if(h>=0&&h<12)
    {
        speak("Good Morning ");
    }
   else  if(h>=12&&h<16)
    {
speak("Good afternoon");
    }
   else  if(h>=16&&h<20){
        speak("good evening ");
    }
    else if(h>=20&&h<24){
        speak("good night ");
    }
}
    window.addEventListener("load",wish);
   
 
 let speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition
 let recognition=new speechRecognition()
 recognition.onresult=(event)=>
{
    let currentIndex=event.resultIndex
     let transcript=event.results[currentIndex][0].transcript
    
cont.innerText=transcript;console.log(transcript);
    takeCommand(transcript.toLowerCase());
}

btn.addEventListener("click",()=>
{
    recognition.start()
})
function takeCommand(message)
{
    if(message.includes("hello")||message.includes("hey"))
    {
        speak("hello ,how may i help you ?")
    }
    else if(message.includes("how are you"))
    {
        speak("i am doing well ,tell me how can i help you")
    }
    else if(message.includes("who are you")||message.includes("who created you"))
    {
speak("i am alexa, the virtual assistant created by vaishnavi nigam")
    }
    else if(message.includes("vaishnavi")||message.includes("your owner"))
    {
        speak("vaishnavi had created me,she is currently in second year pursuing her tech course with a deep passion in AI/ML and Blockchain")
    }
    else if(message.includes("open youtube"))
    {
        speak("opening you tube");
window.open('https://www.youtube.com/')
    }
    else if(message.includes("open google"))
    {
        speak("opening google")
window.open('https://google.com')
    }
    else if(message.includes("open whatsapp"))
    {
        speak("opening whatsapp")
        window.open('https://www.whatsapp.com')
    }
    else if(message.includes("bye"))
    {
        speak("by   and have a nice day")
    }
    else 
    {
    speak('this is what i found on google');
    window.open(`https://www.google.com/search?q=${message}`)
}
}