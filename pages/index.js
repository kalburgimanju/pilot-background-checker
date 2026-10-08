import Head from 'next/head';
import { useState } from 'react';
import VerificationForm from '../components/VerificationForm';
import VerificationResults from '../components/VerificationResults';

export default function Home() {
  const [candidateData, setCandidateData] = useState(null);
  const [verificationResults, setVerificationResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    setCandidateData(data);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would call a backend API
    // For this prototype, we'll generate mock results
    const mockResults = generateMockResults(data);
    setVerificationResults(mockResults);
    setLoading(false);
  };

  const generateMockResults = (data) => {
    // This is where real verification would happen
    // For demo purposes, we'll return mock data
    
    // Randomly determine if there are issues (for demo)
    const hasCriminalRecord = Math.random() > 0.7;
    const hasTerroristLinks = Math.random() > 0.95;
    const employmentVerified = Math.random() > 0.2;
    
    return {
      identity: {
        verified: true,
        name: `${data.firstName} ${data.lastName}`,
        dateOfBirth: data.dateOfBirth,
        ssnLast4: '****-***-' + data.ssn?.slice(-4) || '****-***-1234',
        sources: [
          {
            type: 'Government ID',
            url: 'https://example.gov/id-verification',
            description: 'Social Security Administration verification'
          }
        ]
      },
      employment: {
        verified: employmentVerified,
        history: [
          {
            company: 'SkyHigh Airlines',
            position: 'First Officer',
            startDate: '2020-03',
            endDate: 'Present',
            verified: true,
            source: 'https://example.com/employment-verification'
          },
          {
            company: 'CloudJet Airways',
            position: 'Second Officer',
            startDate: '2018-06',
            endDate: '2020-02',
            verified: true,
            source: 'https://example.com/employment-verification'
          }
        ],
        sources: [
          {
            type: 'Employment Database',
            url: 'https://example.com/employment-db',
            description: 'Professional pilot employment verification'
          }
        ]
      },
      criminalRecord: {
        found: hasCriminalRecord,
        details: hasCriminalRecord ? [
          {
            offense: 'DUI',
            date: '2019-05-15',
            jurisdiction: 'California',
            disposition: 'Completed diversion program',
            source: 'https://example.com/criminal-record'
          }
        ] : [],
        sources: [
          {
            type: 'National Criminal Database',
            url: 'https://example.com/ncic',
            description: 'National Crime Information Center check'
          },
          {
            type: 'State Police Records',
            url: 'https://example.com/state-police',
            description: 'State-level criminal history check'
          }
        ]
      },
      terroristWatchlist: {
        found: hasTerroristLinks,
        details: hasTerroristLinks ? [
          {
            list: 'No Fly List',
            reason: 'Suspected ties to extremist organization',
            source: 'https://example.com/watchlist'
          }
        ] : [],
        sources: [
          {
            type: 'Terrorist Screening Database',
            url: 'https://example.com/tsdc',
            description: 'Terrorist Screening Center check'
          },
          {
            type: 'OFAC Sanctions List',
            url: 'https://example.com/ofac',
            description: 'Office of Foreign Assets Control check'
          }
        ]
      },
      education: {
        verified: true,
        degrees: [
          {
            institution: 'Embry-Riddle Aeronautical University',
            degree: 'B.S. in Aeronautical Science',
            graduationYear: '2018',
            verified: true,
            source: 'https://example.com/education-verification'
          }
        ],
        sources: [
          {
            type: 'National Student Clearinghouse',
            url: 'https://example.com/nshe',
            description: 'Education verification service'
          }
        ]
      },
      licenses: {
        verified: true,
        certifications: [
          {
            type: 'FAA Commercial Pilot License',
            number: 'CP1234567',
            expiryDate: '2025-12-31',
            verified: true,
            source: 'https://example.com/faa-license'
          },
          {
            type: 'FAA Instrument Rating',
            number: 'IR1234567',
            expiryDate: '2025-12-31',
            verified: true,
            source: 'https://example.com/faa-instrument'
          },
          {
            type: 'FAA Multi-Engine Rating',
            number: 'ME1234567',
            expiryDate: '2025-12-31',
            verified: true,
            source: 'https://example.com/faa-multiengine'
          }
        ],
        sources: [
          {
            type: 'FAA Airmen Certification',
            url: 'https://example.com/faa-airmen',
            description: 'Federal Aviation Administration license verification'
          }
        ]
      },
      recommendation: !hasCriminalRecord && !hasTerroristLinks ? 
        'PROCEED WITH INTERVIEW' : 
        'DO NOT PROCEED - POTENTIAL RISK IDENTIFIED',
      recommendationReason: !hasCriminalRecord && !hasTerroristLinks ? 
        'No criminal background or terrorist activity detected in available records.' :
        hasTerroristLinks ? 
          'Individual appears on terrorist watchlist.' :
          'Individual has criminal record that may pose risk.',
      timestamp: new Date().toISOString()
    };
  };

  return (
    <div className="container">
      <Head>
        <title>Pilot Background Verification System</title>
      </Head>
      
      <h1>Pilot Background Verification System</h1>
      <p className="mb-4">Enter candidate information to verify background and employment history.</p>
      
      {!candidateData && !loading ? (
        <VerificationForm onSubmit={handleSubmit} />
      ) : (
        <>
          <h2>Verification Results for {candidateData?.firstName} {candidateData?.lastName}</h2>
          <VerificationResults 
            results={verificationResults} 
            loading={loading}
            onReset={() => {
              setCandidateData(null);
              setVerificationResults(null);
            }}
          />
        </>
      )}
    </div>
  );
}