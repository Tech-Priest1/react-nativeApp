import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Footer from './footer';
import { styles } from './style';

const OrdersScreen = () => {
  const navigation = useNavigation();
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const orders = [
    {
      id: 1,
      name: 'Pedido 1',
      products: [
        { id: 101, name: 'Produto A', price: 20 },
        { id: 102, name: 'Produto B', price: 15 },
      ],
    },
    {
      id: 2,
      name: 'Pedido 2',
      products: [
        { id: 201, name: 'Produto C', price: 30 },
        { id: 202, name: 'Produto D', price: 25 },
      ],
    },
  ];

  const toggleExpand = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text style={styles.header}>Pedidos Finalizados</Text>
      {orders.length === 0 ? (
        <Text style={styles.noOrders}>Nenhum pedido realizado ainda.</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
              {expandedOrder === item.id && (
                <View style={styles.productList}>
                  {item.products.map((product) => (
                    <Text key={product.id}>{product.name} - R${product.price}</Text>
                  ))}
                </View>
              )}
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <Footer navigation={navigation} />
    </View>
  );
};

export default OrdersScreen;