import { useState } from 'react';

const VerificationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    ssn: '',
    employeeId: '',
    companyName: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.ssn || !/^\d{9}$/.test(formData.ssn.replace(/\D/g, ''))) 
      newErrors.ssn = 'Please enter a valid 9-digit SSN';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Clean SSN (remove dashes if present)
    const cleanSSN = formData.ssn.replace(/\D/g, '');
    
    onSubmit({
      ...formData,
      ssn: cleanSSN
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="firstName" className="block mb-1">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={`border rounded px-3 py-2 w-full ${errors.firstName ? 'border-red-500' : ''}`}
          placeholder="Enter first name"
        />
        {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
      </div>
      
      <div>
        <label htmlFor="lastName" className="block mb-1">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={`border rounded px-3 py-2 w-full ${errors.lastName ? 'border-red-500' : ''}`}
          placeholder="Enter last name"
        />
        {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
      </div>
      
      <div>
        <label htmlFor="dateOfBirth" className="block mb-1">Date of Birth</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className={`border rounded px-3 py-2 w-full ${errors.dateOfBirth ? 'border-red-500' : ''}`}
        />
        {errors.dateOfBirth && <p className="text-sm text-red-500 mt-1">{errors.dateOfBirth}</p>}
      </div>
      
      <div>
        <label htmlFor="ssn" className="block mb-1">Social Security Number (for verification)</label>
        <input
          type="text"
          id="ssn"
          name="ssn"
          value={formData.ssn}
          onChange={handleChange}
          className={`border rounded px-3 py-2 w-full ${errors.ssn ? 'border-red-500' : ''}`}
          placeholder="Enter 9-digit SSN (no dashes)"
        />
        {errors.ssn && <p className="text-sm text-red-500 mt-1">{errors.ssn}</p>}
      </div>
      
      <div>
        <label htmlFor="employeeId" className="block mb-1">Employee ID (if available)</label>
        <input
          type="text"
          id="employeeId"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
          placeholder="Enter employee ID"
        />
      </div>
      
      <div>
        <label htmlFor="companyName" className="block mb-1">Current Employer (for verification)</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
          placeholder="Enter current employer name"
        />
      </div>
      
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Verify Background
      </button>
    </form>
  );
};

export default VerificationForm;