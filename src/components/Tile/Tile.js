import "./Tile.css";


export default function Tile(props) {
  return (
    <div className="tile">
      {/* {props.image && <img className="chess-piece" src={props.image}></img>} */}
      {props.image && <div style={{backgroundImage: `url(${props.image})`}} className="chess-piece"></div>}
    </div>
  );
}
