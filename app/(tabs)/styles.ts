import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Warmer dark background
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 70,
    backgroundColor: 'rgba(139, 69, 19, 0.15)', // Subtle brown glow
    borderBottomWidth: 1,
    borderBottomColor: '#8B4513', // Saddle brown border
  },
  title: {
    flexDirection: 'row',
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#D2691E', // Chocolate orange
    textAlign: 'center',
    textShadowColor: 'rgba(210, 105, 30, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    color: '#DEB887', // Burlywood
    textAlign: 'center',
    fontStyle: 'italic',
  },
  booksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 16,
    paddingTop: 20,
  },
  bookCard: {
    width: '45%',
    backgroundColor: 'rgba(40, 30, 20, 0.9)', // Warm dark brown background
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#CD853F', // Peru brown border
    shadowColor: '#8B4513',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bookCover: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#A0522D', // Sienna border
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 18,
    color: '#F5DEB3', // Wheat white
  },
  bookAuthor: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 6,
    color: '#D2B48C', // Tan
  },
  eraContainer: {
    marginBottom: 6,
  },
  era: {
    fontSize: 10,
    color: '#BC8F8F', // Rosy brown
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#DAA520', // Goldenrod stars
    fontWeight: '600',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    backgroundColor: '#FF0000', // Red background
    width: 56,
    height: 56,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 22,
    backgroundColor: 'transparent',
  },
  modalView: {
    flex: 1,
    margin: 20,
    marginTop: 200,
    marginBottom: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 50,
    padding: 75,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    height: 300,  // Fixed height instead of flex
    
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 30,
    padding: 10,
    elevation: 2,
    
  },
  buttonOpen: {
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 75,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonClose: {
    position: 'absolute',
    backgroundColor: 'red',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    top: 5,
    right: 5,
    
  },
  textStyle: {
    color: '#F5DEB3',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#F5DEB3',
  },

}); 