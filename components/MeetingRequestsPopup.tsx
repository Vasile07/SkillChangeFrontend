import React from 'react';
import {FlatList, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import MeetingNotification from '@/datas/MeetingNotification';

interface MeetingRequestsPopupProps {
    visible: boolean;
    meetingRequests: MeetingNotification[];
    onAccept: (id: number) => void;
    onDecline: (id: number) => void;
    onClose: () => void;
}

export const MeetingRequestsPopup = ({
                                         visible,
                                         meetingRequests,
                                         onAccept,
                                         onDecline,
                                         onClose,
                                     }: MeetingRequestsPopupProps) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Pending Meeting Requests</Text>

                    {meetingRequests.length === 0 ? (
                        <Text style={styles.emptyText}>No pending requests</Text>
                    ) : (
                        <FlatList
                            data={meetingRequests}
                            keyExtractor={(item) => item.meetingId.toString()}
                            renderItem={({item}) => (
                                <View style={styles.requestItem}>
                                    <Text style={styles.requestText}>
                                        📅 {item.organizer} invited you to "{item.title}"
                                    </Text>
                                    <Text style={styles.subText}>Date: {item.date}</Text>
                                    <Text style={styles.subText}>Time: {item.time}</Text>
                                    <View style={styles.buttonsRow}>
                                        <Pressable
                                            style={[styles.button, styles.declineButton]}
                                            onPress={() => onDecline(item.meetingId)}
                                        >
                                            <Text style={styles.buttonText}>Decline</Text>
                                        </Pressable>
                                        <Pressable
                                            style={[styles.button, styles.acceptButton]}
                                            onPress={() => onAccept(item.meetingId)}
                                        >
                                            <Text style={styles.buttonText}>Accept</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            )}
                        />
                    )}

                    <Pressable style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        maxHeight: '80%',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
    },
    requestItem: {
        marginBottom: 16,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingBottom: 12,
    },
    requestText: {
        fontWeight: '600',
        fontSize: 15,
        marginBottom: 4,
    },
    subText: {
        fontSize: 13,
        color: '#555',
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
    },
    button: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 6,
        marginLeft: 10,
    },
    acceptButton: {
        backgroundColor: '#4CAF50',
    },
    declineButton: {
        backgroundColor: '#f44336',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    closeButton: {
        marginTop: 10,
        alignSelf: 'center',
        paddingVertical: 8,
        paddingHorizontal: 24,
    },
    closeButtonText: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
