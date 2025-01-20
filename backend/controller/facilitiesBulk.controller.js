import Facilities from "../model/facilities.model.js";

export const addBulk = async (req, res) => {
  const features = req.body;
  const facilities = [];
  const errors = [];
  try {
    for (const feature of features) {
      const {
        name,
        state_name,
        lga_name,
        lga_code,
        state_code,
        category,
        type,
        geometry,
      } = feature;
      //   validate input
      if (!name || !state_name || !lga_name) {
        errors.push({
          message: "Missing required fields",
          details: properties,
        });
        continue;
      }
      // check if facility exist
      const existingFacility = await Facilities.findOne({
        name,
      });
      if (existingFacility) {
        errors.push({
          message: "Facility already exists",
          details: { name },
        });
        continue;
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

      try {
        const savedFacility = await newFacility.save();
        facilities.push(savedFacility);
      } catch (err) {
        console.error(err);
        errors.push({
          message: "Error saving Facility",
          details: { name },
        });
      }
    }
    res.status(201).json({
      message: "facilities processed",
      success_count: facilities.length,
      failed_count: errors.length,
      errors,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server error" });
  }
};
