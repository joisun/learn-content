// import { Component } from "react";
import "./card-list.styles.css";
import Card from "../card/card.component";

// class CardList extends Component {
//   render() {
//     console.log("cardlist 执行了渲染函数");
//     const { filteredMonsters } = this.props;
//     return (
//       <div className='card-list'>
//         {filteredMonsters.map((monster, index) => (
//           <Card monster={monster} key={monster.id} />
//         ))}
//       </div>
//     );
//   }
// }

function CardList(props) {
  const { filteredMonsters } = props;
  return (
    <div className='card-list'>
      {filteredMonsters.map((monster, index) => (
        <Card monster={monster} key={monster.id} />
      ))}
    </div>
  );
}

export default CardList;
