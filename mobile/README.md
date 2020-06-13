# Mobile

## Entendendo o React Native

Todo o código é feito em JavaScript, mas **não é convertido em código nativo**. Na verdade, o dispositivo passar a entender o código JavaScript e a interface gerada é **totalmente nativa**.

## Por que utilizaremos o Expo

Sem o Expo precisamos instalar em nosso sistema tanto o Android Studio para obter a SDK de desenvolvimento Android, quanto o XCode (que é apenas para Mac) para obter a SDK do iOS. Isso acaba sendo um pouco penoso, pois essas SDKs não são tão simples de instalar.

Além disso ele permite fazer testes no iOS.

## Arquitetura do Expo

Nós instalamos um aplicativo no celular chamado Expo, e dentro dele já contém tudo que precisamos desenvolver para o React Native (API's de mapas, geolocalização, câmera, sensores, etc)

---

## Instalar Expo CLI

```bash
npm install -g expo-cli
```

---

## Criar projeto com Expo

```bash
expo init nome_projeto
```

Selecionar opção

```bash
blank (TypeScript) same as blank but iwth TypeScript configuration
```

---

## Executando projeto

```bash
npm start
```

---

## Configurando emulador

O vídeo para configuração do emulador pode ser encontrado [nesse link](https://www.youtube.com/watch?v=eSjFDWYkdxM)

---

## Instalando uma fonte do Google Fonts com o expo

```bash
expo install expo-font @expo-google-fonts/ubuntu
```

```tsx

import { AppLoading } from 'expo'
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu'

export default function App() {
  const [fontsLoaded] = useFonts({
    Ubuntu_700Bold
  })

  if(!fontsLoaded) {
    return <AppLoading />
  }
}

```

---

## Integrando mapas

Instalar ```react-native-maps```

```bash
expo install react-native-maps
```

```tsx
import MapView, { Marker } from 'react-native-maps'

<MapView
  style={styles.map}
  initialRegion={{
    latitude: -19.9847841,
    longitude: -43.9722806,
    latitudeDelta: 0.014, // Zoom do mapa
    longitudeDelta: 0.014 // Zoom do mapa
  }}
>
  <Marker
    style={styles.mapMarker}
    onPress={handleNavigateToDetail}
    coordinate={{
      latitude: -19.9847841,
      longitude: -43.9722806,
    }}
  >
    <View style={styles.mapMarkerContainer}>
      <Image style={styles.mapMarkerImage} source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80' }} />
      <Text style={styles.mapMarkerTitle}>Mercado</Text>
    </View>
  </ Marker>
</MapView>

```

---

## Pegando localização do usuário

Instalar a dependência ```expo-location```

```bash
expo install expo-location
```

```tsx
import * as Location from 'expo-location'

const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])

useEffect(() => {
  async function loadPosition() {
    const { status } = await Location.requestPermissionsAsync()

    // Se o usuário não deu permissão para acesso
    if(status !== 'granted') {
      Alert.alert('Ops...', 'Precisamos de sua permissão para obter a localização')
      return
    }

    const location = await Location.getCurrentPositionAsync()
    const { latitude, longitude } = location.coords
    setInitialPosition([latitude, longitude])
  }

  loadPosition()
}, [])

```

---

## Configurando evio de email

Instalar a dependência ```expo-mail-composer```

```bash
expo install expo-mail-composer
```

Implementar envio de email

```tsx
import * as MailComposer from 'expo-mail-composer'

function handleComposeMail() {
  MailComposer.composeAsync({
    subject: 'Interesse na coleta de resíduos',
    recipients: [data.point.email]
  })
}

```
