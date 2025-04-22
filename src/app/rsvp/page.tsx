"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/app/components/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Check, Heart, Mail, AlertCircle } from "lucide-react";
import { sendRSVPEmail } from "@/services/emailService";
import { emailConfig } from "@/config/email";

export default function RSVPPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [ceremonyAttendance, setCeremonyAttendance] = useState<string | null>(
    null
  );
  const [dinnerAttendance, setDinnerAttendance] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [partner, setPartner] = useState(false);
  const [partnerName, setPartnerName] = useState("");
  const [children, setChildren] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [enviandoEmail, setEnviandoEmail] = useState(false);
  const [statusEnvio, setStatusEnvio] = useState<{
    sucesso: boolean;
    mensagem: string;
  } | null>(null);

  // Efeito para redirecionar para a página de presentes após submissão completa
  useEffect(() => {
    if (
      submitted &&
      dinnerAttendance &&
      !enviandoEmail &&
      (!statusEnvio || statusEnvio.sucesso)
    ) {
      const timer = setTimeout(() => {
        router.push("/presentes");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [submitted, dinnerAttendance, router, enviandoEmail, statusEnvio]);

  const handleCeremonySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ceremonyAttendance === "yes") {
      setStep(2);
    } else {
      // Se não vai à cerimônia, envia email e mostra confirmação
      handleFormSubmit();
    }
  };

  const handleDinnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFormSubmit();
  };

  const handleFormSubmit = async () => {
    setEnviandoEmail(true);
    setStatusEnvio(null);

    try {
      // Verifica se o EmailJS está configurado corretamente
      if (
        !emailConfig.emailjs.publicKey ||
        emailConfig.emailjs.publicKey === "sua_chave_publica_emailjs"
      ) {
        console.error("Chave pública do EmailJS não configurada");
        throw new Error("Configuração de e-mail incompleta");
      }

      // Adiciona log para debug
      console.log("Enviando confirmação com os dados:", {
        name,
        email,
        phone,
        ceremonyAttendance: ceremonyAttendance || "no",
        dinnerAttendance: dinnerAttendance || "no",
        partnerName: partner ? partnerName : "Nenhum",
        children,
      });

      // Envia e-mail com os dados do RSVP
      const resultado = await sendRSVPEmail({
        name,
        email,
        phone,
        ceremonyAttendance: ceremonyAttendance || "no",
        dinnerAttendance: dinnerAttendance || "no",
        partnerName: partner ? partnerName : undefined,
        children: children,
      });

      console.log("Resultado do envio:", resultado);

      if (resultado.success) {
        setStatusEnvio({
          sucesso: true,
          mensagem: "Confirmação enviada com sucesso!",
        });
        // Mostra a confirmação após envio bem-sucedido
        setSubmitted(true);
      } else {
        throw new Error(
          "Falha ao enviar confirmação: " +
            (resultado.error ? resultado.error.toString() : "Erro desconhecido")
        );
      }
    } catch (error) {
      console.error("Erro ao processar confirmação:", error);
      setStatusEnvio({
        sucesso: false,
        mensagem:
          "Ocorreu um erro ao enviar sua confirmação. Verifique o console para mais detalhes.",
      });

      // Para teste, em ambiente de produção você pode remover ou adaptar esta linha
      if (
        !emailConfig.emailjs.publicKey ||
        emailConfig.emailjs.publicKey === "sua_chave_publica_emailjs"
      ) {
        // Continua o fluxo mesmo com erro em modo de desenvolvimento
        setSubmitted(true);
      }
    } finally {
      setEnviandoEmail(false);
    }
  };

  const renderCeremonyForm = () => (
    <Card className="w-full max-w-md mx-auto border border-[#e9d2ac]/30 shadow-lg overflow-hidden bg-white/95 backdrop-blur-sm">
      <div className="bg-gradient-to-r from-[#e9d2ac]/30 to-[#e9d2ac]/10 py-4">
        <div className="flex justify-center items-center mb-2">
          <Heart className="text-[#c5bdb2] h-5 w-5 animate-beat" />
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-2xl font-playfair text-center">
          Cerimônia
        </CardTitle>
        <CardDescription className="text-center">
          Santuário de Nossa Senhora da Conceição
          <div className="flex items-center justify-center mt-2">
            <Calendar className="w-4 h-4 mr-1 text-[#c5bdb2]" />
            <span className="text-sm">19/07/2025</span>
            <Clock className="w-4 h-4 ml-3 mr-1 text-[#c5bdb2]" />
            <span className="text-sm">16:00</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCeremonySubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Seu nome completo</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-[#e9d2ac]/50 focus:border-[#c5bdb2] focus:ring-[#c5bdb2]/30"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-[#e9d2ac]/50 focus:border-[#c5bdb2] focus:ring-[#c5bdb2]/30"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border-[#e9d2ac]/50 focus:border-[#c5bdb2] focus:ring-[#c5bdb2]/30"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Você vai à cerimônia?</Label>
              <RadioGroup
                value={ceremonyAttendance || ""}
                onValueChange={setCeremonyAttendance}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="yes"
                    id="ceremony-yes"
                    className="text-[#c5bdb2] border-[#e9d2ac]"
                  />
                  <Label htmlFor="ceremony-yes">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="no"
                    id="ceremony-no"
                    className="text-[#c5bdb2] border-[#e9d2ac]"
                  />
                  <Label htmlFor="ceremony-no">Não</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {statusEnvio && (
            <div
              className={`p-3 rounded-md flex items-center space-x-2 ${
                statusEnvio.sucesso
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {statusEnvio.sucesso ? (
                <Check className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <p className="text-sm">{statusEnvio.mensagem}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-[#e9d2ac] hover:bg-[#c5bdb2] text-primary transition-all duration-300"
            disabled={
              !ceremonyAttendance || !name || !email || !phone || enviandoEmail
            }
          >
            {enviandoEmail ? (
              <>
                <span className="animate-pulse mr-2">Processando...</span>
                <Mail className="h-5 w-5 animate-bounce" />
              </>
            ) : (
              <>Continuar</>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  const renderDinnerForm = () => (
    <Card className="w-full max-w-md mx-auto border border-[#e9d2ac]/30 shadow-lg overflow-hidden bg-white/95 backdrop-blur-sm">
      <div className="bg-gradient-to-r from-[#e9d2ac]/30 to-[#e9d2ac]/10 py-4">
        <div className="flex justify-center items-center mb-2">
          <Heart className="text-[#c5bdb2] h-5 w-5 animate-beat" />
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-2xl font-playfair text-center">
          Jantar Comemorativo
        </CardTitle>
        <CardDescription className="text-center">
          Bistrô Rancho do Ipê
          <div className="flex items-center justify-center mt-2">
            <Calendar className="w-4 h-4 mr-1 text-[#c5bdb2]" />
            <span className="text-sm">19/07/2025</span>
            <Clock className="w-4 h-4 ml-3 mr-1 text-[#c5bdb2]" />
            <span className="text-sm">19:00</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleDinnerSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Você vai ao jantar?</Label>
              <RadioGroup
                value={dinnerAttendance || ""}
                onValueChange={setDinnerAttendance}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="yes"
                    id="dinner-yes"
                    className="text-[#c5bdb2] border-[#e9d2ac]"
                  />
                  <Label htmlFor="dinner-yes">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="no"
                    id="dinner-no"
                    className="text-[#c5bdb2] border-[#e9d2ac]"
                  />
                  <Label htmlFor="dinner-no">Não</Label>
                </div>
              </RadioGroup>
            </div>

            {dinnerAttendance === "yes" && (
              <>
                <div className="space-y-2">
                  <Label>Virá com parceiro(a)?</Label>
                  <RadioGroup
                    value={partner ? "yes" : "no"}
                    onValueChange={(value) => setPartner(value === "yes")}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="yes"
                        id="partner-yes"
                        className="text-[#c5bdb2] border-[#e9d2ac]"
                      />
                      <Label htmlFor="partner-yes">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="no"
                        id="partner-no"
                        className="text-[#c5bdb2] border-[#e9d2ac]"
                      />
                      <Label htmlFor="partner-no">Não</Label>
                    </div>
                  </RadioGroup>
                </div>

                {partner && (
                  <div className="space-y-2">
                    <Label htmlFor="partner-name">Nome do parceiro(a)</Label>
                    <Input
                      id="partner-name"
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      className="border-[#e9d2ac]/50 focus:border-[#c5bdb2] focus:ring-[#c5bdb2]/30"
                      required={partner}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="children">Número de crianças</Label>
                  <Input
                    id="children"
                    type="number"
                    min="0"
                    max="5"
                    value={children}
                    onChange={(e) =>
                      setChildren(Number.parseInt(e.target.value) || 0)
                    }
                    className="border-[#e9d2ac]/50 focus:border-[#c5bdb2] focus:ring-[#c5bdb2]/30"
                  />
                </div>
              </>
            )}
          </div>

          {statusEnvio && (
            <div
              className={`p-3 rounded-md flex items-center space-x-2 ${
                statusEnvio.sucesso
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {statusEnvio.sucesso ? (
                <Check className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <p className="text-sm">{statusEnvio.mensagem}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-[#e9d2ac] hover:bg-[#c5bdb2] text-primary transition-all duration-300"
            disabled={!dinnerAttendance || enviandoEmail}
          >
            {enviandoEmail ? (
              <>
                <span className="animate-pulse mr-2">Processando...</span>
                <Mail className="h-5 w-5 animate-bounce" />
              </>
            ) : (
              <>Confirmar</>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  const renderConfirmation = () => (
    <Card className="w-full max-w-md mx-auto border border-[#e9d2ac]/30 shadow-lg overflow-hidden bg-white/95 backdrop-blur-sm animate-fade-in">
      <CardHeader>
        <div className="mx-auto bg-[#e9d2ac]/30 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4 border border-[#e9d2ac]/50">
          <Check className="h-10 w-10 text-[#c5bdb2]" />
        </div>
        <CardTitle className="text-2xl font-playfair text-center">
          Confirmação Recebida
        </CardTitle>
        <CardDescription className="text-center">
          Obrigado por confirmar sua presença, {name}!
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="space-y-4">
          <div>
            <p className="font-medium">Cerimônia:</p>
            <p>
              {ceremonyAttendance === "yes" ? "Confirmado" : "Não comparecerá"}
            </p>
          </div>

          {ceremonyAttendance === "yes" && (
            <div>
              <p className="font-medium">Jantar:</p>
              <p>
                {dinnerAttendance === "yes" ? "Confirmado" : "Não comparecerá"}
              </p>

              {dinnerAttendance === "yes" && partner && (
                <p className="mt-2">Acompanhado por: {partnerName}</p>
              )}

              {dinnerAttendance === "yes" && children > 0 && (
                <p className="mt-2">Crianças: {children}</p>
              )}
            </div>
          )}

          <div className="mt-6 flex flex-col space-y-3">
            <div className="flex items-center justify-center text-[#c5a878]">
              <Mail className="h-5 w-5 mr-2" />
              <p className="text-sm">
                Uma notificação foi enviada para os noivos
              </p>
            </div>

            <div className="bg-[#e9d2ac]/10 p-4 rounded-lg">
              <p className="text-[#c5bdb2] font-medium">
                Você será redirecionado para a página de presentes em
                instantes...
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <main className="min-h-screen pt-16 pb-12 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f5f3f0] to-[#e9d2ac]/20 -z-10"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-[url('/flores-canto-1.png')] bg-no-repeat bg-contain opacity-20 -translate-x-8 -translate-y-8 -z-5"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[url('/flores-canto-2.png')] bg-no-repeat bg-contain opacity-20 translate-x-8 translate-y-8 -z-5"></div>

      <Navigation />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-8 text-center relative">
            <span className="relative">
              Confirmação de Presença
              <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#e9d2ac]"></span>
            </span>
          </h1>

          <p className="text-center mb-12 text-sm text-[#c5bdb2]">
            As confirmações serão enviadas para: {emailConfig.destinationEmail}
          </p>

          {step === 1 && renderCeremonyForm()}
          {step === 2 && renderDinnerForm()}
          {submitted && renderConfirmation()}
        </div>
      </section>
    </main>
  );
}
