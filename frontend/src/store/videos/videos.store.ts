import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {IVideo} from "./models/video.interface";

export interface IVideosState extends EntityState {
    videos: IVideo[],
    newVideo: Partial<IVideo>,
}

const initialState: IVideosState = {
    videos: [],
    newVideo: {
        videoName: ''
    }
}

@StoreConfig({name: 'videos'})
export class VideosStore extends EntityStore<IVideosState> {
    constructor() {
        super(initialState);
    }
}

export const videosStore = new VideosStore();