interface TransformedData {
  location: string;
  country: string;
  title: string;
  description: string;
  temperature: number;
  temperatureMin: number;
  temperatureMax: number;
  humidity: number;
  datetime: string;
}

export const transformData = (data: any): TransformedData | null => {
  if (!data) return null;
  const transformedData: TransformedData = {
    location: data.name,
    country: data.sys.country,
    title: data.weather[0].main,
    description: data.weather[0].description,
    temperature: Math.round(data.main.temp),
    temperatureMin: Math.round(data.main.temp_min),
    temperatureMax: Math.round(data.main.temp_max),
    humidity: data.main.humidity,
    datetime: new Date(data.dt * 1000).toLocaleString(),
  };
  return transformedData;
};

export const storeSearchHistory = (transformedData: TransformedData | null) => {
  if (!transformedData) return;
  localStorage.setItem(
    `${transformedData?.datetime}`,
    JSON.stringify(transformedData)
  );
};
