import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_OPERATION, READ_OPERATION } from "../graphql/graphql";

export const AddNew = () => {
  const [addNewRecord] = useMutation(ADD_OPERATION);
  const [todo, settodo] = React.useState("");

  let addRecord = (e) => {
    e.preventDefault();
    try {
      addNewRecord({
        variables: {
          todo: todo,
        },
        refetchQueries: [{ query: READ_OPERATION }],
      });
    } catch (err) {
      return <div>error</div>;
    }
  };
  const handleChange = (e) => {
    settodo(e.target.value);
  };
  return (
    <>
      <form onSubmit={(e) => addRecord(e)} id="to-do-form">
        <input onChange={handleChange} type="text" placeholder="Enter task" />
        <button type="submit">Add</button>
      </form>
    </>
  );
};
