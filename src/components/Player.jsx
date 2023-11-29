import { useState } from 'react';
import { currentTrackIdState, isPlayingState } from "@/atoms/songAtom";
import useSpotify from "@/hooks/useSpotify";
import useSongInfo from '@/hooks/useSongInfo';
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";

const Player = () => {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50)

    const songInfo = useSongInfo();


    return (
        <div>
            <div>
                <img src="" alt="" />
            </div>
        </div>
    )
}

export default Player;