import React from "react";
import type {
  Character
} from "../__generated__/types";

const CharacterCell: React.FC<{ c: Character }> = ({ c }) => {
  return (
    <div className="flex items-center bg-white rounded-lg shadow p-3">
      <img src={c.image ?? ""} className="w-32 h-32 rounded-md mr-3"/>
      <div>
        <div className="font-semibold">{c.name}</div>
        <div className="text-sm text-gray-500">{c.species ?? "Unknown"}</div>  
      </div> 
    </div>
  )
}

export default CharacterCell;