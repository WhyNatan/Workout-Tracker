import '../gesture-handler';
import { React } from 'react';
import { View, Text, Alert, TextInput, TouchableNativeFeedback } from 'react-native';
import { styles } from '../styles/styles';
import { Icon } from '@rneui/base';

export function WorkoutPage({ navigation }) {
    return (
        <View>
            <AppBar navigation={navigation}/>

            <View style={[{paddingLeft: 20, paddingTop: 10}]}>
                <TextInput style={styles.exerciseBodyPart}>Chest</TextInput>

                <View style={styles.exerciseTitleContainer}>
                    <TextInput style={styles.exerciseTitle}>Bench Press</TextInput>
                </View>

                {/* Caption line */}
                <View style={[styles.exerciseCaptionContainer, styles.containerRow]}>
                    <GridCell style={styles.exerciseCaption} width={4} content='Set'/>
                    <GridCell style={styles.exerciseCaption} width={7} content='Previous'/>
                    <GridCell style={styles.exerciseCaption} width={5} content='Reps'/>
                    <GridCell style={styles.exerciseCaption} width={5} content='KG'/>
                </View>

                <View style={[styles.exerciseLineContainer, styles.containerRow]}>
                    <GridCell style={styles.exerciseLine} width={4} content='1'/>
                    <GridCell style={styles.exerciseLine} width={7} content='12 x 55'/>
                    <GridCell style={styles.exerciseLineEditable} width={5} content='10' editable/>
                    <GridCell style={styles.exerciseLineEditable} width={5} content='60' editable/>
                </View>

                <View style={[styles.exerciseLineContainer, styles.containerRow]}>
                    <GridCell style={styles.exerciseLine} width={4} content='2'/>
                    <GridCell style={styles.exerciseLine} width={7} content='10 x 55'/>
                    <GridCell style={styles.exerciseLineEditable} width={5} content='8' editable/>
                    <GridCell style={styles.exerciseLineEditable} width={5} content='60' editable/>
                </View>

                <View style={[styles.exerciseLineContainer, styles.containerRow]}>
                    <GridCell style={styles.exerciseLine} width={4} content='3'/>
                    <GridCell style={styles.exerciseLine} width={7} content='8 x 55'/>
                    <GridCell style={styles.exerciseLineEditable} width={5} content='5' editable/>
                    <GridCell style={styles.exerciseLineEditable} width={5} content='60' editable/>
                </View>

                <View style={styles.exerciseAddContainer}>
                    <Text style={styles.exerciseAdd} onPress={() => Alert.alert("Add Set")}>Add Set</Text>
                </View>

                <View style={styles.exerciseFooterContainer}>
                    <Text style={[{fontWeight: 'bold', fontSize: 14,}]}>Notes</Text>
                    <TextInput 
                        style={[styles.exerciseNotes, styles.multilineText]}
                        // value="Bring the bar down to the chest and then back up. Filler line cause whatever."
                        value="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
                        placeholder="Write notes here."
                        multiline
                    />
                </View>


            </View>
        </View>
    );
};

const GridCell = ({style, width, content, editable=false}) => {
    if (editable) {
        return (
            <View style={[{width: (width * 10), alignItems: 'center'}]}>
                <TextInput style={style}>{content}</TextInput>
            </View>
        )
    }
    else {
        return (
            <View style={[{width: (width * 10), alignItems: 'center'}]}>
                <Text style={style}>{content}</Text>
            </View>
        )
    };
};

const AppBar = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Space at the top to adjust for the bar */}
            <View style={[{ paddingTop: 30 }]}></View>

            <View style={styles.containerRow}>
                <TouchableNativeFeedback onPress={() => navigation.goBack()}>
                    <View style={styles.containerRow}>
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