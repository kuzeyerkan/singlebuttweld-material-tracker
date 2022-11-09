const sbWeldVolumeCalc = (h, b, g, t, L) => {
  const W = 2 * Math.tan((b * Math.PI) / 180) * t + g;
  const c = Math.tan((b * Math.PI) / 180) * t;
  const areaOfOrange = t * g;
  const areaOfTwoRed = c * t;
  const areaOfCap = (W * h) / 2;
  const totalArea = areaOfTwoRed + areaOfOrange + areaOfCap;
  const volumeOfWeld = totalArea * L;
  console.log(areaOfTwoRed, areaOfCap, areaOfOrange);
  return Number(volumeOfWeld).toFixed(2);
};
module.exports = sbWeldVolumeCalc;
