// ===== MÁSCARA PARA TELEFONE =====
const telInput = document.getElementById('telefone');
telInput.addEventListener('input', function (e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});

// ===== MÁSCARA E VALIDAÇÃO PARA CPF =====
const cpfInput = document.getElementById('cpf');
cpfInput.addEventListener('input', function (e) {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = v;
});

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}

cpfInput.addEventListener('blur', function() {
    // Apenas validação silenciosa, sem alertas ou borda vermelha
    // Se quiser exibir mensagem, pode adicionar um elemento de texto abaixo do campo
    // Aqui não faz nada visualmente
});

// ===== MÁSCARA E VALIDAÇÃO PARA DATA DE NASCIMENTO =====
const nascInput = document.getElementById('nascimento');
nascInput.addEventListener('input', function(e) {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 8) v = v.slice(0, 8);
    if (v.length > 4) v = v.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    e.target.value = v;
});

function validarDataNascimento(data) {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) return false;
    const [dia, mes, ano] = data.split('/').map(Number);
    const dataObj = new Date(ano, mes - 1, dia);
    if (dataObj.getFullYear() !== ano || dataObj.getMonth() !== mes - 1 || dataObj.getDate() !== dia) return false;
    // Verifica se tem pelo menos 18 anos
    const hoje = new Date();
    let idade = hoje.getFullYear() - ano;
    if (
        hoje.getMonth() < mes - 1 ||
        (hoje.getMonth() === mes - 1 && hoje.getDate() < dia)
    ) {
        idade--;
    }
    return idade >= 18;
}

nascInput.addEventListener('blur', function() {
    // Apenas validação silenciosa, sem alertas ou borda vermelha
    // Se quiser exibir mensagem, pode adicionar um elemento de texto abaixo do campo
    // Aqui não faz nada visualmente
});

// ===== ENVIO DO FORMULÁRIO PARA WHATSAPP =====
document.getElementById('leadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const nascimento = document.getElementById('nascimento').value;
    const telefone = document.getElementById('telefone').value;
    const servico = document.getElementById('servico').value;

    const texto = `Olá, vim pelo site!%0A*Nome:* ${nome}%0A*CPF:* ${cpf}%0A*Data de Nascimento:* ${nascimento}%0A*Telefone:* ${telefone}%0A*Interesse:* ${servico}%0A Gostaria de fazer uma simulação.`;

    window.open(`https://wa.me/5519981642292?text=${texto}`, '_blank');
});

// ===== MENU MOBILE (HAMBURGER) =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('nav ul');

mobileMenuBtn.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== MODAL PARA AMPLIAR IMAGENS =====
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeModal = document.querySelector('.close-modal');

// Função para abrir o modal com a imagem clicada
function openImageModal(element) {
    const imgSrc = element.querySelector('img').src;
    modal.style.display = 'flex';
    modalImg.src = imgSrc;
    document.body.style.overflow = 'hidden'; // Evita scroll quando modal aberto
}

// Fechar modal ao clicar no X
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Fechar modal ao clicar fora da imagem
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Fechar modal com a tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ===== SCROLL SUAVE PARA ÂNCORAS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ANIMAÇÃO DE ENTRADA DOS CARDS (OPCIONAL) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos cards de serviço
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Aplicar animação aos itens de features
document.querySelectorAll('.feature-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    observer.observe(item);
});

// ===== VALIDAÇÃO EXTRA DO FORMULÁRIO =====
const nomeInput = document.getElementById('nome');
nomeInput.addEventListener('blur', function() {
    if (this.value.trim().length < 3) {
        this.style.borderColor = 'red';
        alert('Por favor, digite seu nome completo.');
    } else {
        this.style.borderColor = '#ddd';
    }
});

// ===== MENSAGEM DE BOAS-VINDAS NO CONSOLE =====
console.log('%c🏦 Souza Empréstimos', 'font-size: 24px; color: #00334e; font-weight: bold;');
console.log('%c💰 Crédito rápido e seguro!', 'font-size: 16px; color: #d49a00;');
console.log('%c📞 Entre em contato: (19) 98164-2292', 'font-size: 14px; color: #333;');