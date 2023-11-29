import { useState, useEffect } from 'react';
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

    const getCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack()
                .then(data => {
                    setCurrentTrackId(data.body?.item?.id);
                });
            spotifyApi.getMyCurrentPlaybackState()
                .then(data => {
                    setIsPlaying(data.body?.is_playing);
                });
        }
    }

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            getCurrentSong();
            setVolume(50);
        }
    }, [currentTrackId, spotifyApi, session])


    return (
        <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white'>
            <div>
                <img className='hidden md:inline h-10 w-10' src={songInfo?.album?.images?.[0].url} alt="song album art" />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
        </div>
    )
}

export default Player;