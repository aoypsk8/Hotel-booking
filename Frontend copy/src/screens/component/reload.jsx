import React from 'react';
import { FiRefreshCcw } from 'react-icons/fi'; 

const ReloadButton = ({ onClick, loading }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center justify-center w-32 h-12 bg-btnn bg-opacity-25 rounded-lg
                text-black font-semibold
                ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={loading}
        >
            <FiRefreshCcw className={`text-xl mr-2 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Reloading...' : 'Reload'}</span>
        </button>
    );
};

export default ReloadButton;
