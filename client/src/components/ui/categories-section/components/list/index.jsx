import React from 'react'

const List = ({categories ,setSelectedCategory,selectedCategory}) => {
    return (
        <div className="overflow-x-auto p-4">
          {/* Scrollable List */}
          <ul className="flex space-x-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <li
                 onClick={() => setSelectedCategory(category.name)}
                  key={index}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full cursor-pointer transition-all duration-200  hover:scale-105 ${
                    selectedCategory === category.name
                      ? "bg-blue-500 text-white hover:bg-blue-700"
                      : "bg-blue-100 text-blue-500 hover:bg-blue-200"
                  }`}
                >
                  {/* Icon */}
                  <Icon className="h-5 w-5" />
                  {/* Category Name */}
                  <span className="capitalize text-sm font-medium block text-nowrap">{category.name}</span>
                </li>
              );
            })}
          </ul>
    
          {/* Custom Scrollbar Styling */}
          <style>
            {`
              ::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
        </div>
      );
}

export default List