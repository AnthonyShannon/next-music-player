import { useState, useEffect, useCallback } from 'react';
import { currentTrackIdState, isPlayingState } from "@/atoms/songAtom";
import useSpotify from "@/hooks/useSpotify";
import useSongInfo from '@/hooks/useSongInfo';
import { debounce } from 'lodash';
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { ArrowsRightLeftIcon, SpeakerWaveIcon as VolumeDownIcon, HeartIcon } from '@heroicons/react/24/outline'
import { BackwardIcon, SpeakerWaveIcon as VolumeUpIcon, ForwardIcon, PlayCircleIcon, PauseCircleIcon, ArrowUturnDownIcon } from '@heroicons/react/24/solid'

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

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        })
    }

    const handleSkipToNext = () => {
        spotifyApi.skipToNext()
    }

    useEffect(() => {
        if (volume >= 0 && volume <= 100) {
            debouncedAdjustVolume(volume)
        }
    }, [volume]) 

    const debouncedAdjustVolume = useCallback(
        debounce(volume => {
            spotifyApi.setVolume(volume).catch(err => {})
        }, 500)
    )

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            getCurrentSong();
            setVolume(50);
        }
    }, [currentTrackId, spotifyApi, session])


    return (
        <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
            <div className='flex items-center space-x-4'>
                <img className='hidden md:inline h-10 w-10' src={songInfo?.album?.images?.[0].url} alt="song album art" />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>

            <div className='flex items-center justify-evenly'>
                <ArrowsRightLeftIcon className='button' />
                <BackwardIcon
                    // onClick={() => spotifyApi.skipToPrevious()}
                    className='button' />
                {!isPlaying ? (
                    <PlayCircleIcon onClick={handlePlayPause} className='button w-10 h-10' />
                ) : (
                    <PauseCircleIcon onClick={handlePlayPause} className='button w-10 h-10' />
                )}
                <ForwardIcon
                    onClick={handleSkipToNext}
                    className='button' />
                <ArrowUturnDownIcon className='button' />
            </div>

            <div className='flex items-center space-x-3 md:space-x-4 justify-end'>
                <VolumeDownIcon className='button' 
                onClick={() => volume > 0 && setVolume(volume - 10)}/>
                <input
                    className='w-14 md:w-28'
                    type='range'
                    value={volume}
                    min={0}
                    max={100}
                    onChange={e => setVolume(Number(e.target.value))} />
                <VolumeUpIcon className='button' 
                onClick={() => volume < 100 && setVolume(volume + 10)}/>
            </div>
        </div>
    )
}

export default Player;