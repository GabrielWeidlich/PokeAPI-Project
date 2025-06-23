# Aplicativo Pokémon - Exploração da PokeAPI com Ionic e Angular

Este projeto é um aplicativo móvel híbrido desenvolvido com Ionic e Angular, projetado para consumir dados da API pública [PokeAPI](https://pokeapi.co/). Ele demonstra habilidades em integração de APIs, gerenciamento de estado e interface de usuário responsiva.

## Visão Geral e Funcionalidades

O aplicativo oferece as seguintes funcionalidades:

-   **Lista de Pokémons:** Exibe uma lista paginada de Pokémons com seus nomes e imagens.
-   **Scroll Infinito:** Carrega mais Pokémons automaticamente à medida que o usuário rola a lista para baixo, otimizando o desempenho.
-   **Barra de Busca Híbrida:** Permite pesquisar Pokémons por nome. A busca é híbrida: primeiramente filtra nos itens já carregados e, se não encontrar (e o Pokémon não estiver carregado), tenta buscar diretamente na PokeAPI.
-   **Tela de Detalhes:** Ao clicar em um Pokémon, o usuário é redirecionado para uma tela de detalhes que exibe informações adicionais (altura, peso, habilidades, tipos, etc.) e múltiplas imagens (sprites).
-   **Favoritos:** Usuários podem marcar Pokémons como favoritos, que são persistidos localmente usando o Ionic Storage e exibidos em uma aba dedicada.
-   **Navegação por Abas:** Utiliza o componente de tabs do Ionic para facilitar a navegação entre a lista principal e a lista de favoritos.
-   **Responsividade:** A interface se adapta para funcionar adequadamente em diferentes orientações de dispositivos móveis.

## Abordagem, Estilo de Codificação e Padrões de Design

Minha abordagem neste projeto foi focada na construção de um aplicativo modular, manutenível e com uma experiência de usuário fluida, seguindo as boas práticas do Angular e do Ionic:

-   **Arquitetura Baseada em Componentes e Serviços:** O aplicativo é modularizado em componentes (páginas como `Tab1Page`, `PokemonDetailsPage`) e serviços (`PokemonService`, `FavoriteService`). Os serviços são responsáveis por centralizar a lógica de negócio e a comunicação com a API, mantendo os componentes mais limpos e focados na UI.
-   **Injeção de Dependência:** Utilizei extensivamente a Injeção de Dependência para gerenciar as dependências (`HttpClient`, `Router`, serviços customizados) em todo o aplicativo, promovendo a testabilidade e a flexibilidade.
-   **Controle de Versão Transparente:** O projeto é compartilhado no GitHub com commits claros e frequentes, refletindo o progresso e as funcionalidades implementadas em cada etapa.
-   **Manipulação de Eventos e Ciclo de Vida:** Utilizei os hooks de ciclo de vida do Angular (`ngOnInit`) e do Ionic (`ionViewWillEnter`) para carregar dados e gerenciar estados no momento certo.
-   **Gerenciamento de Estado Reativo (RxJS):** As chamadas de API são tratadas como `Observables` (RxJS), utilizando o padrão `subscribe({ next, error, complete })` para lidar com as respostas de forma assíncrona.
-   **Tratamento Robusto de Scroll Infinito:** Implementei um sistema de scroll infinito que gerencia a paginação da API e lida com condições de carregamento, erros e fim da lista, garantindo uma experiência de usuário suave mesmo com grandes volumes de dados. Foi necessário utilizar `@ViewChild` para acessar diretamente o componente `ion-infinite-scroll` e contornar problemas de eventos.
-   **Detecção de Mudanças Explícita:** Em alguns cenários, utilizei `ChangeDetectorRef` para forçar a detecção de mudanças e garantir que a interface do usuário fosse atualizada corretamente após alterações nos dados, especialmente na lógica de busca.
-   **Gerenciamento de Estado Local (`@ionic/storage-angular`):** A funcionalidade de favoritos persiste os dados localmente no dispositivo do usuário, garantindo que as preferências sejam lembradas entre as sessões do aplicativo.

---

## **Como Rodar o Projeto Localmente**

1.  **Clone o repositório:**
    `git clone https://github.com/GabrielWeidlich/PokeAPI-Project.git`
2.  **Navegue até a pasta do projeto:**
    `cd PokeAPI-Project`
3.  **Instale as dependências:**
    `npm install`
4.  **Execute o aplicativo:**
    `ionic serve`
    Isso abrirá o aplicativo em seu navegador padrão, geralmente em `http://localhost:8100/`.

---

## **Demonstração (Opcional - Adicione imagens/GIFs aqui)**

*(Você pode adicionar capturas de tela ou um GIF curto aqui para mostrar as funcionalidades em ação. Por exemplo, uma imagem da lista principal, uma da tela de detalhes, e uma da lista de favoritos.)*

---