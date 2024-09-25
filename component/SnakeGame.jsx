import React, { useEffect, useRef, useState } from "react";

const GRID_SIZE = 15;
const GAMEGRID = Array.from({ length: GRID_SIZE }, () =>
  new Array(GRID_SIZE).fill("")
);

const INITIAL_SNAKE = [[5, 5]];

const generateFood = () => {
  const x = Math.floor(Math.random() * GRID_SIZE);
  const y = Math.floor(Math.random() * GRID_SIZE);
  return [x, y];
};
const res = "You Lose The Game";

const SnakeGame = () => {
  const [snakeBody, setSnakeBody] = useState(INITIAL_SNAKE);
  var [count, setCount] = useState(0);
  const [result, setResult] = useState("");

  const directionRef = useRef([1, 0]);
  const foodRef = useRef(generateFood());

  const isSnakeBodyDiv = (xy, yc) => {
    return snakeBody.some(([x, y]) => {
      return x === xy && y === yc;
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSnakeBody((prevSnakeBody) => {
        const newHead = [
          prevSnakeBody[0][0] + directionRef.current[0],
          prevSnakeBody[0][1] + directionRef.current[1],
        ];

        if (
          newHead[0] < 0 ||
          newHead[0] >= GRID_SIZE ||
          newHead[1] < 0 ||
          newHead[1] >= GRID_SIZE ||
          prevSnakeBody.some(([x, y]) => {
            return newHead[0] === x && newHead[1] === y;
          })
        ) {
          directionRef.current = [1, 0];
          setResult(res);
          return INITIAL_SNAKE;
        }

        const copySnakeBody = prevSnakeBody.map((arr) => [...arr]);
        if (
          newHead[0] === foodRef.current[0] &&
          newHead[1] === foodRef.current[1]
        ) {
          foodRef.current = generateFood();
          setCount((count += 1));
        } else {
          copySnakeBody.pop();
        }
        copySnakeBody.unshift(newHead);

        return copySnakeBody;
      });
    }, 400);

    const handleDirection = (e) => {
      const key = e.key;
      console.log(key);
      if (key === "ArrowUp" && directionRef.current[1] != 1) {
        directionRef.current = [0, -1]; // 0 is dinote x cordinate for colum /up and Down/ and -1 denoted y cordinate for row mean left & right
      } else if (key === "ArrowLeft" && directionRef.current[0] != 1) {
        directionRef.current = [-1, 0];
      } else if (key === "ArrowRight" && directionRef.current[0] != -1) {
        directionRef.current = [1, 0];
      } else if (key === "ArrowDown" && directionRef.current[1] != -1) {
        directionRef.current = [0, 1];
      }
    };

    window.addEventListener("keydown", handleDirection);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("keydown", handleDirection);
    };
  }, []);

  var onhandleresat = () => {
    setCount(0);
    setResult("");
  };

  return (
    <>
      <div className="main">
        <div className="losemsg">{result}</div>

        <div className="board_score">
          <div className="container">
            {GAMEGRID.map((row, yc) => {
              return row.map((cell, xc) => {
                return (
                  <div
                    className={`cell ${
                      isSnakeBodyDiv(xc, yc) ? "snake" : " "
                    } ${
                      foodRef.current[0] === xc && foodRef.current[1] === yc
                        ? "food"
                        : ""
                    }`}
                  ></div>
                );
              });
            })}
          </div>
          <div className="Score">Score {count}</div>
        </div>
        <div className="result_reset">
          <button className="rest_btn" onClick={() => onhandleresat()}>
            Resat
          </button>
        </div>
      </div>
    </>
  );
};

export default SnakeGame;
