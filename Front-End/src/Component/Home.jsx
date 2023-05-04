import Card from "./Card";
import Navbar from "./Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <div
        className="App"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Card classroom="A" count={30} />
        <Card classroom="B" count={23} />
        <Card classroom="C" count={46} />
        <Card classroom="D" count={17} />
      </div>
    </div>
  );
}

export default Home;
