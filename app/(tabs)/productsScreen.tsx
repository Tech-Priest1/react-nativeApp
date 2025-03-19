import React, { useState } from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import { styles } from './style';
import Footer from '../../components/footer';

export default function ProductScreen({  }: { navigation: any }) {
  const products = [
    { id: 1, name: 'Asus ROG Phone 9 Pro', 
      description: 'O smartphone Asus ROG Phone 9 Pro é a versão mais poderosa da nova geração do smartphone gamer da empresa taiwanesa. O aparelho traz recursos diferenciados para quem usa o celular prioritariamente para jogos, incluindo acessórios de refrigeração.', 
      price: 6920, image: require('../../assets/images/rogphone9pro.jpg') },
    { id: 2, name: 'Samsung Galaxy S24 Ultra', 
      description: 'O smartphone Galaxy S24 Ultra é celular mais poderoso da empresa koreana. O aparelho vem com o hardware mais avançado entre os celulares da Samsung e recheado de muita tecnologia otimizada por Inteligência Artificial.', 
      price: 5310, image: require('../../assets/images/galaxyS24Ultra.png') },
    { id: 3, name: 'REDMAGIC 10 Pro', 
      description: 'O smartphone gamer RedMagic 10 Pro da empresa chinesa Nubia possui a maior batteria do mercado e uma ventoinha imbutida, como os gatilhos ultrassônicos nas laterais e o slide para ativar o "modo jogo" esse é o melhor celular para jogos da atualidade', 
      price: 4900, image: require('../../assets/images/redMagic10pro.png') },
    { id: 4, name: 'Huawei Mate XT Ultimate', 
      description: 'O Huawei Mate XT Ultimate é um dos primeiros celulares dobráveis "triplos" do mundo,o celular da empresa chinesa Surpreendente com sua tela Touchscreen de 10.2 polegadas, que coloca esse Huawei no topo de sua categoria. Além disso a resolução é das mais altas atualmente em circulação: 3184x2232 ', 
      price: 21000, image: require('../../assets/images/huaweixt.png') },
  ];

  const cartIcon = require('../../assets/images/cart.png');
  const logo = require('../../assets/images/mobiexpressLogo.png'); // Add the logo image

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
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Add the logo and blue background */}
      <View style={{ backgroundColor: '#034d8f', paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center' }}>
  <Image source={logo} style={{ width: 100, height: 50, resizeMode: 'contain' }} />
</View>

      <TextInput 
        style={styles.searchBar}
        placeholder="Buscar produto..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
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
                    <Text>{item.name} </Text>
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

      <Footer/>
    </View>
  );
}