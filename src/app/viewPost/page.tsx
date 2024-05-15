
import React from "react";
import {Textarea} from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import styles from "@/components/styles.module.css"



export default function ViewPost() {
  return (
    <div>

<div className="flex flex-col items-center  p-10">
    <h3 >Implementing Charts</h3>
    <p >I'm trying to add a chart into my application, can anyone help me out?</p>

<Textarea
      placeholder="Enter your description"
      
    />

    <Button
    color="primary"
    variant="solid"
    size="md"
    radius="sm"
    type="submit">Save</Button>
       <p>All 20 comments</p>
    </div>



    </div>

  );
}
