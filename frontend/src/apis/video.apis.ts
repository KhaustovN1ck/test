import axios from 'axios';
import {IVideo} from "../store/videos/models/video.interface";

export default class VideoApis {
    static readonly axiosInstance = axios.create({
        baseURL: 'http://localhost:3001/api/v1/videos'
    });

    static async fetchVideosList(): Promise<IVideo[]> {
        const response = await VideoApis.axiosInstance.get('/');
        return response.data as IVideo[];
    }

    static async createNewVideo(data: FormData): Promise<IVideo> {
        const res = await VideoApis.axiosInstance.post('/', data);
        return res.data as IVideo;
    }
}