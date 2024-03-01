import { Session, UserType, AlbumType, PhotoType, AlbumDict } from "./session";
import { PropsWithChildren, createContext, useCallback } from "react";
import { useContext, useReducer } from "react";

type SessionContextProp = {
  session: Session;
  login: (userId: number) => void;
  logout: () => void;
  setUser: (user: UserType) => void;
  setAlbums: (albums: AlbumType[]) => void;
  setPhotos: (albumId: number, photos: PhotoType[]) => void;
  set: (session: Session) => void;
};

const SKEY = "session";
const BLANKFUNC = () => {};
const DefaultSession: Session = {
  userId: -1,
  user: null,
  albums: {},
};
const SessionContext = createContext<SessionContextProp>({
  session: DefaultSession,
  login: BLANKFUNC,
  logout: BLANKFUNC,
  setUser: BLANKFUNC,
  setAlbums: BLANKFUNC,
  setPhotos: BLANKFUNC,
  set: BLANKFUNC,
});

type Action =
  | { type: "login"; payload: number }
  | { type: "logout"; payload: null }
  | { type: "setUser"; payload: UserType }
  | { type: "setAlbums"; payload: AlbumType[] }
  | { type: "setPhotos"; payload: { albumId: number; photos: PhotoType[] } }
  | { type: "set"; payload: Session };

const reducer = (s: Session, { type, payload }: Action): Session => {
  let newer: Session;
  switch (type) {
    case "login":
      newer = { userId: payload, user: null, albums: {} };
      break;
    case "logout":
      newer = DefaultSession;
      break;
    case "setUser":
      newer = { ...s, user: payload };
      break;
    case "setAlbums":
      const albumDict: AlbumDict = {};
      payload.forEach((album) => {
        albumDict[album.id] = album;
      });
      newer = { ...s, albums: albumDict };
      break;
    case "setPhotos":
      const { albumId, photos } = payload;
      const newAlbums = { ...s.albums };
      newAlbums[albumId].photos = photos;
      newer = { ...s, albums: newAlbums };
      break;
    case "set":
      newer = payload;
      break;
  }
  setStorage(newer);
  return newer;
};

function getStorage(): Session {
  try {
    const storedData = localStorage.getItem(SKEY);
    if (storedData) return JSON.parse(storedData) as Session;
  } catch (error) {
    console.error("로컬 스토리지의 데이터를 불러오는 데 실패했습니다: ", error);
  }
  return DefaultSession;
}

function setStorage(session: Session) {
  try {
    localStorage.setItem(SKEY, JSON.stringify(session));
  } catch (error) {
    console.error("로컬 스토리지에 데이터를 설정하는 데 실패했습니다: ", error);
  }
}

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, dispatch] = useReducer(reducer, getStorage());

  const login = useCallback((userId: number) => {
    dispatch({ type: "login", payload: userId });
  }, []);
  const logout = useCallback(() => {
    dispatch({ type: "logout", payload: null });
  }, []);
  const setUser = useCallback((user: UserType) => {
    dispatch({ type: "setUser", payload: user });
  }, []);
  const setAlbums = useCallback((albums: AlbumType[]) => {
    dispatch({ type: "setAlbums", payload: albums });
  }, []);
  const setPhotos = useCallback((albumId: number, photos: PhotoType[]) => {
    dispatch({ type: "setPhotos", payload: { albumId, photos } });
  }, []);
  const set = useCallback((session: Session) => {
    dispatch({ type: "set", payload: session });
  }, []);

  return (
    <SessionContext.Provider
      value={{
        session,
        login,
        logout,
        setUser,
        setAlbums,
        setPhotos,
        set,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
