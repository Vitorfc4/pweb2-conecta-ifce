Respostas completas — Projeto ConectaIFCE

1. Descreva detalhadamente o processo de criação do projeto utilizando React com Vite e TypeScript. Justifique a escolha dessa ferramenta de build e explique as primeiras modificações realizadas após a criação do projeto.

O projeto começou com React + Vite + TypeScript porque essa combinação oferece uma base moderna, rápida e muito produtiva para desenvolvimento frontend. O Vite foi escolhido principalmente por iniciar o ambiente quase instantaneamente, atualizar a aplicação com rapidez durante o desenvolvimento e gerar builds otimizadas com uma configuração mais simples do que outras ferramentas tradicionais.

Depois que o projeto foi criado, as primeiras mudanças foram limpar os arquivos padrão, reorganizar a estrutura inicial das pastas e configurar o alias @/ para facilitar as importações. Em seguida, foram instalados e configurados o Tailwind CSS e as bibliotecas necessárias para roteamento, autenticação, formulários e cache. Também foram criados os layouts principais da aplicação, separando a parte pública da parte autenticada, para evitar repetir a mesma estrutura em várias páginas.

2. Explique como o TypeScript foi utilizado desde o início do desenvolvimento. Apresente exemplos concretos do seu projeto em que a tipagem contribuiu para evitar erros.

O TypeScript foi usado desde o começo para deixar o projeto mais seguro, mais previsível e mais fácil de manter. Em vez de depender apenas de validações em tempo de execução, a tipagem foi aplicada nos dados de usuário, sessão, posts, grupos, formulários de autenticação e retornos dos serviços.

Na prática, isso ajudou bastante a evitar erros. Por exemplo, no projeto existem tipos para User, AuthSession, Post, Group, LoginPayload e RegisterPayload. A store de autenticação também é tipada, o que garante consistência em campos como token, user, isAuthenticated, login, register e logout. Nos componentes, a tipagem ajuda a impedir problemas como passar parâmetros errados para o ComposerCard, tentar acessar propriedades que não existem no usuário logado ou esquecer que determinada função é assíncrona e retorna uma Promise.

3. Descreva como foi configurado o TailwindCSS no projeto. Explique o papel do arquivo de configuração e como os estilos são efetivamente aplicados nos componentes.

O Tailwind CSS foi adotado como a principal ferramenta de estilização da interface. Depois da instalação, o projeto passou a usar as diretivas @tailwind base, @tailwind components e @tailwind utilities no arquivo global de estilos, permitindo que o Tailwind gere automaticamente as classes necessárias.

O arquivo de configuração do Tailwind define onde o framework deve procurar classes dentro do projeto e também permite personalizar o tema padrão. No caso do ConectaIFCE, ele foi usado para organizar cores, sombras, bordas e a paleta brand, mantendo um padrão visual mais consistente. Os estilos são aplicados diretamente nos componentes com classes utilitárias como rounded-2xl, bg-brand-500, text-muted-foreground e shadow-soft, o que torna a construção da interface mais rápida e organizada.

4. Explique o processo de integração do shadcn/ui. Descreva como os componentes são adicionados ao projeto e analise as implicações arquiteturais dessa abordagem.

A integração com o shadcn/ui seguiu a proposta principal dessa abordagem: em vez de depender de uma biblioteca fechada, os componentes passam a fazer parte do próprio projeto. Por isso, a aplicação foi organizada com a pasta src/components/ui, o arquivo components.json e o utilitário cn, usado para combinar classes de forma mais limpa.

Foram criados componentes base como Button, Card, Input, Label, Textarea, Badge e Avatar. Isso traz uma vantagem arquitetural importante: o projeto ganha mais controle sobre os componentes, podendo adaptá-los livremente conforme a identidade visual e a necessidade da aplicação. Ao mesmo tempo, essa escolha também exige mais responsabilidade, já que a própria equipe passa a cuidar da manutenção, consistência e acessibilidade desses componentes.

5. Descreva a estrutura de pastas adotada no seu projeto. Justifique as principais decisões organizacionais tomadas.

A estrutura de pastas foi pensada para separar bem as responsabilidades e facilitar a manutenção do projeto. A pasta src/components concentra componentes reutilizáveis. Dentro dela, ui reúne os componentes visuais base e layout guarda estruturas maiores, como navbar, footer, header, sidebar e proteção de rotas.

