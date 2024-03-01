import { useNavigate, useOutletContext } from "react-router-dom";
import { AlbumType } from "../../contexts/session";
import { HStack, VStack } from "../common/Stack";
import { MyButton } from "../common/Button";
type SelectedAlbumContextType = {
  selectedAlbum: AlbumType;
  isPhotosLoading: boolean;
  photosError: string;
};

function AlbumDetail() {
  const { selectedAlbum, isPhotosLoading, photosError } =
    useOutletContext<SelectedAlbumContextType>();
  const navigate = useNavigate();
  const backToAlbums = () => navigate("..");

  //의도적으로 로그인된 유저의 앨범이 아닌 ID값을 넣었을 때:
  if (!selectedAlbum) return <span>잘못된 접근입니다.</span>;
  if (photosError) return <span className="text-red-500">{photosError}</span>;
  if (isPhotosLoading) return <span>사진 목록을 불러오는 중...</span>;

  return (
    <VStack className="pb-4">
      <HStack className="w-full px-6 mb-4 justify-between">
        <h1>{`${selectedAlbum.id}: ${selectedAlbum.title}`}</h1>
        <MyButton className="min-w-20" onClick={backToAlbums}>
          뒤로
        </MyButton>
      </HStack>
      <HStack className="justify-center flex-wrap">
        {selectedAlbum.photos ? (
          selectedAlbum.photos.map((photo) => (
            <VStack
              key={photo.id}
              className="!w-fit hover:scale-105 transition-transform"
            >
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                className="w-28 h-28 shadowed rounded-lg"
                loading="lazy"
              />
              <span>
                {photo.albumId}-{photo.id}
              </span>
            </VStack>
          ))
        ) : (
          <span>앨범에 사진이 없습니다.</span>
        )}
      </HStack>
    </VStack>
  );
}
export default AlbumDetail;
