import React from "react";
import type { CharacterItem } from "../graphql/types";

const CharacterCell: React.FC<{ c: CharacterItem }> = ({ c }) => {
  return (
    <div className="character-cell">
      <img src={c.image ?? ""} alt={`${c.name} thumbnail`} className="avatar" />
      <div className="character-cell-body">
        <div className="name">{c.name}</div>
        <div className="species">{c.species ?? "Unknown"}</div>  
      </div> 
    </div>
  )
}

export default CharacterCell;