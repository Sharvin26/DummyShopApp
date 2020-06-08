import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    Text,
    View,
    Image,
} from "react-native";
import Card from "../UI/Card";

const ProductItem = (props) => {
    let Touchable = TouchableOpacity;
    if (Platform.OS === "android" && Platform.Version > 21) {
        Touchable = TouchableNativeFeedback;
    }
    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
                <Touchable onPress={props.onSelect} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: props.image }}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>
                                ${props.price.toFixed(2)}
                            </Text>
                        </View>
                        <View style={styles.action}>{props.children}</View>
                    </View>
                </Touchable>
            </View>
        </Card>
    );
};

export default ProductItem;

const styles = StyleSheet.create({
    product: {
        height: 350,
        margin: 20,
    },
    touchable: {
        overflow: "hidden",
        borderRadius: 10,
    },

    imageContainer: {
        width: "100%",
        height: "60%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    details: {
        alignItems: "center",
        height: "17%",
        padding: 10,
    },
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 18,
        marginVertical: 2,
    },
    price: {
        fontFamily: "open-sans",
        fontSize: 16,
        color: "#888",
    },
    action: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "23%",
        paddingHorizontal: 20,
        marginTop: "1%",
    },
});
