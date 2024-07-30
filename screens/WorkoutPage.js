import '../gesture-handler';
import { React } from 'react';
import { View, Text, Alert, TextInput, TouchableNativeFeedback } from 'react-native';
import { styles } from '../styles/styles';
import { Icon } from '@rneui/base';

export function WorkoutPage({ navigation }) {
    return (
        <View>
            <AppBar navigation={navigation}/>

            <View style={[{paddingLeft:10}]}>
                <Text style={styles.setTitle}>Body Part</Text>
                <TextInput>
                    Chest
                </TextInput>
            </View>
        </View>
    );
};

const AppBar = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Space at the top to adjust for the bar */}
            <View style={[{ paddingTop: 30 }]}></View>

            <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }]}>
                <TouchableNativeFeedback onPress={() => navigation.goBack()}>
                    <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }]}>
                        <Icon name='chevron-left' size={40}/>
                        <Text style={{fontSize: 20,}}>Back</Text>
                    </View>
                </TouchableNativeFeedback>
                <View style={[{ flex: 1 }]}>
                    {/* <Text style={styles.appbarTitle}>Workout Tracker</Text> */}
                </View>
            </View>
            <View style={[{ paddingBottom: 15 }]}></View>
        </View>);
};