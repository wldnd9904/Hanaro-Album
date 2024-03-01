export type UserType = {
  id: number;
  username: string;
  // name: string;
  // email: string;
  // address: {
  //   street: string;
  //   suite: string;
  //   city: string;
  //   zipcode: string;
  //   geo: {
  //     lat: string;
  //     lng: string;
  //   };
  // };
  // phone: string;
  // website: string;
  // company: {
  //   name: string;
  //   catchPhrase: string;
  //   bs: string;
  // };
};
export type PhotoType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};
export type Photos = PhotoType[];
export type AlbumType = {
  userId: number;
  id: number;
  title: string;
  photos?: Photos;
};
export type Albums = AlbumType[];

export type AlbumDict = { [id: number]: AlbumType };
export type Session = {
  userId: number;
  user: UserType | null;
  // 빠른 접근을 위한 딕셔너리
  albums: AlbumDict;
};