Já a pasta features organiza o projeto por domínio, como auth, feed e groups, reunindo serviços, schemas e componentes específicos dessas áreas. A pasta pages concentra as páginas acessadas por rota, routes centraliza o roteamento, lib guarda utilitários e a camada de API, types concentra os contratos tipados e mocks armazena os dados simulados usados no modo local. Essa organização ajuda a evitar que lógica de negócio, interface e acesso a dados fiquem misturados no mesmo lugar.

6. Explique como o roteamento foi configurado e como as rotas foram organizadas. Descreva o papel do layout base na estrutura da aplicação.

O roteamento foi configurado com React Router, separando de forma clara as rotas públicas das rotas privadas. As páginas públicas incluem a landing page, o login e o cadastro. Já a área autenticada fica em um grupo próprio de rotas, com páginas como feed, grupos e perfil protegidas por um componente que verifica se o usuário está logado.

Os layouts base têm um papel importante nessa organização. O PublicLayout mantém navbar, footer e a área central das páginas públicas. O AppLayout organiza a parte interna da aplicação com header, sidebar e conteúdo principal. Isso evita repetir estrutura em cada página e deixa a navegação mais bem organizada.

7. Descreva como o layout principal da aplicação foi estruturado para evitar duplicação de código entre páginas.

A aplicação foi estruturada para que a parte fixa da interface apareça apenas uma vez no layout, e não seja recriada em cada página. Nas páginas públicas, a navbar e o footer ficam centralizados no PublicLayout. Na área autenticada, o AppLayout concentra o header e a sidebar.

Com isso, cada página precisa renderizar apenas o seu conteúdo principal. Essa decisão reduz bastante a duplicação de código, facilita a manutenção e torna alterações globais de layout muito mais simples, já que elas podem ser feitas em um único ponto.

8. Explique a diferença entre linter e formatter e descreva como ESLint e Prettier foram configurados no projeto.

O linter é a ferramenta que analisa o código para identificar problemas de qualidade, más práticas e possíveis erros. Já o formatter é responsável por padronizar a aparência do código, como indentação, espaçamento, aspas e quebras de linha.

No projeto, o ESLint foi configurado para trabalhar com JavaScript moderno, TypeScript e regras específicas do React, incluindo hooks. O Prettier foi usado para manter a formatação padronizada em todos os arquivos. A combinação entre os dois melhora a legibilidade do código e evita diferenças desnecessárias entre trechos escritos em momentos diferentes ou por pessoas diferentes.

9. Descreva como sua IDE foi configurada para trabalhar com o projeto e como essa configuração contribui para a qualidade do código.

A IDE considerada foi o VS Code, com extensões úteis para React, TypeScript e Tailwind, como ESLint, Prettier e Tailwind IntelliSense. Essas ferramentas ajudam com autocomplete, verificação de tipos, visualização mais clara das classes utilitárias e feedback imediato sobre erros e padrões de código.

Essa configuração melhora a qualidade do projeto porque ajuda a encontrar problemas ainda durante a escrita do código. O TypeScript aponta tipos incorretos, o ESLint alerta sobre práticas inadequadas e o Prettier mantém tudo visualmente padronizado. Isso reduz retrabalho e torna o desenvolvimento mais consistente.

10. Explique o fluxo completo de autenticação implementado no projeto, desde o envio das credenciais até o acesso às rotas protegidas.

O fluxo de autenticação começa nas telas de login e cadastro, que foram feitas com React Hook Form e validadas com Zod. Quando o usuário envia os dados, a store de autenticação do Zustand dispara a ação correspondente e chama o serviço responsável.

Esse serviço foi preparado para funcionar em dois modos: mock e REST. No modo mock, a validação é feita com base em dados simulados. No modo REST, os dados são enviados para a API. Em ambos os casos, se a autenticação der certo, a aplicação salva o token, o user e o estado isAuthenticated. A partir disso, o ProtectedRoute libera o acesso às rotas privadas. Se o usuário não estiver autenticado, ele é redirecionado para o login.

11. Descreva onde e como o token JWT foi armazenado. Justifique tecnicamente essa escolha.

