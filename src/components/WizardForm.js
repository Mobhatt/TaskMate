import React, { useState } from 'react';
import './WizardForm.module.css'; // Import CSS file


const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
    'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
    'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
    'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
    'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
    'Fiji', 'Finland', 'France',
    'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
    'Haiti', 'Honduras', 'Hungary',
    'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast',
    'Jamaica', 'Japan', 'Jordan',
    'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
    'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
    'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
    'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway',
    'Oman',
    'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
    'Qatar',
    'Romania', 'Russia', 'Rwanda',
    'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
    'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
    'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay', 'Uzbekistan',
    'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
    'Yemen',
    'Zambia', 'Zimbabwe'
  ];

const WizardForm = () => {
  const totalSteps = 5; // Total number of steps
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    passportNumber: '',
    nationality: '',
    arrivalDate: '',
    purposeOfVisit: '',
    accommodationAddress: '',
    contactNumber: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    additionalField1: '',
    additionalField2: '',
    additionalField3: '',
    additionalField4: '',
    additionalField5: '',
    additionalField6: ''
  });
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState('');

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName) {
      errors.fullName = 'Full Name is required.';
    }
    // Add validation for other fields similarly
    return errors;
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear the error message when the field is changed
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleNext = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setCurrentStep(currentStep + 1);
    } else {
      // Display errors and prevent moving to the next step
      setErrors(errors);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Serialize form data to JSON
      const jsonData = JSON.stringify(formData);
      // Simulate API call (replace with actual API call)
      fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData
      })
      .then(response => response.json())
      .then(data => {
        // Handle API response
        console.log(data);
        setSubmissionStatus('Form submitted successfully!');
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle API error
      });
    } else {
      // Display errors if form submission is attempted with invalid data
      setErrors(errors);
    }
  };

  const progress = (currentStep / totalSteps) * 100;


  return (
    <div className="wizard-form-container">
      <h2>Flow for capturing a foreigner details who has just travelled into India 🇮🇳 and will be issued an Indian Visa for 30 days</h2>
      {currentStep === 1 && (
        <div>
          <h2>Step 1: Personal Information</h2>
          <div className="form-group">
            <label>Full Name:</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Passport Number:</label>
            <input type="text" name="passportNumber" value={formData.passportNumber} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Nationality:</label>
            <select name="nationality" value={formData.nationality} onChange={handleChange}>
              <option value="">Select Nationality</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      {currentStep === 2 && (
        <div>
          <h2>Step 2: Travel Information</h2>
          <div className="form-group">
            <label>Arrival Date:</label>
            <input type="date" name="arrivalDate" value={formData.arrivalDate} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Purpose of Visit:</label>
            <input type="text" name="purposeOfVisit" value={formData.purposeOfVisit} onChange={handleChange} />
          </div>
          <button onClick={handleNext}>Next</button>
          <button onClick={handleBack}>Back</button>
        </div>
      )}
      {currentStep === 3 && (
        <div>
          <h2>Step 3: Accommodation and Contact Information</h2>
          <div className="form-group">
            <label>Accommodation Address:</label>
            <input type="text" name="accommodationAddress" value={formData.accommodationAddress} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Contact Number:</label>
            <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Emergency Contact Name:</label>
            <input type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Emergency Contact Number:</label>
            <input type="text" name="emergencyContactNumber" value={formData.emergencyContactNumber} onChange={handleChange} />
          </div>
          <button onClick={handleNext}>Next</button>
          <button onClick={handleBack}>Back</button>
        </div>
      )}
      {currentStep === 4 && (
        <div>
          <h2>Step 4: Additional Information</h2>
          <div className="form-group">
            <label>Additional Field 1:</label>
            <input type="text" name="additionalField1" value={formData.additionalField1} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Additional Field 2:</label>
            <input type="text" name="additionalField2" value={formData.additionalField2} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Additional Field 3:</label>
            <input type="text" name="additionalField3" value={formData.additionalField3} onChange={handleChange} />
          </div>
          <button onClick={handleNext}>Next</button>
          <button onClick={handleBack}>Back</button>
        </div>
      )}
      {currentStep === 5 && (
        <div>
          <h2>Step 5: More Additional Information</h2>
          <div className="form-group">
            <label>Additional Field 4:</label>
            <input type="text" name="additionalField4" value={formData.additionalField4} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Additional Field 5:</label>
            <input type="text" name="additionalField5" value={formData.additionalField5} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Additional Field 6:</label>
            <input type="text" name="additionalField6" value={formData.additionalField6} onChange={handleChange} />
          </div>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleBack}>Back</button>
        </div>
      )}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      {submissionStatus && <p>{submissionStatus}</p>}
    </div>
  );
};

export default WizardForm;
