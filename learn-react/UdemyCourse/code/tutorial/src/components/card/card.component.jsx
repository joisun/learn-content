// import { Component } from "react";
import "./card.styles.css";

// class Card extends Component {
//   render() {
//     const { name, email, id } = this.props.monster;
//     return (
//       <div className='card-container'>
//         <img
//           src={`https://robohash.org/${id}?set=set2&size=180x180`}
//           alt={`monster ${name}`}
//         />
//         <h3>{name}</h3>
//         <p>{email}</p>
//       </div>
//     );
//   }
// }

function Card(props) {
  const { name, email, id } = props.monster;
  return (
    <div className='card-container'>
      <img
        src={`https://robohash.org/${id}?set=set2&size=180x180`}
        alt={`monster ${name}`}
      />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}
export default Card;
