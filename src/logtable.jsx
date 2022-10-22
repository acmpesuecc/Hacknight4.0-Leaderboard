import React, { useEffect, useState } from "react";
import "./table.css";
import axios from 'axios';
// import { resolve, reject } from 'axios'
// import JSONData from './sampletable.json'
// import JSONData from "./leaderboard.json";

const get_leaderboard_data = () => {
/*  axios.get("https://mocki.io/v1/1a4db56a-2d3b-4aed-bc1e-8d01f6bd04f3")
    .then(res=>{
      console.log('Response from main API:', res)
      console.log('Response of score:', res.data)
      resolve(res.data);
    })
    // .catch(error =>{
      // reject(error);
    // })
  */
    return new Promise ((resolve, reject) => {
        axios
            // .get(' ') //THIS IS A DUMMY API, IT MAY EXPIRE AND CAUSE THE PAGE TO NOT RENDER. Use mocki.io or whatever to make a new one!
            .get('https://bunsamosa.savaal.xyz/leaderboard')
            // .get(' https://mocki.io/v1/fb3dd4b1-5a48-4920-bc84-e53c036dbb4b  ')
            .then(response => {
                resolve(response.data);
                console.log("API call made!")
            })
            .catch(error => {
                reject(error);
            })
    })
  // return new Promise((resolve, reject) => {
    // resolve(JSONData);
  // });
};

    const Scores = (props) => {

    const [scores, setScores] = useState();
    const [isSortAsc, setIsSortAsc] = useState(true);
    // const [toggler, setToggler] = useState(true); 
    // setInterval(()=> setToggler(!toggler), 30000) // Update leaderboard every minute

  useEffect(() => {
    get_leaderboard_data()
      .then((data) => {
        // sanitize the scores
        var player_score_object = {};
        data.map((score) => {
          // console.log(score.Current_bounty)
          if (!player_score_object.hasOwnProperty(score.Name)) {
            player_score_object[score.Name] = 0;
          }
          var clean_score = parseInt(score.Current_bounty);
            // console.log(score.Current_bounty)
            // console.log(clean_score)
          player_score_object[score.Name] += clean_score;
          return null; 
        });

        // load into a list and sort
        var scores_array = [];
        for (var key in player_score_object) {
          scores_array.push({
            Name: key,
            score: player_score_object[key],
          });
        }

        console.log(scores_array)
        scores_array.sort((first, second) => second.score - first.score);
        setScores(scores_array);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const sortArray = () => {
    let sortedArr = [...scores];
    if (isSortAsc) {
      sortedArr.sort((a, b) => {
        return a.score - b.score;
      });
      setScores(sortedArr);
    } else {
      sortedArr.sort((a, b) => {
        return b.score - a.score;
      });
      setScores(sortedArr);
    }

    setIsSortAsc(!isSortAsc);
  };

  return (
    <div className="outerContainer">
      <div className="btn">
      <a href="https://zippy-file-185.notion.site/HackNight-4-0-Contributors-733d658abdf74a67bf01beb903c4f3f2" target="_blank" rel = "noreferrer">
      <button className="conBtn" >CONTRIBUTORS GUIDELINES</button>
      </a>
      <button className="toggleSort" onClick={sortArray}>
        Toggle sort &#8593; &#8595;
      </button>
      </div>
      <table align="center" className="steelBlueCols">
        <thead>
          <tr>
            <th>  </th>
            <th> Position </th>
            <th> Contributor </th>
            <th> Bounty </th>
          </tr>
        </thead>

        <tbody>
          {scores &&
            scores.map((score, index) => {
              return (
                <tr valign= "middle" key={score.Name}>
                  <td> 
                    <img
                      src={"https://github.com/" + score.Name + ".png"}
                      width="50" />
                  </td>
                  
                  <td className="col"> {score.Name} </td>
                  <td className="col"> {score.score} </td>
                  <td className="col"> {index + 1} </td>
            
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};


export default Scores;
