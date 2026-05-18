import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import VideoGrid from "../components/video/VideoGrid";
import {
    searchVideos,
    getAllVideos
} from "../api/videoApi";


function Home() {

    const [searchQuery, setSearchQuery] = useState("");
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchVideos = async () => {
            try {

                const data = await getAllVideos();

                setVideos(
                    Array.isArray(data)
                        ? data
                        : data.videos || data.data?.docs || []
                );

            } catch (error) {
                console.log(error);
            } finally {

                setLoading(false);

            }
        };

        fetchVideos();

    }, []);


    const handleSearch = async () => {

        try {
            setLoading(true);
            const data = await searchVideos(searchQuery);
            setVideos(data.data);

        } catch (error) {
            console.log(error);
        } finally {

            setLoading(false);

        }
    };


    return (

        <MainLayout
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
        >

            <VideoGrid
                videos={videos}
                loading={loading}
            />

        </MainLayout>

    );
}

export default Home;