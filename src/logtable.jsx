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
            .get('https://bunsamosa.savaal.xyz/lb_all')
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

setInterval(get_leaderboard_data, 60000) // Update leaderboard every minute

const Scores = (props) => {
  const [scores, setScores] = useState();
  const [isSortAsc, setIsSortAsc] = useState(true);

  useEffect(() => {
    get_leaderboard_data()
      .then((data) => {
        // sanitize the scores
        var player_score_object = {};
        data.map((score) => {
          if (!player_score_object.hasOwnProperty(score.Contributor_name)) {
            player_score_object[score.Contributor_name] = 0;
          }
          var clean_score = parseInt(score.Points_allotted);
            console.log(score.Points_allotted)
          player_score_object[score.Contributor_name] += clean_score;
          return null; 
        });

        // load into a list and sort
        var scores_array = [];
        for (var key in player_score_object) {
          scores_array.push({
            Contributor_name: key,
            score: player_score_object[key],
          });
        }

        //console.log(scores_array)
        scores_array.sort((first, second) => second.score - first.score);
        setScores(scores_array);
        //console.log(scores_array)
      })
      .catch((err) => {
        console.error(err);
      });
  }, [scores]);

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
    <>
      <div className="btn">
      <a href="https://www.notion.so/289997d430e041ac9ea58a6b86ee3806?v=c5fc66b06c8946c4b36a401d7f03692f" target="_blank" rel = "noreferrer">
      <button className="conBtn" >CONTRIBUTORS BIBLE</button>
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
                <tr key={score.contributor}>
                  <td> 
                    <img
                      src={"https://github.com/" + score.Contributor_name + ".png"}
                      width="50" />
                  </td>
                  <td> {index + 1} </td>
                  <td> {score.Contributor_name} </td>
                  <td> {score.score} </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};


export default Scores;
