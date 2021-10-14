export const colorPalette = (seed: number): string => {
  //let colorPalette = ["264653", "2a9d8f", "e9c46a", "f4a261", "e76f51"];
  let colorPalette = ["003049", "fcbf49", "f77f00", "d62828"];

  return `#${colorPalette[seed]}`;
};
