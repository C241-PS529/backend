const { getDiseaseInfo } = require('../utils/scraper');

exports.getNews = async (req, res) => {
  const disease = req.params.disease;
  console.log(`Fetching news for disease: ${disease}`);

  try {
    const news = await getDiseaseInfo(disease);
    if (!news || news.length === 0) {
      return res.status(404).json({ error: 'No news found' });
    }
    res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
