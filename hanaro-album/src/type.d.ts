export type UserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type AlbumType = {
  userId: number;
  id: number;
  title: string;
  photos?: PhotoType[];
};

export type PhotoType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type Session = {
  user: UserType | null;
  albums: AlbumType[];
};
