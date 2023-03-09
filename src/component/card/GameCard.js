import React from "react";
import "./GameCard.css";
import { Input, Card, Col } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Meta } = Card;

const GameCard = ({
  editModeOn,
  setGameData,
  showDrawer,
  deleteGameFromServer,
  item,
  game,
}) => {
  return (
    <div>
      <Col span={4}>
        <Card
          hoverable
          style={{
            width: 200,
            height: 390,
            margin: 10,
            padding: 0,
          }}
          cover={
            <img
              style={{
                width: 200,
                height: 245,
              }}
              alt="example"
              src={item.url}
            />
          }
        >
          <Meta
            style={{
              padding: 0,
              marginBottom: 10,
            }}
            title={item.name}
            description={`Published by ${item.author} on ${item.publishedDate}`}
          />
          <EditOutlined
            style={{
              marginRight: 5,
            }}
            onClick={() => {
              console.log("Edit clicked xxxxx");
              setGameData(item)
                .then(() => {
                  editModeOn();
                })
                .then(() => {
                  showDrawer();
                });
            }}
          />
          <DeleteOutlined
            style={{
              marginLeft: 5,
            }}
            onClick={() => deleteGameFromServer(item.id)}
          />
        </Card>
      </Col>
    </div>
  );
};

export default GameCard;
