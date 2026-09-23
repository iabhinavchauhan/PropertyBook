import propertiesData from './properties.json';

export const fetchPropertyDetails = (id) => {
  const propertyId = parseInt(id);
  const property = propertiesData.find(p => p.id === propertyId);
  return property || null;
};

export const fetchSimilarProperties = (id, location, category) => {
  return propertiesData.filter(p => p.id !== id && (p.location === location || p.category === category)).slice(0, 3);
};