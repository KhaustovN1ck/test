import React, {useEffect} from 'react'
import 'semantic-ui-css/semantic.min.css';
import {Layout} from "./layout";
import {BrowserRouter, Route} from 'react-router-dom';
import {VideosList} from "./routes/videos-list";
import {UploadVideo} from "./routes/upload-video";
import {videosService} from "./store/videos/videos.service";

const App = () => {

    useEffect(() => {
        videosService.fetchVideos();
    }, []);

    return (
        <BrowserRouter>
            <Layout>
                <Route path="/" exact component={VideosList}/>
                <Route path="/upload" exact component={UploadVideo}/>
            </Layout>
        </BrowserRouter>
    )
}

export default App;