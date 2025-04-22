// Configurações de email - fácil de alterar
export const emailConfig = {
    // Altere este e-mail para o endereço que receberá as informações
    destinationEmail: "janineeleonardowedding@gmail.com",
    enableEmailSending: true,
    // Configurações do EmailJS
    emailjs: {
        serviceId: "service_p7zf4qb", // Você precisará substituir por seu ID de serviço do EmailJS
        RSVPTemplateId: "template_5th8ixk",  // Template para RSVP
        presentesTemplateId: "template_2nvlkkq", // Template para doações/presentes
        publicKey: "NjHEGzaOoskarjjIH", // Substitua pela sua chave pública do EmailJS
    },

    // Assuntos dos e-mails
    subjects: {
        rsvp: "Nova Confirmação de Presença - Casamento Janine e Leonardo",
        presentes: "Nova Contribuição - Casamento Janine e Leonardo"
    }
}; 