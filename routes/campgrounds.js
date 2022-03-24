const express = require('express');
const router = express.Router();

const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
// const upload = multer({ dest: 'uploads/' }) // local 

router.route('/')
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
  .get(catchAsync(campgrounds.showCampgrounds))
  .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;


/* ********************************************
************* Upload single file **************
******************************************** */
{/* <input type="file" name="image" id=""></input> */ }
// router.route('/')
//   .get(catchAsync(campgrounds.index))
//   // .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));
//   .post(upload.single('image'), (req, res) => {
//     console.log(req.body, req.file);
//     res.send('It worked!!');
//   })

/* *******************************************
*********** Upload multiple files ************
******************************************* */
{/* <input type="file" name="image" id="" multiple></input> */ }
// router.route('/')
//   .get(catchAsync(campgrounds.index))
//   // .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));
//   .post(upload.array('image'), (req, res) => {
//     console.log(req.body, req.files);
//     res.send('It worked!!');
//   })
