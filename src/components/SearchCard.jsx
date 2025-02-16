import React from 'react';

export const SearchCard = ({filteredResults}) => {

  return (
    <div className="absolute top-full left-3 sm:left-10 bg-white shadow-lg z-20 w-[15rem] p-2">
         <ul>
             {
             filteredResults.map((item, index) => (
                    <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                      {item.name}
                    </li>
                ))
              }
           </ul>
    </div>
  );
};