/*document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Validação simples
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '' || email === '' || message === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Enviar o formulário usando Fetch API
    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Mensagem enviada com sucesso!');
          form.reset();
        } else {
          alert('Ocorreu um erro ao enviar a mensagem.');
        }
      })
      .catch((error) => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao enviar a mensagem.');
      });
  });
});*/
class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute('action');
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success;
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  }

  displayError(message) {
    const errorElement = document.createElement('p');
    errorElement.className = 'error';
    errorElement.innerText =
      message || 'Ops! Algo deu errado! Tente novamente!';
    this.form.prepend(errorElement);
    this.formButton.disabled = false;
    this.formButton.innerText = 'Enviar';
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll('[name]');
    fields.forEach((field) => {
      formObject[field.getAttribute('name')] = field.value;
    });
    return formObject;
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  onSubmission(event) {
    event.preventDefault();
    const nameField = this.form.querySelector('[name="name"]');
    const emailField = this.form.querySelector('[name="email"]');
    const messageField = this.form.querySelector('[name="message"]');

    if (!nameField.value.trim()) {
      this.displayError('Por favor, insira seu nome.');
      return false;
    }

    if (!this.validateEmail(emailField.value)) {
      this.displayError('Por favor, insira um email válido.');
      return false;
    }

    if (!messageField.value.trim()) {
      this.displayError('Por favor, insira uma mensagem.');
      return false;
    }

    this.formButton.disabled = true;
    this.formButton.innerText = 'Enviando...';
    return true;
  }

  async sendForm(event) {
    if (this.onSubmission(event)) {
      try {
        const response = await fetch(this.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(this.getFormObject())
        });
        if (response.ok) {
          this.displaySuccess();
        } else {
          throw new Error('Falha na submissão do formulário');
        }
      } catch (error) {
        this.displayError();
      }
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener('click', this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: '[data-form]',
  button: '[data-button]',
  success: "<h1 class='success'>Mensagem enviada!</h1>",
  error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>"
});
formSubmit.init();
