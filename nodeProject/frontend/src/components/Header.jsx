import React from 'react';

export default function Header({ toggleView, showForm }) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 w-full max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Product / Book Manager</h1>
      <div className="flex gap-2 w-full sm:w-auto">
        <button
          onClick={() => document.documentElement.classList.toggle('dark')}
          className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded w-full sm:w-auto"
        >
          Toggle Theme
        </button>
        <button
          onClick={toggleView}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          {showForm ? 'Show List' : 'Show Form'}
        </button>
      </div>
    </header>
  );
}
