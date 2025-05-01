import {Platform} from "react-native";
import * as SecureStore from "expo-secure-store";
import {useEffect, useReducer} from "react";

// ---------- IndexedDB utils (web only) ----------
function getIndexedDB() {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open("AppStorageDB", 1);
        request.onupgradeneeded = () => {
            request.result.createObjectStore("store");
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function setIndexedDBItem<T>(key: string, value: T | null) {
    const db = await getIndexedDB();
    const tx = db.transaction("store", "readwrite");
    const store = tx.objectStore("store");

    return new Promise<void>((resolve, reject) => {
        let request: IDBRequest;

        if (value === null) {
            request = store.delete(key);
        } else {
            request = store.put(value, key);
        }

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

async function getIndexedDBItem<T>(key: string): Promise<T | null> {
    const db = await getIndexedDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction("store", "readonly");
        const request = tx.objectStore("store").get(key);
        request.onsuccess = () => resolve(request.result ?? null);
        request.onerror = () => reject(request.error);
    });
}

// ---------- Hook logic ----------
type UseStateHook<T> = [T, (value: T) => void];

function useAsyncState<T>(initialValue: T): UseStateHook<T> {
    return useReducer(
        (state: T, action: T): T => action,
        initialValue
    ) as UseStateHook<T>;
}

async function setStorageItemAsync<T>(key: string, value: T | null) {
    if (Platform.OS === 'web') {
        await setIndexedDBItem<T>(key, value);
    } else {
        if (value == null) {
            await SecureStore.deleteItemAsync(key);
        } else {
            await SecureStore.setItemAsync(key, JSON.stringify(value));
        }
    }
}

async function getStorageItemAsync<T>(key: string): Promise<T | null> {
    if (Platform.OS === 'web') {
        return await getIndexedDBItem<T>(key);
    } else {
        const result = await SecureStore.getItemAsync(key);
        return result != null ? JSON.parse(result) : null;
    }
}

export function useStorageSystem<T>(key: string, initialValue: T): UseStateHook<T> {
    const [state, setState] = useAsyncState<T>(initialValue);
    // const [state, setState] = useState<T>(initialValue);

    useEffect(() => {
        const loadStoredValue = async () => {
            try {
                const storedValue = await getStorageItemAsync<T>(key);
                if (storedValue !== null && storedValue !== undefined) {
                    // Only update state if there is data in storage
                    setState(storedValue);
                } else {
                    setState(initialValue)
                }
                // If there's no stored value, initialValue will remain the default.
            } catch (e) {
                console.error('Error reading from storage:', e);
            }
        };
        loadStoredValue();
    }, [key]);

    // const setValue = useCallback(
    const setValue =
        (newValue: T) => {
            let updatedValue = newValue;
            const currentValue = state;

            // If the current state is an array and the new value is an array, diff them
            if (Array.isArray(currentValue) && Array.isArray(newValue)) {
                const currentSet = new Set(currentValue);
                const nextSet = new Set(newValue);

                updatedValue = [
                    ...currentValue.filter(x => nextSet.has(x)),
                    ...newValue.filter(x => !currentSet.has(x))
                ] as unknown as T;
            }
            // If the current state is an object and the new value is an object, merge them
            else if (
                typeof currentValue === 'object' &&
                currentValue !== null &&
                typeof newValue === 'object' &&
                newValue !== null
            ) {
                updatedValue = {...currentValue, ...newValue};
            }

            setStorageItemAsync<T>(key, updatedValue).then((res) => setState(updatedValue));
        }
    //     },
    //     [key, state]
    // );

    return [state, setValue];
}