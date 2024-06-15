const Diseases = require('../models/diseases');

exports.getAllDiseases = async (req, res) => {
  try {
    const diseases = await Diseases.findAll();
    res.json(diseases);
  } catch (error) {
    console.error('Error fetching all diseases:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getDiseasesById = async (req, res) => {
  try {
    const diseases = await Diseases.findByPk(req.params.id);
    if (diseases) {
      res.json(diseases);
    } else {
      res.status(404).json({ error: 'Diseases not found' });
    }
  } catch (error) {
    console.error('Error fetching disease by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getDiseasesByIdName = async (req, res) => {
  try {
    const diseases = await Diseases.findAll({
      where: {
        id_name: req.params.id_name
      }
    });
    if (diseases.length > 0) {
      res.json(diseases);
    } else {
      res.status(404).json({ error: 'Diseases not found' });
    }
  } catch (error) {
    console.error('Error fetching diseases by id_name:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createDiseases = async (req, res) => {
  try {
    const { id_name, name, detail } = req.body;
    console.log('Request body:', req.body);
    const newDiseases = await Diseases.create({ id_name, name, detail });
    res.status(201).json(newDiseases);
  } catch (error) {
    console.error('Error creating disease:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
