import { BoardSpace } from '../types';

export const BOARD_SPACES: BoardSpace[] = [
  {
    id: 1,
    title: 'Perfil novo',
    description: 'Pra criar a conta, o app exige nome completo, data de nascimento e telefone.',
    iconName: 'UserPlus',
    type: 'choice',
    category: 'perfil',
    choices: [
      { id: '1a', text: 'Preencher tudo e criar a conta', vantagem: 45, rastro: 40 },
      { id: '1b', text: 'Desistir e não usar o app', vantagem: 0, rastro: 0 },
    ],
  },
  {
    id: 2,
    title: 'Foto da viagem em família',
    description: 'A foto ficou incrível. Postar marcando todos e o local rende curtidas — mas entrega onde vocês estão e o rosto da família.',
    iconName: 'Camera',
    type: 'choice',
    category: 'mídia',
    choices: [
      { id: '2a', text: 'Postar só a paisagem, sem marcar ninguém', vantagem: 25, rastro: 15 },
      { id: '2b', text: 'Postar com localização e marcando todos', vantagem: 50, rastro: 60 },
    ],
  },
  {
    id: 3,
    title: 'Teste de personalidade',
    description: '"Qual personagem da sua série favorita você é?" Pra fazer, você conecta sua conta — e ele acessa seu perfil, curtidas e lista de amigos.',
    iconName: 'HelpCircle',
    type: 'choice',
    category: 'perfil',
    choices: [
      { id: '3a', text: 'Conectar a conta e fazer o teste', vantagem: 40, rastro: 55 },
      { id: '3b', text: 'Fechar e seguir com sua vida', vantagem: 0, rastro: 0 },
    ],
  },
  {
    id: 4,
    title: 'Jogo online',
    description: 'Pra entrar no time dos amigos, você usa o chat de voz aberto e um perfil público — qualquer jogador do servidor te encontra.',
    iconName: 'LogIn',
    type: 'choice',
    category: 'perfil',
    choices: [
      { id: '4a', text: 'Jogar só offline, fora do time', vantagem: -30, rastro: 0 },
      { id: '4b', text: 'Entrar com voz e perfil público', vantagem: 40, rastro: 55 },
    ],
  },
  {
    id: 5,
    title: 'Print da conversa',
    description: 'Um print de uma conversa sua com um amigo ficou engraçado demais. Mas ele te mandou aquilo em particular.',
    iconName: 'MessageSquare',
    type: 'choice',
    category: 'mídia',
    choices: [
      { id: '5a', text: 'Contar a história por cima, sem print e sem citar quem foi', vantagem: 25, rastro: 12 },
      { id: '5b', text: 'Postar o print com o nome e o que ele disse', vantagem: 40, rastro: 55 },
      { id: '5c', text: 'Não postar', vantagem: 0, rastro: 0 },
    ],
  },
  {
    id: 6,
    title: 'App de rotina',
    description: 'Ele organiza sua vida se você ativar a localização o tempo todo: registra aonde vai, a que horas sai e quanto fica em cada lugar.',
    iconName: 'MapPin',
    type: 'choice',
    category: 'privacidade',
    choices: [
      { id: '6a', text: 'Ativar o monitoramento o dia inteiro', vantagem: 35, rastro: 65 },
      { id: '6b', text: 'Não usar o aplicativo', vantagem: -15, rastro: 0 },
    ],
  },
  {
    id: 7,
    title: 'Sorteio: marque 3 amigos',
    description: 'Pra concorrer ao prêmio, marque três amigos nos comentários — entregando os perfis deles junto com o seu.',
    iconName: 'Gift',
    type: 'choice',
    category: 'mídia',
    choices: [
      { id: '7a', text: 'Deixar pra lá', vantagem: 0, rastro: 0 },
      { id: '7b', text: 'Marcar os três amigos e concorrer', vantagem: 25, rastro: 40 },
    ],
  },
  {
    id: 8,
    title: 'IA do celular',
    description: 'A IA resume mensagens, escreve textos e organiza sua agenda. Pra isso, precisa ler suas conversas, e-mails e apps o tempo todo.',
    iconName: 'Sparkles',
    type: 'choice',
    category: 'privacidade',
    choices: [
      { id: '8a', text: 'Ativar a IA com acesso total', vantagem: 35, rastro: 60 },
      { id: '8b', text: 'Usar o celular sem a IA', vantagem: -15, rastro: 0 },
    ],
  },
  {
    id: 9,
    title: 'A chance de viralizar',
    description: 'Deixar o vídeo público e marcar o local onde você gravou faz o algoritmo entregar pra muito mais gente.',
    iconName: 'Share2',
    type: 'choice',
    category: 'mídia',
    choices: [
      { id: '9a', text: 'Só para os amigos, sem marcar o local', vantagem: 20, rastro: 10 },
      { id: '9b', text: 'Público e com localização', vantagem: 50, rastro: 65 },
    ],
  },
  {
    id: 10,
    title: 'App de bem-estar',
    description: 'Ele acompanha seu sono, humor e batimentos — e guarda tudo sobre seu corpo e sua mente nos servidores dele.',
    iconName: 'HeartPulse',
    type: 'choice',
    category: 'privacidade',
    choices: [
      { id: '10a', text: 'Ativar tudo e entregar seus dados de saúde', vantagem: 40, rastro: 60 },
      { id: '10b', text: 'Não usar e cuidar disso por conta própria', vantagem: -10, rastro: 0 },
    ],
  },
  {
    id: 11,
    title: 'Configurações de privacidade',
    description: 'Você achou as configurações escondidas e ativou tudo o que esconde seus dados dos anunciantes.',
    iconName: 'Lock',
    type: 'automatic',
    category: 'alerta',
    getAutoResult: (rastro: number) => {
      if (rastro <= 60) {
        return {
          vantagem: 40,
          rastro: 0,
          triggered: true,
          message: 'Seu Rastro acumulado é 60 ou menos! Suas configurações de privacidade te renderam +40 Vantagem.',
        };
      } else {
        return {
          vantagem: 0,
          rastro: 0,
          triggered: false,
          message: 'Seu Rastro acumulado é maior que 60. Suas configurações de privacidade não tiveram efeito.',
        };
      }
    },
  },
  {
    id: 12,
    title: 'A foto do colega',
    description: 'Uma foto do seu amigo numa situação engraçada tem tudo pra viralizar — mas quem aparece exposto é ele, não você.',
    iconName: 'Image',
    type: 'choice',
    category: 'mídia',
    choices: [
      { id: '12a', text: 'Postar sem avisar', vantagem: 40, rastro: 45 },
      { id: '12b', text: 'Não postar', vantagem: 0, rastro: 0 },
      { id: '12c', text: 'Perguntar antes e só postar se ele deixar', vantagem: 25, rastro: 12 },
    ],
  },
  {
    id: 13,
    title: 'Continuar com o Google',
    description: '"Continuar com o Google" é um clique. Do lado, em cinza, "criar conta com e-mail e senha" dá mais trabalho.',
    iconName: 'LogIn',
    type: 'choice',
    category: 'perfil',
    choices: [
      { id: '13a', text: 'Criar conta separada, na mão', vantagem: 20, rastro: 10 },
      { id: '13b', text: 'Continuar com o Google (um clique)', vantagem: 30, rastro: 45 },
    ],
  },
  {
    id: 14,
    title: 'O anúncio que persegue',
    description: 'Aquele tênis que você pesquisou começa a te seguir em todos os apps. Quanto mais você se expôs, mais o sistema sabe o que te oferecer.',
    iconName: 'Eye',
    type: 'automatic',
    category: 'alerta',
    getAutoResult: (rastro: number) => {
      if (rastro > 70) {
        return {
          vantagem: 25,
          rastro: 40,
          triggered: true,
          message: 'Seu Rastro é maior que 70! O anúncio te perseguiu e você comprou por impulso (+25 Vantagem / +40 Rastro).',
        };
      } else {
        return {
          vantagem: 0,
          rastro: 0,
          triggered: false,
          message: 'Seu Rastro é 70 ou menos. Os anúncios erraram o alvo e nada aconteceu!',
        };
      }
    },
  },
  {
    id: 15,
    title: 'Rede nova, todo mundo está lá',
    description: 'Pra crescer, o app te dá uma recompensa se você liberar sua lista de contatos e mandar convites automáticos, por número, pra todos os amigos que ainda não usam.',
    iconName: 'UserPlus',
    type: 'choice',
    category: 'perfil',
    choices: [
      { id: '15a', text: 'Liberar a agenda e disparar os convites pra todo mundo', vantagem: 35, rastro: 55 },
      { id: '15b', text: 'Chamar só uns poucos amigos, mandando o link você mesmo', vantagem: 22, rastro: 10 },
    ],
  },
  {
    id: 16,
    title: 'Todo mundo já postou',
    description: 'Um desafio viral pede um vídeo seu, com o rosto aparecendo. Todos os amigos já postaram e estão te marcando.',
    iconName: 'Video',
    type: 'choice',
    category: 'mídia',
    choices: [
      { id: '16a', text: 'Ficar de fora', vantagem: -25, rastro: 0 },
      { id: '16b', text: 'Participar do trend', vantagem: 40, rastro: 40 },
    ],
  },
  {
    id: 17,
    title: 'Wi-Fi grátis do shopping',
    description: 'O Wi-Fi é grátis, mas, ao conectar, a rede passa a enxergar tudo o que você acessa ali — quais sites e apps você abre.',
    iconName: 'Wifi',
    type: 'choice',
    category: 'privacidade',
    choices: [
      { id: '17a', text: 'Conectar no Wi-Fi grátis', vantagem: 40, rastro: 55 },
      { id: '17b', text: 'Continuar gastando seus próprios dados móveis', vantagem: -30, rastro: 0 },
    ],
  },
  {
    id: 18,
    title: 'Feliz aniversário',
    description: 'Postar um story com a data completa rende parabéns o dia todo — mas todos passam a saber seu dia, mês e ano de nascimento.',
    iconName: 'Cake',
    type: 'choice',
    category: 'mídia',
    choices: [
      { id: '18a', text: 'Comemorar sem mostrar a data', vantagem: 15, rastro: 5 },
      { id: '18b', text: 'Postar com a data de nascimento completa', vantagem: 35, rastro: 45 },
    ],
  },
  {
    id: 19,
    title: 'Semana sem redes',
    description: 'Você passou uma semana longe das redes: sem posts, sem stories, sem rastro novo.',
    iconName: 'Flame',
    type: 'automatic',
    category: 'alerta',
    getAutoResult: (rastro: number) => {
      if (rastro <= 110) {
        return {
          vantagem: 30,
          rastro: 0,
          triggered: true,
          message: 'Seu Rastro é 110 ou menos! Sua semana sem redes te deu +30 Vantagem.',
        };
      } else {
        return {
          vantagem: 0,
          rastro: 0,
          triggered: false,
          message: 'Seu Rastro é maior que 110. Sua pegada digital ainda estava alta e nada aconteceu.',
        };
      }
    },
  },
  {
    id: 20,
    title: 'Termos de uso',
    description: '40 páginas de termos antes de abrir o app. O botão "Aceitar" já está piscando, convidativo.',
    iconName: 'FileText',
    type: 'choice',
    category: 'privacidade',
    choices: [
      { id: '20a', text: 'Aceitar tudo sem ler', vantagem: 15, rastro: 40 },
      { id: '20b', text: 'Parar, ler o resumo e ajustar as permissões', vantagem: 10, rastro: 10 },
    ],
  },
  {
    id: 21,
    title: 'Senha repetida',
    description: 'Você usa a mesma senha em vários apps. Hoje um deles vazou, e ela ficou exposta — quem tiver a senha entra em todos.',
    iconName: 'KeyRound',
    type: 'choice',
    category: 'privacidade',
    choices: [
      { id: '21a', text: 'Não mudar nada e continuar com a mesma senha em tudo', vantagem: 15, rastro: 70 },
      { id: '21b', text: 'Criar uma senha diferente e forte pra cada app', vantagem: -10, rastro: 0 },
      { id: '21c', text: 'Criar uma senha nova, mas de novo igual em todos', vantagem: 20, rastro: 40 },
    ],
  },
  {
    id: 22,
    title: 'O filtro que mapeia seu rosto',
    description: 'Pra liberar os efeitos, o app mapeia e guarda sua biometria facial. É um dado que você não troca depois: seu rosto é um só.',
    iconName: 'Camera',
    type: 'choice',
    category: 'mídia',
    choices: [
      { id: '22a', text: 'Aceitar e liberar os efeitos', vantagem: 40, rastro: 70 },
      { id: '22b', text: 'Usar só as figurinhas comuns, sem os efeitos', vantagem: 5, rastro: 5 },
    ],
  },
  {
    id: 23,
    title: 'Foto de uniforme',
    description: 'A selfie ficou ótima, mas o brasão da escola aparece nítido — quem vir descobre onde você estuda.',
    iconName: 'ShieldAlert',
    type: 'choice',
    category: 'mídia',
    choices: [
      { id: '23a', text: 'Postar cobrindo o brasão', vantagem: 25, rastro: 15 },
      { id: '23b', text: 'Postar como está', vantagem: 35, rastro: 45 },
    ],
  },
  {
    id: 24,
    title: 'Vazamento',
    description: 'Um app que você usa sofreu um ataque hacker. Quanto mais informação você tinha entregado, mais exposto você fica.',
    iconName: 'AlertTriangle',
    type: 'automatic',
    category: 'alerta',
    getAutoResult: (rastro: number) => {
      if (rastro > 120) {
        return {
          vantagem: -40,
          rastro: 0,
          triggered: true,
          message: 'Seu Rastro é maior que 120! Você foi uma das vítimas mais expostas no vazamento (−40 Vantagem).',
        };
      } else {
        return {
          vantagem: 0,
          rastro: 0,
          triggered: false,
          message: 'Seu Rastro é 120 ou menos. O vazamento mal te afetou e nada aconteceu!',
        };
      }
    },
  },
  {
    id: 25,
    title: 'Cupom de 20%',
    description: 'A loja dá 20% de desconto em troca do seu e-mail para promoções.',
    iconName: 'Tag',
    type: 'choice',
    category: 'perfil',
    choices: [
      { id: '25a', text: 'Informar o e-mail e pegar o cupom', vantagem: 25, rastro: 10 },
      { id: '25b', text: 'Comprar sem o cupom, pagando o preço cheio', vantagem: -15, rastro: 0 },
    ],
  },
  {
    id: 26,
    title: 'Confirme que você não é um robô',
    description: 'Um site pede seu número "pra confirmar que você não é um robô" — e aí começa a enxurrada de propaganda e golpe no WhatsApp.',
    iconName: 'HelpCircle',
    type: 'choice',
    category: 'privacidade',
    choices: [
      { id: '26a', text: 'Fechar o site e procurar a informação em outro lugar', vantagem: -10, rastro: 0 },
      { id: '26b', text: 'Informar o número', vantagem: 25, rastro: 45 },
    ],
  },
  {
    id: 27,
    title: 'Perfil aberto ou fechado?',
    description: 'Perfil público rende muito mais alcance e seguidores — mas qualquer pessoa vê tudo o que você posta.',
    iconName: 'Lock',
    type: 'choice',
    category: 'perfil',
    choices: [
      { id: '27a', text: 'Fechar o perfil, só quem já te segue vê', vantagem: 15, rastro: 5 },
      { id: '27b', text: 'Deixar o perfil aberto para todos', vantagem: 40, rastro: 40 },
    ],
  },
  {
    id: 28,
    title: 'Golpe na sua conta',
    description: 'Um golpista se passou por um site que você usa. Quanto mais dados seus já estavam espalhados, mais convincente foi o golpe.',
    iconName: 'FileWarning',
    type: 'automatic',
    category: 'alerta',
    getAutoResult: (rastro: number) => {
      if (rastro > 140) {
        return {
          vantagem: -50,
          rastro: 20,
          triggered: true,
          message: 'Seu Rastro é maior que 140! O golpe foi certeiro por causa do seu rastro espalhado (−50 Vantagem / +20 Rastro).',
        };
      } else {
        return {
          vantagem: 0,
          rastro: 0,
          triggered: false,
          message: 'Seu Rastro é 140 ou menos. Você desconfiou e escapou do golpe!',
        };
      }
    },
  },
  {
    id: 29,
    title: 'App de filtros',
    description: 'O app da moda faz efeitos incríveis, mas lê sua galeria inteira. Existe um mais simples, que só usa a câmera na hora.',
    iconName: 'Brush',
    type: 'choice',
    category: 'privacidade',
    choices: [
      { id: '29a', text: 'Usar o app da moda, liberando a galeria toda', vantagem: 40, rastro: 45 },
      { id: '29b', text: 'Usar o app simples, só com a câmera na hora', vantagem: 25, rastro: 15 },
    ],
  },
  {
    id: 30,
    title: 'Fim da Trilha',
    description: 'Você chegou ao final do jogo! Aguarde os demais jogadores concluírem a trilha para verem o Relatório de Dados e o resultado final.',
    iconName: 'Flag',
    type: 'choice',
    category: 'especial',
    choices: [
      { id: '30a', text: 'Concluir meu percurso', vantagem: 0, rastro: 0 },
    ],
  },
];

