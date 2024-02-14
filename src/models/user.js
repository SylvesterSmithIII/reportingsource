import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: String,
        email: String,
        company: String,
        password: String,
        mod: {
          type: Boolean,
          default: false
        },
        accepted: {
            type: String,
            enum: ['waitlisted', 'accepted', 'denied'],
            default: 'waitlisted'
        }
      }, {
        timestamps: true
      }
)

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;