import React from "react";
import "./GameForm.css";
import { Button, Drawer, Form, Input, Space } from "antd";

const GameForm = ({
  onClose,
  open,
  addGameToServer,
  addInputValuesForGame,
  game,
}) => {
  //console.log("Since Game Changed, Game form Re rendered", game);
  const [form] = Form.useForm();

  return (
    <div>
      <Drawer
        title="Create a new Game"
        width={420}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={(e) => {
                onClose();
                addGameToServer(e);
                form.resetFields();
              }}
              type="primary"
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          key={game.id}
          layout="vertical"
          initialValues={{
            ["name"]: game.name,
            ["url"]: game.url,
            ["author"]: game.author,
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please Enter Game Name",
              },
            ]}
          >
            <Input
              placeholder="Please enter Game Name"
              onChange={(e) => {
                addInputValuesForGame("name", e);
              }}
              value={game.name}
            />
          </Form.Item>

          <Form.Item
            name="url"
            label="Url"
            rules={[
              {
                required: true,
                message: "Please Enter Url",
              },
            ]}
          >
            <Input
              placeholder="Please enter Game Image Url"
              onChange={(e) => {
                addInputValuesForGame("url", e);
              }}
              value={game.url}
            />
          </Form.Item>

          <Form.Item
            name="author"
            label="Author"
            rules={[
              {
                required: true,
                message: "Please Enter Authors Name",
              },
            ]}
          >
            <Input
              placeholder="Please enter Author's Name"
              onChange={(e) => {
                addInputValuesForGame("author", e);
              }}
              value={game.author}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default GameForm;