O token JWT foi armazenado na store global de autenticação usando Zustand com persistência, sendo salvo no localStorage. Junto com ele, também ficam armazenados os dados principais da sessão, como o usuário autenticado e o estado de autenticação.

Essa escolha foi adequada para o contexto do projeto porque simplifica bastante o fluxo e facilita a persistência da sessão após atualizar a página. Em um sistema de produção com foco mais forte em segurança, uma alternativa melhor seria usar cookies HttpOnly, mas para um projeto acadêmico e didático, o localStorage atende bem e deixa o funcionamento mais fácil de demonstrar.

12. Explique como foi implementado o envio do token nas requisições protegidas.

O projeto possui uma camada centralizada de serviços, e isso facilita bastante o envio do token nas rotas protegidas. Quando a aplicação está em modo REST, essa camada recupera o token armazenado na sessão e o envia no header Authorization, usando o padrão Bearer <token>.

A vantagem dessa centralização é que a lógica de autenticação não precisa ser repetida em cada serviço ou em cada página. Assim, endpoints como feed, perfil, curtidas, comentários e follow/unfollow seguem todos o mesmo padrão. No modo mock, o token continua existindo na sessão para manter a arquitetura coerente, mesmo sem haver uma requisição HTTP real.

13. Descreva como a aplicação trata respostas 401 da API e quais impactos isso tem na experiência do usuário.

Quando a API retorna 401 Unauthorized, a aplicação interpreta isso como uma falha de autenticação, como token expirado ou inválido. Nesse caso, a sessão é limpa e o usuário é redirecionado para a tela de login.

Esse tratamento melhora a experiência porque evita situações em que a interface continua aberta, mas sem permissão real de acesso. Também ajuda a deixar o motivo do problema mais claro para o usuário, especialmente quando acompanhado de uma mensagem como “Sua sessão expirou, faça login novamente”. Do ponto de vista arquitetural, tratar 401 de forma centralizada evita duplicação e deixa esse comportamento mais previsível.

14. Analise como o contexto global de autenticação foi estruturado e quais responsabilidades foram atribuídas a ele. Em sua resposta, inclua uma descrição de como funciona a Context API do React e como ela foi utilizada para gerenciar o estado de autenticação. Existem outras abordagens para gerenciar o estado de autenticação em uma aplicação React? Você utilizou alguma dessas outras abordagens no projeto apresentado nas videoaulas ou no projeto final da sua equipe para a disciplina?

No projeto final, o estado global de autenticação foi estruturado com Zustand, e não com a Context API. A store ficou responsável por armazenar a sessão, persistir o token, manter o usuário autenticado e disponibilizar ações como login, cadastro e logout.

A Context API do React funciona criando um contexto compartilhado por uma árvore de componentes. Um provider disponibiliza valores e funções, e os componentes filhos acessam essas informações por meio do useContext, sem precisar passar props por muitos níveis. Ela funciona bem para estados globais mais simples, como tema, idioma ou uma sessão básica. Porém, quando a aplicação precisa de persistência, ações específicas e controle melhor dos rerenders, ferramentas como Zustand, Redux Toolkit ou Jotai acabam sendo mais práticas. No projeto final, a escolha foi o Zustand justamente por ser mais simples e mais adequado ao escopo da autenticação.

15. Descreva como o estado do feed é carregado e atualizado após a criação de um novo post. Em sua resposta, relacione os conceitos de lifting state up e prop drilling e como esses conceitos foram explorados no projeto.

O feed é carregado com SWR, usando uma chave de cache específica para a listagem de posts. Isso permite buscar os dados, manter esses dados em cache e revalidá-los quando alguma ação altera o conteúdo do feed. Depois que um novo post é criado, a página chama o serviço correspondente e, ao final, usa mutate para atualizar ou revalidar o cache.

Nesse fluxo, houve um uso controlado de lifting state up, porque a lógica principal de atualização do feed ficou concentrada na própria página do feed. Já o componente que cria o post recebe apenas a função de publicação, sem precisar conhecer toda a lógica da página. O prop drilling aparece de forma limitada, quando algumas funções e dados descem para componentes filhos, mas isso foi mantido sob controle graças à separação entre páginas, componentes de UI e store global.

