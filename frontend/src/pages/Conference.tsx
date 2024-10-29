import { useState } from "react";
import { useLocation } from "react-router-dom";
import { 
    useLocalMicrophoneTrack, 
    useLocalCameraTrack, 
    useJoin, 
    usePublish, 
    useRemoteUsers, 
    useRemoteAudioTracks,
    RemoteUser, 
    LocalUser 
} from "agora-rtc-react";
import { Mic, MicOff, Video, VideoOff, LogOut, User } from "lucide-react";

const Conference = () => {
    const appId = import.meta.env.VITE_APP_ID;
    const location = useLocation();
    const channelName = location.state?.channelName;

    const [activeConnection, setActiveConnection] = useState<boolean>(true);
    const [micOn, setMicOn] = useState<boolean>(true);
    const [cameraOn, setCameraOn] = useState<boolean>(true);

    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { localCameraTrack } = useLocalCameraTrack(cameraOn);

    useJoin(
        {
            appid: appId,
            channel: channelName,
            token: null,
        },
        activeConnection
    );

    usePublish([localMicrophoneTrack, localCameraTrack]);

    const remoteUsers = useRemoteUsers();
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);

    audioTracks.forEach((track) => track.play());

    return (
        <div className="flex flex-col items-center p-6 space-y-4 bg-gray-900 text-white min-h-screen">
            <h1 className="text-2xl font-semibold">Conference Room</h1>

            <div className="flex flex-wrap justify-center gap-4 w-full max-w-4xl">
                {/* Remote users */}
                {remoteUsers.map((user) => (
                    <div 
                        key={user.uid} 
                        className="relative bg-gray-800 rounded-lg overflow-hidden w-60 h-40 shadow-lg"
                    >
                        <RemoteUser user={user} />
                        <p className="absolute bottom-2 left-2 text-xs text-gray-300">User {user.uid}</p>
                    </div>
                ))}
            </div>

            {/* Local User Video */}
            <div className="relative w-80 h-60 bg-gray-800 rounded-2xl shadow-lg">
                <LocalUser
                    audioTrack={localMicrophoneTrack}
                    videoTrack={localCameraTrack}
                    cameraOn={cameraOn}
                    micOn={micOn}
                    playAudio={micOn}
                    playVideo={cameraOn}
                    className="w-full h-full rounded-2xl"
                />
                {
                    !cameraOn && (
                        <div className="absolute top-5 left-14">
                            <User size={200} className="text-gray-500" />
                        </div>
                    )
                }
                <p className="absolute bottom-2 left-2 text-xs text-gray-300">You</p>
            </div>

            {/* Media Controls */}
            <div className="flex items-center space-x-4 mt-4">
                <button 
                    onClick={() => setMicOn((prev) => !prev)} 
                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
                >
                    {micOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                </button>
                <button 
                    onClick={() => setCameraOn((prev) => !prev)} 
                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
                >
                    {cameraOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                </button>
                <button 
                    onClick={() => {
                        setActiveConnection(false);
                        window.location.href = "/";
                    }} 
                    className="p-2 rounded-full bg-red-600 hover:bg-red-500 text-white"
                >
                    <LogOut className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default Conference;
