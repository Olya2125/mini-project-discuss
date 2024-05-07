import Header from "@/components/header/page";
import React from "react";
import {Textarea} from "@nextui-org/input";
import { Button } from "@nextui-org/react";



export default function ViewPost() {
  return (
    <div>
      <Header />
<div>
    <h3>Implementing Charts</h3>
    <p>I'm trying to add a chart into my application, can anyone help me out?</p>
</div>
<Textarea
      placeholder="Enter your description"
      className="max-w-xs"
    />

    <Button>Save</Button>
    <p>All 20 comments</p>
    </div>
  );
}
