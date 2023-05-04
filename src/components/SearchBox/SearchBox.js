const SearchBox = ({ searchField, searchChange }) => {
  return (
    <div className="tc pa2">
      <input
        className="pa3 ba"
        type="search"
        placeholder="search employee"
        onChange={searchChange}
      />
    </div>
  );
};

export default SearchBox;
