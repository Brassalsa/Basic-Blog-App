const setBg = () => {
  const randomNum = () => Math.floor(Math.random() * 360);
  const randomHue = (randomNum() * (360 / randomNum())) % 360;
  const lightness = () => Math.floor(Math.random() * 20) + 75;
  const saturation = () => Math.floor(Math.random() * 50) + 50;

  return `hsl( ${randomHue},${saturation()}%, ${lightness()}%)`;
};

export default setBg;
