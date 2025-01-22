import Facilities from "../model/facilities.model.js";

// Add new facility
export const add = async (req, res) => {
  const {
    name,
    state_name,
    lga_name,
    lga_code,
    state_code,
    category,
    type,
    geometry,
  } = req.body;
  try {
    //   validate input
    if (!name || !state_name || !lga_name) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    // check if facility exist
    const existingFacility = await Facilities.findOne({
      name,
    });
    if (existingFacility) {
      return res.status(409).json({ message: "Facility already exists" });
    }
    // save facility
    const newFacility = new Facilities({
      name,
      state_name,
      lga_name,
      lga_code,
      state_code,
      category,
      type,
      geometry,
      registeredBy: "Admin",
    });

    await newFacility.save();
    res
      .status(201)
      .json({ message: "facility added successfully", facility: newFacility });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// In your retrieve controller:
export const retrieve = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 12;
  const state = req.query.state;

  try {
    let query = {};
    if (state) {
      query.state_name = state;
    }

    const skipValue = (page - 1) * pageSize;
    const totalCount = await Facilities.countDocuments(query);
    const facilities = await Facilities.find(query)
      .skip(skipValue)
      .limit(pageSize);

    if (facilities.length === 0) {
      return res.status(404).json({ message: "No facility found" });
    }

    res.status(200).json({
      facilities,
      currentPage: page,
      totalPages: Math.ceil(totalCount / pageSize),
      totalfacilities: totalCount,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Couldn't retrieve data" });
  }
};
export const modify = async (req, res) => {};
export const remove = async (req, res) => {};
