import { useState } from 'react';
import axios from 'axios';
import FeedbackCard from './components/FeedbackCard';
import HistoryDisplay from './components/HistoryDisplay'; 
import { ScaleLoader } from 'react-spinners'; 

function App() {
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showHistory, setShowHistory] = useState(false); 
  const [showFeedbackPanel, setShowFeedbackPanel] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(''); 
    setError(null);  
    setShowFeedbackPanel(true); 

    try {
      const res = await axios.post('https://ai-feedback-mldy.onrender.com/api/feedback', { input });
      setFeedback(res.data.feedback);
    } catch (err) {
      console.error('Error fetching feedback:', err);
      setError('Failed to get feedback. Please try again later.');
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error); 
      }
      setFeedback(''); 
    } finally {
      setLoading(false);
    }
  };

  const handleShowHistory = () => {
    setShowHistory(true); 
    setShowFeedbackPanel(false); 
    setInput('');        
    setFeedback('');     
    setError(null);      
  };

  const handleBackToApp = () => {
    setShowHistory(false); 
    setShowFeedbackPanel(false); 
  };

  return (
    <div className="min-h-screen bg-[#acc9c8] flex flex-col items-center p-4">
      <nav className="w-full bg-[#e0e1e0] shadow-md rounded-b-xl px-6 py-4 flex items-center justify-between fixed top-0 left-0 right-0 z-20">
        <div className="flex items-center">
          <button onClick={handleBackToApp}  className="text-2xl font-extrabold text-[#1d2b5a] tracking-tight">Feedlyze</button>
        </div>

        <button
            type="button"
            onClick={handleShowHistory}
            className="bg-[#576490] text-white font-semibold py-2 px-5 rounded-full hover:bg-[#4a567c] transition-colors duration-300 shadow-md text-sm"
        >
            View History
        </button>
      </nav>

      <h2 className="text-4xl sm:text-5xl font-extrabold text-center mt-20 z-10
                 bg-gradient-to-r from-[#fa6d57] to-[#576490] text-transparent bg-clip-text">
        Elevate Your Text. Get AI Feedback.
      </h2>

      <div className={`max-h-[75vh] h-[50vh]
        // mt-10 class removed from here, as the new heading adds spacing
        bg-[#e0e1e0] shadow-xl rounded-3xl p-6 sm:p-8 mx-auto flex
        ${showFeedbackPanel ? 'w-full max-w-7xl h-[80vh]' : 'w-full max-w-3xl'}
        transition-all duration-500 ease-in-out
        ${showFeedbackPanel ? 'items-start' : 'items-center justify-center flex-col'}
        relative overflow-hidden
      `}>
        {!showHistory ? (
          <>
            <div className={`
              ${showFeedbackPanel ? 'w-1/2 pr-6' : 'w-full'}
              transition-all duration-500 ease-in-out
              ${showFeedbackPanel ? 'transform translate-x-0' : ''}
              flex flex-col items-center
              ${showFeedbackPanel ? ' h-full justify-between' : ''}
            `}>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#1d2b5a] mb-8 text-center tracking-tight">
                Enter your text for AI feedback
              </h1>

              <form onSubmit={handleSubmit} className="w-full flex flex-col items-center flex-grow">
                <div className="relative w-full mb-4">
                  <textarea
                    className="w-full h-16 md:h-20 p-4 pr-4 rounded-2xl bg-[#f3ecea] border border-[#F4C4A0] focus:outline-none focus:ring-2 focus:ring-[#576490] focus:border-[#576490] text-lg placeholder-gray-600 resize-none font-medium"
                    placeholder="Type or paste your text here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#576490] text-white font-semibold py-3 rounded-xl hover:bg-[#4a567c] focus:outline-none focus:ring-2 focus:ring-[#576490] focus:ring-offset-2 transition-colors duration-300 shadow-md text-lg mt-2"
                  disabled={loading}
                >
                  {loading ? (
                    <ScaleLoader color="#fff" height={20} width={5} radius={2} margin={2} />
                  ) : (
                    'Generate Feedback'
                  )}
                </button>
              </form>

              {error && !showFeedbackPanel && (
                <div className="mt-6 w-full bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center text-md font-medium animate-fade-in">
                  {error}
                </div>
              )}

              {!loading && !feedback && !error && input === '' && !showFeedbackPanel && (
                  <div className="mt-6 w-full text-center text-gray-700 p-4">
                      AI-powered insights on your text.
                  </div>
              )}
            </div>

            <div className={`
              ${showFeedbackPanel ? 'w-1/2 pl-6 border-l-2 border-[#F4C4A0]' : 'w-0 overflow-hidden'}
              transition-all duration-500 ease-in-out
              ${showFeedbackPanel ? 'transform translate-x-0' : 'transform translate-x-full'}
              flex flex-col
              ${showFeedbackPanel ? 'h-full justify-between' : ''}
            `}>
              {loading && showFeedbackPanel && (
                <div className="flex flex-col items-center justify-center h-full text-gray-700">
                  <ScaleLoader color="#576490" height={35} width={6} radius={3} margin={3} /> 
                  <p className="mt-4 text-lg font-medium">Generating feedback...</p>
                </div>
              )}

              {error && showFeedbackPanel && (
                <div className="mt-6 w-full bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center text-md font-medium animate-fade-in">
                  {error}
                </div>
              )}

              {feedback && !error && showFeedbackPanel && (
                <div className="w-full h-full flex flex-col">
                    <h2 className="text-2xl font-semibold text-[#1d2b5a] mb-4 text-center">AI Feedback</h2>
                    <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                      <FeedbackCard feedback={feedback} />
                    </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <HistoryDisplay onBack={handleBackToApp} />
        )}
      </div>


    </div>
  );
}

export default App;