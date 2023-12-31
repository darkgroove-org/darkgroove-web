import { useRef, useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
import { DataContext } from "@/context/DataContext";

import Image from 'next/image'

import styleSearch from '@/assets/styles/Search.module.css'

export default function SearchBar() {

    const router = useRouter();
    const { searchQuery } = router.query;
    const inputRef = useRef(null);

    const { closeNavbar } = useContext(DataContext);

    // const submitForm = async (e) => {
    //     e.preventDefault();
    //     const inputValue = inputRef.current.value;
    //     router.push(`/search/${inputValue}`);
    //     closeNavbar();
    // }

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // const fetchData = () => {
    //     setLoading(true);
    //     Promise.all([
    //         fetch(`/api/event/getEventsBySearch?searchQuery=${searchQuery}`)
    //             .then((response) => response.json())
    //             .then((data) => setEvents(data.events))
    //     ])
    //     .catch((error) => console.error(error))
    //     .finally(() => setLoading(false));
    // };


    // useEffect(() => {
    //     const isInSearchPage = router.pathname.includes('/search');
    //     if (isInSearchPage) {
    //         fetchData();
    //     }
    // }, [searchQuery, router]);

    return(
        <>
        <div className={styleSearch.searchBar}>
        {/* onSubmit={submitForm} */}
            <form action="" method="POST" className={styleSearch.searchInput + ' input-group'}>
                <input aria-describedby="searchBtn"
                    id='searchQuery'
                    type="search"
                    name='searchQuery'
                    ref={inputRef}
                    className={styleSearch.input + ' form-control'} 
                    placeholder="Search for an event"
                    required
                />
                <button id="searchBtn" type="submit">
                <Image
                    src="/icons/search.svg"
                    alt="Search icon"
                    width={40}
                    height={40}
                />
                </button>
            </form>
        </div>
        </>
    );

}