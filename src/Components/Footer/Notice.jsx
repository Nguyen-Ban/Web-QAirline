import  { useState } from "react";


const Notice = () => {
  // 임의의 공지 데이터 생성 (30개)
  const notices = Array.from({ length: 28 }, (_, index) => ({
    id: index + 1,
    title: `Notice Title ${index + 1}`,
    content: `Notice Content ${index + 1} testtesttesttesttesttesttesttesttestvtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestvtesttesttesttesttesttesttesttesttesttestvtesttesttesttestvtesttesttesttesttestvtesttesttesttesttesttesttesttesttesttesttesttestvtesttesttesttesttesttesttest`,
    date: `2024-11-${String(index % 30 + 1).padStart(2, "0")}`,
  }));

  // 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const noticesPerPage = 10; 
  const totalPages = Math.ceil(notices.length / noticesPerPage);

  // 현재 페이지에 표시할 공지 목록 계산
  const currentNotices = notices.slice(
    (currentPage - 1) * noticesPerPage,
    currentPage * noticesPerPage
  );

  // 페이지 변경 함수
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedNotice(null); // 선택된 공지 초기화
  };

  // 공지 클릭 핸들러
  const handleNoticeClick = (notice) => {
    setSelectedNotice(notice);
  };

  return (
    <div className="noticePage">
      <h1 className="noticeTitle">Notices</h1>
      <br/>
      <p className="noticeCount">All: ({notices.length})</p>

      {/* 공지 목록 표시 */}
      {selectedNotice ? (
        <div className="noticeDetail">
          <h2>{selectedNotice.title}</h2>
          <p>{selectedNotice.content}</p>
          <p className="noticeDate"><strong>Date:</strong> {selectedNotice.date}</p>
          <button onClick={() => setSelectedNotice(null)}>Back to List</button>
        </div>
      ) : (
        <div className="noticeList">
          {currentNotices.map((notice) => (
            <div
              key={notice.id}
              className="noticeItem"
              onClick={() => handleNoticeClick(notice)}
            >
              <h3>{notice.title}</h3>
              <p>
                {notice.content.slice(0, 300)}...   {/* 미리보기 300글자 */}
              </p>
              <p className="noticeDate">{notice.date}</p>
            </div>
          ))}
        </div>
      )}

      {/* 페이지네이션 */}
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