export const PLAYER_COLOR_CONFIGS = {
  red: {
    name: 'Vermelho',
    hex: '#ef4444',
    bg: 'bg-red-500',
    border: 'border-red-500',
    text: 'text-red-500',
    lightBg: 'bg-red-50 text-red-700 border-red-200',
    ring: 'ring-red-400',
    badgeBgClass: 'bg-red-500 text-white',
    badgeTextClass: 'text-red-600',
  },
  blue: {
    name: 'Azul',
    hex: '#3b82f6',
    bg: 'bg-blue-500',
    border: 'border-blue-500',
    text: 'text-blue-500',
    lightBg: 'bg-blue-50 text-blue-700 border-blue-200',
    ring: 'ring-blue-400',
    badgeBgClass: 'bg-blue-500 text-white',
    badgeTextClass: 'text-blue-600',
  },
  green: {
    name: 'Verde',
    hex: '#22c55e',
    bg: 'bg-emerald-500',
    border: 'border-emerald-500',
    text: 'text-emerald-500',
    lightBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    ring: 'ring-emerald-400',
    badgeBgClass: 'bg-emerald-500 text-white',
    badgeTextClass: 'text-emerald-600',
  },
  yellow: {
    name: 'Amarelo',
    hex: '#eab308',
    bg: 'bg-amber-500',
    border: 'border-amber-500',
    text: 'text-amber-500',
    lightBg: 'bg-amber-50 text-amber-800 border-amber-200',
    ring: 'ring-amber-400',
    badgeBgClass: 'bg-amber-500 text-white',
    badgeTextClass: 'text-amber-600',
  },
};
