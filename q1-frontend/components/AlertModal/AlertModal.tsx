import { send } from "process";
import { SetStateAction, Dispatch, FormEvent, useState } from "react";
import { TableContents, Alert } from "../Table/Table";

interface AlertModalProps {
  useContents: Dispatch<SetStateAction<TableContents>>,
  contents: contents
}

export default function AlertModal({useContents, contents}: AlertModalProps) {
  function onSubmitEvent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newAlert: Alert = {
      alert: (e.target as any).elements[0].value,
      status: "",
      updates: []
    }

    const newContents: TableContents = {...contents,
      rowContents: [...contents.rowContents].concat(newAlert)
    } 

    useContents(newContents)
  }

  
  return (
    <form data-testid='form' onSubmit={onSubmitEvent}>
      <label> Add new alert: </label>
      <input type='text' id='alert' name='alert' />
      <button type='submit'> Add </button>
    </form>
  )
}
