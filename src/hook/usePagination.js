import { useState, useEffect } from 'react';
import axios from 'axios';

function usePagination(apiUrl = "https://api.fastcatalog.ai", initialLimit = 10) {
  const [entries, setEntries] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const offset = (currentPage - 1) * limit;
        const response = await axios.get(
          `${apiUrl}?limit=${limit}&offset=${offset}`
        );
        const data = response.data;

        setEntries(data.entries);
        setTotalCount(data.total_count);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [apiUrl, currentPage, limit]);

  const totalPages = Math.ceil(totalCount / limit);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return {
    displayData: entries,
    totalCount,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    setLimit,
    loading,
    error,
  };
}

export default usePagination;
