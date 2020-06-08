import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
    ScrollView,
    StyleSheet,
    Button,
    KeyboardAvoidingView,
    View,
    Platform,
    ActivityIndicator,
    Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import * as authActions from "../../redux/actions/authActions";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value,
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid,
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues,
        };
    }
    return state;
};

const AuthScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: "",
            password: "",
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false,
    });

    useEffect(() => {
        if (error) {
            Alert.alert("An error occured", error, [{ text: "Okay" }]);
        }
    }, [error]);

    const authHandler = async () => {
        let action;
        if (isSignup) {
            action = authActions.signup(
                formState.inputValues.email,
                formState.inputValues.password
            );
        } else {
            action = authActions.login(
                formState.inputValues.email,
                formState.inputValues.password
            );
        }
        setIsLoading(true);
        try {
            setError(null);
            await dispatch(action);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier,
            });
        },
        [dispatchFormState]
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <LinearGradient
                colors={["#ffedff", "#ffe3ff"]}
                style={styles.gradient}
            >
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label="E-mail"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email address"
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            errorText="Please enter a valid password."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        {isLoading ? (
                            <ActivityIndicator
                                size="small"
                                color={Colors.primary}
                                style={{
                                    marginTop: 20,
                                }}
                            />
                        ) : (
                            <View>
                                <View style={styles.buttonContainer}>
                                    <Button
                                        title={isSignup ? "Register" : "Login"}
                                        color={Colors.primary}
                                        onPress={authHandler}
                                    />
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button
                                        title={`Switch to ${
                                            isSignup ? "Login" : "Sign Up"
                                        }`}
                                        color={Colors.accent}
                                        onPress={() => {
                                            setIsSignup(
                                                (prevState) => !prevState
                                            );
                                        }}
                                    />
                                </View>
                            </View>
                        )}
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

export const screenOptions = {
    headerTitle: "ShopApp",
};

export default AuthScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    authContainer: {
        width: "80%",
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
    },
    buttonContainer: {
        marginTop: 10,
    },
});
