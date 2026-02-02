
function Search({typingCity, setTypingCity, onSearch, searchIcon }){
  return (
<div id="search-holder">
      <img id="search-img"src={searchIcon}></img>
      <input id="search-input" type="text" placeholder="Search for a place..."
     value={typingCity}
     onChange={(e=>setTypingCity(e.target.value))}
      
      ></input>
    <button id="search-btn"
    onClick={onSearch}
    >Search</button>
    </div>
    
)
}
export default Search