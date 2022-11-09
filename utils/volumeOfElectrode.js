const volumeOfElectrodeMelt = (d, l, s, eff) => {
  const r = d / 2;
  const volumeOfElectrodeMelt =
    (Math.PI * Math.pow(r, 2) * (l - s) * eff) / 100;
  return volumeOfElectrodeMelt;
};

module.exports = volumeOfElectrodeMelt;
