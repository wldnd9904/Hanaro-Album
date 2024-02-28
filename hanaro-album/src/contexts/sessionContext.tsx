import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import { AlbumType, PhotoType, Session, UserType } from "../type";

type SessionContextProp = {
  session: Session;
  login: (user: UserType) => void;
  logout: () => void;
  setAlbums: (albums: AlbumType[]) => void;
  setPhotos: (albumId: number, photos: PhotoType[]) => void;
  set: (session: Session) => void;
};
const SKEY = "session";
const DefaultSession: Session = { user: null, albums: [] };
const SessionContext = createContext<SessionContextProp>({
  session: DefaultSession,
  login: () => {},
  logout: () => {},
  setAlbums: () => {},
  setPhotos: () => {},
  set: () => {},
});

type Action =
  | { type: "login"; payload: UserType }
  | { type: "logout"; payload: null }
  | { type: "setAlbums"; payload: AlbumType[] }
  | { type: "setPhotos"; payload: { albumId: number; photos: PhotoType[] } }
  | { type: "set"; payload: Session };

const reducer = (s: Session, { type, payload }: Action): Session => {
  let newer: Session;
  switch (type) {
    case "login":
      newer = { user: payload, albums: [] };
      break;
    case "logout":
      newer = DefaultSession;
      break;
    case "setAlbums":
      newer = { ...s, ...payload };
      break;
    case "setPhotos":
      const { albumId, photos } = payload;
      const albums = s.albums.map((album) =>
        album.id == albumId ? album : { ...album, photos }
      );
      newer = { ...s, albums };
      break;
    case "set":
      newer = payload;
      break;
  }
  setStorage(newer);
  return newer;
};

function getStorage(): Session {
  const storedData = localStorage.getItem(SKEY);
  if (storedData) return JSON.parse(storedData) as Session;
  return DefaultSession;
}
function setStorage(session: Session) {
  localStorage.setItem(SKEY, JSON.stringify(session));
}

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, dispatch] = useReducer(
    reducer,
    getStorage() ?? DefaultSession
  );

  const login = useCallback((user: UserType) => {
    dispatch({ type: "login", payload: user });
  }, []);
  const logout = useCallback(() => {
    dispatch({ type: "logout", payload: null });
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
