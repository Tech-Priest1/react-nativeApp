import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  //index screen
  scrollView: {
    flex: 1,
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
     resizeMode: 'contain'
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
  //products screen
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
 
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: '#fff',
  },
  floatingCartButton: {
    position: 'absolute',
    top: '75%',
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
    backgroundColor: '#DC3545',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  checkoutButton: {
    backgroundColor: '#4162B7',
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
cartItemImage: {
  width: 50,
  height: 50,
  resizeMode: 'contain',
  marginRight: 10,
},
//orders screen
noOrders: {
  fontSize: 16,
  color: 'gray',
  textAlign: 'center',
  marginVertical: 20,
},
orderItem: {
  padding: 15,
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
  backgroundColor: '#f8f8f8',
  borderRadius: 10,
  marginVertical: 5,
  marginHorizontal: 10,
},
orderTitleHeader:{
  fontSize: 24,
  fontWeight: 'bold',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: 90,
},
orderHeader: {
  fontSize: 24,
  fontWeight: 'bold',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
orderTitle: {
  fontSize: 18,
  fontWeight: 'bold',
},
orderArrow: {
  fontSize: 18,
  color: '#333',
},
totalPrice: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#007bff',
  marginTop: 5,
},
productList: {
  marginTop: 10,
  paddingLeft: 10,
  borderLeftWidth: 3,
  borderLeftColor: '#007bff',
},
productItem: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 5,
},
ordersImage: {
  width: 40,
  height: 40,
  marginRight: 10,
  borderRadius: 5,
},
productText: {
  fontSize: 16,
  color: '#333',
},
//userprofile
avatar: {
  width: 100,
  height: 100,
  marginBottom: 20,
  alignSelf: 'center',
},
infoContainer: {
  width: '100%',
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
},
label: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333',
},
row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 5,
},
info: {
  fontSize: 16,
  color: '#555',
  flex: 1,
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
//chat screen
  containerChat: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatArea: {
    flex: 1,
    padding: 10,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1e7dd',
    marginVertical: 4,
    padding: 10,
    borderRadius: 10,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f8d7da',
    marginVertical: 4,
    padding: 10,
    borderRadius: 10,
  },
  msgText: {
    fontSize: 16,
  },
  inputAreaChat: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 20,
  },
  sendButton: {
    marginLeft: 8,
    justifyContent: 'center',
    backgroundColor: '#007bff',
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
