
import React, { useState } from 'react';

interface ResultCardProps {
  text: string;
  index: number;
}

export const ResultCard: React.FC<ResultCardProps> = ({ text, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
          Option {index + 1}
        </span>
        <button 
          onClick={handleCopy}
          className="text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-1 text-sm font-medium"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
              Copy
            </>
          )}
        </button>
      </div>
      <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm md:text-base">
        {text}
      </p>
    </div>
  );
};
