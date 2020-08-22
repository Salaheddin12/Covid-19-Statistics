import React from "react";

const Search = ({ value, handleChange, handleSubmit }) => {
  const [InputValue, setValue] = React.useState("");
  return (
    <form
      className="form-inline"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(InputValue);
      }}
    >
      <input
        type="search"
        className="form-control mr-sm-2"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => {
          setValue(e.currentTarget.value);
          handleChange(e.currentTarget.value);
        }}
        value={value}
        style={{
          position: "absolute",
          top: 15,
          width: 150,
          right: 10,
          zIndex: 10,
        }}
      />
    </form>
  );
};

export default Search;
