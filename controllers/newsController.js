const { getDiseaseInfo } = require('../utils/scraper');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 }); // Cache valid for 1 hour

exports.getNews = async (req, res) => {
  const disease = req.params.disease.toUpperCase();

  // Check if data is in cache
  const cachedData = cache.get(disease);
  if (cachedData) {
    console.log(`Cache hit for disease: ${disease}`);
    return res.status(200).json(cachedData);
  }

  try {
    console.time(`getDiseaseInfo-${disease}`);
    const data = await getDiseaseInfo(disease);
    console.timeEnd(`getDiseaseInfo-${disease}`);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'No news found' });
    }

    // Store data in cache
    cache.set(disease, data);

    return res.status(200).json(data);
  } catch (error) {
    console.error(`Error fetching news for disease ${disease}:`, error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
