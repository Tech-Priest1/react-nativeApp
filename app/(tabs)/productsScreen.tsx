import React, { useState } from 'react';
import {  ScrollView, Text, View, Image, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import { styles } from './style';
import Footer from '../../components/footer'; 

export default function ProductScreen({ navigation }: { navigation: any }) {
  const products = [
    { id: 1, name: 'Produto 1', description: 'Descrição do produto 1', price: 20, image: require('../../assets/images/product.svg') },
    { id: 2, name: 'Produto 2', description: 'Descrição do produto 2', price: 30, image: require('../../assets/images/product.svg') },
    { id: 3, name: 'Produto 3', description: 'Descrição do produto 3', price: 15, image: require('../../assets/images/product.svg') },
  ];

  const cartIcon = require('../../assets/images/cart.svg'); 

  const [cart, setCart] = useState<{ id: number; name: string; price: number; image: any}[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCartButton = (product: { id: number; name: string; price: number ; image: any;}) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const handleRemoveItem = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleFinalizeOrder = () => {
    alert('Pedido finalizado! Vá até o caixa para concluir a compra.');
    setCart([]); // Clear the cart after checkout
    setIsModalVisible(false); // Close the modal
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1 , backgroundColor: 'white',paddingTop: '5%'}}>
      <TextInput 
        style={styles.searchBar}
        placeholder="Buscar produto..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 100  }}>
        <View style={styles.pContainer}>
          {filteredProducts.map((product) => (
            <View key={product.id} style={styles.productContainer}>
              <Image source={product.image} style={styles.productImage} />
              <Text style={styles.h1}>{product.name}</Text>
              <Text style={styles.h2}>{product.description}</Text>
              <Text style={styles.price}>Preço: R${product.price}</Text>

              <TouchableOpacity 
                onPress={() => handleAddToCartButton(product)} 
                style={styles.button}
              >
                <Text style={styles.buttonText}>Adicionar ao carrinho</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {cart.length > 0 && (
        <TouchableOpacity style={styles.floatingCartButton} onPress={() => setIsModalVisible(true)}>
          <Image source={cartIcon} style={styles.cartIcon} />
          <Text style={styles.cartText}>{cart.length}</Text>
        </TouchableOpacity>
      )}

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Carrinho de Compras</Text>
            {cart.length === 0 ? (
              <Text style={styles.emptyMessage}>Seu carrinho está vazio.</Text>
            ) : (
              <FlatList
                data={cart}
                renderItem={({ item }) => (
                  <View style={styles.cartItem}>
                     <Image source={item.image} style={styles.cartItemImage}/>
                    <Text>{item.name}</Text>
                    <Text>R${item.price}</Text>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveItem(item.id)}
                    >
                      <Text style={styles.buttonText}>Remover</Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            )}
            <TouchableOpacity
              style={styles.finalizeButton}
              onPress={handleFinalizeOrder}
            >
              <Text style={styles.buttonText}>Finalizar Pedido</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Footer navigation={navigation} />
    </View>
  );
}
