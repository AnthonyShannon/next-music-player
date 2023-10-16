import { useEffect } from "react";
import { signIn, useSession } from 'next-auth/react'
import spotifyApi from '../lib/spotify'

const useSpotify = () => {
    const { data: session, status } = useSession(); 
    console.log(status);

    useEffect(() => {
        if (session) {
            if (session.error === 'RefreshAccessTokenError') { // goes to login page if refresh token fails
                signIn();
            }

            spotifyApi.setAccessToken(session.user.accessToken)
        }
    }, [session])

    return spotifyApi
}

export default useSpotify;