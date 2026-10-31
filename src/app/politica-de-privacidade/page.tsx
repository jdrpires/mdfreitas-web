import { PageIntro } from "@/components/ui";
import { contact, metadata as makeMetadata } from "@/lib/site";
export const metadata = makeMetadata(
  "Política de Privacidade",
  "/politica-de-privacidade",
);
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="TRANSPARÊNCIA & CUIDADO"
        title="Política de Privacidade"
        text="Conheça como este site trata as informações durante sua navegação e ao preparar uma solicitação de contato."
      />
      <article className="section container prose">
        <h2>Sobre esta política</h2>
        <p>
          Esta política descreve a versão institucional do site da M D’Freitas.
          O responsável é a M D’Freitas — Consultoria & Contabilidade. A
          identificação jurídica completa e o canal dedicado à privacidade
          deverão ser disponibilizados antes da abertura do atendimento ao
          público.
        </p>
        <h2>Informações de contato</h2>
        <p>
          O formulário solicita nome, e-mail, empresa opcional, assunto e
          mensagem. Os dados são processados no seu navegador para preparar uma
          solicitação. Nesta versão, não há armazenamento desses dados em banco
          de dados do site.
        </p>
        <p>
          Quando há um canal de atendimento disponível, o envio é concluído por
          você no aplicativo de e-mail ou WhatsApp. Esses serviços possuem
          políticas próprias. Sem um canal configurado, você pode baixar um
          arquivo de texto, sem transmissão da solicitação ao escritório.
        </p>
        <h2>Finalidade e fundamento</h2>
        <p>
          O uso das informações de uma solicitação tem como finalidade responder
          ao contato e avaliar eventual prestação de serviços, quando solicitado
          pelo titular. O tratamento pode se apoiar nos procedimentos
          preliminares relacionados a contrato, a pedido do titular, e no
          cumprimento de obrigações legais quando aplicável. O aceite da
          política registra ciência e não autoriza marketing.
        </p>
        <h2>Navegação e serviços técnicos</h2>
        <p>
          Este projeto não inclui ferramentas de publicidade, analytics ou
          cookies de rastreamento. Fontes são servidas pelo próprio site. O
          provedor de hospedagem poderá processar registros técnicos, como
          endereço IP e dados de requisição, para operação e segurança, conforme
          a configuração e política do serviço contratado.
        </p>
        <h2>Retenção e compartilhamento</h2>
        <p>
          Arquivos baixados permanecem sob seu controle. Mensagens enviadas por
          canais externos seguem os períodos e condições desses serviços. Antes
          de ativar o atendimento, o escritório deverá definir os prazos de
          retenção, responsáveis e fornecedores envolvidos. Dados não devem ser
          mantidos além do necessário às finalidades e obrigações aplicáveis.
        </p>
        <h2>Seus direitos</h2>
        <p>
          Nos termos da LGPD, você pode solicitar confirmação de tratamento,
          acesso, correção, informações sobre compartilhamento e, quando
          aplicável, eliminação, anonimização, portabilidade e revogação de
          consentimento. Os pedidos dependem de verificação de identidade e das
          condições legais.
        </p>
        {contact.email ? (
          <p>
            Entre em contato pelo e-mail{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a> para tratar
            de seus dados pessoais.
          </p>
        ) : (
          <p>
            O canal para solicitações de privacidade ainda está em preparação e
            deverá ser informado antes da ativação do atendimento. O formulário
            atual não transmite dados ao escritório.
          </p>
        )}
        <h2>Atualizações</h2>
        <p>
          Esta política deverá ser revista quando novos serviços, canais ou
          funcionalidades forem ativados. Versão de 31 de outubro de 2026.
        </p>
      </article>
    </>
  );
}
