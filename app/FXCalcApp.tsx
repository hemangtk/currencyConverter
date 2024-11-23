import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  ImageBackground,
  Dimensions
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// TODO: Add your currency exchange rate API key here
const API_KEY: string = '4282c9f71c035ca9e5d6e4fc';


const CURRENCIES: string[] = [
  'USD', 'EUR', 'GBP', 'JPY', 'CAD', 
  'AUD', 'CHF', 'CNY', 'INR', 'BRL'
];

const FXCalcApp: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('INR');
  const [amount, setAmount] = useState<string>('');
  const [convertedAmount, setConvertedAmount] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<string>('');

  const convertCurrency = async (): Promise<void> => {
    try {
      const rateResponse = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`
      );
      
      const rateData = await rateResponse.json();
      
      
      if (rateData.result === 'success') {
        const conversionRate = rateData.conversion_rate;
        const converted = parseFloat(amount) * conversionRate;
        
        setConvertedAmount(converted.toFixed(2));
        setExchangeRate(conversionRate.toFixed(4));
      } else {
        throw new Error('Conversion failed');
      }
    
    } catch (error) {
      console.error('Conversion error:', error);
      setConvertedAmount('Error converting');
      setExchangeRate('N/A');
    }
  };

  const swapCurrencies = (): void => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleAmountChange = (text: string): void => {
    // Ensure only numeric input
    const numericText = text.replace(/[^0-9.]/g, '');
    setAmount(numericText);
  };

  return (
    <ImageBackground 
        source={require('../assets/images/background.png')}
        style={styles.backgroundImage}
      >
        
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>FXCalc</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={handleAmountChange}
        />
        <Picker
          selectedValue={fromCurrency}
          style={styles.picker}
          onValueChange={(itemValue: string) => setFromCurrency(itemValue)}
        >
          {CURRENCIES.map(currency => (
            <Picker.Item key={currency} label={currency} value={currency} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.swapButton} onPress={swapCurrencies}>
        <Text style={styles.swapButtonText}>⇅ Swap Currencies</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Converted amount"
          value={convertedAmount}
          editable={false}
        />
        <Picker
          selectedValue={toCurrency}
          style={styles.picker}
          onValueChange={(itemValue: string) => setToCurrency(itemValue)}
        >
          {CURRENCIES.map(currency => (
            <Picker.Item key={currency} label={currency} value={currency} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.convertButton} onPress={convertCurrency}>
        <Text style={styles.convertButtonText}>Convert</Text>
      </TouchableOpacity>

      {/* New section for exchange rate display */}
      {exchangeRate && (
        <View style={styles.rateContainer}>
          <Text style={styles.rateText}>
            Current Rate: 1 {fromCurrency} = {exchangeRate} {toCurrency}
          </Text>
        </View>
      )}
    </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2c3e50',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    height: 55,
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#333',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  swapButton: {
    backgroundColor: '#e9ecef',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  swapButtonText: {
    textAlign: 'center',
    color: '#495057',
    fontWeight: '600',
  },
  convertButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 12,
    width: '100%',
    marginTop: 20,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 2 },  
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  convertButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rateContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f1f3f5',
    borderRadius: 10,
    width: '100%',
  },
  rateText: {
    textAlign: 'center',
    color: '#495057',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default FXCalcApp;