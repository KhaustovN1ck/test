import {QueryEntity} from "@datorama/akita";
import {IVideosState, VideosStore, videosStore} from "./videos.store";

export class VideosQuery extends QueryEntity<IVideosState> {

    videos$ = this.select(state => state.videos);
    isLoading$ = this.select(state => state.loading);
    newVideo$ = this.select(state => state.newVideo);

    constructor(protected videoStore: VideosStore) {
        super(videoStore);
    }
}

export const videoQuery = new VideosQuery(videosStore);