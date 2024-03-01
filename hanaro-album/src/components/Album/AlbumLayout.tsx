import { AlbumType, Albums, Photos } from "../../contexts/session";
import { albumsURL, photosURL } from "../../utils/urlFactory";
import { useSession } from "../../contexts/sessionContext";
import { useCallback, useEffect, useState } from "react";
import { useFetchTrigger } from "../../hooks/useFetch";
import { Outlet, useParams } from "react-router-dom";
import isEmpty from "../../utils/isEmpty";
import Profile from "../Profile";
import Navbar from "../Navbar";

function AlbumLayout() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { session, setAlbums, setPhotos } = useSession();
  const { user, albums } = session;
  const { albumId } = useParams();

  const selectAlbum = useCallback(
    (id: number) => setSelectedId(id != selectedId ? id : null),
    [selectedId]
  );

  const selectedAlbum: AlbumType | undefined =
    albumId && albums ? albums[+albumId] : undefined;

  const {
    data: albumData,
    error: albumsError,
    isLoading: isAlbumsLoading,
    trigger: fetchAlbums,
  } = useFetchTrigger<Albums>();

  const {
    data: photoData,
    error: photosError,
    isLoading: isPhotosLoading,
    trigger: fetchPhotos,
  } = useFetchTrigger<Photos>();

  // 앨범 목록 페치
  useEffect(() => {
    if (isEmpty(albums) && user) fetchAlbums(albumsURL(user.id));
  }, [user]);
  // 앨범 데이터 적용
  useEffect(() => {
    if (albumData) setAlbums(albumData);
  }, [albumData]);
  // 사진 데이터 페치
  useEffect(() => {
    if (albumId && albums[+albumId] && isEmpty(albums[+albumId].photos))
      fetchPhotos(photosURL(+albumId));
  }, [albums, albumId]);
  // 사진 데이터 적용
  useEffect(() => {
    if (photoData && albumId)
      if (photoData.length > 0 && photoData[0].albumId == +albumId)
        setPhotos(+albumId, photoData);
  }, [photoData, albumId]);
  // 주소에 앨범ID 입력하여 앨범 접근 시 앨범ID 적용
  useEffect(() => {
    if (albumId && selectedAlbum) setSelectedId(+albumId);
  }, [selectedAlbum, albumId]);

  return (
    <>
      <Navbar>
        <Profile />
      </Navbar>
      <Outlet
        context={{
          albums,
          albumsError,
          isAlbumsLoading,
          photosError,
          isPhotosLoading,
          selectedId,
          selectAlbum,
          selectedAlbum,
        }}
      />
    </>
  );
}
export default AlbumLayout;
