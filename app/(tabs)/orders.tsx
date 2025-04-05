import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import axios from 'axios';
import Footer from '../../components/footer';
import { styles } from './style';
import { getToken } from '@/app/utils/secureStore';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = 'http://localhost:5000/api';

const OrdersScreen = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) fetchOrders();
  }, [userId]);

  const fetchUserId = async () => {
    try {
      const token = await getToken();
      if (token) {
        const decoded: any = jwtDecode(token);
        setUserId(decoded.id);
      }
    } catch (err) {
      console.error("Erro ao obter ID do usuário:", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/orders/${userId}`);
      setOrders(res.data);
    } catch (err) {
      console.error("Erro ao buscar pedidos:", err);
    }
  };

  const toggleExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: '5%' }}>
      <Text style={styles.orderTitleHeader}>Pedidos Finalizados</Text>
      {orders.length === 0 ? (
        <Text style={styles.noOrders}>Nenhum pedido realizado ainda.</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={({ item }) => {
            if (!item?.produtos || !Array.isArray(item.produtos)) return null;

            const totalValue = item.produtos.reduce(
              (sum: number, p: any) => sum + (p.produto.preco || 0) * p.quantidade,
              0
            );

            return (
              <View style={styles.orderItem}>
                <TouchableOpacity onPress={() => toggleExpand(item._id)} style={styles.orderHeader}>
                  <Text style={styles.orderTitle}>Pedido #{item._id.slice(-5)}</Text>
                  <Text style={styles.orderArrow}>{expandedOrder === item._id ? '▲' : '▼'}</Text>
                </TouchableOpacity>
                <Text style={styles.totalPrice}>
                  Total: {totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Text>

                {expandedOrder === item._id && (
                  <View style={styles.productList}>
                    {item.produtos.map((p: any, index: number) => (
                      <View key={`${p.produto.nome}-${index}`} style={styles.productItem}>
                        {p.produto.imageUrl && (
                          <Image source={{ uri: p.produto.imageUrl }} style={styles.productImage} />
                        )}
                        <Text style={styles.productText}>
                          {p.produto.nome} - {p.produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} x {p.quantidade} = {(p.produto.preco * p.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          }}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        />
      )}
      <Footer />
    </SafeAreaView>
  );
};

export default OrdersScreen;