16. Descreva como o envio de imagens para criação de posts foi implementado no frontend.

Na versão final do projeto, a criação de posts foi preparada para aceitar imagem, tanto no modo mock quanto no modo REST. No frontend, o componente de criação do post já considera os dados textuais e também a imagem associada ao post.

Quando a aplicação estiver integrada com a API real, esse envio pode ser feito por FormData ou por um fluxo de upload separado, em que a imagem é enviada primeiro e a URL resultante é usada na criação do post. No modo mock, o comportamento foi simplificado para manter a coerência visual e arquitetural do projeto, mas a estrutura necessária para essa funcionalidade já foi considerada.

17. Explique como o tratamento de erros retornados no padrão da API foi realizado na interface. Como as mensagens de erro são exibidas para o usuário? Quais melhorias poderiam ser implementadas nesse tratamento de erros para melhorar a experiência do usuário?

O tratamento de erros foi organizado em duas etapas. Primeiro, há a validação local com Zod, que impede o envio de dados claramente inválidos. Depois, há o tratamento dos erros vindos da camada de serviços, tanto em autenticação quanto em ações como publicação, comentários e interações sociais.

As mensagens de erro aparecem na interface de forma visível e acessível, normalmente próximas ao formulário ou à ação que falhou. Como melhoria, seria interessante adicionar um sistema global de notificações, como toasts, além de mapear melhor os códigos de erro da API para mensagens mais específicas. Outra evolução possível seria oferecer opção de tentar novamente em algumas falhas.

18. Escolha um endpoint utilizado no projeto e descreva detalhadamente como a requisição é construída e como a resposta é processada. Em sua resposta, inclua detalhes sobre os headers, o corpo da requisição e como a resposta é utilizada para atualizar o estado da interface, comentando também sobre estado de loading.

Um bom exemplo é a criação de post. Quando o modo REST está ativo, a camada de serviço envia os dados para o endpoint correspondente usando o método POST. Como é uma rota protegida, a requisição inclui o header Authorization: Bearer <token>. Dependendo do formato adotado, também pode incluir Content-Type: application/json ou FormData, especialmente quando há imagem envolvida.

O corpo da requisição leva o conteúdo do post e, quando necessário, informações sobre a imagem. Enquanto a operação acontece, o botão de envio fica em estado de loading, o que evita múltiplos cliques e dá um retorno visual ao usuário. Se a requisição der certo, o formulário é limpo e o SWR revalida o feed. Se houver erro, a interface mostra a mensagem correspondente sem precisar recarregar a página.

19. Explique como o botão de seguir e deixar de seguir altera seu estado visual com base na resposta da API.

O botão de seguir foi implementado para mudar de aparência de acordo com o estado atual da relação entre o usuário autenticado e o perfil visualizado. Quando a ação de seguir ou deixar de seguir é executada, a aplicação processa a mutação e atualiza os dados relacionados ao perfil e às sugestões.

Na prática, o botão alterna entre estados como “Seguir” e “Seguindo”, mudando texto e estilo visual. Durante a requisição, ele também pode ficar desabilitado temporariamente para evitar cliques repetidos. Isso ajuda o usuário a perceber imediatamente se a ação foi aplicada com sucesso.

20. Descreva como os contadores de seguidores e posts são atualizados após interações sociais.

Os contadores são atualizados por meio da revalidação dos dados de perfil e das listas associadas sempre que acontece uma interação relevante. Quando um usuário segue ou deixa de seguir outro, o perfil é atualizado para refletir a nova quantidade de seguidores. Da mesma forma, quando um novo post é publicado, o feed e o perfil podem ser revalidados para mostrar a nova quantidade de posts.

Esse comportamento pode ser feito com revalidação via SWR ou com atualização otimista seguida de sincronização. O mais importante é que a interface mostre os novos valores sem depender de recarga manual da página.

21. Explique como o sistema de curtidas foi implementado e como o contador é atualizado na interface. Analise possíveis inconsistências de estado que poderiam ocorrer caso múltiplas requisições sejam feitas simultaneamente.

O sistema de curtidas foi tratado como uma ação social do post. Quando o usuário curte ou descurte, o serviço correspondente executa a mutação e o contador é atualizado na interface por revalidação ou ajuste do cache local.

