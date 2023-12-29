import React from "react";

function ListName({ listName }: { listName?: string }) {
  return (
    <div className="flex items-center rounded-none text-lg">
      <p className="break-all">{listName}</p>
    </div>
  );
}

export default ListName;
