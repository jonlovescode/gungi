import React, { useState, useRef } from 'react';
import Tile from "../Tile/Tile";
import "./Gungiboard.css";



export default function Gungiboard() {
  //initial mainboard and sideboard values
  //initialize coordinates for key values for main-side-boards
  const main_yAxis = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const main_xAxis = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

  const side_xAxis = ["1", "2", "3", "4"];
  const side_yAxis = ["j", "k", "l"];

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

  let activePiece;
  const gungiRef = useRef(null);
  const sideRef = useRef(null);
  // const sideselectX = useRef


  function grabPiece(e: React.MouseEvent) {
    const gungiside = sideRef.current;
    const gungiboard = gungiRef.current;
    console.log(e, 'this is e', gungiside)

    //add piece to sideboard, maybe gray piece? solid piece appears after dropped, or gray piece w/ number
    console.log(e.target, "this is the target");
    const element = e.target;
    if (gungiside && element.classList.contains("chess-piece")) {
      console.log("grab", e);
      const x = e.clientX - 35;
      const y = e.clientY - 35;

      const ycoor = Math.floor((e.clientX - gungiside.offsetLeft) / 70);
      const xcoor = Math.floor((e.clientY - gungiside.offsetTop) / 70);
      element.style.position = "absolute";
      element.style.left = `${x}px`; // jump to center of grab
      element.style.top = `${y}px`;

      activePiece = element;
      console.log(activePiece, 'activepiece here')

      console.log(ycoor, xcoor, 'coors', x, y, gungiside)
      const len = element.style.backgroundImage.length;
      const rempiece = element.style.backgroundImage.slice(5, len - 2);
    }
  }

  function movePiece(e: React.MouseEvent) {

    if (activePiece) {

      const x = e.clientX - 35;
      const y = e.clientY - 35;
      activePiece.style.position = "absolute";
      activePiece.style.left = `${x}px`;
      activePiece.style.top = `${y}px`;
    }
  }

  function dropPiece(e: React.MouseEvent) {
    const element = e.target;
    const len = element.style.backgroundImage.length;
    console.log(element.style.backgroundImage.slice(36, len - 6));
    element.remove();
    const rempiece = element.style.backgroundImage.slice(5, len - 2);
    console.log(rempiece, "rempiece");

    const gungiboard = gungiRef.current;

    if (activePiece && gungiboard) {

      const y = Math.floor((e.clientX - gungiboard.offsetLeft) / 70);
      const x = Math.floor((e.clientY - gungiboard.offsetTop) / 70);
      console.log(x, y);

      setMain((value) => {
        console.log(value, "value here");
        const pieces = value.map((p) => {
          if (p.x === x && p.y === y) {
            p.image = rempiece;
          }
          return p;
        });
        return pieces;
      });
      activePiece = null;
    }
  }

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
      <div
        onMouseMove={(e) => movePiece(e)}
        onMouseDown={(e) => grabPiece(e)}
        onMouseUp={(e) => dropPiece(e)}
        id="sideboard">{sideboard}</div>
    </div>
  );
}