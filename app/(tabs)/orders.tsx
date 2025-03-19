import React, { useState } from 'react';
import { SafeAreaView , Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import Footer from '../../components/footer';
import { styles } from './style';

const OrdersScreen = () => {
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const orders = [
    {
      id: 1,
      name: 'Pedido 1',
      products: [
          { id: 4, name: 'Huawei Mate XT Ultimate', price: 21000, image: require('../../assets/images/huaweixt.png') },
      ],
    },
    {
      id: 2,
      name: 'Pedido 2',
      products: [
        { id: 1, name: 'Asus ROG Phone 9 Pro', price: 6920, image: require('../../assets/images/rogphone9pro.jpg') },
        { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 5310, image: require('../../assets/images/galaxyS24Ultra.png') },
        { id: 3, name: 'REDMAGIC 10 Pro', price: 4900, image: require('../../assets/images/redMagic10pro.png') },
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
      <Footer/>
    </SafeAreaView >
  );
};

export default OrdersScreen;
