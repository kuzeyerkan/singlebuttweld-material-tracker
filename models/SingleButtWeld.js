const mongoose = require("mongoose");
const sbWeldVolumeCalc = require("../utils/sbVolumeCalculator");
const volumeOfElectrodeMelt = require("../utils/volumeOfElectrode");

const SBWeldSchema = new mongoose.Schema({
  fillerMaterial: {
    fillerMaterialName: {
      type: String,
    },
    density: {
      type: Number,
      required: [true, "please provide density"],
    },
    electrodeDiameter: {
      type: Number,
      required: [true, "please provide electrode diameter"],
    },
    electrodeLength: {
      type: Number,
      required: [true, "please provide electrode length"],
    },
    electrodeEfficiency: {
      type: Number,
      required: [true, "please provide electrode efficiecy"],
    },
    stubEndLength: {
      type: Number,
      required: [true, "pleases provide stub end length"],
    },
  },
  weldPreparition: {
    h: {
      type: Number,
      required: [true, "please provide reinforcement "],
    },
    t: {
      type: Number,
      required: [true, "please provide thickness"],
    },
    g: {
      type: Number,
      required: [true, "please provide root gap"],
    },
    b: {
      type: Number,
      required: [true, "please provide angle"],
    },
    L: {
      type: Number,
      required: [true, "pleae provide Length of weld"],
    },
  },
  volumeOfWeld: {
    type: Number,
  },
  numberOfpieces: {
    type: Number,
  },
  weightOfWeld: {
    type: Number,
  },
});

SBWeldSchema.pre("save", function (next) {
  this.volumeOfWeld = sbWeldVolumeCalc(
    this.weldPreparition.h,
    this.weldPreparition.b,
    this.weldPreparition.g,
    this.weldPreparition.t,
    this.weldPreparition.L
  );
  this.weightOfWeld = this.volumeOfWeld * this.fillerMaterial.density;
  this.numberOfpieces =
    this.volumeOfWeld /
    volumeOfElectrodeMelt(
      this.fillerMaterial.electrodeDiameter,
      this.fillerMaterial.electrodeLength,
      this.fillerMaterial.stubEndLength,
      this.fillerMaterial.electrodeEfficiency
    );
  next();
});

module.exports = mongoose.model("SBWeld", SBWeldSchema);
