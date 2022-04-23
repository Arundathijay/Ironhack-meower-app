const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      maxlength: 300,
      trim: true //ensure that any spaces at the beginning and at the end are removed.
    },
    picture: {
      type: String
    },
    creator: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User' // name of the model that this objectId refers to
    }
  },
  { timestamps: true }
);

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;
