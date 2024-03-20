const Venue = require("../models/Venue");

const registerVenue = async (req, res) => {
  try {
    const Name = req.body.name;
    const Address = req.body.address;
    const Cuisines = req.body.cuisines;
    const Capacity = req.body.capacity;
    const Price = req.body.price_per_person;
    const Star = req.body.stars;

    const hasSpace = /\s/.test(Name);
    if (!Name) {
      return res.status(400).json({
        error: "name is required!"
      })
    }
    if (!hasSpace) {
      return res.status(400).json({
        error: "Invalid Name!"
      })
    }
    if (!Address) {
      return res.status(400).json({
        error: "address is required!"
      })
    }
    if (!Cuisines) {
      return res.status(400).json({
        error: "cuisines is required!"
      })
    }
    if (!Capacity) {
      return res.status(400).json({
        error: "capacity is required!"
      })
    }
    if (!Price) {
      return res.status(400).json({
        error: "price_per_person is required!"
      })
    }
    if (!Star) {
      return res.status(400).json({
        error: "stars is required!"
      })
    }
    const newvenue = await Venue.create({
      ...req.body,
    });
    return res.json(newvenue);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getVenue = async (req, res) => {
  const id = req.query.param;
  try {
    const venues = await Venue.findOne({ admin_id: id });
    res.json(venues);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const updatePrice = async (req, res) => {
  try {
    const id = req.body.admin_id;
    const Price = req.body.price_per_person;
    const venues = await Venue.findOne({ admin_id: id });
    const Name = venues.name;
    const Address = venues.address;
    const Cuisines = venues.cuisines;
    const Capacity = venues.capacity;
    const Star = venues.stars;
    const v_id = venues.venue_id;
    if (!Price) {
      return res.status(400).json({
        error: "price_per_person is required!"
      })
    }

    const newvenue = await Venue.updateOne({ admin_id: id }, {
      admin_id: id,
      venue_id: v_id,
      name: Name,
      address: Address,
      cuisines: Cuisines,
      capacity: Capacity,
      price_per_person: Price,
      stars: Star
    });
    return res.json(newvenue);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerVenue,
  getVenue,
  updatePrice
};
