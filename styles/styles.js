import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

mainColors = ['#ece0d1','#dbc1ac','#b89176', '#967259'];

export const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    backgroundColor: mainColors[0],
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-start',
  },
  workoutContainer: {
    width: screenWidth - 25, 
    height: 120, 
    backgroundColor: mainColors[2],
    padding: 10,
    paddingLeft: 20, 
    alignSelf: 'center', 
    borderRadius: 15, 
  },
  circleThing: {
    borderRadius: 10,
  },
  homeBackground: {
    flex: 1,
    padding: 10,
    backgroundColor: mainColors[1],
  },
  workoutBackground: {
    paddingLeft: 20, 
    paddingTop: 10,
    backgroundColor: mainColors[1],
  },
  appbarTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingLeft: 20,
  },
  setTitleContainer: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  exerciseBodyPart: {
    alignSelf: 'flex-start',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    padding: 2,
    borderBottomWidth: 2,
    borderBottomColor: mainColors[3],
  },
  exerciseContainer: {
    alignSelf: 'flex-start',
    // backgroundColor: mainColors[1],
  },
  exerciseTitleContainer: {
    paddingLeft:10,
    padding: 2,
    marginBottom: 4,
    backgroundColor: mainColors[2],
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: screenWidth - 40,
  },
  exerciseTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  exerciseCaptionContainer: {
    paddingLeft:10,
    padding:5,
    marginBottom: 4,
    backgroundColor: mainColors[2],
    width: screenWidth - 40,
  },
  exerciseCaption: {
    fontSize: 14,
  },
  exerciseLineContainer: {
    height: 36,
    paddingLeft:10,
    padding:5,
    backgroundColor: mainColors[2],
    width: screenWidth - 40,
  },
  exerciseLine: {
    fontSize: 13,
  },
  exerciseLineEditable: {
    fontSize: 13,
    backgroundColor: mainColors[1],
    borderRadius: 4,
    height: 24,
    // width: 25,
    minWidth: 25,
    maxWidth: 50,
    textAlign: 'center',
  },
  exerciseAddContainer: {
    paddingLeft:10,
    padding:5,
    marginTop: 4,
    backgroundColor: mainColors[2],
    width: screenWidth - 40,
  },
  exerciseAdd: {
    fontSize: 13,
    fontWeight: "bold",
  },
  exerciseFooterContainer: {
    paddingLeft:10,
    padding: 2,
    marginTop: 4,
    backgroundColor: mainColors[2],
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    width: screenWidth - 40,
  },
  exerciseFooter: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  exerciseNotes: {
    fontSize: 11,
    paddingTop: 2,
    paddingRight: 5,
    paddingBottom: 5,
    fontColor: '#FFF',
  },
  multilineText: {
    minHeight: 40
  },
  addExerciseContainer: {
    width: screenWidth - 40,
    height: 50,
    marginBottom: 10,
    backgroundColor: mainColors[3],
    borderRadius: 5,
    padding: 10,
  },
  addExercise: {
    alignSelf:'center',
    fontWeight: 'bold',
    fontSize: 21,
  },
});