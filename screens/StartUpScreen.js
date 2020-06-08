import React, { useEffect } from "react";
import {
    StyleSheet,
    ActivityIndicator,
    View,
    AsyncStorage,
} from "react-native";

import { useDispatch } from "react-redux";

import * as authActions from "../redux/actions/authActions";
import Colors from "../constants/Colors";

const StartUpScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem("userData");
            if (!userData) {
                dispatch(authActions.setDidTryAL());
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, userId, expiryDate } = transformedData;
            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date() || !token || !userId) {
                dispatch(authActions.setDidTryAL());
                return;
            }

            const expirationTime =
                expirationDate.getTime() - new Date().getTime();

            dispatch(authActions.authenticate(userId, token, expirationTime));
        };
        tryLogin();
    }, [dispatch]);
    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    );
};

export default StartUpScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
