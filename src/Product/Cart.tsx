import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CartRow from './CartRow';
import Text from '../Components/Text';

/*
 * @Description: 购物车
 * @Author: 虾饺
 * @Date: 2023-05-18 22:17:29
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-20 17:48:22
 * @Profile: 一个比较废柴的前端开发
 */
enum RequestStatus {
  IDLE = 'IDLE',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  PENDING = 'PENDING',
}

interface Product {
  name: string;
  price: number;
  id: number;
  count: number;
}
type Products = Product[];

export default function Cart() {
  const [products, setProducts] = useState<Products>([]);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    RequestStatus.IDLE,
  );

  const total = products.reduce((sum, product) => {
    return (sum += product.price * product.count);
  }, 0);

  useEffect(() => {
    setRequestStatus(RequestStatus.PENDING);

    fetch('http://192.168.2.207:10086/cart')
      .then(res => res.json())
      .then(data => {
        setRequestStatus(RequestStatus.SUCCESS);
        console.log(data.data);
        setProducts(data.data);
      })
      .catch(err => {
        setRequestStatus(RequestStatus.ERROR);
        console.log(
          'There has been a problem with your fetch operation: ' + err.message,
        );
        // ADD THIS THROW error
        throw err;
      });
  }, []);

  function handleCalculate(product: Product, calc: string) {
    console.log('calc: ', calc);
    const newCount = product.count + (calc === 'increment' ? +1 : -1);
    const count = newCount < 0 ? 0 : newCount;
    const newProduct = {...product, count};
    const newProducts: Products = products.map((product: Product) => {
      if (product.id === newProduct.id) {
        product = newProduct;
      }
      return product;
    });
    setProducts(newProducts);
  }

  if (requestStatus === RequestStatus.SUCCESS) {
    return (
      <View style={styles.wrappaer}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>名称</Text>
          <Text style={styles.title}>价格</Text>
          <Text style={styles.title}>数量</Text>
        </View>
        <View>
          {products.map(product => {
            return (
              <CartRow
                product={product}
                handleCalculate={handleCalculate}
                key={product.id}
              />
            );
          })}
        </View>
        <Text style={styles.total}>总计: {total}</Text>
      </View>
    );
  } else if (requestStatus === RequestStatus.PENDING) {
    return <Text>加载中...</Text>;
  } else {
    return <Text>网络出错了</Text>;
  }
}

const styles = StyleSheet.create({
  wrappaer: {
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  total: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});
