import ApexChart from "./component/ApexChart";
import Card from "./component/Card";
import Gameui from "./component/Gameui";
import Memory from "./component/Memory";
import Orange from "./component/Orange";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Card />
      <Memory />
      {/* <Gameui /> */}
      <Orange />
    </div>
  );
}
