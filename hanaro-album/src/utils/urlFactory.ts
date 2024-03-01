const BASE_URL = "https://jsonplaceholder.typicode.com";

export const userURL = (userId: number) => `${BASE_URL}/users/${userId}`;

export const albumsURL = (userId: number) =>
  `${BASE_URL}/albums?userId=${userId}`;

export const photosURL = (albumId: number) =>
  `${BASE_URL}/photos?albumId=${albumId}`;