Se várias requisições forem disparadas ao mesmo tempo, podem surgir inconsistências como contagem duplicada, troca incorreta de estado ou divergência entre o frontend e o backend. Para reduzir esse risco, o projeto pode bloquear temporariamente o botão durante a requisição, usar atualização otimista com rollback em caso de erro e contar com um backend que trate essa operação de forma idempotente.

22. Ao curtir um post, a interface é atualizada imediatamente para refletir a nova contagem de curtidas. Descreva como essa atualização imediata foi implementada e quais são as vantagens e desvantagens dessa abordagem em comparação com uma atualização baseada na resposta da API. Em sua resposta, cite o nome comumente usado para essa técnica de atualização imediata.

Essa técnica é chamada de optimistic update, ou atualização otimista. A ideia é atualizar a interface antes mesmo da confirmação final do backend, dando ao usuário a sensação de resposta imediata. O SWR ajuda bastante nesse tipo de comportamento, porque permite alterar o cache local enquanto a requisição ainda está em andamento.

A principal vantagem é a melhora na experiência do usuário, já que a aplicação parece mais rápida e fluida. A principal desvantagem é que, se a requisição falhar, o estado exibido precisa ser revertido ou revalidado, o que exige um tratamento cuidadoso de erro. Mesmo assim, em aplicações sociais essa costuma ser uma estratégia muito útil.

23. Analise a separação de responsabilidades entre componentes, serviços e contextos no seu projeto. O uso de hooks personalizados foi explorado para melhorar essa separação? Justifique suas respostas com exemplos concretos do projeto e relacionando com os conceitos de hooks e custom hooks.

A separação de responsabilidades foi pensada para que cada parte do projeto tenha uma função clara. Os componentes ficaram responsáveis pela interface e pela interação local. Os serviços centralizam o acesso aos dados. Já a store global cuida da sessão do usuário e das ações ligadas à autenticação.

O projeto utiliza hooks nativos e hooks de bibliotecas, como useState, useForm, useSWR, useNavigate e o hook da store do Zustand. O uso de custom hooks próprios ainda pode ser ampliado em uma segunda versão, especialmente em áreas como feed, perfil e autenticação. Mesmo assim, a estrutura atual já deixa o código bem mais desacoplado do que se toda a lógica estivesse concentrada nas páginas.

24. Explique como a centralização da configuração da API contribui para a manutenção do sistema.

Centralizar a configuração da API melhora muito a manutenção porque reduz repetição e padroniza pontos importantes, como base URL, headers, autenticação e tratamento de erro. Em vez de espalhar chamadas de rede diretamente pelas páginas, o projeto concentra isso em uma camada própria.

Essa escolha facilita tanto a alternância entre modo mock e modo REST quanto a evolução futura da aplicação. Se algum endpoint mudar, se a autenticação for alterada ou se for necessário ajustar a forma como os erros são tratados, isso pode ser resolvido em poucos arquivos centrais.

25. Descreva as principais dificuldades técnicas enfrentadas durante o desenvolvimento e como foram resolvidas.

Uma das principais dificuldades foi transformar um protótipo mais visual em uma aplicação com uma arquitetura mais organizada, incluindo autenticação, rotas protegidas, formulários validados, componentes reutilizáveis e separação mais clara entre interface e serviços. Isso foi resolvido com reorganização de pastas, criação de layouts base e divisão do projeto por domínio.

Outra dificuldade foi equilibrar o caráter didático do projeto com a exigência de integração REST. Para resolver isso, foi criada uma camada de serviços preparada para trabalhar em modo mock e em modo REST. Dessa forma, o projeto funciona bem localmente, mas sem perder a estrutura necessária para integração com a API real.

26. Se outro desenvolvedor assumisse seu projeto hoje, quais aspectos da organização facilitariam a continuidade?

A continuidade seria facilitada principalmente pela organização previsível das pastas, pela separação de responsabilidades e pela existência de layouts, serviços e componentes reutilizáveis bem definidos. Isso permite que outro desenvolvedor entenda mais rápido onde estão as páginas, a camada de autenticação, os componentes visuais, os tipos e os serviços.

