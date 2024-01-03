import React from 'react'

export const Search = ({search}) => {
  return (
    <div className="search-wrap">
   <div className="search">
      <input type="text" onChange={search} className="searchTerm" placeholder="What are you looking for ?" label="Pokemon" variant="standard" />

   </div>
</div>
  )
}
