// Obter o elemento onde o conteúdo do curso será atualizado
const courseContent = document.getElementById("course-content");

// Conteúdo para cada seção
const contentData = {
    area: {
        title: "Área",
        content: `
            <p>Informações detalhadas sobre a área de estudo do curso, incluindo os principais temas abordados.</p>
            <ul>
                <li>Conhecimento básico necessário: Introdução à área</li>
                <li>Principais tópicos abordados: Ferramentas e métodos</li>
                <li>Perspectivas de carreira e mercado de trabalho</li>
            </ul>`
    },
    nivel: {
        title: "Nível",
        content: `
            <p>Conteúdo sobre o nível do curso, abordando os pré-requisitos e o conhecimento necessário.</p>
            <ul>
                <li>Nível inicial para iniciantes</li>
                <li>Nível intermediário para quem já possui experiência</li>
                <li>Nível avançado para especialização</li>
            </ul>`
    },
    modalidade: {
        title: "Modalidade",
        content: `
            <p>Descrição das modalidades do curso, como presencial, online ou híbrido.</p>
            <ul>
                <li>Presencial: Aulas presenciais com interações práticas</li>
                <li>Online: Flexibilidade e conveniência de aprendizado</li>
                <li>Híbrido: Combinação de presencial e online</li>
            </ul>`
    },
    docente: {
        title: "Docente",
        content: `
            <p>Informações sobre os docentes do curso, incluindo experiência e formação.</p>
            <ul>
                <li>Professores com vasta experiência na área</li>
                <li>Currículos acadêmicos e profissionais relevantes</li>
                <li>Feedbacks positivos dos alunos</li>
            </ul>`
    }
};

// Função para atualizar o conteúdo do card e destacar o botão
function changeInfo(section) {
    // Atualizar o conteúdo
    const data = contentData[section];
    courseContent.innerHTML = `
        <h2>${data.title}</h2>
        ${data.content}
    `;

    // Remover classe "active" de todos os botões
    document.querySelectorAll('.tag-btn').forEach(button => button.classList.remove('active'));

    // Adicionar classe "active" ao botão clicado
    event.target.classList.add('active');
}
