import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    StyleSheet,
    FlatList,
    Platform,
    View,
    Text,
    ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as orderActions from "../../redux/actions/orderActions";
import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import Colors from "../../constants/Colors";

const OrdersScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const orders = useSelector((state) => state.orders.orders);
    const dispatch = useDispatch();

    const fetchData = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(orderActions.fetchOrders());
        } catch (error) {
            setError(error.message);
        }

        setIsLoading(false);
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>{error}</Text>
            </View>
        );
    }

    if (orders.length === 0) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>No Orders found</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={(itemdata) => (
                <OrderItem
                    id={itemdata.item.id}
                    items={itemdata.item.items}
                    amount={itemdata.item.totalAmount}
                    date={itemdata.item.ReadableDate}
                />
            )}
        />
    );
};

export const screenOptions = (navData) => {
    return {
        headerTitle: "Your Orders",
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={
                        Platform.OS === "android" ? "md-menu" : "ios-menu"
                    }
                    onPress={() => navData.navigation.toggleDrawer()}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default OrdersScreen;
