import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CartItem from "./CartItem";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";

const OrderItem = (props) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>
                    ${props.amount.toFixed(2)}
                </Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Text style={styles.orderId}> {props.id}</Text>
            <TouchableOpacity
                onPress={() => {
                    setShowDetails((prevState) => !prevState);
                }}
            >
                <MaterialIcons
                    name={showDetails ? "expand-less" : "expand-more"}
                    size={30}
                    color={Colors.primary}
                />
            </TouchableOpacity>
            {showDetails && (
                <View style={styles.detailItems}>
                    {props.items.map((cartItem) => (
                        <CartItem
                            key={cartItem.productId}
                            title={cartItem.productTitle}
                            quantity={cartItem.quantity}
                            amount={cartItem.sum}
                        />
                    ))}
                </View>
            )}
        </Card>
    );
};

export default OrderItem;

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: "center",
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 15,
    },
    totalAmount: {
        fontFamily: "open-sans-bold",
        fontSize: 18,
    },
    date: {
        fontFamily: "open-sans",
        fontSize: 18,
        color: "#888",
    },
    orderId: {
        fontFamily: "open-sans-bold",
        fontSize: 16,
        marginVertical: 10,
    },
    detailItems: {
        width: "100%",
    },
});
