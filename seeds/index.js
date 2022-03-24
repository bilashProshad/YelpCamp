const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Database connected');
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '6224d1d981655dd383160d83',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: { type: 'Point', coordinates: [cities[random1000].longitude, cities[random1000].latitude] },
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat odit eveniet magni distinctio excepturi quisquam, consequuntur mollitia fugit, reprehenderit repudiandae sint nemo repellendus quas hic, nulla accusantium voluptatem debitis dolorum.',
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/dr6a6soie/image/upload/v1647544288/YelpCamp/knscxhosqbvfc080ktyi.png',
          filename: 'YelpCamp/knscxhosqbvfc080ktyi',
        },
        {
          url: 'https://res.cloudinary.com/dr6a6soie/image/upload/v1647544299/YelpCamp/fg15dlyysgenqwk5jayb.png',
          filename: 'YelpCamp/fg15dlyysgenqwk5jayb',
        },
        {
          url: 'https://res.cloudinary.com/dr6a6soie/image/upload/v1647544315/YelpCamp/ky6dtt9osuoknep7axbd.png',
          filename: 'YelpCamp/ky6dtt9osuoknep7axbd',
        },
        {
          url: 'https://res.cloudinary.com/dr6a6soie/image/upload/v1647544311/YelpCamp/jusl4rkctk0arsgragm6.png',
          filename: 'YelpCamp/jusl4rkctk0arsgragm6',
        }
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
  console.log('Connection close');
})

// console.log(cities[0].city);