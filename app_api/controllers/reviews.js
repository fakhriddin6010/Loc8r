const mongoose = require('mongoose');
const Loc=mongoose.model('Location');

const reviewsCreate =(req,res) =>{};
const reviewsReadOne =(req,res) =>{
    const reviewsReadOne = (req, res) => {
        Loc
          .findById(req.params.locationid)
          .select('name reviews')
          .exec((err, location) => {
            if (!location) {
              return res
                .status(404)
                .json({ "message": "Location not found" });
            } else if (err) {
              return res
                .status(400)
                .json(err);
            }
      
            if (location.reviews && location.reviews.length > 0) {
              const review = location.reviews.id(req.params.reviewid);
              if (!review) {
                return res
                  .status(404)
                  .json({ "message": "Review not found" });
              } else {
                const response = {
                  location: {
                    name: location.name,
                    id: req.params.locationid
                  },
                  review: review
                };
                return res
                  .status(200)
                  .json(response);
              }
            } else {
              return res
                .status(404)
                .json({ "message": "No reviews found" });
            }
          });
      };
      
};
const reviewsUpdateOne =(req,res) =>{};
const reviewsDeleteOne =(req,res) =>{};

module.exports={
    reviewsCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne
} ;