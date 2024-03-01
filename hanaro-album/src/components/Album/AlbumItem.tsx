import { AlbumType } from "../../contexts/session";
import { memo } from "react";
interface AlbumItemProps extends AlbumType {
  isSelected: boolean;
  onClick: (id: number) => void;
}

function AlbumItemNoMemo({ id, title, onClick, isSelected }: AlbumItemProps) {
  return (
    <li>
      <button
        className={`${isSelected ? "border-blue-500" : "border-transparent text-gray-500"} border-2 p-1 rounded-md text-left`}
        onClick={() => onClick(id)}
      >{`${id}. ${title}`}</button>
    </li>
  );
}

const AlbumItem = memo(
  AlbumItemNoMemo,
  ({ isSelected: a }, { isSelected: b }) => a === b
);

export default AlbumItem;
