const Url = require('../models/Url');
const { nanoid } = require('nanoid');

const baseUrl = 'http://localhost:9000';

exports.shortenUrl = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  try {
    // check if it already exists in DB
    let existing = await Url.findOne({ originalUrl: url });
    if (existing) {
      return res.status(200).json(existing);
    }

    const shortId = nanoid(8); // 8-char unique ID
    const shortUrl = `${baseUrl}/${shortId}`;

    const newUrl = new Url({
      originalUrl: url,
      shortId: shortId,
      shortUrl: shortUrl
    });

    await newUrl.save();

    res.status(201).json(newUrl);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.redirectUrl = async (req, res) => {
  const { shortId } = req.params;

  try {
    const urlEntry = await Url.findOne({ shortId });

    if (!urlEntry) {
      return res.status(404).json({ message: 'Short URL not found' });
    }

    // Increment access count and update timestamp
    urlEntry.accessCount += 1;
    urlEntry.updatedAt = new Date();
    await urlEntry.save();

    return res.redirect(urlEntry.originalUrl);
  } catch (err) {
    console.error('Error during redirection:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
