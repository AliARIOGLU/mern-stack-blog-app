/* eslint-disable */

import { useEffect, useState } from "react";
import { Button, Select, TextInput } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useGetPosts } from "../lib/queries";
import { PostCard } from "../components/PostCard";
import { LoadingArea } from "../components/LoadingArea";

const LIMIT = 9;

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });

  const [page, setPage] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();

  const query = location.search.slice(location.search.indexOf("?") + 1);

  const {
    data: searchedPosts,
    isSuccess,
    isLoading,
  } = useGetPosts(query, page);

  const showMore = searchedPosts?.posts.length === page * LIMIT;

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }

    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("order", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    setPage((page) => page + 1);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("order");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }
  }, [location.search]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-b-0 md:border-r md:min-h-screen border-gray-500">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label
              className="whitespace-nowrap font-semibold"
              htmlFor="searchTerm"
            >
              Search Term:
            </label>
            <TextInput
              type="text"
              placeholder="Search..."
              id="searchTerm"
              value={sidebarData.searchTerm || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold" htmlFor="sort">
              Sort:
            </label>
            <Select
              id="sort"
              onChange={handleChange}
              value={sidebarData.sort || "desc"}
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label
              className="whitespace-nowrap font-semibold"
              htmlFor="category"
            >
              Category:
            </label>
            <Select
              id="category"
              onChange={handleChange}
              value={sidebarData.category || "uncategorized"}
            >
              <option value="uncategorized">uncategorized</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">Javascript</option>
            </Select>
          </div>
          <Button type="submit" gradientDuoTone="purpleToPink" outline>
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
          Posts result:
        </h1>
        {isLoading && <LoadingArea />}
        <div className="p-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchedPosts?.posts?.length === 0 && (
            <p className="text-xl text-gray-500">No post found!</p>
          )}
          {isSuccess &&
            searchedPosts.posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
