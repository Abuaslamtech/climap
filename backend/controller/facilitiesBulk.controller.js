import Facilities from "../model/facilities.model.js";

export const addBulk = async (req, res) => {
  try {
    const features = req.body;
    const operations = [];
    const errors = [];

    // 1. Prepare bulk operations
    features.forEach((feature) => {
      if (!feature.name || !feature.state_name || !feature.lga_name) {
        errors.push({ feature, error: "Missing required fields" });
        return;
      }

      operations.push({
        insertOne: {
          document: {
            ...feature,
            registeredBy: "Admin",
            geometry: feature.geometry || {
              type: "Point",
              coordinates: [0, 0],
            },
          },
        },
      });
    });

    // 2. Execute single bulk operation
    const result = await Facilities.bulkWrite(operations, { ordered: false });

    // 3. Handle response
    res.status(201).json({
      inserted: result.insertedCount,
      errors: {
        count: errors.length,
        samples: errors.slice(0, 50), // Show first 50 errors only
      },
    });
  } catch (error) {
    // Handle MongoDB errors
    const mongoErrors =
      error.writeErrors?.map((e) => ({
        feature: e.err.op.insertOne.document,
        error: e.errmsg,
      })) || [];

    res.status(500).json({
      error: "Bulk insert partially failed",
      inserted: error.result?.insertedCount || 0,
      errors: mongoErrors.slice(0, 50),
    });
  }
};
