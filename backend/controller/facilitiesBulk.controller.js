import Facilities from "../model/facilities.model.js";

export const addBulk = async (req, res) => {
  const features = req.body;
  const facilities = [];
  const errors = [];
  try {
    for (const feature of features) {
      const { properties, geometry } = feature;
      //   validate input
      if (!properties.name || !properties.state_name || !properties.lga_name) {
        errors.push({
          message: "Missing required fields",
          details: properties,
        });
        continue;
      }
      // check if facility exist
      const existingFacility = await Facilities.findOne({
        name: properties.name,
      });
      if (existingFacility) {
        errors.push({
          message: "Facility already exists",
          details: { name: properties.name },
        });
        continue;
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
        geometry: geometry
          ? { type: geometry.type, coordinates: geometry.coordinates }
          : null,
        registeredBy: "Admin",
      });

      try {
        const savedFacility = await newFacility.save();
        facilities.push(savedFacility);
      } catch (err) {
        console.error(err);
        errors.push({
          message: "Error saving Facility",
          details: { name: properties.name },
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
