import React, { useState } from "react";
import { Button } from "../ui/button";
import { Video } from "lucide-react";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { createRoom, joinRoom } from "@/api/conference";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "@/store/user";
import { toast } from "react-toastify";

const Home = () => {
  const [channelName, setChannelName] = useState<string>("");
  const token = useRecoilValue(tokenAtom);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelName(e.target.value);
  };

  const handleCreateRoom = async () => {
    if (token === "") {
      toast.info("Please login to create a room");
      navigate("/auth");
    } else {
      let toastId = toast.loading("Creating room...");
      const result = await createRoom(token);
      if(result.success) {
        toast.update(toastId, {
          type: "success",
          isLoading: false,
          render: "Room created successfully!",
          autoClose: 2000,
        });
        console.log(result)
        navigate('/conference', { state: { channelName: result.channelName }});
      } else {
        toast.update(toastId, {
          type: "error",
          isLoading: false,
          render: result.message,
          autoClose: 2000,
        });
      }
    }
  };

  const handleJoinRoom = async () => {
    console.log(channelName);
    if (token === "") {
      toast.info("Please login to join a room");
      navigate("/auth");
    } else if (channelName.trim() === "" || channelName === null) {
      toast.error("Channel name cannot be empty");
    } else {
      let toastId = toast.loading("Joining room...");
      const result = await joinRoom(token, channelName);
      if(result.success) {
          toast.update(toastId, {
            type: "success",
            isLoading: false,
            render: "Room joined successfully!",
            autoClose: 2000,
          });
          navigate('/conference', { state: { channelName }});
      } else {
        toast.update(toastId, {
          type: "error",
          isLoading: false,
          render: result.message,
          autoClose: 2000,
        });
      }
    }
  };
  return (
    <div className="min-h-[calc(100vh-90px)] flex items-center">
      <div className="w-full flex px-40 items-center justify-between">
        <div className="w-1/2 flex flex-col gap-y-3">
          <h1 className="text-5xl font-semibold">
            Video calls and meetings for everyone
          </h1>
          <p className="text-2xl">
            Connect, collaborate and celebrate from anywhere with VirtualConnect
          </p>
          <div className="flex mt-4 justify-between">
            <Button
              className="flex items-center text-lg py-6"
              onClick={handleCreateRoom}
            >
              <Video />
              <p>New Meeting</p>
            </Button>
            <div className="flex gap-x-2">
              <Input
                onChange={handleChange}
                placeholder="Enter Channel Name"
                className="py-6 px-3 w-[280px]"
              />
              <Button
                onClick={handleJoinRoom}
                variant={"destructive"}
                className="px-10 py-6 text-lg"
              >
                Join
              </Button>
            </div>
          </div>
          <div className="h-[1px] bg-gray-700 w-full mt-10"></div>
        </div>
        <div>
          <img
            src="https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg"
            alt="Virtual Connect"
            width={400}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
