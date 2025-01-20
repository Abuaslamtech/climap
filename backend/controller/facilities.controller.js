import Facilities from "../model/facilities.model.js";

export const add = async (req, res) => {
  const { properties, geometry } = req.body;
  try {
    //   validate input
    if (!properties.name || !properties.state_name || !properties.lga_name) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    // check if facility exist
    const existingFacility = await Facilities.findOne({
      name: properties.name,
    });
    if (existingFacility) {
      return res.status(409).json({ message: "Facility already exists" });
    }
    // save facility
    const newFacility = new Facilities({
      name: properties.name,
      state_name: properties.state_name,
      lga_name: properties.lga_name,
      lga_code: properties.lga_code,
      state_code: properties.state_code,
      category: properties.category,
      type: properties.type,
      geometry: { type: geometry.type, coordinates: geometry.coordinates },
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
export const retrieve = async (req, res) => {
  try {
    const facilities = await Facilities.find();
    if (facilities.length === 0) {
      return res.status(400).json({ message: "No facility found" });
    }
    res.status(200).json(facilities);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Couldnt retrieve data" });
  }
};
export const modify = async (req, res) => {};
export const remove = async (req, res) => {};
