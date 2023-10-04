import { getProviders, signIn } from "next-auth/react";

const Login = () => {

    return (
        <div className="flex flex-col items-center justify-center bg-black min-h-screen w-full">
            <img className="w-52 mb-5" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" alt="" />
            <div>
                <button className="bg-[#1ab26b] text-white p-5 rounded-full" onClick={() => signIn('spotify', { callbackUrl: '/' })}>Login with Spotify</button>
            </div>
        </div>
    )
}

export default Login;
