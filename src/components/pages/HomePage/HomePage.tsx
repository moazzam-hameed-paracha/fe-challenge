"use client";
import { AnimatedHeader, GeminiLivePlayer } from "@/components/custom";
import VoiceChatRealtime from "@/components/custom/VoiceAgent/VoiceAgent";

const HomePage = () => {
  return (
    <div>
      <AnimatedHeader />
      <GeminiLivePlayer />
      {/* <VoiceChatRealtime /> */}
    </div>
  );
};

export default HomePage;
