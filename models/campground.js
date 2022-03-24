const mongoose = require('mongoose');
const { campgroundSchema } = require('../schemas');
const Schema = mongoose.Schema;
const Review = require('./review');

// https://res.cloudinary.com/dr6a6soie/image/upload/v1647584156/YelpCamp/ns6jygnrnz1do1oilz86.jpg
// https://res.cloudinary.com/dr6a6soie/image/upload/w_300/v1647584156/YelpCamp/ns6jygnrnz1do1oilz86.jpg

const ImageSchema = new Schema({
  url: String,
  filename: String
})

ImageSchema.virtual('thumbnil').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
})

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
  title: String,
  images: [ImageSchema],
  price: Number,
  location: String,
  description: String,
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
}, opts)

CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
  return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
  <p>${this.description.substring(0, 20)}</p>`
})

CampgroundSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({ _id: { $in: doc.reviews } })
  }
})

module.exports = mongoose.model('Campground', CampgroundSchema);

