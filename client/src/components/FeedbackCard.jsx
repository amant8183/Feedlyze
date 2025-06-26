import React from 'react';

function FeedbackCard({ feedback }) {
  return (
    <div className="mt-8 shadow-xl rounded-2xl p-6 w-full max-w-2xl bg-[#f2ceb2] animate-fade-in-up">
      <div className="bg-[#f3ecea] p-5 rounded-lg border border-[#f2ceb2] shadow-inner">

        <p className="text-[#1d2b5a] text-lg leading-relaxed whitespace-pre-wrap">{feedback}</p>
      </div>
      
    </div>
  );
}

export default FeedbackCard;