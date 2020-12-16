import React, {useCallback} from "react";
import {Container, Icon, Image, Menu} from "semantic-ui-react";
import Logo from "../logo.svg";
import {useHistory} from 'react-router-dom';

export const Layout: React.FC<any> = (props) => {
    const history = useHistory();

    const goToUpload = useCallback(() => {
        history.push('/upload');
    }, [history]);

    const goToHome = useCallback(() => {
        history.push('/');
    }, [history]);

    return (
        <div>
            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item onClick={goToHome} as='a' header>
                        <Image size='mini' src={Logo} style={{marginRight: '1.5em'}}/>
                        Youtube that simply works
                    </Menu.Item>
                    <Menu.Item as='a' onClick={goToUpload}>Upload new video &nbsp; <Icon name="add circle"/></Menu.Item>
                </Container>
            </Menu>

            <Container text style={{marginTop: '7em', minHeight: '300px'}}>
                {/*<Header as='h1'>The videos list:</Header>*/}
                {props.children}
            </Container>

        </div>
    )
}