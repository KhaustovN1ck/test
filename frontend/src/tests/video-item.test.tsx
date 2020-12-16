import {shallow} from "enzyme";
import {VideoItem} from "../components/video-item";
import {IVideo} from "../store/videos/models/video.interface";
import {List} from "semantic-ui-react";
import React from "react";

export const testVideo: IVideo = {
    id: '123',
    fileName: 'asdasd',
    createdTime: new Date().toISOString(),
    videoName: 'Test String',
    extension: '',
    updatedTime: new Date().toISOString(),
};

describe('Video Item Tests', () => {

    it('Should render React Player', () => {
        const app = shallow(<VideoItem video={testVideo}/>);
        expect(app.find('ReactPlayer')).toHaveLength(1);
    });

    it('should display proper videoName', () => {
        const app = shallow(<VideoItem video={testVideo}/>);
        expect(app.contains('Test String')).toBeTruthy();
    })
});