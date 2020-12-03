import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { READ_OPERATION, REMOVE_OPERATION } from "../graphql/graphql";
import "./main.css";
import { AddNew } from "./AddNew";
import FlipMove from "react-flip-move";
import Loader from "./Loader";

export default function Home() {
  const { loading, error, data } = useQuery(READ_OPERATION);
  const [removeRecord] = useMutation(REMOVE_OPERATION);
  let removeData = async (e) => {
    removeRecord({
      variables: {
        id: e,
      },
      refetchQueries: [{ query: READ_OPERATION }],
    });
  };
  if (loading) {
    return <Loader />;
  }
  console.log(error);
  if (error) {
    return <div>error ...</div>;
  }
  const listItems = data.read.map((d) => {
    return (
      <div className="list" key={d.id}>
        <p>
          <input type="text" disabled value={d.todo} />
          <span>
            <span className="i" onClick={() => removeData(d.id)}>
              🗑️
            </span>
          </span>
        </p>
      </div>
    );
  });
  return (
    <div className="App">
      <div>
        <h1>Project 12C</h1>
        <AddNew />
        <FlipMove duration={300} easing="ease-in-out">
          {listItems}
        </FlipMove>
      </div>
    </div>
  );
}
