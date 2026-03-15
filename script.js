console.log("script loaded")

let melody
let wrongIndex

async function startExercise(){

    const response = await fetch("data/melody.json")
    const data = await response.json()

    melody = JSON.parse(JSON.stringify(data.melodies[0].notes))

    wrongIndex = Math.floor(Math.random()*melody.length)

    let shift = [-2,-1,1,2][Math.floor(Math.random()*4)]

    melody[wrongIndex].pitch += shift

    drawScore()
}

function drawScore(){

    const score = document.getElementById("score")
    score.innerHTML = ""

    melody.forEach((note,i)=>{

        let el = document.createElement("span")

        el.className="note"
        el.innerText = pitchName(note.pitch)

        el.onclick = ()=>check(i)

        score.appendChild(el)
    })
}

function pitchName(m){

    const names = ["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"]

    let name = names[m%12]
    let octave = Math.floor(m/12)-1

    return name+octave
}

function check(i){

    if(i==wrongIndex)
        alert("Correct!")
    else
        alert("Nope.")
}

async function play(){

    await Tone.start()

    const synth = new Tone.Synth().toDestination()

    let time = 0

    melody.forEach(note=>{

        let freq = Tone.Frequency(note.pitch,"midi")

        synth.triggerAttackRelease(freq,note.dur,time)

        time += note.dur
    })
}

<script src="https://www.verovio.org/javascript/latest/verovio-toolkit.js"></script>