'use client'

import { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";

const Home = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [studyMate, setStudyMate] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);

  useEffect(() => {
    const socketConnection = io("http://localhost:5000");
    setSocket(socketConnection);

    socketConnection.on('connected-with-mate', (mate) => {
      setStudyMate(mate);
    });

    socketConnection.on('offer', handleReceiveOffer);
    socketConnection.on('answer', handleReceiveAnswer);
    socketConnection.on('ice-candidate', handleNewICECandidateMsg);

    return () => {
      socketConnection.disconnect();
    }
  }, []);

  const handleSearch = () => {
    setIsSearching(true);
    socket.emit('search-study-mate');
  };

  const startVideoCall = async () => {
    setIsVideoCall(true);
    await setupWebRTC();
  };

  const setupWebRTC = async () => {
    peerConnection.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', event.candidate);
      }
    };

    peerConnection.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = localStream;

    localStream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream);
    });

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

    socket.emit('offer', offer);
  };

  const handleReceiveOffer = async (offer) => {
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));

    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = localStream;

    localStream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream);
    });

    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);

    socket.emit('answer', answer);
  };

  const handleReceiveAnswer = async (answer) => {
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleNewICECandidateMsg = async (incoming) => {
    const candidate = new RTCIceCandidate(incoming);
    await peerConnection.current.addIceCandidate(candidate);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      {!isSearching ? (
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
          Search for Study Mate
        </button>
      ) : (
        <div>
          {studyMate ? (
            <div>
              <h2>Connected with {studyMate.name}</h2>
              <button onClick={startVideoCall} className="bg-green-500 text-white px-4 py-2 rounded mt-2">
                Join Video Call
              </button>
              <div className="video-call mt-4">
                {isVideoCall && (
                  <>
                    <video ref={localVideoRef} autoPlay playsInline className="w-1/2" />
                    <video ref={remoteVideoRef} autoPlay playsInline className="w-1/2" />
                  </>
                )}
              </div>
            </div>
          ) : (
            <p>Searching for a study mate...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
