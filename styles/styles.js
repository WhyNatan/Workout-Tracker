import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-start',
  },
  workoutContainer: {
    width: screenWidth - 20, 
    height: 120, 
    backgroundColor: '#C6C6C6', 
    padding: 10,
    paddingLeft: 20, 
    alignSelf: 'center', 
    borderRadius: 15, 
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  exerciseTitleContainer: {
    paddingLeft:10,
    padding: 2,
    marginBottom: 4,
    backgroundColor: '#C6C6C6',
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
    backgroundColor: '#C6C6C6',
    width: screenWidth - 40,
  },
  exerciseCaption: {
    fontSize: 14,
  },
  exerciseLineContainer: {
    height: 36,
    paddingLeft:10,
    padding:5,
    backgroundColor: '#C6C6C6',
    width: screenWidth - 40,
  },
  exerciseLine: {
    fontSize: 13,
  },
  // exerciseLineEditable: {
  //   fontSize: 13,
  //   backgroundColor: '#FFFF',
  //   borderRadius: 4,
  //   height: 24,
  //   width: 25,
  //   textAlign: 'center',
  // },
  exerciseLineEditable: {
    fontSize: 13,
    backgroundColor: '#FFFF',
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
    backgroundColor: '#C6C6C6',
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
    backgroundColor: '#C6C6C6',
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
    marginBottom: 100,
    backgroundColor: '#C6C6C6',
    borderRadius: 5,
    padding: 10,
  },
  addExercise: {
    alignSelf:'center',
    fontWeight: 'bold',
    fontSize: 21,
  },
});