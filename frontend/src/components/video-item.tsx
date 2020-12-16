import React from "react";
import {List} from "semantic-ui-react";
import {IVideo} from "../store/videos/models/video.interface";
import {prettifyDate} from "../utils/prettify-date";
import CssClasses from './video-item.module.scss';
// No declarations :(
// @ts-ignore
import ReactPlayer from "react-player";

interface IProps {
    video: IVideo;
}

export const BASE_VIDEO_PATH = `http://localhost:3001`;

export const VideoItem: React.FC<IProps> = (props) => {
    const videoUrl = `${BASE_VIDEO_PATH}/${props.video.fileName}`;
    return <>

        <List.Item className={CssClasses.wrapper}>
            <ReactPlayer
                className="videoFrame"
                url={videoUrl}
                width={250}
                height={100}
                light="https://www.masterpet.com/wp-content/uploads/2015/11/video-placeholder.jpg"
                playing
                controls
            />
            <List.Content className={CssClasses.list_item_content}>
                <List.Header as='a'>{props.video.videoName}</List.Header>
                <List.Description>
                    <a>
                        <b>Created:</b>
                    </a>{' '}
                    {prettifyDate(props.video.createdTime)}
                </List.Description>
            </List.Content>
        </List.Item>
    </>
}