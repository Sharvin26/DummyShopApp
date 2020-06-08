import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Button,
    ActivityIndicator,
    Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as cartItems from "../../redux/actions/cartActions";
import * as ordersAction from "../../redux/actions/orderActions";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";

const CartScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const cartTotalAmmount = useSelector((state) => state.cart.totalAmount);
    const dispatch = useDispatch();
    const cardItems = useSelector((state) => {
        let transformedItems = [];
        for (const key in state.cart.items) {
            transformedItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });
        }
        return transformedItems.sort((a, b) =>
            a.productId > b.productId ? 1 : -1
        );
    });

    const sendOrderHandler = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await dispatch(ordersAction.addOrder(cardItems, cartTotalAmmount));
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (error) {
            Alert.alert("An Error Occured", error, [{ text: "Okay" }]);
        }
    }, [error]);

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:{" "}
                    <Text style={styles.ammount}>
                        ${(Math.round(cartTotalAmmount.toFixed(2)) * 100) / 100}
                    </Text>
                </Text>
                {isLoading ? (
                    <ActivityIndicator size="small" color={Colors.primary} />
                ) : (
                    <Button
                        title="Order Now"
                        color={Colors.primary}
                        disabled={cardItems.length === 0}
                        onPress={sendOrderHandler}
                    />
                )}
            </Card>
            <FlatList
                data={cardItems}
                keyExtractor={(item) => item.productId}
                renderItem={(itemData) => (
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deleteAble
                        onAdd={() => {
                            const product = {
                                id: itemData.item.productId,
                                title: itemData.item.productTitle,
                                price: itemData.item.productPrice,
                                quantity: itemData.item.quantity,
                                sum: itemData.item.sum,
                            };
                            dispatch(cartItems.addToCart(product));
                        }}
                        onRemove={() => {
                            dispatch(
                                cartItems.removeFromCart(
                                    itemData.item.productId
                                )
                            );
                        }}
                    />
                )}
            />
        </View>
    );
};

export const screenOptions = {
    headerTitle: "Your cart",
};

export default CartScreen;

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontFamily: "open-sans-bold",
        fontSize: 18,
    },
    ammount: {
        color: Colors.primary,
    },
});
