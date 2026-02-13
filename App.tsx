
import React, { useState, useCallback } from 'react';
import { Button } from './components/Button';
import { ResultCard } from './components/ResultCard';
import { GeneratorInputs, Tone } from './types';
import { generateLinkedInUpdates } from './services/geminiService';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<GeneratorInputs>({
    project: '',
    tools: '',
    role: 'Software Engineering Intern',
    company: '',
    tone: Tone.DIRECT
  });
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.project) return;
    
    setLoading(true);
    setError(null);
    try {
      const variations = await generateLinkedInUpdates(inputs);
      setResults(variations);
      // Scroll to results on mobile
      window.scrollTo({ top: document.getElementById('results-section')?.offsetTop, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">InternLink</h1>
          </div>
          <div className="hidden sm:block text-sm text-gray-500 font-medium">
            Professional Intern Presence • Powered by Gemini
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left Column: Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 sticky top-24">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Build Your Update</h2>
                <p className="text-gray-500 text-sm">Turn your daily wins into high-impact LinkedIn posts without the cringe.</p>
              </div>

              <form onSubmit={handleGenerate} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Project / Task Done</label>
                  <textarea 
                    name="project"
                    value={inputs.project}
                    onChange={handleInputChange}
                    placeholder="e.g. Set up a new automated testing pipeline for the authentication module..."
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-none text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                    <input 
                      type="text"
                      name="role"
                      value={inputs.role}
                      onChange={handleInputChange}
                      placeholder="e.g. SWE Intern"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                    <input 
                      type="text"
                      name="company"
                      value={inputs.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Acme Corp"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tools / Tech Used</label>
                  <input 
                    type="text"
                    name="tools"
                    value={inputs.tools}
                    onChange={handleInputChange}
                    placeholder="e.g. React, Jest, CI/CD"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Post Tone</label>
                  <select 
                    name="tone"
                    value={inputs.tone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm appearance-none"
                  >
                    {Object.values(Tone).map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-4 text-lg" 
                  isLoading={loading}
                >
                  Generate Posts
                </Button>
              </form>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7 space-y-6" id="results-section">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse bg-white border border-gray-200 rounded-xl p-8 h-48 flex flex-col justify-between">
                    <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-100 rounded w-full"></div>
                      <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-100 rounded w-4/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Generated Variations</h3>
                  <span className="text-xs text-gray-500">Choose the one that fits your vibe</span>
                </div>
                {results.map((text, idx) => (
                  <ResultCard key={idx} text={text} index={idx} />
                ))}
                
                <div className="bg-blue-600 rounded-2xl p-8 text-white flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2zm4 8h-2v-4h2v4zm0-6h-2V7h2v2z"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Pro Tip</h4>
                    <p className="text-blue-100 text-sm max-w-md">
                      Don't forget to tag your mentor or team leads! It shows appreciation and increases the reach of your post naturally.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center px-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-gray-300">
                   <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to shine?</h3>
                <p className="text-gray-500 max-w-xs mx-auto">
                  Fill out the form on the left with what you worked on today, and we'll handle the professional polish.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-gray-200 py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} InternLink. Build your brand, one task at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
