import mongoose, { Schema } from "mongoose";

const propertySchema = new Schema(
    {
        address: String,
        parcelNumber: String,
        lastName: String,
        comments: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
      }, {
        timestamps: true
      }
)

const Property = mongoose.models.Property || mongoose.model("Property", propertySchema);

export default Property;
