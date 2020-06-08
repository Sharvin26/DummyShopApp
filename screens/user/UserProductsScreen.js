import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
    Alert,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialIcons } from "@expo/vector-icons";

import * as productsActions from "../../redux/actions/productsActions";
import Colors from "../../constants/Colors";
import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";

const UserProductsScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (error) {
            Alert.alert("Error occured", error, [{ text: "Okay" }]);
        }
    }, [error]);

    const dispatch = useDispatch();
    const userProducts = useSelector((state) => state.products.userProducts);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            await dispatch(productsActions.fetchProducts());
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    let Touchable = TouchableOpacity;
    if (Platform.OS === "android" && Platform.Version > 21) {
        Touchable = TouchableNativeFeedback;
    }

    const editProduct = (id, title) => {
        props.navigation.navigate("EditProduct", {
            productId: id,
            productTitle: title,
        });
    };

    const deleteHandler = (id) => {
        Alert.alert("Are you sure? ", "Do you want to delete the item?", [
            { text: "No", style: "default" },
            {
                text: "Yes",
                style: "destructive",
                onPress: async () => {
                    try {
                        setError(null);
                        setIsLoading(true);
                        await dispatch(productsActions.deleteProduct(id));
                        setIsLoading(false);
                    } catch (error) {
                        setIsLoading(false);
                        setError(error.message);
                    }
                },
            },
        ]);
    };

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (userProducts.length === 0) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>No Products found</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        editProduct(itemData.item.id, itemData.item.title);
                    }}
                >
                    <Touchable
                        onPress={() => {
                            editProduct(itemData.item.id, itemData.item.title);
                        }}
                        useForeground
                    >
                        <MaterialIcons
                            name="edit"
                            size={30}
                            color={Colors.primary}
                        />
                    </Touchable>
                    <Touchable
                        onPress={deleteHandler.bind(this, itemData.item.id)}
                        useForeground
                    >
                        <MaterialIcons
                            name="delete"
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
        headerTitle: "Admin Panel",
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
                    title="Add"
                    iconName={
                        Platform.OS === "android"
                            ? "md-add-circle"
                            : "ios-add-circle"
                    }
                    onPress={() => navData.navigation.navigate("EditProduct")}
                />
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

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default UserProductsScreen;
