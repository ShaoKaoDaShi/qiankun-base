import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
// import "../../utils/webcam.min";
// import "webcamjs/webcam.min.js";
let socket = null;
const VideoChat = () => {
    const [videos, setVideos] = useState([]);
    const ref = useRef<HTMLDivElement>();
    useEffect(() => {
        const constraints = {
            video: true,
        };

        const video = document.querySelector("video");

        function handleSuccess(stream) {
            // window.stream = stream; // only to make stream available to console
            video.srcObject = stream;
        }

        function handleError(error) {
            console.log("getUserMedia error: ", error);
        }

        // if (Webcam.mediaDevices && Webcam.mediaDevices.getUserMedia) {
        //     // 请求访问摄像头
        //     Webcam.mediaDevices
        //         .getUserMedia({
        //             video: true,
        //             audio: true,
        //         })
        //         .then((stream) => {
        //             addVideoStream(ref.current.firstElementChild, stream);

        //             // myPeer.on("call", (call) => {
        //             //     call.answer(stream);
        //             //     const video = document.createElement("video");
        //             //     call.on("stream", (userVideoStream) => {
        //             //         addVideoStream(video, userVideoStream);
        //             //     });
        //             // });

        //             // socket.on("user-connected", (userId) => {
        //             //     connectToNewUser(userId, stream);
        //             // });
        //         })
        //         .catch(function (error) {
        //             // 处理错误
        //             alert("访问摄像头失败");
        //             console.error("Error accessing camera:", error);
        //         });
        // } else {
        //     console.error("getUserMedia is not supported in this browser");
        //     alert("getUserMedia is not supported in this browser");
        // }

        socket = io();

        return () => {
            socket = null;
        };
    }, []);
    const getVideoElement = (id: string) => {
        return ref.current.querySelector(`#${id}`);
    };
    function addVideoStream(video, stream) {
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
            video.play();
        });
    }
    return (
        <div ref={ref}>
            <video></video>
            {videos.map((item) => (
                <video id={item.id} key={item.id} />
            ))}
        </div>
    );
};

export default VideoChat;
