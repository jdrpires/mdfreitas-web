import { PageIntro } from "@/components/ui";
import { contact, metadata as makeMetadata } from "@/lib/site";
export const metadata = makeMetadata(
  "Política de Privacidade",
  "/politica-de-privacidade",
  "Como o site institucional da M D’Freitas trata a navegação e a preparação de mensagens de contato. Documento pendente de validação jurídica.",
);
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="TRANSPARÊNCIA & CUIDADO"
        title="Política de Privacidade"
        text="Como tratamos as informações durante sua navegação e ao preparar uma mensagem de contato."
      />
      <article className="section container prose">
        <aside className="article-note">
          Versão para revisão. Este documento ainda depende de validação pela
          responsável pelo escritório e não está juridicamente aprovado.
        </aside>
        <h2>Responsável e escopo</h2>
        <p>
          Esta política se refere ao site institucional da M D’Freitas —
          Consultoria & Contabilidade. A identificação jurídica completa, os
          responsáveis pelo atendimento à privacidade e os procedimentos
          operacionais ainda precisam ser confirmados antes da publicação.
        </p>
        <h2>Formulário e preparação de mensagens</h2>
        <p>
          Quando há WhatsApp ou e-mail configurado, o formulário solicita nome,
          e-mail, empresa opcional, assunto e mensagem. A validação e a
          preparação da mensagem acontecem no navegador, em memória, sem
          gravação pelo código do site em cookies, localStorage, sessionStorage
          ou banco de dados. O navegador pode oferecer recursos próprios de
          preenchimento automático.
        </p>
        <p>
          Após preparar a mensagem, você escolhe abrir o WhatsApp ou seu
          aplicativo de e-mail. O conteúdo preenchido é incluído no link para
          esse canal e pode ser processado pelo aplicativo ou serviço ao
          abri-lo, antes mesmo de confirmar o envio. Revise a mensagem e conclua
          o envio por lá. Esses serviços possuem políticas próprias. O site não
          confirma a entrega.
        </p>
        <p>
          Sem canais configurados, não há campos para coleta de contato nem
          opção de envio ou download de solicitações. Não inclua senhas,
          documentos ou informações financeiras sensíveis nas mensagens.
        </p>
        <h2>Finalidades e fundamentos</h2>
        <p>
          O contato visa responder a dúvidas e avaliar eventual prestação de
          serviços a pedido do titular. O escritório deverá validar as bases
          legais aplicáveis, incluindo procedimentos preliminares relacionados a
          contrato a pedido do titular e obrigações legais, conforme cada
          situação. A confirmação de leitura desta política não autoriza
          marketing.
        </p>
        <h2>Navegação e hospedagem</h2>
        <p>
          O projeto não inclui analytics, publicidade ou cookies de
          rastreamento. As fontes são hospedadas junto ao site. O provedor de
          hospedagem poderá tratar registros técnicos, como IP e dados de
          requisição, para operação e segurança. A configuração, os fornecedores
          e eventuais transferências internacionais deverão ser avaliados antes
          da publicação.
        </p>
        <h2>Compartilhamento e retenção</h2>
        <p>
          Ao abrir um canal externo, os dados da mensagem passam a ser tratados
          também por esse serviço. O escritório deverá definir os fornecedores,
          os controles de acesso e os prazos de retenção das mensagens
          recebidas. Não é possível afirmar um prazo nesta versão. As
          informações devem ser limitadas ao necessário às finalidades e
          obrigações aplicáveis.
        </p>
        <h2>Direitos do titular</h2>
        <p>
          Conforme a LGPD e suas condições legais, você pode solicitar
          confirmação de tratamento, acesso, correção, informações sobre
          compartilhamento e, quando aplicável, eliminação, anonimização,
          portabilidade ou revogação de consentimento. O atendimento poderá
          exigir verificação de identidade.
        </p>
        {contact.privacyEmail ? (
          <p>
            Para solicitações sobre dados pessoais, utilize{" "}
            <a href={`mailto:${contact.privacyEmail}`}>
              {contact.privacyEmail}
            </a>
            .
          </p>
        ) : (
          <p>
            O canal específico de privacidade ainda será disponibilizado. Essa
            definição é uma pendência obrigatória antes da publicação e não deve
            ser substituída por um contato presumido.
          </p>
        )}
        <h2>Revisão desta política</h2>
        <p>
          Versão de 31 de outubro de 2026. Rever este texto quando os canais, a
          hospedagem ou o tratamento de dados mudarem. Identificação jurídica,
          bases legais, retenção e canal de privacidade aguardam validação pela
          responsável.
        </p>
      </article>
    </>
  );
}
