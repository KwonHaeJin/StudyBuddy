/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";

function VideoChat() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketConnection = new WebSocket(`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://43.202.203.36:5001`);


    socketConnection.onopen = () => {
      console.log("WebSocket connected");
      startVideo(socketConnection);
    };

    socketConnection.onmessage = (message) => {
      const data = JSON.parse(message.data);
      switch (data.type) {
        case "offer":
          handleOffer(data.offer, data.sender);
          break;
        case "answer":
          handleAnswer(data.answer);
          break;
        case "candidate":
          handleCandidate(data.candidate);
          break;
        default:
          console.warn("Unknown message type:", data.type);
      }
    };

    socketConnection.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socketConnection.onclose = () => {
      console.log("WebSocket closed");
    };

    setSocket(socketConnection);

    // 컴포넌트 언마운트 시 소켓 및 피어 연결 정리
    return () => {
      socketConnection.close();
      if (peerConnection) {
        peerConnection.close();
      }
    };
  }, []);

  // 비디오 스트림 시작
  async function startVideo(socket) {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideoRef.current.srcObject = localStream;

      // PeerConnection 생성 및 설정
      const newPeerConnection = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      localStream.getTracks().forEach((track) =>
        newPeerConnection.addTrack(track, localStream)
      );

      // 원격 스트림 수신
      newPeerConnection.ontrack = (event) => {
        console.log("Received remote stream");
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      // ICE 후보 수신
      newPeerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("Sending ICE candidate to remote peer");
          socket.send(
            JSON.stringify({
              type: "candidate",
              candidate: event.candidate,
              targetUserId: "target-user-id", // 실제 상대방 ID를 설정하세요.
            })
          );
        }
      };

      setPeerConnection(newPeerConnection);

      // 연결 상태 확인
      newPeerConnection.oniceconnectionstatechange = () => {
        console.log("ICE Connection State:", newPeerConnection.iceConnectionState);
      };
    } catch (error) {
      console.error("Error accessing local stream:", error);
    }
  }

  // Offer 수신 및 처리
  async function handleOffer(offer, sender) {
    if (!peerConnection) return;
    try {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      socket.send(
        JSON.stringify({
          type: "answer",
          answer: answer,
          targetUserId: sender, // 오퍼를 보낸 사용자 ID로 설정
        })
      );
    } catch (error) {
      console.error("Error handling offer:", error);
    }
  }

  // Answer 수신 및 처리
  async function handleAnswer(answer) {
    if (!peerConnection) return;
    try {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
      console.error("Error handling answer:", error);
    }
  }

  // ICE Candidate 처리
  async function handleCandidate(candidate) {
    if (!peerConnection) return;
    try {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error("Error adding ICE candidate:", error);
    }
  }

  return (
    <div className="main" style={{backgroundColor:"#F2F2F2"}} >
      <div style={{ height: "10vh" }}></div>
      <div style={{ position: "relative", width: "100%", height: "30vh", marginBottom: "2.5vh" }}>
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          style={{ width: "100%", height: "100%", borderRadius: "15px", backgroundColor: "rgba(0, 0, 0, 0.29)", }}
        ></video>
        <div style={{
          position: "absolute",
          transform: "translate(20%, -150%)",
          color: "white",
          fontSize: "17px",
          fontWeight: "bold",
          fontFamily: "Basic"
        }}>
          남의 화면
        </div>
      </div>

      <div style={{ position: "relative", width: "100%", height: "30vh" }}>
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          style={{ width: "100%", height: "100%", borderRadius: "15px", backgroundColor: "white", }}
        ></video>
        <div style={{
          position: "absolute",
          transform: "translate(23%, -150%)",
          color: "black",
          fontSize: "17px",
          fontWeight: "bold",
          fontFamily: "Basic"
        }}>
          내 화면
        </div>
      </div>
      <div style={{height:"9vh"}}></div>
      <div style={{backgroundColor:"#8E8E8E", width:"9vh", height:"9vh", borderRadius:"50%", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <button style={{backgroundColor:"#707070", width:"6.8vh", height:"6.8vh", borderRadius:"50%", border:"none"}}></button>
      </div>
    </div>

  );
}

export default VideoChat;
