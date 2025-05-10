import MainPage from "../pages/MainPage.tsx";
import type { MainPageInterface } from "../types/types.ts"
import {useEffect, useState} from "react";
import {getMainContent} from "../helpers/getMainContent.ts";
import LoadingSpinner from "../components/loading&messages/LoadingSpinner.tsx";
import Error from "../components/loading&messages/Error.tsx";


const MainPageService = () => {

    const [mainPage, setMainPage] = useState<MainPageInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        fetchMainPage()
    },[])

    const fetchMainPage = async () => {
        await getMainContent(setLoading,`${import.meta.env.VITE_BASE_URL}/main/${1}`,setError,setMainPage)
    }

    if (loading) {
        return <LoadingSpinner/>;
    }

    return (
        <>
            {error && <Error error={error} setError={setError} />}
            <MainPage
                      {...mainPage}/>
        </>
    )
}
export default MainPageService