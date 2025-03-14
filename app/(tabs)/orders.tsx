import React, { useState } from 'react';
import { SafeAreaView , Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Footer from '../../components/footer';
import { styles } from './style';

const OrdersScreen = () => {
  const navigation = useNavigation();
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const orders = [
    {
      id: 1,
      name: 'Pedido 1',
      products: [
        { id: 101, name: 'Produto A', price: 20, image: require('../../assets/images/product.svg') },
        { id: 102, name: 'Produto B', price: 15, image: require('../../assets/images/product.svg') },
      ],
    },
    {
      id: 2,
      name: 'Pedido 2',
      products: [
        { id: 201, name: 'Produto C', price: 30, image: require('../../assets/images/product.svg') },
        { id: 202, name: 'Produto D', price: 25, image: require('../../assets/images/product.svg' ) },
      ],
    },
  ];

  const toggleExpand = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <SafeAreaView  style={{ flex: 1, backgroundColor: 'white', paddingTop: '5%' }}>
      <Text style={styles.orderTitleHeader}>Pedidos Finalizados</Text>
      {orders.length === 0 ? (
        <Text style={styles.noOrders}>Nenhum pedido realizado ainda.</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={({ item }) => {
            const totalValue = item.products.reduce((sum, product) => sum + product.price, 0);
            return (
              <View style={styles.orderItem}>
                <TouchableOpacity onPress={() => toggleExpand(item.id)} style={styles.orderHeader}>
                  <Text style={styles.orderTitle}>{item.name}</Text>
                  <Text style={styles.orderArrow}>{expandedOrder === item.id ? '▲' : '▼'}</Text>
                </TouchableOpacity>
                <Text style={styles.totalPrice}>Total: R${totalValue}</Text>

                {expandedOrder === item.id && (
                  <View style={styles.productList}>
                    {item.products.map((product) => (
                      <View key={product.id} style={styles.productItem}>
                        <Image source={product.image} style={styles.productImage} />
                        <Text style={styles.productText}>
                          {product.name} - R${product.price}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <Footer navigation={navigation} />
    </SafeAreaView >
  );
};

export default OrdersScreen;
