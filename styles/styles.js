import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
  },
  appbarTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingLeft: 20,
  },
  setTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 3,
  },
});