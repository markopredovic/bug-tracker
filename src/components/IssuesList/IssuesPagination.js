import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

const IssuesPagination = ({ total, perPage, active, fetchPageData }) => {
  const handleClick = (pageNumber) => {
    fetchPageData(pageNumber);
  };

  const handlePrev = () => {
    handleClick(active - 1);
  };

  const handleNext = () => {
    handleClick(active + 1);
  };

  const handleFirst = () => {
    handleClick(1);
  };

  const handleLast = () => {
    handleClick(itemsCount);
  };

  const itemsCount =
    total % perPage === 0 ? total / perPage : Math.floor(total / perPage) + 1;

  const items = new Array(itemsCount).fill(null).map((item, index) => (
    <Pagination.Item
      key={index}
      active={index + 1 === active}
      onClick={() => handleClick(index + 1)}
    >
      {index + 1}
    </Pagination.Item>
  ));

  return (
    <Pagination>
      <Pagination.First onClick={handleFirst} disabled={active === 1} />
      <Pagination.Prev onClick={handlePrev} disabled={active === 1} />
      {items}
      <Pagination.Next onClick={handleNext} disabled={active === itemsCount} />
      <Pagination.Last onClick={handleLast} disabled={active === itemsCount} />
    </Pagination>
  );
};

export default IssuesPagination;
