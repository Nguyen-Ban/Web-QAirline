import { useState, useEffect } from "react";
import axios from "axios";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const noticesPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users/posts');
        setNotices(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const categories = ['All', ...new Set(notices.map(notice => notice.category))];

  const filteredNotices = selectedCategory === 'All'
    ? notices
    : notices.filter(notice => notice.category === selectedCategory);

  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);
  
  const currentNotices = filteredNotices.slice(
    (currentPage - 1) * noticesPerPage,
    currentPage * noticesPerPage
  );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setSelectedNotice(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedNotice(null);
  };

  const handleNoticeClick = (notice) => {
    setSelectedNotice(notice);
  };

  return (
    <div className="noticePage">
      <h1 className="noticeTitle">Notices</h1>
      <br />
      <br/>
      <div className="categoryFilter">
        {categories.map(category => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <p className="noticeCount">All: ({notices.length})</p>

      {selectedNotice ? (
        <div className="noticeDetail">
          <h2>{selectedNotice.title}</h2>
          <p className="noticeCategory">Category: {selectedNotice.category}</p>
          <p>{selectedNotice.detail}</p>
          <p className="noticeDate">
            <strong>Date:</strong> {new Date(selectedNotice.createdAt).toLocaleDateString()}
          </p>
          <button onClick={() => setSelectedNotice(null)}>Back to List</button>
        </div>
      ) : (
        <div className="noticeList">
          {currentNotices.map((notice) => (
            <div
              key={notice.postid}
              className="noticeItem"
              onClick={() => handleNoticeClick(notice)}
            >
              <h3>{notice.title}</h3>
              <p className="noticeCategory">Category: {notice.category}</p>
              <p>{notice.description.slice(0, 300)}...</p>
              <p className="noticeDate">
                {new Date(notice.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Notice;