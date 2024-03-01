import { useNavigate, useOutletContext } from "react-router-dom";
import { AlbumDict } from "../../contexts/session";
import { VStack, HStack } from "../common/Stack";
import { MyButton } from "../common/Button";
import AlbumItem from "./AlbumItem";
type AlbumsContextType = {
  albums: AlbumDict;
  isAlbumsLoading: boolean;
  albumsError: string;
  selectedId: number | null;
  selectAlbum: (id: number) => void;
};

function AlbumList() {
  const { albums, isAlbumsLoading, albumsError, selectedId, selectAlbum } =
    useOutletContext<AlbumsContextType>();
  const navigate = useNavigate();
  const goAlbumDetail = () => navigate(`./${selectedId}`);

  if (albumsError) return <span className="text-red-500">{albumsError}</span>;
  if (isAlbumsLoading) return <span>앨범 목록을 불러오는 중...</span>;

  return (
    <VStack className="px-4 items-baseline">
      <HStack className="w-full px-2 justify-between">
        <span className="font-bold">앨범 목록</span>
        <MyButton disabled={selectedId == null} onClick={goAlbumDetail}>
          앨범 상세보기
        </MyButton>
      </HStack>
      <ul>
        {Object.keys(albums).map((id) => (
          <AlbumItem
            key={id}
            {...albums[+id]}
            isSelected={+id == selectedId}
            onClick={selectAlbum}
          />
        ))}
      </ul>
    </VStack>
  );
}

export default AlbumList;
