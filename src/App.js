import './App.css';
import logo from './Hacknight.png'
import Scores from './logtable'

function App() {
  return(
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet"/>
        <div className="App">
        <img alt="hacknight logo" src={logo}/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css"/>
          <h1>ACM PESUECC Hacknight 4.0</h1>
          <h1>Leaderboard</h1>
          <br/>
          <Scores />
        </div>
      </>
  );
}

export default App;
