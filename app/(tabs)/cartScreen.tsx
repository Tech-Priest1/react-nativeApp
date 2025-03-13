import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

import { RouteProp } from '@react-navigation/native';

type CartScreenRouteProp = RouteProp<{ params: { cart: { id: number; name: string; price: number }[] } }, 'params'>;

export default function CartScreen({ route }: { route: CartScreenRouteProp }) {
  const { cart } = route.params;

  // Initialize cartItems with the cart prop, and ensure it's updated if the cart changes
  const [cartItems, setCartItems] = useState(cart);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]); // Re-sync cartItems when the cart prop changes

  const handleRemoveItem = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const handleFinalizeOrder = () => {
    alert('Pedido finalizado! Vá até o caixa para concluir a compra.');
  };

  const renderCartItem = ({ item }: { item: { id: number; name: string; price: number } }) => (
    <View style={styles.cartItem}>
      <Text>{item.name}</Text>
      <Text>R${item.price}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item.id)}
      >
        <Text style={styles.buttonText}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho de Compras</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyMessage}>Seu carrinho está vazio.</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <TouchableOpacity
        style={styles.finalizeButton}
        onPress={handleFinalizeOrder}
      >
        <Text style={styles.buttonText}>Finalizar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyMessage: {
    fontSize: 18,
    color: 'gray',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  finalizeButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
});
