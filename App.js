import React from 'react';
import Loading from './Loading';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import axios from 'axios';

const API_KEY = '682921757479b7e40b8f6f77151397d4';

export default class extends React.Component {
    state = {
        isLoading: true,
    };

    getWeather = async (latitude, longitude) => {
        const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`);
        //openweathermap 에서 API 가져오기  ( 경도와 위도 사용 )
        // data 값을 이용하여 위치에 맞는 날씨 보여주기
        // axios란 = Axios는 브라우저, Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리입니다.
        //쉽게 말해서 백엔드랑 프론트엔드랑 통신을 쉽게하기 위해 Ajax와 더불어 사용합니다.
        console.log(data);
    };

    getLocation = async () => {
        try {
            await Location.requestPermissionsAsync();
            const {
                coords: { latitude, longitude },
            } = await Location.getCurrentPositionAsync();
            this.getWeather(latitude, longitude);
            this.setState({ isLoading: false });
        } catch (error) {
            Alert.alert("Can't find you.", 'So sad');
        }
    };

    componentDidMount() {
        this.getLocation();
    }

    render() {
        const { isLoading } = this.state;
        return isLoading ? <Loading /> : null;
    }
}
