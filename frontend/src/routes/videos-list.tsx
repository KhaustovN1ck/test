import React from "react";
import {useObservable} from "@libreact/use-observable";
import {videoQuery} from "../store/videos/videos.query";
import {VideoItem} from "../components/video-item";
import {Header, List} from "semantic-ui-react";

export const VideosList = () => {
    const [videos] = useObservable(videoQuery.videos$);
    return (
        <>
            <Header size="large">
                Videos
            </Header>
            <List>
                {videos.map(v => <VideoItem key={v.id} video={v}/>)}
            </List>
        </>
    )
}