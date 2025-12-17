# 🎬 OSS-Player (Mini-LPS)

> Uma Linha de Produto de Software (LPS) para reprodução de vídeo em React, com foco em reuso e variabilidade.

O **OSS-Player** é um componente de vídeo altamente configurável que permite instanciar diferentes "produtos" (variações) a partir de uma única base de código, atendendo desde blogs simples até plataformas de ensino complexas (EAD).

## 🚀 Instalação

~~~bash
npm install oss-player
~~~

---

## 📦 Produtos da Linha (Variações)

Este componente implementa o conceito de **Variabilidade em Tempo de Execução** através da prop `type`.

### 1. Variação Core (Padrão)
Focada em leveza e simplicidade. Ideal para blogs e landing pages.
* **Features:** Play/Pause, Volume, Tela Cheia, Barra de Progresso.
* **Desativado:** Controle de velocidade, Legendas, Skip 10s, PiP.

~~~jsx
import { OssPlayer } from 'oss-player-qxd';

function App() {
  return (
    <OssPlayer 
      type="core" 
      src="https://exemplo.com/video.mp4" 
    />
  );
}
~~~

### 2. Variação Advanced (EAD)
Focada em acessibilidade e ferramentas de estudo. Ideal para plataformas LMS.
* **Features:** Tudo do Core + Controle de Velocidade, Legendas (CC), Botões de Pular (+/- 10s), Picture-in-Picture e Seletor de Qualidade.

~~~jsx
import { OssPlayer } from 'oss-player-qxd';

function App() {
  return (
    <OssPlayer 
      type="advanced" 
      src="https://exemplo.com/aula.mp4"
      subtitlesSrc="https://exemplo.com/legenda.vtt"
      primaryColor="#df262f" // Personalização da marca
    />
  );
}
~~~

### 3. Variação Híbrida (Custom)
O sistema permite **sobrescrever** as convenções. Você pode usar o preset `core` mas ativar uma feature específica do `advanced`.

~~~jsx
<OssPlayer 
  type="core" 
  src="..." 
  showSpeedControl={true} // Ativa APENAS a velocidade no modo Core
/>
~~~

---

## 🛠️ API & Props

| Propriedade | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `src` | `string` \| `array` | **Obrigatório** | URL do vídeo ou array de qualidades (veja abaixo). |
| `type` | `'core'` \| `'advanced'` | `'core'` | Define o preset de funcionalidades (LPS). |
| `subtitlesSrc` | `string` | `null` | URL do arquivo de legenda (.vtt). Necessário se `showSubtitles` for true. |
| `primaryColor` | `string` | `#df262f` | Cor hexadecimal para a barra de progresso e destaques. |
| `showSpeedControl` | `boolean` | *Auto* | Força a exibição/ocultação do controle de velocidade. |
| `showSkipControls` | `boolean` | *Auto* | Força a exibição/ocultação dos botões de +/- 10s. |
| `showSubtitles` | `boolean` | *Auto* | Força a exibição/ocultação do botão de Closed Caption. |

### Suporte a Múltiplas Qualidades
Para ativar o menu de qualidade, passe um array de objetos no `src`:

~~~jsx
const sources = [
  { label: 'SD', url: 'video_360p.mp4' },
  { label: 'HD', url: 'video_720p.mp4' },
  { label: 'FHD', url: 'video_1080p.mp4' }
];

<OssPlayer src={sources} type="advanced" />
~~~

---

## ⌨️ Atalhos de Teclado

O player suporta navegação completa via teclado para acessibilidade:

* **Espaço / K:** Play/Pause
* **F:** Tela Cheia (Fullscreen)
* **M:** Mute/Unmute
* **P:** Picture-in-Picture (PiP)
* **Seta Direita / Esquerda:** Avançar/Voltar 5 segundos
* **Seta Cima / Baixo:** Aumentar/Diminuir Volume

---

## 🎨 Tematização e CSS

O player utiliza injeção automática de CSS. Nenhuma configuração extra ou importação de arquivo `.css` é necessária. 

Para alterar a cor principal (barra de progresso e hover), basta passar a prop `primaryColor`.

---

## 📝 Sobre o Projeto

Este projeto foi desenvolvido como parte da disciplina de **Reuso de Software**.

* **Arquitetura:** Mini-LPS baseada em Componentização React.
* **Mecanismo de Variabilidade:** Renderização Condicional baseada em Props e Presets (Runtime Variability).
* **Gerenciamento de Estado:** React Context API + Hooks.

---

## 👥 Autores

* **Jorge Eduardo Silva Sousa - 542051**
* **Matheus Conrado Pires - 536536**