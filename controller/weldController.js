const SBWeld = require("../models/SingleButtWeld");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
// const Redis = require("redis");
// const redisClient = Redis.createClient();

// const DEFAUT_EXPIRATION = 3600;

// redisClient.setex("weld", DEFAUT_EXPIRATION);

const createWeld = async (req, res) => {
  const weld = await SBWeld.create(req.body);
  res.status(201).json({ weld });
};

const getAllWelds = async (req, res) => {
  const welds = await SBWeld.find({});
  redisClient.get();
  res.status(StatusCodes.OK).json({ welds, count: welds.length });
};

const getSingleWeld = async (req, res) => {
  const { id: weldId } = req.params;
  const weld = await SBWeld.findOne({ _id: weldId });
  if (!weld) {
    throw new CustomError.NotFoundError(`No weld with id:${weldId}`);
  }
  res.status(StatusCodes.OK).json({ weld });
};

const deleteWeld = async (req, res) => {
  const { id: weldId } = req.params;
  const weld = await SBWeld.findOne({ _id: weldId });
  if (!weld) {
    throw new CustomError.NotFoundError(`No weld with id: ${weldId}`);
  }
  await weld.remove();
  res.status(201).json("removed");
};

const updateWeld = async (req, res) => {
  const { id: weldId } = req.params;
  const weld = await SBWeld.findOneAndUpdate({ _id: weldId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!weld) {
    throw new CustomError.NotFoundError(`No weld with id:${weldId}`);
  }
  await weld.save();
  res.status(201).json({ weld });
};

//  function getOrSetCache(key, cb) {
//   return Promise((resolve, reject) => {
//     redisClient.get(key, async (error, data) => {
//       if (error) return reject(error);
//       if (data != null) return resolve(JSON.parse(data));
//       const freshData = await cb();
//       redisClient.setex(key, DEFAUT_EXPIRATION, JSON.stringify(freshData));
//       resolve(freshData);
//     });
//   });
// }

module.exports = {
  getAllWelds,
  getSingleWeld,
  deleteWeld,
  updateWeld,
  createWeld,
};
