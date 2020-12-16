import VideoApis from "../apis/video.apis";
import {videosService} from "../store/videos/videos.service";
import {videosStore} from "../store/videos/videos.store";
import {testVideo} from "./video-item.test";

describe('Video store tests', () => {

    test('Should fetch data and save it in store', async () => {
        const spy = jest.spyOn(VideoApis, 'fetchVideosList').mockImplementation(() => Promise.resolve([]));
        await videosService.fetchVideos();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(videosStore.getValue().videos).toHaveLength(0);
    });

    test('Should mutate state properly', async () => {
        const expectedVName = 'Foo Bar';
        const expectedFName = '1234';
        videosService.changeNewVideo({
            videoName: expectedVName,
        });
        videosService.changeNewVideo({
            fileName: expectedFName,
        });
        const {newVideo: {fileName, videoName}} = videosStore.getValue();
        expect(videoName).toEqual(expectedVName);
        expect(fileName).toEqual(expectedFName);
    });

    test('Should send upload request and refresh videos list', async () => {
        const spy = jest.spyOn(VideoApis, 'fetchVideosList').mockImplementation(() => Promise.resolve([testVideo]));
        const submitSpy = jest.spyOn(VideoApis, 'createNewVideo').mockImplementation(() => Promise.resolve(testVideo));
        videosService.changeNewVideo({
            videoName: 'Foo bar',
            fileName: 'Foo Baz',
        });
        await videosService.submitNewVideo();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(videosStore.getValue().videos).toEqual([testVideo]);
    });
})