Além disso, a presença de lint, formatter, alias de importação, README e estrutura modular por domínio ajuda bastante a reduzir a curva de aprendizado. Mesmo em partes que ainda possam evoluir, a base já mostra com clareza onde cada ajuste deve ser feito.

27. Considerando todo o desenvolvimento realizado, quais melhorias arquiteturais você implementaria em uma segunda versão do projeto?

Em uma segunda versão, eu aprofundaria a camada de API com um cliente HTTP mais robusto, melhor padronização de erros, interceptação mais refinada e estratégias mais completas de revalidação e atualização otimista. Também criaria custom hooks por domínio, como useFeed, useProfile e useAuthSession, para reduzir ainda mais o acoplamento entre páginas e serviços.

Outras melhorias importantes seriam a inclusão de testes unitários e de integração, paginação ou infinite scroll no feed, upload de mídia mais completo, acessibilidade ainda mais refinada e uma documentação mais detalhada do design system. Se o projeto crescesse bastante, também seria interessante estudar uma migração ou adaptação para Next.js.

28. O projeto desenvolvido é uma rede social simples, mas existem diversas funcionalidades que poderiam ser adicionadas para torná-lo mais completo. Escolha uma funcionalidade que não foi implementada e descreva detalhadamente como ela poderia ser implementada, tanto no frontend quanto na API.

Uma funcionalidade interessante para uma próxima versão seria um sistema de notificações em tempo real. No frontend, isso poderia aparecer como um ícone no header com contador de notificações não lidas e uma tela ou painel lateral mostrando eventos como nova curtida, novo comentário, novo seguidor ou menção.

Na API, seriam necessários endpoints para listar notificações, marcar como lida e talvez remover notificações antigas. Em uma versão mais avançada, seria possível usar WebSocket ou Server-Sent Events para atualização em tempo real. No frontend, o SWR ou outra estratégia de revalidação poderia manter essas informações sincronizadas. Essa funcionalidade deixaria a aplicação mais dinâmica e mais próxima de uma rede social completa.

29. Como as abordagens de SSG (Static Site Generation), SSR (Server-Side Rendering) e caching e revalidação do Next.js poderiam ser exploradas para melhorar a performance e a experiência do usuário em comparação com uma aplicação React tradicional?

Em uma aplicação React tradicional com Vite, a renderização acontece principalmente no cliente. Isso funciona bem para sistemas interativos, mas pode não ser a melhor escolha para SEO, primeira renderização e entrega de conteúdo público. O Next.js oferece mais opções para lidar com isso.

O SSG seria uma boa opção para páginas públicas mais estáveis, como a landing page ou páginas institucionais. O SSR seria útil em páginas cujo conteúdo precisa chegar pronto logo no primeiro carregamento, como perfis públicos ou páginas públicas mais dinâmicas. Já caching com revalidação permitiria entregar conteúdo rapidamente e atualizá-lo depois em segundo plano. Em comparação com uma SPA tradicional, essas abordagens podem melhorar SEO, tempo de resposta inicial e percepção geral de desempenho.

30. Cite pelo menos duas funcionalidades que poderiam ser implementadas utilizando as abordagens de SSG, SSR ou caching e revalidação do Next.js, explicando como cada abordagem contribuiria para a melhoria da aplicação.

Uma funcionalidade que combina muito com SSG é a landing page institucional do ConectaIFCE, porque esse tipo de conteúdo costuma mudar pouco e se beneficia de carregamento rápido e melhor indexação em mecanismos de busca.

Já uma funcionalidade adequada para SSR seria o perfil público de um usuário ou grupo, porque os dados poderiam chegar prontos no HTML inicial, melhorando a experiência no primeiro acesso e também no compartilhamento. Outra possibilidade seria uma listagem pública de grupos ou eventos usando cache com revalidação, permitindo exibir dados rápidos e, ao mesmo tempo, atualizados periodicamente.

Encerramento

O projeto final do ConectaIFCE foi estruturado como uma aplicação frontend moderna, com foco em componentização, roteamento organizado, autenticação, validação de formulários, separação de responsabilidades, cache de dados e base pronta para integração com API REST autenticada. Além de cumprir bem o papel didático, a arquitetura adotada também deixa espaço para evolução futura, o que faz do projeto uma base consistente tanto para apresentação acadêmica quanto para continuidade técnica.