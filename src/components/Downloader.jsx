import React, { useState } from 'react'

const Downloader = () => {

    const [songUrl, setSongUrl] = useState("")  // used to update or give songUrl to the url... 
    const [link, setLink] = useState("")       // to get or extract the download link from the provided url and update the download link
    const [author, setAuthor] = useState("")  // to get or extract the author name from the provided url and update the author name i mean from "" this to "aniruth"
    const [songName, setSongName] = useState("") //as follows to update the songname
    const [error, setError] = useState("")   // if we face any error it update the error and shows to the user
    const [loading, setLoading] = useState(false)  // this is loading state to show the user the deatails while loading time show the this message[Loading...]

    const SongDownload = async () => {

        const isValidUrl = (input) => {
            // to check the provided url is a (url) or not
            // it check the url is a url like http//.... .com
            // it is a function that we can use this isValidUrl to any input fields. In here we have only one input field contain url state. 
            // so that's why we use this to prevent future error that may come by users
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
            // to check the provided url is a (valid url) or not
            // it check the url is wrong or right i mean url is work or not or spelling mistake's

            setSongUrl("") // if its not valid it clear the input field so thats we we update the state ("")
            return
        }

        // rapid api
        const url = `https://spotify-downloader9.p.rapidapi.com/downloadSong?songId=${songUrl}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '39b8474aaamsh2cb8522cb55abdfp1a5159jsnd7a02746c5cb',
                'x-rapidapi-host': 'spotify-downloader9.p.rapidapi.com'
            }
        };

        setLoading(true)  // while fetching the data, the load state update to true
        setLink("")  // while fetching the data, the link must be empty
        setAuthor("")  // as follows the setLink
        setSongName("") // as follows the setLink
        setError("")  // as follows the setLink because on the proccess there is no error after completion if we face it update by upcomming states

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            const songAuthor = result.data.artist
            const songname = result.data.album
            const downlodlink = result.data.downloadLink
            console.log(result.data);

            if (result.data) {
                // if data is there it follow the if block. and update the data to every state that respected filed state
                // like link contain it download link data
                // author contain its author name data
                // song contain songName
                setLink(downlodlink)
                setAuthor(songAuthor)
                setSongName(songname)
            }
            else {
                setError("There must be an error in link...")
                // if the url is wrong it set the error as contain the above
            }

        } catch (error) {
            console.error(error);
            setError("There must be an error try again later...")
            // if we can't fetch the data it gives error as mention above
        }
        finally {
            setLoading(false)  // after getting data successfully it update the loading state to false
            setSongUrl("")  // and clear the url
        }
    }
    function handleMusicLink(e) {
        setSongUrl(e.target.value)  // onChange event to update songUrl
    }

    return (
        <div className=''>
            <div className='my-32 flex flex-col gap-10 justify-center items-center'>
                {/* url contain input and button tags */}
                <div className='flex flex-col md:flex-row gap-4 items-center'>
                    <input
                        type="url"
                        value={songUrl}
                        onChange={handleMusicLink}
                        className='w-[310px] md:w-[450px] lg:w-[550px] h-8 md:h-10 rounded-lg p-2 outline-none border-none placeholder:text-sm'
                        placeholder='Give url to get song...' />
                    <button
                        onClick={SongDownload}
                        className={`rounded-lg h-8 md:h-10 text-lg font-semibold text-white transition-all px-2 md:w-32 ${loading || !songUrl.trim() ? "cursor-not-allowed bg-slate-700" : "bg-green-500 hover:bg-green-600 hover:scale-105"}`}
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
                            // if there is no data or the first entering stage
                        )
                    }
                    {
                        loading ? (
                            <p className='text-xl font-xl text-green-600 text-center'>Loading...</p>
                            // if loading time is true it show the Loading... messsage 
                        ) :
                            (
                                // if there is Download link, author, songName available it give the data
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
                                        // if there is any error or url wrong or our side error it shows that message
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