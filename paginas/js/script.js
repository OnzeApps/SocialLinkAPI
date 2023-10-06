const CriarConta = document.getElementById('criar');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');

CriarConta.addEventListener('click', function() {
  if (nameInput.value && emailInput.value && senhaInput.value) {
    const reqBody = {
      name: nameInput.value,
      user: `${nameInput.value}`.toLowerCase().replace(' ', ''),
      email: emailInput.value,
      senha: senhaInput.value
    };
    
    console.log(reqBody)

    fetch('http://localhost:3000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error.message);
    });
  } else {
    console.error('Por favor, preencha todos os campos.');
  }
});