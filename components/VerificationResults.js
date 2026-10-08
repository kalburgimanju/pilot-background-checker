const VerificationResults = ({ results, loading, onReset }) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <p>Verifying background...</p>
        <div className="animate-spin rounded-full border-4 border-blue-500 border-t-transparent h-12 w-12 mx-auto mt-4"></div>
      </div>
    );
  }

  if (!results) return null;

  const { identity, employment, criminalRecord, terroristWatchlist, education, licenses, recommendation, recommendationReason } = results;

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border-l-4 border-green-500 p-4">
        <h2 className="text-xl font-bold text-green-800 mb-2">Verification Complete</h2>
        <p className="text-green-700">{recommendation}</p>
        <p className="text-green-600 text-sm mt-1">{recommendationReason}</p>
      </div>
      
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <h3 className="font-bold mb-2">Identity Verification</h3>
          <p><strong>Name:</strong> {identity.verified ? identity.name : 'Verification Failed'}</p>
          <p><strong>Date of Birth:</strong> {identity.dateOfBirth}</p>
          <p><strong>SSN (last 4):</strong> {identity.ssnLast4}</p>
          
          <h4 className="font-medium mt-3">Sources:</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {identity.sources.map((source, index) => (
              <li key={index}>
                <strong>{source.type}:</strong> {source.description} 
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  [Link]
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-bold mb-2">Employment History</h3>
          <p><strong>Verified:</strong> {employment.verified ? 'Yes' : 'No'}</p>
          
          {employment.history.map((job, index) => (
            <div key={index} className="mb-3 p-3 bg-gray-50 rounded">
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Position:</strong> {job.position}</p>
              <p><strong>Dates:</strong> {job.startDate} - {job.endDate || 'Present'}</p>
              <p><strong>Verified:</strong> {job.verified ? 'Yes' : 'No'}</p>
              {job.source && (
                <p className="mt-1 text-sm">
                  Source: <a href={job.source} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">[Link]</a>
                </p>
              )}
            </div>
          ))}
          
          <h4 className="font-medium mt-3">Sources:</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {employment.sources.map((source, index) => (
              <li key={index}>
                <strong>{source.type}:</strong> {source.description} 
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  [Link]
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-bold mb-2">Criminal Record Check</h3>
          <p><strong>Record Found:</strong> {criminalRecord.found ? 'Yes' : 'No'}</p>
          
          {criminalRecord.found && criminalRecord.details.length > 0 && (
            <div className="mt-3">
              <h4 className="font-medium mb-2">Offenses:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {criminalRecord.details.map((offense, index) => (
                  <li key={index}>
                    <strong>{offense.offense}</strong> ({offense.date}) - {offense.jurisdiction}<br/>
                    <span className="text-sm">Disposition: {offense.disposition}</span>
                    {offense.source && (
                      <span className="ml-2 text-sm">
                        Source: <a href={offense.source} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">[Link]</a>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <h4 className="font-medium mt-3">Sources:</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {criminalRecord.sources.map((source, index) => (
              <li key={index}>
                <strong>{source.type}:</strong> {source.description} 
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  [Link]
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-bold mb-2">Terrorist Watchlist Check</h3>
          <p><strong>Watchlist Match:</strong> {terroristWatchlist.found ? 'Yes' : 'No'}</p>
          
          {terroristWatchlist.found && terroristWatchlist.details.length > 0 && (
            <div className="mt-3">
              <h4 className="font-medium mb-2">Matches:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {terroristWatchlist.details.map((match, index) => (
                  <li key={index}>
                    <strong>{match.list}</strong>: {match.reason}
                    {match.source && (
                      <span className="ml-2 text-sm">
                        Source: <a href={match.source} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">[Link]</a>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <h4 className="font-medium mt-3">Sources:</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {terroristWatchlist.sources.map((source, index) => (
              <li key={index}>
                <strong>{source.type}:</strong> {source.description} 
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  [Link]
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-bold mb-2">Education Verification</h3>
          <p><strong>Verified:</strong> {education.verified ? 'Yes' : 'No'}</p>
          
          {education.degrees.map((degree, index) => (
            <div key={index} className="mb-3 p-3 bg-gray-50 rounded">
              <p><strong>Institution:</strong> {degree.institution}</p>
              <p><strong>Degree:</strong> {degree.degree}</p>
              <p><strong>Graduation Year:</strong> {degree.graduationYear}</p>
              <p><strong>Verified:</strong> {degree.verified ? 'Yes' : 'No'}</p>
              {degree.source && (
                <p className="mt-1 text-sm">
                  Source: <a href={degree.source} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">[Link]</a>
                </p>
              )}
            </div>
          ))}
          
          <h4 className="font-medium mt-3">Sources:</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {education.sources.map((source, index) => (
              <li key={index}>
                <strong>{source.type}:</strong> {source.description} 
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  [Link]
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-bold mb-2">Licenses & Certifications</h3>
          <p><strong>Verified:</strong> {licenses.verified ? 'Yes' : 'No'}</p>
          
          {licenses.certifications.map((cert, index) => (
            <div key={index} className="mb-3 p-3 bg-gray-50 rounded">
              <p><strong>Type:</strong> {cert.type}</p>
              <p><strong>Number:</strong> {cert.number}</p>
              <p><strong>Expiry Date:</strong> {cert.expiryDate}</p>
              <p><strong>Verified:</strong> {cert.verified ? 'Yes' : 'No'}</p>
              {cert.source && (
                <p className="mt-1 text-sm">
                  Source: <a href={cert.source} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">[Link]</a>
                </p>
              )}
            </div>
          ))}
          
          <h4 className="font-medium mt-3">Sources:</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {licenses.sources.map((source, index) => (
              <li key={index}>
                <strong>{source.type}:</strong> {source.description} 
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  [Link]
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-6">
        <button 
          onClick={onReset}
          className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          Verify Another Candidate
        </button>
        
        <button 
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors ml-2"
        >
          Print Report
        </button>
      </div>
    </div>
  );
};

export default VerificationResults;