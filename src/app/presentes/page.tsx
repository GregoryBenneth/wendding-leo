"use client";

import { useState } from "react";
import Navigation from "@/app/components/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Home, CopyIcon, Check, Mail, AlertCircle } from "lucide-react";
import { sendPresentesEmail } from "@/services/emailService";
import { emailConfig } from "@/config/email";

export default function PresentesPage() {
  const [valorContribuicao, setValorContribuicao] = useState("100");
  const [copiedPix, setCopiedPix] = useState(false);
  const [mostrarAgradecimento, setMostrarAgradecimento] = useState(false);
  const [enviandoEmail, setEnviandoEmail] = useState(false);
  const [statusEnvio, setStatusEnvio] = useState<{
    sucesso: boolean;
    mensagem: string;
  } | null>(null);

  // Valor fictício de chave PIX
  const chavePix = "janine.leonardo@casamento.com";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(chavePix);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const handleContribuir = async () => {
    // Verifica se o valor é válido
    if (!valorContribuicao || parseFloat(valorContribuicao) <= 0) {
      setStatusEnvio({
        sucesso: false,
        mensagem: "Por favor, informe um valor válido para contribuição.",
      });
      return;
    }

    setEnviandoEmail(true);
    setStatusEnvio(null);

    try {
      // Envia e-mail com os dados da contribuição
      const resultado = await sendPresentesEmail({
        valor: valorContribuicao,
      });

      if (resultado.success) {
        setStatusEnvio({
          sucesso: true,
          mensagem: "Notificação enviada com sucesso!",
        });
        // Mostra o agradecimento após confirmação de envio
        setMostrarAgradecimento(true);
      } else {
        throw new Error("Falha ao enviar notificação");
      }
    } catch (error) {
      console.error("Erro ao processar contribuição:", error);
      setStatusEnvio({
        sucesso: false,
        mensagem:
          "Ocorreu um erro ao processar sua contribuição. Por favor, tente novamente mais tarde.",
      });
    } finally {
      setEnviandoEmail(false);
    }
  };

  return (
    <main className="min-h-screen pt-16 pb-12 bg-champagne/10">
      <Navigation />

      <div className="container mx-auto px-4 mt-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
              Lista de Presentes
            </h1>
            <p className="text-lg text-gray-600">
              Sua presença já é o nosso maior presente. Mas se desejar nos
              presentear, ficaremos muito felizes com sua contribuição para
              realizarmos o sonho da nossa casa própria.
            </p>
            <p className="text-sm text-[#c5bdb2] mt-2">
              As notificações serão enviadas para:{" "}
              {emailConfig.destinationEmail}
            </p>
          </div>

          {!mostrarAgradecimento ? (
            <Card className="w-full border border-champagne/50 shadow-md bg-white overflow-hidden">
              <div className="bg-gradient-to-r from-champagne/30 to-champagne/10 p-8 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-champagne/30 flex items-center justify-center">
                  <Home className="h-12 w-12 text-primary/70" />
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-2xl font-playfair text-center">
                  Ajude Janine e Leonardo a realizarem o sonho da casa própria
                </CardTitle>
                <CardDescription className="text-center">
                  Sua contribuição é muito importante para nós
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="bg-champagne/20 p-6 rounded-lg">
                  <p className="text-center text-gray-700 mb-4">
                    Escolha o valor da sua contribuição ou digite um valor
                    personalizado
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {["100", "200", "300", "500", "750", "1000"].map(
                      (valor) => (
                        <Button
                          key={valor}
                          type="button"
                          variant={
                            valorContribuicao === valor ? "default" : "outline"
                          }
                          className={`transition-all duration-300 shadow-sm ${
                            valorContribuicao === valor
                              ? "bg-champagne text-primary font-medium scale-105 shadow-md border-2 border-[#c5a878] ring-1 ring-[#d4b78b]/50"
                              : "border border-champagne/40 hover:bg-champagne/30 hover:-translate-y-1 hover:shadow-md"
                          }`}
                          onClick={() => setValorContribuicao(valor)}
                        >
                          R$ {valor}
                        </Button>
                      )
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="valor-personalizado">
                      Valor personalizado
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        R$
                      </span>
                      <Input
                        id="valor-personalizado"
                        type="number"
                        min="1"
                        className="pl-10"
                        value={valorContribuicao}
                        onChange={(e) => setValorContribuicao(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chave-pix">Chave PIX</Label>
                  <div className="flex">
                    <Input
                      id="chave-pix"
                      value={chavePix}
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button
                      type="button"
                      onClick={handleCopyPix}
                      className="rounded-l-none"
                      variant="outline"
                    >
                      {copiedPix ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <CopyIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Copie a chave PIX ou use o código QR para fazer sua
                    contribuição
                  </p>
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
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full bg-champagne hover:bg-[#c5bdb2] text-primary font-medium transition-all duration-300 py-6 shadow-md hover:shadow-lg hover:-translate-y-1 relative overflow-hidden btn-shine"
                  onClick={handleContribuir}
                  disabled={enviandoEmail}
                >
                  {enviandoEmail ? (
                    <>
                      <span className="animate-pulse mr-2">Processando...</span>
                      <Mail className="h-5 w-5 animate-bounce" />
                    </>
                  ) : (
                    <>Contribuir R$ {valorContribuicao}</>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="w-full border border-champagne/50 shadow-md">
              <CardHeader>
                <div className="mx-auto bg-champagne/30 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-primary/70" />
                </div>
                <CardTitle className="text-2xl font-playfair text-center">
                  Obrigado pela sua contribuição!
                </CardTitle>
                <CardDescription className="text-center">
                  Seu presente nos ajudará a realizar nosso sonho.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4">
                  Sua contribuição de R$ {valorContribuicao} é muito especial
                  para nós.
                </p>
                <p className="text-gray-600">
                  Agradecemos de coração por fazer parte deste momento tão
                  importante em nossas vidas.
                </p>
                <div className="flex items-center justify-center mt-6 text-[#c5a878]">
                  <Mail className="h-5 w-5 mr-2" />
                  <p className="text-sm">
                    Uma notificação foi enviada para os noivos
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  variant="outline"
                  className="border-champagne text-primary hover:bg-champagne/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  onClick={() => setMostrarAgradecimento(false)}
                >
                  Voltar
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
