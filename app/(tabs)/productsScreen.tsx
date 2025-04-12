import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import { styles } from './style';
import Footer from '../../components/footer';
import axios from 'axios';
import { getToken } from '@/app/utils/secureStore';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const localImages: { [key: string]: any } = {
  "rogphone9pro.jpg": require('@/assets/images/rogphone9pro.jpg'),
  "galaxyS24Ultra.png": require('@/assets/images/galaxyS24Ultra.png'),
  "redMagic10pro.png": require('@/assets/images/redMagic10pro.png'),
  "huaweixt.png": require('@/assets/images/huaweixt.png'),
};

export default function ProductScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartIcon = require('@/assets/images/cart.png');
  const logo = require('@/assets/images/mobiexpressLogo.png');

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchProducts();
      fetchCart();
    }
  }, [userId]);

  const fetchUserId = async () => {
    try {
      const token = await getToken();
      if (token) {
        const decoded: any = jwtDecode(token);
        setUserId(decoded.id);
      }
    } catch (error) {
      console.error("Erro ao obter ID do usuário:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  };

  const fetchCart = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`${BASE_URL}/cart/${userId}`);
      setCart(res.data.produtos.map((item: any) => ({
        ...item.produto,
        quantidade: item.quantidade,
      })));
    } catch (err: any) {
      console.warn("Carrinho vazio ou erro:", err?.response?.data?.message);
    }
  };

  const handleAddToCartButton = async (product: any) => {
    if (!userId) {
      alert("Você precisa estar logado para adicionar itens ao carrinho.");
      return;
    }
    try {
      await axios.post(`${BASE_URL}/cart/add`, {
        usuario: userId,
        produto: product._id,
        quantidade: 1,
      });
      fetchCart();
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    if (!userId) return;
    try {
      await axios.delete(`${BASE_URL}/cart/${userId}/${productId}`, {
        data: { quantidade: 1 },
      });
      fetchCart();
    } catch (error) {
      console.error("Erro ao remover do carrinho:", error);
    }
  };

  const handleCheckout = async () => {
    if (!userId) return;
    try {
      await axios.post(`${BASE_URL}/orders`, { usuario: userId });
      alert("Pedido finalizado com sucesso!");
      setIsModalVisible(false);
      fetchCart();
    } catch (err: any) {
      console.error("Erro ao finalizar pedido:", err);
      alert("Erro ao finalizar pedido. Tente novamente.");
    }
  };

  const filteredProducts = products.filter(product =>
    product.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
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
            <View key={product._id} style={styles.productContainer}>
              {product.imageName && localImages[product.imageName] && (
                <Image source={localImages[product.imageName]} style={styles.productImage} />
              )}
              <Text style={styles.h1}>{product.nome}</Text>
              <Text style={styles.h2}>{product.descricao}</Text>
              <Text style={styles.price}>Preço: R${product.preco}</Text>
              <TouchableOpacity onPress={() => handleAddToCartButton(product)} style={styles.button}>
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
                keyExtractor={(item, index) => `${item._id}-${index}`}
                renderItem={({ item }) => (
                  <View style={styles.cartItem}>
                    {item.imageName && localImages[item.imageName] && (
                      <Image source={localImages[item.imageName]} style={styles.cartItemImage} />
                    )}
                    <Text>{item.nome}</Text>
                    <Text>R${item.preco}</Text>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveItem(item._id)}
                    >
                      <Text style={styles.buttonText}>Remover</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.buttonText}>Finalizar Pedido</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Footer />
    </View>
  );
}
