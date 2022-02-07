import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../consts/colors';
import foods from '../consts/foods';
import {PrimaryButton} from '../components/Button';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';

const CartCard = ({item}) => {
  return (
    <View style={style.cartCard}>
      <Image source={item.image} style={{height: 80, width: 80}} />
      <View
        style={{
          height: 100,
          marginLeft: 10,
          paddingVertical: 20,
          flex: 1,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
        <Text style={{fontSize: 13, color: COLORS.grey}}>
          {item.ingredients}
        </Text>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>${item.price}</Text>
      </View>
      <View style={{marginRight: 20, alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>3</Text>
        <View style={style.actionBtn}>
          <Icon name="remove" size={25} color={COLORS.white} />
          <Icon name="add" size={25} color={COLORS.white} />
        </View>
      </View>
    </View>
  );
};

export default function CartScreen({navigation}) {
  const [cart, setCart] = useState([]);

  // console.log('Cart is ', cart);
  // cart.map(cart => {
  //   console.log(cart.id);
  //   console.log(cart.item.name);
  // });
  const carts = useSelector(state => state.cart.carts);

  useEffect(() => {
    setCart(carts);
  }, [carts]);

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={style.header}>
        <Icon name="ios-arrow-back" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10}}>
          Cart
        </Text>
      </View>
      {cart.length != 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 80}}
          data={cart}
          renderItem={({item}) => <CartCard item={item} />}
          ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
          ListFooterComponent={() => (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 15,
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  Total Price
                </Text>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>$50</Text>
              </View>
              <View style={{paddingHorizontal: 20}}>
                <PrimaryButton title="CHECKOUT" />
              </View>
            </View>
          )}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            source={require('../assets/emptycart.json')}
            autoPlay
            loop
          />
        </View>
      )}
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

// const CartScreen = () => {
//   const carts = useSelector(state => state.cart.carts);

//   console.log('CARTS IN CART SCREEN', carts);
//   return (
//     <View style={styles.container}>
//       <Text>Profile Screen</Text>
//       <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
//     </View>
//   );
// };

// export default CartScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
