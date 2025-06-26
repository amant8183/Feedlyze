import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

function HistoryDisplay({ onBack }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('https://ai-feedback-mldy.onrender.com/api/feedback/history');
        setHistory(res.data);
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('Failed to load history. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[200px]">
        <ClipLoader size={40} color={"#576490"} />
        <p className="ml-3 text-[#1d2b5a]">Loading history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-700 mt-4 p-4 bg-red-100 border border-red-300 rounded-xl">
        <p>{error}</p>
        <button onClick={onBack} className="mt-4 bg-[#576490] text-white px-4 py-2 rounded-lg hover:bg-[#4a567c]">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 bg-[#576490] text-white px-4 py-2 rounded-lg hover:bg-[#4a567c] transition-colors duration-200 flex items-center text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>

    

      {history.length === 0 ? (
        <p className="text-center text-[#1d2b5a] text-lg mt-8">No past submissions found.</p>
      ) : (
        <div className="mt-10 space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar pr-2">
          <h2 className="text-3xl font-bold text-[#1d2b5a] mt-20 mb-6 text-center">Past Feedback Submissions</h2>
          {history.map((entry) => (
            <div key={entry._id} className="bg-[#f3ecea] border border-[#f2ceb2] rounded-lg p-4 shadow-sm">
              <p className="text-[#1d2b5a] font-semibold mb-1">Your Input:</p>
              <p className="text-[#272130] text-base mb-2 whitespace-pre-wrap">{entry.user_input}</p>
              <p className="text-[#1d2b5a] font-semibold mb-1">AI Feedback:</p>
              <p className="text-[#272130] text-base whitespace-pre-wrap">{entry.feedback}</p>
              <p className="text-sm text-[#272130] text-opacity-70 mt-2 text-right">
                {new Date(entry.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryDisplay;