// const mongoose = require('mongoose');
// const MyConstants = require('./MyConstants');
// const uri = 'mongodb+srv://' + MyConstants.DB_USER + ':' + MyConstants.DB_PASS + '@' + MyConstants.DB_SERVER + '/' + MyConstants.DB_DATABASE;
// mongoose.connect(uri, { useNewUrlParser: true })
//   .then(() => { console.log('Connected to ' + MyConstants.DB_SERVER + '/' + MyConstants.DB_DATABASE); })
//   .catch((err) => { console.error(err); });

const mongoose = require('mongoose');
const MyConstants = require('./MyConstants'); // Import your constants file

// Create the MongoDB URI
// const mongoURI = `mongodb+srv://${MyConstants.DB_USER}:${MyConstants.DB_PASS}@${MyConstants.DB_SERVER}/${MyConstants.DB_DATABASE}`;
const mongoURI = `mongodb+srv://bulma1:FkJxuO0YwSHXu7or@cluster0.yyxne0z.mongodb.net/shoppingonline`;
// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
