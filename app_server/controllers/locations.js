var request = require('request');

const apiOptions = {
  server: 'http://localhost:3000'
};

if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://yourapi.com';
}

const formatDistance = (distance) => {
  let thisDistance = 0;
  let unit = 'm';

  if (distance > 1000) {
    thisDistance = parseFloat(distance / 1000).toFixed(1); // 1 km dan katta bo'lsa
    unit = 'km';
  } else {
    thisDistance = Math.floor(distance); // Metrda
  }

  return `${thisDistance} ${unit}`;
};

const homelist = (req, res) => {
  const path = '/api/locations';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}, // to'g'ri 'json' kalitini ishlatish
    qs: {
      lng: 1,
      lat: 1,
      maxDistance: 0.002
    }
  };

  request(requestOptions, (err, response, body) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error occurred while fetching locations.");
    }

    if (response.statusCode === 200 && body.length) {
      const locations = body.map(item => {
        // Har bir joy uchun masofani formatlash
        item.distance = formatDistance(item.distance);
        return item;
      });
      renderHomepage(req, res, locations);
    } else {
      console.log(response.statusCode);
      return res.status(response.statusCode).send("Error fetching locations.");
    }
  });
};

const renderHomepage = (req, res, responseBody) => {
  let message = null;
  if(!(responseBody instanceof Array)) {
    message = "api lookup error";
    responseBody=[];
  }else{
    if(! responseBody.length){
      message="No place found nearby";
    }
  }
  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find place to work with wifi near you!'
    },
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places \
    to work when out and about. Perhaps with coffee, cake or a pint? \
    Let Loc8r help you find the place you're looking for.",
    locations: responseBody, 
    message
  });
};

const locationInfo = (_req, res) => {
  res.render('location-info', {
    title: 'Starcups',
    pageHeader: {
      title: 'Loc8r',
    },
    sidebar: {
      context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
      callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
    },
    location: {
      name: 'Starcups',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 3,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      coords: { lat: 51.455041, lng: -0.9690884 },
      openingTimes: [
        {
          days: 'Monday - Friday',
          opening: '7:00am',
          closing: '7:00pm',
          closed: false
        },
        {
          days: 'Saturday',
          opening: '8:00am',
          closing: '5:00pm',
          closed: false
        },
        {
          days: 'Sunday',
          closed: true
        }
      ],
      reviews: [
        {
          author: 'Samkeun Kim',
          rating: 5,
          timestamp: '16 July',
          reviewText: 'What a great place. I can\'t say enough good things about it.'
        },
        {
          author: 'Hong Gilseo',
          rating: 3,
          timestamp: '16 June',
          reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
        }
      ]
    }
  });
};

const addReview = (req, res) => {
  res.render('location-review-form', {
    title: 'Review Starcups on Loc8r',
    pageHeader: { title: 'Review Starcups' }
  });
};

module.exports = {
  homelist,
  locationInfo,
  addReview
};
