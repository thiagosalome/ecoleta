import React, { useState, useEffect } from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import { StyleSheet, ImageBackground, View, Image, Text, Picker, ToastAndroid } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

import Logo from '../../assets/logo.png'
import Background from '../../assets/home-background.png'

interface IBGEUF {
  sigla: string;
}

interface IBGECITY {
  nome: string;
}


const Home = () => {
  const navigation = useNavigation()
  const [ufs, setUfs] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [selectedCity, setSelectedCity] = useState<string>('0')
  const [selectedUf, setSelectedUf] = useState<string>('0')

  function handleNavigateToPoints () {
    if (selectedUf !== '0' && selectedCity !== '0') {
      navigation.navigate('Points', {
        uf: selectedUf,
        city: selectedCity
      })
    } else {
      ToastAndroid.show('Selecione a UF e a cidade', ToastAndroid.SHORT)
    }
  }

  async function getStates() {
    const response = await axios.get<IBGEUF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    const ufInitials = response.data.map(uf => uf.sigla)

    setUfs(ufInitials)
  }
  
  async function getCities(uf: string) {
    const response = await axios.get<IBGECITY[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
    const citiesNames = response.data.map(citie => citie.nome)

    setCities(citiesNames)
  }

  useEffect(() => {
    getStates()
  }, [])

  useEffect(() => {
    if (selectedUf === '0') {
      return
    }

    getCities(selectedUf)
  }, [selectedUf])

  return (
    <ImageBackground
      source={Background}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={Logo}></Image>
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
      </View>

      <View style={styles.select}>
        <Picker
          style={styles.selectPicker}
          selectedValue={selectedUf}
          onValueChange={value => setSelectedUf(value)}
        >
          <Picker.Item label='Selecione uma UF' value='0'>Selecione uma UF</Picker.Item>
          {
            ufs.map(uf => (
              <Picker.Item key={String(uf)} label={uf} value={uf}>{uf}</Picker.Item>
            ))
          }
        </Picker>
        <View style={styles.selectIcon}>
          <Icon name='chevron-down' color='#A0A0B2' size={20} />
        </View>
      </View>
     
      <View style={styles.select}>
        <Picker
          style={styles.selectPicker}
          selectedValue={selectedCity}
          onValueChange={value => setSelectedCity(value)}
        >
          <Picker.Item label='Selecione uma cidade' value='0'>Selecione uma cidade</Picker.Item>
          {
            cities.map(city => (
              <Picker.Item key={String(city)} label={city} value={city}>{city}</Picker.Item>
            ))
          }
        </Picker>
        <View style={styles.selectIcon}>
          <Icon name='chevron-down' color='#A0A0B2' size={20} />
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name='arrow-right' color='#ffffff' size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </RectButton>
      </View>
    </ImageBackground>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 8,
    marginVertical: 8
  },

  selectPicker: {
    color: '#A0A0B2',
  },

  selectIcon: {
    position: 'absolute',
    right: 15,
    top: 10,
    backgroundColor: '#FFF',
    height: 40,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});