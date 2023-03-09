import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Row } from "antd";
import "./Game.css";
import GameForm from "../form/GameForm";
import axios from "axios";
import GameCard from "../card/GameCard";
import SearchGame from "../search/SearchGame";

const Game = () => {
  const [gameEditMode, setGameEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [games, setGames] = useState([]);
  const [game, setGame] = useState({
    name: "",
    url: "",
    author: "",
    id: 0,
  });

  useEffect(() => {
    getAllGamessFromServer();
  }, []);

  const addInputValuesForGame = (key, e) => {
    setGame({ ...game, [key]: e.target.value });
  };

  const addGameToServer = (e) => {
    console.log("Add game to server called");
    e.preventDefault();
    if (gameEditMode) {
      editGameToServer(game.id);
      console.log("Edit Clicked");
    } else {
      createSingleGame();
    }
  };

  const getAllGamessFromServer = () => {
    axios.get("/game").then(
      (response) => {
        //console.log(response.data);
        setGames(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getAllGamessFromServerForSearch = (keyword) => {
    axios.get("/game/search/" + keyword).then(
      (response) => {
        //console.log(response.data);
        setGames(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const createSingleGame = () => {
    console.log("Creating single game called");
    axios.post("/game", game).then(
      (response) => {
        //console.log(response.data);
        getAllGamessFromServer();
        resetGameData();
        message.success("Game Registered Successfully", 2);
      },
      (error) => {
        console.log(error);
        message.error("Game Creation Failed", 2);
      }
    );
  };

  const editGameToServer = (gameId) => {
    console.log("Edit To server triggered");
    axios.put("/game/" + gameId, game).then(
      (response) => {
        //console.log(response.data);
        getAllGamessFromServer();
        resetGameData();
        message.success("Game Edited Successfully", 2);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const deleteGameFromServer = (gameId) => {
    console.log("Delete Called");
    axios.delete("/game/" + gameId).then(
      (response) => {
        //console.log(response.data);
        getAllGamessFromServer();
        message.success("Game Deleted Successfully", 2);
      },
      (error) => {
        console.log(error);
        message.error("Game Deletion Failed", 2);
      }
    );
  };

  const setGameData = (item) => {
    return new Promise((resolve, reject) => {
      setGame(item);
      resolve(game);
      console.log("Game Data", game);
    });
  };

  const resetGameData = () => {
    setGame({
      name: "",
      url: "",
      author: "",
      id: 0,
    });
    console.log("After Reset", game);
  };

  const showDrawer = () => {
    setOpen(true);
    console.log("Show Drawer Completed");
  };

  const editModeOn = () => {
    setGameEditMode(true);
    console.log("Edit Mode Completed");
  };

  const onClose = () => {
    resetGameData();
    setOpen(false);
    setGameEditMode(false);
  };

  return (
    <div className="game-container">
      <div className="title-container">
        <h1>Games</h1>
        <SearchGame
          getAllGamessFromServer={getAllGamessFromServer}
          getAllGamessFromServerForSearch={getAllGamessFromServerForSearch}
        />
        <Button
          className="btn-drawer"
          type="primary"
          onClick={showDrawer}
          icon={<PlusOutlined />}
        >
          Register Game
        </Button>
      </div>

      <div className="list-container">
        <Row justify="start">
          {games.length > 0
            ? games.map((item) => (
                <GameCard
                  key={item.id}
                  editModeOn={editModeOn}
                  setGameData={setGameData}
                  showDrawer={showDrawer}
                  deleteGameFromServer={deleteGameFromServer}
                  item={item}
                  game={game}
                />
              ))
            : "No games Found"}
        </Row>
      </div>

      <GameForm
        onClose={onClose}
        open={open}
        addGameToServer={addGameToServer}
        addInputValuesForGame={addInputValuesForGame}
        game={game}
      />
    </div>
  );
};

export default Game;
