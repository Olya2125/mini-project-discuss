import Header from "@/components/header/page";
import PostCard from "@/components/PostCard/page";
import React from 'react';
import { Button } from "@nextui-org/react";
import PostListView from "@/components/listTopicView/page";


 export default function ViewTopic () {


    return(
        <div>
            <Header/>
            <div className="main_head">
<div>
<h3>jhvghjgjhg</h3>
            <PostCard title=""/>
        </div>
        <div className="t">
        <Button className="button">Create Post</Button>
    
    
    <PostListView title=""  />
    
        </div>
        </div>
        </div>
    )
 }