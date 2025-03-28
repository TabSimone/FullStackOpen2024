const DataLoader = require('dataloader');
const Book = require('../models/book');

const batchBookCounts = async (authorIds) => {
  // 1. Esegui una SINGOLA query aggregata su MongoDB
  const results = await Book.aggregate([
    {
      $match: {
        author: { $in: authorIds } // Filtra solo i libri degli autori richiesti
      }
    },
    {
      $group: {
        _id: "$author",  // Raggruppa per autore
        count: { $sum: 1 } // Conta i libri
      }
    }
  ]);

  // 2. Mappa i risultati agli ID degli autori nell'ordine originale
  return authorIds.map(id => {
    const found = results.find(r => r._id.equals(id));
    return found ? found.count : 0;
  });
};

// Crea il loader
const bookCountLoader = new DataLoader(batchBookCounts);

module.exports = bookCountLoader;