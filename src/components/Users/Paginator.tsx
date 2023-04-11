import React, { useState } from 'react';
import styles from './Users.module.css';
type PropsType = {
  onPageChanged: (pageNumber: number) => void;
  currentPage: number;
  totalUsersCount: number;
  pageSize: number;
  portionSize?: number;
};
let Paginator: React.FC<PropsType> = ({ onPageChanged, currentPage, totalUsersCount, pageSize, portionSize = 10 }) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rigthPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={styles.paginator}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          Prev
        </button>
      )}
      {pages
        .filter((page) => page >= leftPortionPageNumber && page <= rigthPortionPageNumber)
        .map((page) => (
          <span
            className={currentPage === page && styles.selectedPage}
            style={{ margin: 3 }}
            key={page}
            onClick={() => {
              onPageChanged(page);
            }}
          >
            {page}
          </span>
        ))}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Paginator;
