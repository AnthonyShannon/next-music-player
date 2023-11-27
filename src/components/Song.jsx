import useSpotify from "@/hooks/useSpotify";
import millisecondsToMinutes from '../lib/timeConverter'

const Song = ({ order, track }) => {
    const spotifyApi = useSpotify();

    return (
        <div className="grid grid-cols-2 text-gray-500">
            <div className="flex items-center space-x-4">
                <p>{order + 1}</p>
                <img className="h-10 w-10" src={track.track.album.images[0].url}
                    alt="track album image" />
                <div>
                    <p className="w-32 lg:w-64 text-white truncate">{track.track.name}</p>
                    <p className="w-40 truncate">{track.track.artists[0].name}</p>
                </div>
            </div>
            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="hidden md:inline">{track.track.album.name}</p>
                <p>{millisecondsToMinutes(track.track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song;