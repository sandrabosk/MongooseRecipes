const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp1')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  const recipeSchema = new Schema({
    title:        { type: String, required: true, unique: true },
    level:        { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
    ingredients:  { type: Array },
    cousine:      { type: String, required: true },
    dishType:     { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
    image:        { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration:     { type: Number, min: 0 },
    creator:      { type: String },
    created:      { type: Date, default: Date.now }
  });

  const Recipe = mongoose.model('Recipe', recipeSchema);


  const newRecipe = new Recipe({
    title: "New title",
    level: 'Easy Peasy',
    ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
    cousine: 'Asian',
    dishType: ['Dish'],
    image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    duration: 40,
    creator: 'Chef Sandra'
  })

  newRecipe.save((err)=> {
    if(err){
      console.log(err);
    } else {
      // console.log("New recipe created", newRecipe)
    }
  })


  Recipe.insertMany(data)
  .then(()=> {
    data.forEach(oneData => {
      console.log("Inputted data: ",oneData.title )
    })
  })
  .catch(theErr => {
    console.log("Error while inserting data: ", theErr)
  })

  Recipe.update({title: 'Rigatoni alla Genovese1'}, {duration: 100})
  .then(()=> {
    console.log("Update successfully done!")
  })
  .catch(err => {console.log(err)})


  Recipe.deleteOne({title: 'Carrot Cake1'})
  .then(()=> {
    console.log("Carrot cake deleted.")
  })
  .catch(err => { console.log(err) })

  setTimeout(() => {
    mongoose.disconnect();
    console.log("DB disconnected.")
  }, 3000)