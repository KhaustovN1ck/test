import React, {useCallback, useState} from "react";
import {Button, Header, Input, Message} from "semantic-ui-react";
import {InputFile} from 'semantic-ui-react-input-file'
import {videosService} from "../store/videos/videos.service";
import {useObservable} from "@libreact/use-observable";
import {videoQuery} from "../store/videos/videos.query";

export const UploadVideo = () => {

    const [isSuccessful, setIsSuccessful] = useState(false);

    const [newVideo] = useObservable(videoQuery.newVideo$);
    const [loading] = useObservable(videoQuery.isLoading$);

    const onFileNameChange = useCallback((evt) => {
        videosService.changeNewVideo({
            videoName: evt.target.value,
        })
    }, []);

    const handleUpload = useCallback((evt) => {
        videosService.changeNewVideo({
            fileName: evt.target.files[0],
        })
    }, []);

    const submit = useCallback(async () => {
        await videosService.submitNewVideo();
        setIsSuccessful(true)
    }, [setIsSuccessful]);

    return (
        <>
            <Header size="large">
                Upload a video
            </Header>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Input style={{marginBottom: 20}} onChange={onFileNameChange} placeholder="Enter video name..."/>
                <InputFile
                    button={{
                        size: 'huge',
                    }}
                    input={{
                        id: 'file-upload',
                        onChange: handleUpload
                    }}
                />
                <Button loading={loading} style={{width: '50%', margin: '10px auto'}}
                        disabled={loading || !newVideo.fileName || !newVideo.videoName} onClick={submit}>
                    Save new video
                </Button>

                {isSuccessful && <Message positive>
                    <Message.Header>Video was successfully saved</Message.Header>
                    <p>
                        Now you can see it in the video list on the home page.
                    </p>
                </Message>}
            </div>
        </>
    )
}