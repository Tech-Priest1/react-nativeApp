import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  container: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  h1: {
    color: '#000',
    fontSize: 27,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  h2: {
    color: '#999',
    fontSize: 15,
  },
  inputArea: {
    width: '100%',
    paddingTop: 20,
  },
  inputAreaSignUp: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 30,
  },
  inputLabel: {
    color: '#777',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  inputField: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#DDD',
    fontSize: 15,
    padding: 10,
  },
  aditionals: {
    width: '100%',
  },
  forgotBtnArea: {
    paddingVertical: 20,
    alignSelf: 'flex-end',
  },
  forgotBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4162B7',
  },
  button: {
    backgroundColor: '#4162B7',
    width: '100%',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 16,
  },

  modalContainerIndex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentIndex: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalCloseButton: {
    marginTop: 10,
  },
  modalCloseButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
  
  //singup screen
  signUpArea: {
    flexDirection: 'row',
    marginTop: 30,
  },
  signUpText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#999',
  },
  signUpBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#4162B7',
    marginLeft: 5,
  },
  footerArea: {
    marginVertical: 30,
  },
  footerText: {
    color: '#999',
    fontSize: 13,
  },
  loginArea: {
    flexDirection: 'row',
    marginTop: 30,
  },
  loginText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#999',
  },
  loginBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#4162B7',
    marginLeft: 5,
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  quantityInputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  quantityButton: {
    backgroundColor: '#DDD',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonSecondary: {
    backgroundColor: '#FF6347',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  pContainer: {
  alignItems: 'center',
  flexDirection: 'row', 
  flexWrap: 'wrap', 
  justifyContent: 'space-between', 
  width: '100%', 
  paddingHorizontal: 5, 
  },
  productContainer: {
    width: '48%', 
  marginBottom: 20,
  padding: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#EEE',
  },
  price: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
 
  inputError: {
    borderColor: 'red', 
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },

  //pruducts screen
  floatingCartButton: {
    position: 'absolute',
    top: 600,
    right: 20,
    backgroundColor: '#4162B7',
    width: 75,
    height: 75,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  
  cartIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: 5, 
  },
  
  cartText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  
  
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  
  removeButton: {
    backgroundColor: '#FF6B6B',
    padding: 5,
    left: 10,
    bottom: 5,
    borderRadius: 5,
  },
  
  
  finalizeButton: {
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  
  closeButton: {
    backgroundColor: '#DC3545',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10, 
  },
  emptyMessage: {
    fontSize: 16,
},
header: {
  fontSize: 24,
  fontWeight: 'bold',
},
noOrders: {
  fontSize: 16,
  color: 'gray',
},
orderItem: {
  padding: 10,
  borderBottomWidth: 1,
  borderBottomColor: 'gray',
},
productList: {
  marginTop: 10,
  paddingLeft: 10,
  borderLeftWidth: 2,
  borderLeftColor: '#ddd',
},
//userprofile
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  info: {
    fontSize: 16,
    color: '#555',
  },
  logoutButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


