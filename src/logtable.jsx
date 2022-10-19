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
            .get(' https://mocki.io/v1/4ddc2d94-1d91-46ef-8e1b-2d1fa5b6de11  ') //THIS IS A DUMMY API, IT MAY EXPIRE AND CAUSE THE PAGE TO NOT RENDER. Use mocki.io or whatever to make a new one!
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

setInterval(get_leaderboard_data, 5500)

const Scores = (props) => {
  const [scores, setScores] = useState();
  const [isSortAsc, setIsSortAsc] = useState(true);

  useEffect(() => {
    get_leaderboard_data()
      .then((data) => {
        // sanitize the scores
        var player_score_object = {};
        data.map((score) => {
          if (!player_score_object.hasOwnProperty(score.contributor)) {
            player_score_object[score.contributor] = 0;
          }
          var clean_score = parseInt(score.points);
          player_score_object[score.contributor] += clean_score;
          return null; 
        });

        // load into a list and sort
        var scores_array = [];
        for (var key in player_score_object) {
          scores_array.push({
            contributor: key,
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
    <>
      <button className="toggleSort" onClick={sortArray}>
        Toggle sort &#8593; &#8595;
      </button>
      <table align="center">
        <thead>
          <tr>
            <th></th>
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
                    <img src={"https://github.com/" + score.contributor + ".png"} width="50"/>
                  </td>
                  <td> {index + 1} </td>
                  <td> {score.contributor} </td>
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
