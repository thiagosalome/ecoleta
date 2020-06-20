# Web

## Criando base do projeto

* Criando projeto com typescript

  ```bash
  npx create-react-app --template=typescript
  ```

---

## Limpando estrutura da aplicação

Deixar apenas o index.html na pasta /public
Deixar apenas os seguintes arquivos na pasta /src

* App.css
* App.tsx
* index.tsx
* react-app.env.d.ts

**Obs:** Remover as possíveis dependências que esses arquivos tinham

Adicionar cor do tema na meta theme-color (#34CB79)

---

## Configurando fonte e css base

[Link Figma](https://www.figma.com/file/1SxgOMojOB2zYT0Mdk28lB/Ecoleta)

* Adicionar reset.css no arquivo App.css
* Fazer a inclusão das seguintes fontes
  * Roboto (400)
  * Ubuntu (700)

---

## Integrando mapa no formulário

Instalar o [leaflet](https://leafletjs.com/examples/quick-start/) e o react-leaflet

```bash
npm install leaflet react-leaflet
npm install @types/react-leaflet -D
```

Importar o css do leaflet e adicionar no index.html

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
   integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
   crossorigin=""/>
```

No componente, adicionar o seguinte código

```tsx

  <Map center={[-27.2092052, -49.6401092]} zoom={15}>
    <TileLayer
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[-27.2092052, -49.6401092]} />
  </Map>

```

---

## Selectionando a posição que o usuário clica no mapa

```tsx
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])

  [...]

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ])
  }

  [...]

  <Map center={[-27.2092052, -49.6401092]} zoom={15} onClick={handleMapClick}>
    [...]
    <Marker position={selectedPosition}>
  </Map>
```

---

## Carregar a localização atual do usuário no mapa

```tsx
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])

  [...]

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords

      setInitialPosition([latitude, longitude])
    })
  }, [])

  [...]

  <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
    [...]
  </Map>
```

---

## Upload de imagens

Instalar a biblioteca ```react-dropzone```

```bash
npm install react-dropzone
```

Criar um componente Dropzone

```tsx

import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

const Dropzone: React.FC<IDropzone> = ({ onFileUploaded }: IDropzone) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  // Quando o usuário faz o drop da imagem
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]

    const fileUrl = URL.createObjectURL(file)

    setSelectedFileUrl(fileUrl)
    onFileUploaded(file) // Método criado para que o pai possa receber o valor do file
  }, [onFileUploaded])

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <div className='dropzone' {...getRootProps()}>
      <input {...getInputProps()} accept='image/*' />
      {
        selectedFileUrl
          ? <img src={selectedFileUrl} alt='Point thumbnail'/>
          : (
            <p>
              <FiUpload />
              Imagem do estabelecimento
            </p>
          )
      }
    </div>
  )
}

export default Dropzone

```

---

## Opções de deploy

* Netlify:
  * Serviço para deploy de aplicações Front-end
  * Mais fácil de fazer o deploy
* Vercel

* Amazon S3 / Google Cloud Storage
  * Serviços para armazenamento de arquivos estáticos
  * Caso a aplicação comece a ficar muito grande
