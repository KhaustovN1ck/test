import React from 'react';
import App from '../App';
import {shallow} from "enzyme";

describe('App Tests', () => {
    test('renders app', () => {
        const app = shallow(<App/>);
        expect(app).toBeTruthy();
    });

    test('shoud load list of videos', () => {
        const app = shallow(<App />);
        expect(app.find('Route')).toHaveLength(2);
    });
})