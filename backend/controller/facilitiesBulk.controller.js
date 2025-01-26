import Facilities from "../model/facilities.model.js";

export const addBulk = async (req, res) => {
  try {
    const features = req.body;
    const CHUNK_SIZE = 1000;
    let insertedCount = 0;
    const allErrors = [];

    // Process in chunks
    for (let i = 0; i < features.length; i += CHUNK_SIZE) {
      const chunk = features.slice(i, i + CHUNK_SIZE);
      const operations = [];
      const chunkErrors = [];

      // Prepare chunk operations
      chunk.forEach((feature) => {
        if (!feature.name || !feature.state_name || !feature.lga_name) {
          chunkErrors.push({ feature, error: "Missing required fields" });
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

      // Process chunk
      try {
        const result = await Facilities.bulkWrite(operations, {
          ordered: false,
        });
        insertedCount += result.insertedCount;
        allErrors.push(...chunkErrors);
      } catch (error) {
        const mongoErrors =
          error.writeErrors?.map((e) => ({
            feature: e.err.op.insertOne.document,
            error: e.errmsg,
          })) || [];
        allErrors.push(...chunkErrors, ...mongoErrors);
      }
    }

    res.status(201).json({
      inserted: insertedCount,
      errors: {
        count: allErrors.length,
        samples: allErrors.slice(0, 50),
      },
    });
  } catch (error) {
    console.error("Bulk insert failed:", error);
    res.status(500).json({
      error: "Bulk insert failed",
      message: error.message,
    });
  }
};
