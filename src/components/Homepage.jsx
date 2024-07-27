import React from "react";
import dayjs from "dayjs";
import { fetchAllDetails } from "../services/ApiCall";

function Homepage() {
    const [Wellness, setWellness] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(1);
    const [filter, setFilter] = React.useState("");
    const [search, setSearch] = React.useState("");
    const [date, setDate] = React.useState("");

    const fetchRetreats = React.useCallback(async (page) => {
        if (page < 1) return;
        setCurrentPage(page);
        setLoading(true);
        try {
            const data = await fetchAllDetails({ page, filter, search, date });
            setWellness(data);
            setError(null);
            setTotalPage(data.length);
        } catch (err) {
            setError("Unable to fetch details");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [filter, search, date]);

    React.useEffect(() => {
        (async () => {
            await fetchRetreats(currentPage);
        })();
    }, [currentPage, fetchRetreats]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1); // Reset to the first page when filter changes
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reset to the first page when search changes
    };

    const handleDateChange = (e) => {
        const selectedDate = new Date(e.target.value).getTime() / 1000; // Convert to Unix timestamp
        setDate(selectedDate);
        setCurrentPage(1); // Reset to the first page when date changes
    };

    const handleClearSearch = () => {
        try {
            setFilter(""); // Reset the value to the initial value
            setSearch("");
            setDate("");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="bg-white">
            <header className="w-full h-full">
                <h2 className="min-h-10 bg-[#1b3252] text-white font-medium text-xl px-6 py-3">Wellness Retreats</h2>
            </header>
            <div className="w-full md:flex items-center justify-between relative gap-4 px-6 py-3">
                <div className="md:flex gap-3">
                    <label htmlFor="date" className="sr-only">Filter by Date</label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        className="md:bg-[#1b3252] bg-[#efefef] px-3 py-2 md:font-medium md:text-white text-gray-700 md:rounded-lg block w-full md:my-0 my-2 md:border-[0px] border border-gray-300"
                        onChange={handleDateChange}
                    />
                    <label htmlFor="type" className="sr-only">Filter by Type</label>
                    <select
                        name="Type"
                        id="type"
                        className="md:bg-[#1b3252] bg-[#efefef] px-3 py-2 md:font-medium md:text-white text-gray-700 md:rounded-lg block w-full md:my-0 my-2 md:border-[0px] border border-gray-300"
                        value={filter}
                        onChange={handleFilterChange}
                    >
                        <option value="">Filter by Type</option>
                        <option value="Yoga">Yoga</option>
                        <option value="Meditation">Meditation</option>
                        <option value="Detox">Detox</option>
                    </select>
                </div>
                <label htmlFor="title" className="sr-only">Search retreats by title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Search retreats by title"
                    className="md:bg-[#1b3252] bg-white text-white px-3 py-2 md:font-medium font-normal md:placeholder-white placeholder-gray-700 md:rounded-lg block w-full md:my-0 my-2 md:border-[0px] border border-gray-300 outline-none lg:max-w-[500px] md:max-w-[300px]"
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>
            <main className="px-6 py-3">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && Wellness.length === 0 && (
                    <div className="flex flex-col justify-center items-center">
                        <p className="py-2 text-2xl font-medium">No results found</p>
                        <button className="bg-[#1b3252] px-6 py-2 font-medium text-white rounded-lg" onClick={handleClearSearch}>Clear Search</button>
                    </div>)}
                <div className="flex flex-wrap justify-between items-center">
                    {Wellness.map((data) => (
                        <div className="lg:w-[500px] lg:min-h-[400px] w-[350px] bg-[#e0d9cf] p-4 rounded-lg m-1 flex flex-col gap-2" key={data.id}>
                            <img src={data.image} alt={data.title} className="w-[200px] h-[180px] object-cover rounded-lg" />
                            <h2 className="lg:text-xl text-lg font-medium">{data.title}</h2>
                            <p className="lg:text-base text-sm">{data.description}</p>
                            <p className="md:text-base text-sm">Date: {dayjs.unix(data.date).format("DD-MM, YYYY")}</p>
                            <p className="md:text-base text-sm">Location: {data.location}</p>
                            <p className="md:text-base text-sm">Price: ${data.price}</p>
                        </div>
                    ))}
                </div>
                {
                    !loading && !error && Wellness.length > 0 && (
                        <div className="w-full flex justify-center items-center gap-4 my-10">
                            <button className={`bg-[#1b3252] px-6 py-2 font-medium text-white rounded-lg ${currentPage === 1 ? "cursor-not-allowed" : ""}`}
                                onClick={() => { fetchRetreats(currentPage - 1) }} disabled={currentPage === 1 || loading}>Previous</button>
                            <button className={`bg-[#1b3252] px-6 py-2 font-medium text-white rounded-lg ${totalPage < 3 ? "cursor-not-allowed" : ""}`}
                                onClick={() => { fetchRetreats(currentPage + 1) }} disabled={totalPage < 3 || loading} >Next</button>
                        </div>
                    )
                }
            </main >
        </div >
    );
}

export default Homepage;
