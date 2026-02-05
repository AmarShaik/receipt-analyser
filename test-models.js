const API_KEY = 'GOOGLE_API_KEY';

async function listModels() {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );
    
    if (!response.ok) {
      console.error('Error:', response.status, response.statusText);
      const error = await response.json();
      console.error(JSON.stringify(error, null, 2));
      return;
    }
    
    const data = await response.json();
    console.log('\n=== Available Gemini Models ===\n');
    
    if (data.models) {
      data.models.forEach(model => {
        console.log(`Model: ${model.name}`);
        console.log(`  Display Name: ${model.displayName || 'N/A'}`);
        console.log(`  Supported Methods: ${model.supportedGenerationMethods?.join(', ') || 'N/A'}`);
        console.log('');
      });
    } else {
      console.log('Full response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

listModels();
