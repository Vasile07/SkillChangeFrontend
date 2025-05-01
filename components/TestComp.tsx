import {Text, View} from "react-native";
import React, {useEffect} from "react";
import {useStorageSystem} from "@/hooks/useStorageSystem";


const TestComp: React.FC<{ type: string }> = ({type}) => {
    const [objects, setObjects] = useStorageSystem<string[]>(type, []);

    function delay(ms: number): Promise<string[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const a = Math.floor(Math.random() * 100);

                // Create the list of long strings
                const longStrings = [a, a + 1, a + 2, a + 3, a + 4].map((nr) => {
                    const base = `${type}_obj${nr}`;
                    const repeatCount = Math.max(0, 5_00 - base.length);
                    return base + type.repeat(repeatCount);
                });

                resolve(longStrings); // Return the list after the delay
            }, ms);
        });
    }

    useEffect(() => {
        delay(10000).then((result) => {
            setObjects(result); // Set the long strings in the state
        });
    }, [type])


    return (
        <View style={{width: "100%", display: "flex", flexDirection: "column", gap: 10, alignItems: "center"}}>
            {
                objects.map(str => (
                    <Text key={str}>{str}</Text>
                ))
            }
        </View>
    )
}

export default TestComp