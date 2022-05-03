import React, { useState, useRef } from 'react';
import Tile from "../Tile/Tile";
import "./Gungiboard.css";



export default function Gungiboard() {
  //initial mainboard and sideboard values
  //initialize coordinates for key values for main-side-boards
  const main_yAxis = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const main_xAxis = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
  const main_zAxis = ["1", "2", "3"];

  const side_xAxis = ["1", "2", "3", "4"];
  const side_yAxis = ["j", "k", "l"];
  // const side_zAxis = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const mainStart = [];
  for (let i = 0; i < main_xAxis.length; i++) {
    let row = [];
    for (let j = 0; j < main_yAxis.length; j++) {
      let col = [];
      // for (let k = 0; k < main_zAxis.length; k ++) {
      //   col.push({image: ''});
      // }
      row.push(col);
    }
    mainStart.push(row);
  }
  console.log(mainStart);

  const sideStart = [];
  for (let i = 0; i < side_xAxis.length; i++) {
    let row = [];
    for (let j = 0; j < side_yAxis.length; j++) {
      row.push([]);
    }
    sideStart.push(row);
  }

  sideStart[0][2].push({image: "assets/gungi_trad/black_pieces/b_queen.png",}); // second copy of black queen for test purpose

  sideStart[0][2].push({image: "assets/gungi_trad/black_pieces/b_queen.png",});
  sideStart[1][2].push({image: "assets/gungi_trad/black_pieces/b_archer.png",});
  sideStart[2][2].push({image: "assets/gungi_trad/black_pieces/b_fortress.png",});
  sideStart[3][2].push({image: "assets/gungi_trad/black_pieces/b_counsel.png",});

  sideStart[0][1].push({image: "assets/gungi_trad/black_pieces/b_cannon.png",});
  sideStart[1][1].push({image: "assets/gungi_trad/black_pieces/b_musket.png",});
  sideStart[2][1].push({image: "assets/gungi_trad/black_pieces/b_knight.png",});
  sideStart[3][1].push({image: "assets/gungi_trad/black_pieces/b_samurai.png",});

  sideStart[0][0].push({image: "assets/gungi_trad/black_pieces/b_da.png",});
  sideStart[1][0].push({image: "assets/gungi_trad/black_pieces/b_zhong.png",});
  sideStart[2][0].push({image: "assets/gungi_trad/black_pieces/b_xiao.png",});
  sideStart[3][0].push({image: "assets/gungi_trad/black_pieces/b_pawn.png",});

  function topview(matrix) { //convert 3d to 2d array to use for gungi-side boards
    let topview = [];
    for (let i = 0; i < matrix.length; i++) {
      let row = [];
      for (let j = 0; j < matrix[0].length; j++) {
        let stack = matrix[i][j];
        let top = stack[stack.length - 1];
        row.push(top);
      }
      topview.push(row);
    }
    return topview;
  }

  console.log(topview(mainStart));
  console.log(topview(sideStart));
  //useState to initialize mainboard and sideboard
  const [main, setMain] = useState(mainStart);
  const [side, setSide] = useState(sideStart);

  //use topview and nested for loops to add tiles into a gungiboard/sideboard array
  let mainboard = [];
  let sideboard = [];

  let maintop = topview(main);
  let sidetop = topview(side);

  for (let i = 0; i < maintop.length; i++) {
    for (let j = 0; j < maintop[0].length; j++) {
      mainboard.push(
        <Tile image={maintop[i][j] ? maintop[i][j].image : ''} key={main_xAxis[i] + main_yAxis[j]}></Tile>
      );
    }
  }

  for (let i = 0; i < sidetop.length; i++) {
    for (let j = 0; j < sidetop[0].length; j++) {
      console.log(sidetop[i][j].image);
      sideboard.push(
        <Tile image={sidetop[i][j] ? sidetop[i][j].image : ''} key={main_xAxis[i] + main_yAxis[j]}></Tile>
      );
    }
  }

  //nested for loops to instantiate main and side boards

  return (
    <div>
      <div id="gungiboard">{mainboard}</div>
      <div id="sideboard">{sideboard}</div>
    </div>
  );
}