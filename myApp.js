require('dotenv').config();

var mongoose = require('mongoose');

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

var Schema = mongoose.Schema;

var PersonSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
})

// someModel
let Person = mongoose.model('Person', PersonSchema);

var arrayOfPeople = [
  {
    name: 'awesome1',
    age: 11,
    favoriteFoods: ['Apple', 'Banana']
  }, {
    name: 'awesome2',
    age: 12,
    favoriteFoods: ['Orange', 'Banana']
  }
];

const createAndSavePerson = (done) => {
  var document = new Person(arrayOfPeople[0]);

  document.save((err, data) => {
    if (err) return handleError(err);
    done(null, data);
  });

};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return handleError(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return handleError(err);
    done(null, data);
  })

};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return handleError(err);
    done(null, data);
  })

};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return handleError(err);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, data) => {
    if (err) return handleError(err);
    data.favoriteFoods.push(foodToAdd);
    data.save((err, moredata) => {
      if (err) return handleError(err);
      done(null, moredata);
    });
  })

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, data) => {
    if (err) return handleError(err);
    done(null, data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return handleError(err);
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  let d = Person.remove({ name: nameToRemove }, (err, data) => {
    if (err) return handleError(err);
    console.log("data", data);
    { // workaround because i have a latest version of moogose
      data.ok = true;
      data.n = data.deletedCount;
    }
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort('name')
    .limit(2)
    .select("name favoriteFoods")
    .exec((err, data) => {
      if (err) return handleError(err);
      done(null, data);
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
