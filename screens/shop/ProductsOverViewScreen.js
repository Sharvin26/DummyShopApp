import React, { useState, useEffect, useCallback } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
    ActivityIndicator,
    Button,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import * as cartActions from "../../redux/actions/cartActions";
import * as productsActions from "../../redux/actions/productsActions";
import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";

const ProductsOverViewScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products = useSelector((state) => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch]);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", loadProducts);
        return () => {
            unsubscribe();
        };
    }, [loadProducts]);

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [loadProducts]);

    let Touchable = TouchableOpacity;
    if (Platform.OS === "android" && Platform.Version > 21) {
        Touchable = TouchableNativeFeedback;
    }

    const selectItemHandler = (id, title) => {
        props.navigation.navigate("ProductDetail", {
            productId: id,
            productTitle: title,
        });
    };

    const quantity = useSelector((state) => {
        let quantityArr = {};
        if (state.cart.items) {
            for (const key in state.cart.items) {
                quantityArr[key] = state.cart.items[key].quantity;
            }
            return quantityArr;
        }
    });

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An Error occured</Text>
                <Button
                    title="Try Again"
                    onPress={loadProducts}
                    color={Colors.primary}
                />
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found. Start adding some</Text>
            </View>
        );
    }
    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
                <ProductItem
                    id={itemData.item.id}
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(
                            itemData.item.id,
                            itemData.item.title
                        );
                    }}
                >
                    {quantity[itemData.item.id] > 0 && (
                        <Touchable
                            onPress={() => {
                                dispatch(
                                    cartActions.removeFromCart(itemData.item.id)
                                );
                            }}
                            useForeground
                        >
                            <MaterialIcons
                                name="remove-shopping-cart"
                                size={30}
                                color={Colors.primary}
                            />
                        </Touchable>
                    )}

                    <Text style={styles.quantityText}>
                        {" "}
                        {quantity[itemData.item.id]
                            ? quantity[itemData.item.id]
                            : 0}{" "}
                    </Text>
                    <Touchable
                        onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item));
                        }}
                        useForeground
                    >
                        <MaterialIcons
                            name="add-shopping-cart"
                            size={30}
                            color={Colors.primary}
                        />
                    </Touchable>
                </ProductItem>
            )}
        />
    );
};

export const screenOptions = (navData) => {
    return {
        headerTitle: "All Products",
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
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Cart"
                    iconName={
                        Platform.OS === "android" ? "md-cart" : "ios-cart"
                    }
                    onPress={() => navData.navigation.navigate("Cart")}
                />
            </HeaderButtons>
        ),
    };
};

export default ProductsOverViewScreen;

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    quantityText: {
        fontSize: 20,
        fontFamily: "open-sans-bold",
    },
});
