import React from "react";
import { Button, Input, Row } from "antd";
const { Search } = Input;

const SearchGame = ({
  getAllGamessFromServer,
  getAllGamessFromServerForSearch,
}) => {
  return (
    <div>
      <Search
        placeholder="Search Game By Name"
        onSearch={(e) => {
          console.log(e);
          e === ""
            ? getAllGamessFromServer()
            : getAllGamessFromServerForSearch(e);
        }}
        style={{
          width: 250,
          marginTop: 24,
        }}
        allowClear
      />
    </div>
  );
};

export default SearchGame;
