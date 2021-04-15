const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    let myRecipe = {
      title: "Dulce de leche",
      level: "Easy Peasy",
      ingredients: ["condensed milk", "water"],
      cuisine: "Argentinian",
      dishType: "dessert",
      image:  "https://upload.wikimedia.org/wikipedia/commons/5/5a/DulceDeLeche.jpg",
      duration: 480,
      creator: "Chef Franco",
    }
     return Recipe.create(myRecipe)
     
    /*Recipe.create(data)
    .then(()=>{
      console.log("working")
    })

    .catch(()=>{

    })*/
  
  })

    .then(()=>{
    return Recipe.insertMany(data)
    
    })
  
   .then((addRecipes) => {
    addRecipes.forEach(e => console.log(e.title) ) 
    return Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
    
    
    })

    .then(()=>{
      return Recipe.deleteOne({title: "Carrot Cake"})
      
    })

    .then(()=>{
      mongoose.connection.close()
    })
    


  .catch(error => {
    console.error('Error connecting to the database', error);
  });
