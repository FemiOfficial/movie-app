export const extractIdFromUrl = (resourceType: string, url: string) => {
  try {
    const id = url.split(resourceType)[1].replace(/\//gi, "");
    return id.trim();
  } catch (error) {
    return null;
  }
};

export const convertFromCmToFeetAndInches = (valueInCm: number) => {
  const feet = valueInCm / 30.48;
  const inches = (feet - Math.floor(feet)).toFixed(4);
  return { feet, inches: Number(inches) };
};
