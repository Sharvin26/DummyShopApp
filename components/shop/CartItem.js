import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}> {props.quantity} x </Text>
                <Text style={styles.mainText}>{props.title} </Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
                {props.deleteAble && (
                    <View style={styles.touchable}>
                        <TouchableOpacity
                            onPress={props.onAdd}
                            style={styles.deleteButton}
                        >
                            <Ionicons
                                name={
                                    Platform.OS === "android"
                                        ? "md-add"
                                        : "ios-add"
                                }
                                size={24}
                                color="red"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={props.onRemove}
                            style={styles.deleteButton}
                        >
                            <Ionicons
                                name={
                                    Platform.OS === "android"
                                        ? "md-remove"
                                        : "ios-remove"
                                }
                                size={24}
                                color="red"
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

export default CartItem;

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginBottom: 10,
    },
    itemData: {
        flexDirection: "row",
        alignItems: "center",
    },
    quantity: {
        fontFamily: "open-sans-bold",
        fontSize: 16,
    },
    mainText: {
        fontFamily: "open-sans-bold",
        fontSize: 16,
    },
    deleteButton: {
        marginLeft: 20,
    },
    touchable: {
        flexDirection: "row",
    },
});
