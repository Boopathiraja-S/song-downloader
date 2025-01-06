import React, { useState } from 'react'

const Downloader = () => {

    const [songUrl, setSongUrl] = useState("")
    const [link, setLink] = useState("")
    const [author, setAuthor] = useState("")
    const [songName, setSongName] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const SongDownload = async () => {

        const isValidUrl = (input) => {
            try {
                new URL(input)
                return true
            }
            catch {
                return false
            }
        }

        if (!songUrl.trim() || !isValidUrl(songUrl)) {
            setError("Provide valid url to get Song Deatails...")
            setSongUrl("")
            return
        }

        const url = `https://spotify-downloader9.p.rapidapi.com/downloadSong?songId=${songUrl}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '39b8474aaamsh2cb8522cb55abdfp1a5159jsnd7a02746c5cb',
                'x-rapidapi-host': 'spotify-downloader9.p.rapidapi.com'
            }
        };

        setLoading(true)
        setLink("")
        setAuthor("")
        setSongName("")
        setError("")

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            const songAuthor = result.data.artist
            const songname = result.data.album
            const downlodlink = result.data.downloadLink
            console.log(result.data);

            if (result.data) {
                setLink(downlodlink)
                setAuthor(songAuthor)
                setSongName(songname)
            }
            else {
                setError("There must be an error in link...")
            }

        } catch (error) {
            console.error(error);
            setError("There must be an error try again later...")
        }
        finally {
            setLoading(false)
            setSongUrl("")
        }
    }
    function handleMusicLink(e) {
        setSongUrl(e.target.value)
    }

    return (
        <div className=''>
            <div className='my-32 flex flex-col gap-10 justify-center items-center'>
                {/* url */}
                <div className='flex flex-col md:flex-row gap-4 items-center'>
                    <input
                        type="url"
                        value={songUrl}
                        onChange={handleMusicLink}
                        className='w-[310px] md:w-[450px] lg:w-[550px] h-8 md:h-10 rounded-lg p-2 outline-none border-none placeholder:text-sm'
                        placeholder='Give url to get song...' />
                    <button
                        onClick={SongDownload}
                        className= {`rounded-lg h-8 md:h-10 text-lg font-semibold text-white transition-all px-2 md:w-32 ${loading || !songUrl.trim() ? "cursor-not-allowed bg-slate-700":"bg-green-500 hover:bg-green-600 hover:scale-105" }`}
                        disabled={loading || !songUrl.trim()}
                    >
                        GetLink
                    </button>
                </div>

                {/* Display details */}
                <div
                    className='bg-white w-[310px] h-36 md:w-[450px] lg:w-[600px] flex flex-col p-4 justify-center gap-3 rounded-lg hover:shadow-md'
                >

                    {
                        !loading && !error && !link && !songName && !author && (
                            <p className='text-xl font-xl text-green-600 text-center'>Give url to download your Songs</p>
                        )
                    }
                    {
                        loading ? (
                            <p className='text-xl font-xl text-green-600 text-center'>Loading...</p>
                        ) :
                            (
                                link ? (
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-green-700 font-semibold'>Music name :
                                            <span className='text-red-600'> {songName}</span>
                                        </p>
                                        <p className='text-green-700 font-semibold'> Author :
                                            <span className='text-red-600'> {author}</span>
                                        </p>
                                        <div className='flex items-center gap-3'>
                                            <p className='text-green-700 font-semibold '>Download Link : </p>
                                            <button

                                                className='bg-blue-500 text-white font-medium transition-all align-text-bottom px-4 rounded-lg py-1 hover:scale-105 hover:bg-blue-600'>
                                                <a href={link}>Download</a></button>
                                        </div>
                                    </div>
                                )
                                    :
                                    (
                                        <p className='text-xl font-xl text-red-600 text-center'>{error}</p>
                                    )
                            )
                    }

                </div>
            </div>
        </div>
    )
}

export default Downloader