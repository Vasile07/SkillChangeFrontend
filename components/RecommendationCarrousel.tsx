import React, {useState} from "react";
import {StyleSheet} from "react-native";
import {GestureHandlerRootView, PanGestureHandler} from "react-native-gesture-handler";
import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import RecommendationActivityCard from "./RecommendationActivityCard";

const step = 120;
const distanceZ = 140;

const RecommendationCarrousel: React.FC<{ items: any[] }> = ({items}) => {
    const rotation = useSharedValue(0);
    const [zIndexes, setZIndexes] = useState<number[]>(items.map((_, index) => (index === 0 ? 100 : 5)));

    const handleGesture = (event: any) => {
        console.log(event)
        if (Math.abs(event.nativeEvent.translationX) > Math.abs(event.nativeEvent.translationY)) {
            const direction = event.nativeEvent.translationX > 0 ? 1 : -1;
            rotation.value = withSpring(rotation.value + step * direction);

            runOnJS(updateZIndexes)(rotation.value + step * direction);
        }
    };

    const updateZIndexes = (newRotation: number) => {
        setZIndexes((prev) =>
            prev.map((_, index) => {
                const angle = (index * step + newRotation) % 360;
                const isFront = Math.abs(angle) < step / 2;
                return isFront ? 100 : 5;
            })
        );
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <PanGestureHandler onEnded={handleGesture}>
                <Animated.View style={styles.carousel}>
                    {items.map((item, index) => {
                        const angle = index * step;

                        const animatedStyle = useAnimatedStyle(() => ({
                            transform: [
                                {perspective: 800},
                                {rotateY: `${rotation.value + angle}deg`},
                                {translateZ: distanceZ},
                            ],
                        }));

                        return (
                            <Animated.View key={index}
                                           style={[styles.carouselItem, animatedStyle, {zIndex: zIndexes[index]}]}>
                                <RecommendationActivityCard id={item.skillId} image={item.picture} title={item.name}
                                                            isFront={zIndexes[index] === 100}/>
                            </Animated.View>
                        );
                    })}
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, alignItems: "center", justifyContent: "center"},
    carousel: {position: "relative", width: 190, height: 210},
    carouselItem: {position: "absolute", width: 170, height: 190, borderRadius: 6,},
});

export default RecommendationCarrousel;
