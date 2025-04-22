import emailjs from '@emailjs/browser';
import { emailConfig } from '@/config/email';

// Inicializa o EmailJS
const initEmailJS = () => {
    try {
        emailjs.init(emailConfig.emailjs.publicKey);
        console.log("EmailJS inicializado com sucesso");
    } catch (error) {
        console.error("Erro ao inicializar EmailJS:", error);
        throw new Error("Falha ao inicializar serviço de e-mail");
    }
};

// Envia e-mail com os dados de RSVP
export const sendRSVPEmail = async (formData: {
    name: string;
    email: string;
    phone: string;
    ceremonyAttendance: string;
    dinnerAttendance?: string;
    partnerName?: string;
    children?: number;
}) => {
    console.log("Preparando envio de RSVP com os dados:", formData);

    // Verifica se o envio de e-mails está desativado
    if (emailConfig.hasOwnProperty('enableEmailSending') && emailConfig.enableEmailSending === false) {
        console.warn("⚠️ O envio de e-mails está DESATIVADO nas configurações. Simulando sucesso para fins de teste.");
        return {
            success: true,
            response: { text: "Envio simulado com sucesso (modo de teste)" },
            simulated: true
        };
    }

    // Verifica configurações
    if (!emailConfig.emailjs.serviceId || emailConfig.emailjs.serviceId === "service_casamento") {
        console.warn("ID de serviço padrão detectado! Atualize com seu ID real do EmailJS.");
    }

    if (!emailConfig.emailjs.RSVPTemplateId || emailConfig.emailjs.RSVPTemplateId === "template_rsvp") {
        console.warn("ID de template padrão detectado! Atualize com seu ID real do EmailJS.");
    }

    try {
        initEmailJS();

        const params = {
            email: emailConfig.destinationEmail,
            guest_name: formData.name,
            guest_email: formData.email,
            guest_phone: formData.phone,
            ceremony_attendance: formData.ceremonyAttendance === 'yes' ? 'Sim' : 'Não',
            dinner_attendance: formData.dinnerAttendance === 'yes' ? 'Sim' : 'Não',
            partner_name: formData.partnerName || 'Nenhum',
            children_count: formData.children || '0',
            date: new Date().toLocaleString('pt-BR'),
            subject: emailConfig.subjects.rsvp
        };

        console.log("Enviando e-mail RSVP com parâmetros:", params);
        console.log("Usando serviço:", emailConfig.emailjs.serviceId);
        console.log("Usando template:", emailConfig.emailjs.RSVPTemplateId);

        const response = await emailjs.send(
            emailConfig.emailjs.serviceId,
            emailConfig.emailjs.RSVPTemplateId,
            params
        );

        console.log("E-mail RSVP enviado com sucesso:", response);
        return { success: true, response };
    } catch (error: any) {
        console.error('Erro ao enviar e-mail de RSVP:', error);
        // Adiciona informações mais detalhadas sobre o erro
        const errorInfo = {
            message: error.message || 'Erro desconhecido',
            text: error.text || '',
            name: error.name || '',
            stack: error.stack || ''
        };
        return { success: false, error: errorInfo };
    }
};

// Envia e-mail com os dados de contribuição de presentes
export const sendPresentesEmail = async (formData: {
    valor: string;
}) => {
    console.log("Preparando envio de notificação de presente com valor:", formData.valor);

    // Verifica se o envio de e-mails está desativado
    if (emailConfig.hasOwnProperty('enableEmailSending') && emailConfig.enableEmailSending === false) {
        console.warn("⚠️ O envio de e-mails está DESATIVADO nas configurações. Simulando sucesso para fins de teste.");
        return {
            success: true,
            response: { text: "Envio simulado com sucesso (modo de teste)" },
            simulated: true
        };
    }

    // Verifica configurações
    if (!emailConfig.emailjs.serviceId || emailConfig.emailjs.serviceId === "service_casamento") {
        console.warn("ID de serviço padrão detectado! Atualize com seu ID real do EmailJS.");
    }

    if (!emailConfig.emailjs.presentesTemplateId || emailConfig.emailjs.presentesTemplateId === "template_presentes") {
        console.warn("ID de template padrão detectado! Atualize com seu ID real do EmailJS.");
    }

    try {
        initEmailJS();

        const params = {
            email: emailConfig.destinationEmail,
            contribution_amount: formData.valor,
            date: new Date().toLocaleString('pt-BR'),
            subject: emailConfig.subjects.presentes
        };

        console.log("Enviando e-mail de presente com parâmetros:", params);
        console.log("Usando serviço:", emailConfig.emailjs.serviceId);
        console.log("Usando template:", emailConfig.emailjs.presentesTemplateId);

        const response = await emailjs.send(
            emailConfig.emailjs.serviceId,
            emailConfig.emailjs.presentesTemplateId,
            params
        );

        console.log("E-mail de presente enviado com sucesso:", response);
        return { success: true, response };
    } catch (error: any) {
        console.error('Erro ao enviar e-mail de presentes:', error);
        // Adiciona informações mais detalhadas sobre o erro
        const errorInfo = {
            message: error.message || 'Erro desconhecido',
            text: error.text || '',
            name: error.name || '',
            stack: error.stack || ''
        };
        return { success: false, error: errorInfo };
    }
}; 