const options = ['pedra', 'papel', 'tesoura'];

// Verifica se a escolha do usuário é válida
if (!process.argv[2] || !options.includes(process.argv[2])) {
  console.log('Escolha uma opção válida: pedra, papel ou tesoura');
  process.exit();
}

// Gera a escolha aleatória do computador
const computerChoice = options[Math.floor(Math.random() * 3)];

// Compara a escolha do usuário com a do computador e exibe o resultado
if (process.argv[2] === computerChoice) {
  console.log(`Você escolheu ${process.argv[2]} e o computador escolheu ${computerChoice}. Empate!`);
} else if (
  (process.argv[2] === 'pedra' && computerChoice === 'tesoura') ||
  (process.argv[2] === 'papel' && computerChoice === 'pedra') ||
  (process.argv[2] === 'tesoura' && computerChoice === 'papel')
) {
  console.log(`Você escolheu ${process.argv[2]} e o computador escolheu ${computerChoice}. Você ganhou!`);
} else {
  console.log(`Você escolheu ${process.argv[2]} e o computador escolheu ${computerChoice}. Você perdeu!`);
}
