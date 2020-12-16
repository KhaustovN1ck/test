import {VideosStore, videosStore} from "./videos.store";
import VideoApis from "../../apis/video.apis";
import {IVideo} from "./models/video.interface";
import {transaction} from "@datorama/akita";

export class VideosService {
    constructor(private readonly videosStore: VideosStore) {
    }

    changeNewVideo(data: Partial<IVideo>) {
        this.videosStore.update(state => ({
            ...state,
            newVideo: {
                ...state.newVideo,
                ...data,
            }
        }))
    }

    async fetchVideos() {
        try {
            this.videosStore.setLoading(true);
            const videos = await VideoApis.fetchVideosList();
            this.videosStore.update(state => ({
                ...state,
                videos,
            }))
        } finally {
            this.videosStore.setLoading(false);
        }
    }

    @transaction()
    async submitNewVideo() {
        try {
            this.videosStore.setLoading(true);
            const state = this.videosStore.getValue();
            const formData = new FormData();
            formData.append('file', state.newVideo.fileName!);
            formData.append('videoName', state.newVideo.videoName!);
            await VideoApis.createNewVideo(formData);
            await this.fetchVideos();
        } finally {
            this.videosStore.setLoading(false);
        }
    }
}

export const videosService = new VideosService(videosStore);
