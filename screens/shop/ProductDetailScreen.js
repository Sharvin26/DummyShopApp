import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import * as cartActions from "../../redux/actions/cartActions";
import Colors from "../../constants/Colors";

const ProductDetailScreen = (props) => {
    const productId = props.route.params.productId;
    const quantity = useSelector((state) =>
        state.cart.items[productId] ? state.cart.items[productId].quantity : 0
    );
    const selectedProduct = useSelector((state) =>
        state.products.availableProducts.find((prod) => prod.id === productId)
    );
    let Touchable = TouchableOpacity;
    if (Platform.OS === "android" && Platform.Version > 21) {
        Touchable = TouchableNativeFeedback;
    }
    const dispatch = useDispatch();
    return (
        <ScrollView>
            <Image
                style={styles.image}
                source={{ uri: selectedProduct.imageUrl }}
                resizeMode="cover"
            />
            <View style={styles.action}>
                {quantity > 0 && (
                    <Touchable
                        onPress={() => {
                            dispatch(
                                cartActions.removeFromCart(selectedProduct.id)
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

                <Text style={styles.quantityText}> {quantity} </Text>

                <Touchable
                    onPress={() => {
                        dispatch(cartActions.addToCart(selectedProduct));
                    }}
                >
                    <MaterialIcons
                        name="add-shopping-cart"
                        size={30}
                        color={Colors.primary}
                    />
                </Touchable>
            </View>
            <Text style={styles.price}>
                ${selectedProduct.price.toFixed(2)}
            </Text>
            <Text style={styles.description}>
                {selectedProduct.description}
            </Text>
        </ScrollView>
    );
};

export const screenOptions = (navData) => {
    const headerTitle = navData.route.params.productTitle;
    return {
        headerTitle: headerTitle,
    };
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 280,
    },
    action: {
        flexDirection: "row",
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    quantityText: {
        fontSize: 20,
        fontFamily: "open-sans-bold",
    },
    price: {
        fontSize: 20,
        color: "#888",
        textAlign: "center",
        marginVertical: 20,
        fontFamily: "open-sans-bold",
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        marginHorizontal: 20,
        fontFamily: "open-sans",
    },
});
