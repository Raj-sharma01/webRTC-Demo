
let localStream;
let remoteStream;


const servers = {
    iceServers: [{
        urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"]
    }]
}


const init = async () => {

    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    document.getElementById("user-1").srcObject = localStream;

}

let peerConnection;

const createPeerConnection = async (sdpType) => {
    
    peerConnection = new RTCPeerConnection(servers);

    remoteStream = new MediaStream();
    document.getElementById("user-2").srcObject = remoteStream;

    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });


    peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
            console.log("event = ",event)
            console.log("ice candidate : ",event.candidate)
            document.getElementById(sdpType).value = JSON.stringify(peerConnection.localDescription)
        }
    }


    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach(track => {
            remoteStream.addTrack(track);
        });
    }
}



const createOffer = async () => {

    createPeerConnection("offer-sdp")

    let offer = await peerConnection.createOffer();
    console.log("offer created",offer);

    await peerConnection.setLocalDescription(offer);

   
    document.getElementById("offer-sdp").value = JSON.stringify(offer)
}

const createAnswer = async () => {

    createPeerConnection("answer-sdp")

    let offer = document.getElementById("offer-sdp").value;
    if (!offer) return alert("retrieve offer from user first ... ")

    offer = JSON.parse(offer)
    await peerConnection.setRemoteDescription(offer)

    let answer = peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)

    document.getElementById("answer-sdp").value = JSON.stringify(answer)
}

const addAnswer = async () => {
    let answer = document.getElementById("answer-sdp").value
    if (!answer) return alert("retrieve answer from user first ... ")

    answer = JSON.parse(answer)

    if (!peerConnection.currentRemoteDescription) {
        peerConnection.setRemoteDescription(answer)
    }
}

// Initialize the video call
init();
document.getElementById("create-offer").addEventListener("click", createOffer)
document.getElementById("create-answer").addEventListener("click", createAnswer)
document.getElementById("add-answer").addEventListener("click", addAnswer)