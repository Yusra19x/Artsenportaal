const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = 'b1004139e9f8cf9555053f1c5b828a942eefaa72f8fc5513442f80db2848ccb8dfa53d3780deb01146f7e3ed786b59902a23ea96a714cb8d3237ac3feec8e5473cc0aa65f69be5a4370c233f5fa8bbadb7373842f2596b40acb51bab93904cee1d164aa16d1e33e2b340e3d64c5ea134cacbf9e662e65650bd2849ae24539bea';

async function createPatient() {
  try {
    console.log('Attempting to create Patient X...');

    // Check if the patient already exists
    const existingRes = await axios.get(`${STRAPI_URL}/api/patients?filters[name][$eq]=Patient%20X`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (existingRes.data.data && existingRes.data.data.length > 0) {
      console.log('Patient X already exists:', existingRes.data.data[0]);
      return existingRes.data.data[0];
    }

    // Create the patient
    const response = await axios.post(`${STRAPI_URL}/api/patients`, {
      data: {
        name: 'Patient X',
        publishedAt: new Date().toISOString()
      }
    }, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Created Patient X:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error creating patient:', error.response?.data || error.message);
    throw error;
  }
}

// Execute the function
createPatient()
  .then(patient => {
    console.log('Success! Patient data:', patient);
  })
  .catch(error => {
    console.error('Failed to create patient:', error);
  }); 