import React from "react";
import { Platform, SafeAreaView, Button, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import {
    createDrawerNavigator,
    DrawerItemList,
} from "@react-navigation/drawer";

import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import * as authActions from "../redux/actions/authActions";
import Colors from "../constants/Colors";

import ProductsOverViewScreen, {
    screenOptions as ProductsOverViewScreenOptions,
} from "../screens/shop/ProductsOverViewScreen";
import ProductDetailScreen, {
    screenOptions as productDetailScreenOptions,
} from "../screens/shop/ProductDetailScreen";
import CartScreen, {
    screenOptions as cartScreenOptions,
} from "../screens/shop/CartScreen";
import OrdersScreen, {
    screenOptions as orderScreenOptions,
} from "../screens/shop/OrdersScreen";
import UserProductsScreen, {
    screenOptions as userProductsScreenOptions,
} from "../screens/user/UserProductsScreen";
import EditProductScreen, {
    screenOptions as editProductScreenOptions,
} from "../screens/user/EditProductScreen";
import AuthScreen, {
    screenOptions as authScreenOptions,
} from "../screens/user/AuthScreen";

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
    },
    headerTitleStyle: {
        fontFamily: "open-sans-bold",
    },
    headerBackTitleStyle: {
        fontFamily: "open-sans",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
    return (
        <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <ProductsStackNavigator.Screen
                name="ProductsOverView"
                component={ProductsOverViewScreen}
                options={ProductsOverViewScreenOptions}
            />
            <ProductsStackNavigator.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={productDetailScreenOptions}
            />
            <ProductsStackNavigator.Screen
                name="Cart"
                component={CartScreen}
                options={cartScreenOptions}
            />
        </ProductsStackNavigator.Navigator>
    );
};

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
    return (
        <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <OrdersStackNavigator.Screen
                name="Orders"
                component={OrdersScreen}
                options={orderScreenOptions}
            />
        </OrdersStackNavigator.Navigator>
    );
};

const AdminNavigatorStack = createStackNavigator();

export const AdminNavigator = () => {
    return (
        <AdminNavigatorStack.Navigator screenOptions={defaultNavOptions}>
            <AdminNavigatorStack.Screen
                name="UserProducts"
                component={UserProductsScreen}
                options={userProductsScreenOptions}
            />
            <AdminNavigatorStack.Screen
                name="EditProduct"
                component={EditProductScreen}
                options={editProductScreenOptions}
            />
        </AdminNavigatorStack.Navigator>
    );
};

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    const dispatch = useDispatch();
    return (
        <ShopDrawerNavigator.Navigator
            drawerContent={(props) => {
                return (
                    <View style={{ flex: 1, paddingTop: 50 }}>
                        <SafeAreaView
                            forceInset={{ top: "always", horizontal: "never" }}
                        >
                            <DrawerItemList {...props} />
                            <Button
                                title="Logout"
                                color={Colors.primary}
                                onPress={() => {
                                    dispatch(authActions.logout());
                                }}
                            />
                        </SafeAreaView>
                    </View>
                );
            }}
            drawerContentOptions={{
                activeTintColor: Colors.primary,
            }}
        >
            <ShopDrawerNavigator.Screen
                name="Products"
                component={ProductsNavigator}
                options={{
                    drawerIcon: (props) => (
                        <Ionicons
                            name={
                                Platform.OS === "android"
                                    ? "md-cart"
                                    : "ios-cart"
                            }
                            size={23}
                            color={props.color}
                        />
                    ),
                }}
            />
            <ShopDrawerNavigator.Screen
                name="Orders"
                component={OrdersNavigator}
                options={{
                    drawerIcon: (props) => (
                        <Ionicons
                            name={
                                Platform.OS === "android"
                                    ? "md-list"
                                    : "ios-list"
                            }
                            size={23}
                            color={props.color}
                        />
                    ),
                }}
            />
            <ShopDrawerNavigator.Screen
                name="Admin"
                component={AdminNavigator}
                options={{
                    drawerIcon: (props) => (
                        <Ionicons
                            name={
                                Platform.OS === "android"
                                    ? "md-create"
                                    : "ios-create"
                            }
                            size={23}
                            color={props.color}
                        />
                    ),
                }}
            />
        </ShopDrawerNavigator.Navigator>
    );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AuthStackNavigator.Screen
                name="Auth"
                component={AuthScreen}
                options={authScreenOptions}
            />
        </AuthStackNavigator.Navigator>
    );
};
