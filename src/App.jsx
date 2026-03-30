import { useState } from "react";

const BR = "#16688C", BRD = "#0f4f6a", BRL = "#e8f4f9";
const ACC = "#00c4a0";
const TX = "#1a2332", TXM = "#4a5568", TXL = "#718096";
const BG = "#f7f9fc", WH = "#ffffff", BD = "#e2e8f0";
const DG = "#e53e3e", WN = "#f6ad55", SC = "#48bb78";
const PU = "#7c3aed";

const G = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body,input,select,button{font-family:'Inter',sans-serif}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeInScale{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
.fi{animation:fadeIn .35s ease both}
.fis{animation:fadeInScale .3s ease both}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-thumb{background:#cbd5e0;border-radius:3px}
`;

const NAV_ITEMS = [
  { id: "overview",    label: "Visão Geral",     group: "PRODUTO" },
  { id: "arquitetura", label: "Arquitetura",      group: "PRODUTO" },
  { id: "calculo",     label: "Motor de Cálculo", group: "PRODUTO" },
  { id: "equipe",      label: "Equipe",           group: "ENTREGA" },
  { id: "roadmap",     label: "Roadmap",          group: "ENTREGA" },
  { id: "escopo",      label: "Escopo",           group: "ENTREGA" },
];

function Badge({ children, color = BR, bg }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "2px 10px", borderRadius: 20,
      fontSize: 12, fontWeight: 600,
      background: bg || color + "18", color,
    }}>{children}</span>
  );
}

function Card({ children, style }) {
  return (
    <div style={{
      background: WH, borderRadius: 12,
      border: "1px solid " + BD, padding: 24,
      ...style
    }}>{children}</div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 700, color: TXL,
      textTransform: "uppercase", letterSpacing: "0.7px",
      marginBottom: 6
    }}>{children}</div>
  );
}

function MetricCard({ label, value, sub, color = BR }) {
  return (
    <div style={{
      background: WH, borderRadius: 12,
      border: "1px solid " + BD,
      borderTop: "3px solid " + color,
      padding: "20px 24px", flex: 1
    }}>
      <SectionLabel>{label}</SectionLabel>
      <div style={{ fontSize: 32, fontWeight: 700, color: TX, lineHeight: 1.1, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 13, color: TXL }}>{sub}</div>
    </div>
  );
}

// ── Logo ──
function Logo({ white }) {
  const cl = white ? "#fff" : BR;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width={34} height={34} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill={white ? "rgba(255,255,255,0.18)" : BRL} />
        <rect x="6" y="8"  width="28" height="3" rx="1.5" fill={cl} opacity="0.9"/>
        <rect x="6" y="14" width="22" height="3" rx="1.5" fill={cl} opacity="0.7"/>
        <rect x="6" y="20" width="17" height="3" rx="1.5" fill={cl} opacity="0.55"/>
        <rect x="6" y="26" width="24" height="3" rx="1.5" fill={cl} opacity="0.7"/>
        <rect x="6" y="32" width="28" height="3" rx="1.5" fill={cl} opacity="0.9"/>
        <rect x="26" y="16" width="8" height="14" rx="2" fill={cl}/>
        <circle cx="30" cy="14" r="5" fill={cl}/>
        <text x="30" y="18" textAnchor="middle" fill="white" fontSize="7" fontWeight="700" fontFamily="Inter,sans-serif">M</text>
      </svg>
      <div>
        <div style={{ fontSize: 17, fontWeight: 700, color: white ? "#fff" : BR, letterSpacing: "-0.3px", lineHeight: 1 }}>Mutuus</div>
        <div style={{ fontSize: 9, color: white ? "rgba(255,255,255,0.7)" : TXL, letterSpacing: "0.6px", textTransform: "uppercase", fontWeight: 500, marginTop: 2 }}>Gestão Tributária</div>
      </div>
    </div>
  );
}

// ── Sidebar ──
function Sidebar({ page, setPage }) {
  const groups = ["PRODUTO", "ENTREGA"];
  return (
    <div style={{
      width: 220, minHeight: "100vh", background: WH,
      borderRight: "1px solid " + BD, display: "flex",
      flexDirection: "column", flexShrink: 0, position: "sticky", top: 0
    }}>
      <div style={{ padding: "20px 18px 14px", borderBottom: "1px solid " + BD }}>
        <Logo />
      </div>
      <div style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        {groups.map(g => (
          <div key={g} style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: TXL, letterSpacing: "0.8px", textTransform: "uppercase", padding: "4px 8px 6px" }}>{g}</div>
            {NAV_ITEMS.filter(i => i.group === g).map(item => {
              const active = page === item.id;
              return (
                <button key={item.id} onClick={() => setPage(item.id)} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  width: "100%", textAlign: "left",
                  padding: "8px 10px", borderRadius: 8,
                  border: "none", cursor: "pointer",
                  background: active ? BRL : "transparent",
                  color: active ? BR : TXM,
                  fontWeight: active ? 600 : 400,
                  fontSize: 14, marginBottom: 2,
                }}>
                  {active && <div style={{ width: 3, height: 14, background: BR, borderRadius: 2, flexShrink: 0 }} />}
                  {item.label}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 16px", borderTop: "1px solid " + BD }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: BR, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>PF</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: TX }}>Prog. IBS/CBS</div>
            <div style={{ fontSize: 11, color: TXL }}>Produto Comercial</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────
// PAGES
// ─────────────────────────────────────────────────

function PageOverview() {
  return (
    <div className="fi" style={{ padding: 32, maxWidth: 1100 }}>
      <div style={{ fontSize: 13, color: TXL, marginBottom: 6 }}>
        Visão Geral <span style={{ margin: "0 6px" }}>·</span> Mutuus · SaaS Tributário
      </div>
      <h1 style={{ fontSize: 26, fontWeight: 700, color: TX, marginBottom: 4 }}>SaaS Mutuus — Cálculo de Tributos sobre Produtos</h1>
      <p style={{ fontSize: 14, color: TXM, marginBottom: 28, maxWidth: 700 }}>
        Plataforma web SaaS destinada a auxiliar fornecedores no cálculo de impostos incidentes sobre produtos comercializados. Permite cadastro, gerenciamento de dados e importação de listas de produtos para cálculo tributário com base em tabelas configuradas.
      </p>

      {/* Métricas */}
      <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
        <MetricCard label="APLICAÇÕES" value="2" sub="Backend (NestJS) · Portal Web (NextJS)" color={PU} />
        <MetricCard label="MESES DE DESENVOLVIMENTO" value="M1–M4" sub="4 meses de entrega" color={ACC} />
      </div>

      {/* Ecossistema */}
      <Card style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: TX, marginBottom: 20 }}>Ecossistema de Sistemas</div>

        {/* Portal Web */}
        <div style={{ border: "1px solid " + BD, borderRadius: 10, padding: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: BRL, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, color: BR }}>PW</div>
            <div>
              <div style={{ fontWeight: 700, color: TX, fontSize: 15 }}>Portal Web</div>
              <div style={{ fontSize: 12, color: ACC, fontWeight: 500 }}>NextJS · SaaS · Multi-fornecedor</div>
            </div>
            <div style={{ marginLeft: "auto" }}><Badge color={BR}>296h · +74h margem</Badge></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 32px" }}>
            {[
              "Autenticação e permissões",
              "Página de assinaturas e gerenciamento",
              "Dashboard",
              "Página de calculadora tributária",
              "Importação de produtos para cálculo tributário",
              "Importação de tabela de tributos",
              "Página de Fornecedores",
              "Página de produtos",
              "Componentização, layouts, global state",
            ].map((f, i) => (
              <div key={i} style={{ fontSize: 13, color: TXM, padding: "4px 0", display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ color: SC, fontSize: 16 }}>·</span> {f}
              </div>
            ))}
          </div>
        </div>

        {/* Backend */}
        <div style={{ border: "1px solid " + BD, borderRadius: 10, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, color: PU }}>BE</div>
            <div>
              <div style={{ fontWeight: 700, color: TX, fontSize: 15 }}>Backend</div>
              <div style={{ fontSize: 12, color: PU, fontWeight: 500 }}>NestJS · PostgreSQL · REST API</div>
            </div>
            <div style={{ marginLeft: "auto" }}><Badge color={PU}>340h · +85h margem</Badge></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 32px" }}>
            {[
              "Autenticação",
              "Integração com API de pagamentos (Stripe ou similar)",
              "CRUDs gerais (fornecedores, categorias de produtos, etc.)",
              "Processamento de planilhas",
              "Tabela de Tributos",
              "Motor tributário",
              "Infraestrutura básica de API",
            ].map((f, i) => (
              <div key={i} style={{ fontSize: 13, color: TXM, padding: "4px 0", display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ color: PU, fontSize: 16 }}>·</span> {f}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Funcionalidades principais */}
      <Card>
        <div style={{ fontSize: 14, fontWeight: 700, color: TX, marginBottom: 16 }}>Funcionalidades Principais — MVP</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
          {[
            "Cadastro e autenticação de usuários",
            "Gestão de contas e assinaturas do serviço",
            "Cadastro e gerenciamento de fornecedores",
            "Importação de produtos por planilha ou formulário",
            "Importação de tabelas de tributos utilizadas no cálculo",
            "Módulo de cálculo tributário para produtos cadastrados",
            "Painel de visualização (dashboard) com informações e resultados dos cálculos realizados",
          ].map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: TXM, padding: "5px 0", alignItems: "flex-start" }}>
              <span style={{ color: SC, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span> {f}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function PageArquitetura() {
  return (
    <div className="fi" style={{ padding: 32, maxWidth: 1000 }}>
      <div style={{ fontSize: 13, color: TXL, marginBottom: 6 }}>Arquitetura <span style={{ margin: "0 6px" }}>·</span> Mutuus</div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: TX, marginBottom: 20 }}>Arquitetura Técnica</h1>

      {/* Fluxo */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: TX, marginBottom: 20 }}>Fluxo do Produto</div>
        <div style={{ display: "flex", alignItems: "center", gap: 0, overflowX: "auto", paddingBottom: 8 }}>
          {[
            { n: "01", label: "Upload", desc: "Usuário envia planilha com lista de produtos e coluna de incidência", color: BR },
            { n: "02", label: "Parser", desc: "Backend lê e valida colunas: produto, preço, incide", color: PU },
            { n: "03", label: "Tributos", desc: "Motor aplica tabela de tributos configurada aos produtos", color: "#e67e22" },
            { n: "04", label: "Cálculo", desc: "Cálculo do novo preço por produto (onde incide = sim)", color: DG },
            { n: "05", label: "Dashboard", desc: "Resultados exibidos no painel com resumo dos cálculos", color: SC },
          ].map((s, i, arr) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
              <div style={{ textAlign: "center", width: 148, padding: "0 4px" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: s.color, color: "#fff", fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>{s.n}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: TX, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: TXL, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
              {i < arr.length - 1 && <div style={{ fontSize: 20, color: BD, margin: "0 2px", paddingBottom: 30 }}>→</div>}
            </div>
          ))}
        </div>
      </Card>

      {/* Stack Técnica */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <Card>
          <div style={{ fontSize: 14, fontWeight: 700, color: TX, marginBottom: 16 }}>Stack — Portal Web</div>
          {[
            ["Framework", "NextJS"],
            ["Linguagem", "TypeScript"],
            ["Estado global", "Context API / Zustand"],
            ["Upload", "File API + Parser de planilhas"],
            ["Auth", "Autenticação e permissões por perfil"],
            ["Assinaturas", "Integração com gestão de planos"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f4f8", fontSize: 13 }}>
              <span style={{ color: TXM }}>{k}</span>
              <span style={{ fontWeight: 600, color: TX }}>{v}</span>
            </div>
          ))}
        </Card>
        <Card>
          <div style={{ fontSize: 14, fontWeight: 700, color: TX, marginBottom: 16 }}>Stack — Backend</div>
          {[
            ["Framework", "NestJS"],
            ["Banco de dados", "PostgreSQL"],
            ["Pagamentos", "Stripe ou similar"],
            ["Processamento", "Planilhas (importação e parsing)"],
            ["Motor tributário", "Módulo de cálculo customizado"],
            ["Infra", "Infraestrutura básica de API"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f4f8", fontSize: 13 }}>
              <span style={{ color: TXM }}>{k}</span>
              <span style={{ fontWeight: 600, color: TX }}>{v}</span>
            </div>
          ))}
        </Card>
      </div>

      {/* Regras de Negócio */}
      <Card>
        <div style={{ fontSize: 14, fontWeight: 700, color: TX, marginBottom: 16 }}>Regras de Negócio — Motor Tributário</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { label: "Alíquota IBS + CBS", value: "Configurada via tabela de tributos cadastrada no sistema", color: BR },
            { label: "Campo de Incidência", value: "Lido da coluna 'incide' na planilha enviada pelo usuário", color: PU },
            { label: "Sem incidência", value: "incide=não → preço do produto mantido sem alteração", color: SC },
            { label: "Com incidência", value: "preço_novo = preço_atual + valor calculado do tributo", color: WN },
            { label: "Isolamento de dados", value: "Múltiplos fornecedores operam de forma isolada (multi-tenant)", color: ACC },
            { label: "Tabela de Tributos", value: "Configurada previamente por administrador do sistema", color: TXM },
          ].map((r, i) => (
            <div key={i} style={{ padding: "12px 14px", borderRadius: 8, border: "1px solid " + BD, background: r.color + "08" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: r.color, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>{r.label}</div>
              <div style={{ fontSize: 13, color: TXM }}>{r.value}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function PageCalculo() {
  return (
    <div className="fi" style={{ padding: 32, maxWidth: 960 }}>
      <div style={{ fontSize: 13, color: TXL, marginBottom: 6 }}>Motor de Cálculo <span style={{ margin: "0 6px" }}>·</span> Mutuus · IBS/CBS</div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: TX, marginBottom: 6 }}>Motor de Cálculo Tributário</h1>
      <p style={{ fontSize: 14, color: TXM, marginBottom: 24, maxWidth: 620 }}>
        Lógica 100% matemática — sem IA. O sistema lê a coluna de incidência já preenchida na planilha e aplica a alíquota IBS + CBS apenas nos produtos marcados.
      </p>

      {/* Aviso sem IA */}
      <div style={{ background: SC + "12", border: "1px solid " + SC + "50", borderRadius: 10, padding: "14px 18px", marginBottom: 24, display: "flex", gap: 12, alignItems: "flex-start" }}>
        <span style={{ fontSize: 20, flexShrink: 0 }}>✅</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: TX, marginBottom: 4 }}>Sem dependência de IA ou machine learning</div>
          <div style={{ fontSize: 13, color: TXM, lineHeight: 1.6 }}>
            A planilha enviada pelo usuário já contém a coluna <strong>"incide"</strong> (valores: <code style={{ background: BD, padding: "1px 6px", borderRadius: 4 }}>sim</code> ou <code style={{ background: BD, padding: "1px 6px", borderRadius: 4 }}>não</code>). O motor apenas lê esse valor e executa o cálculo matemático — sem inferência, sem classificação automática e sem chamadas externas de IA.
          </div>
        </div>
      </div>

      {/* Estrutura esperada da planilha */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: TX, marginBottom: 16 }}>Estrutura Esperada da Planilha (entrada)</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: BG }}>
                {["Coluna", "Tipo", "Valores aceitos", "Obrigatório", "Descrição"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, fontSize: 11, color: TXL, textTransform: "uppercase", letterSpacing: "0.4px", borderBottom: "1px solid " + BD }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["produto", "Texto", "Qualquer string", "Sim", "Nome ou descrição do produto"],
                ["preco", "Numérico", "Ex: 1500.00 ou 1500,00", "Sim", "Preço atual de venda (sem imposto novo)"],
                ["incide", "Texto", "sim / não", "Sim", "Indica se IBS+CBS incide sobre o produto"],
              ].map(([col, tipo, val, obr, desc], i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f0f4f8" }}>
                  <td style={{ padding: "10px 14px" }}><code style={{ background: BRL, color: BR, padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>{col}</code></td>
                  <td style={{ padding: "10px 14px", color: TXM }}>{tipo}</td>
                  <td style={{ padding: "10px 14px", color: TXM }}>{val}</td>
                  <td style={{ padding: "10px 14px" }}><Badge color={obr === "Sim" ? DG : SC}>{obr}</Badge></td>
                  <td style={{ padding: "10px 14px", color: TXM }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Exemplo visual de planilha */}
        <div style={{ marginTop: 20, borderRadius: 8, border: "1px solid " + BD, overflow: "hidden" }}>
          <div style={{ background: BR, color: "#fff", padding: "8px 14px", fontSize: 12, fontWeight: 600, letterSpacing: "0.4px" }}>EXEMPLO — planilha de entrada</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f0f7fb" }}>
                {["produto", "preco", "incide"].map(h => (
                  <th key={h} style={{ padding: "8px 14px", textAlign: "left", fontWeight: 700, color: BR, borderBottom: "1px solid " + BD }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Notebook Dell XPS 15", "4500,00", "sim"],
                ["Monitor LG 27\"", "1890,00", "sim"],
                ["Suporte Ergonômico", "220,00", "não"],
                ["Licença Office 365", "650,00", "sim"],
                ["Headset Sony", "299,00", "não"],
              ].map(([p, pr, inc], i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f0f4f8", background: inc === "sim" ? "#fffbeb" : WH }}>
                  <td style={{ padding: "8px 14px", color: TX }}>{p}</td>
                  <td style={{ padding: "8px 14px", color: TXM }}>R$ {pr}</td>
                  <td style={{ padding: "8px 14px" }}>
                    <Badge color={inc === "sim" ? WN : SC}>{inc}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Lógica de cálculo */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <Card>
          <div style={{ fontSize: 14, fontWeight: 700, color: TX, marginBottom: 16 }}>Lógica de Cálculo</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ padding: "14px 16px", borderRadius: 8, background: WN + "12", border: "1px solid " + WN + "40" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: WN, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>Se incide = "sim"</div>
              <code style={{ fontSize: 13, color: TX, display: "block", lineHeight: 1.8 }}>
                valor_imposto = preco_atual × 0,2636<br />
                preco_novo = preco_atual + valor_imposto
              </code>
              <div style={{ marginTop: 8, fontSize: 12, color: TXL }}>Exemplo: R$ 4.500,00 → R$ 5.686,20</div>
            </div>
            <div style={{ padding: "14px 16px", borderRadius: 8, background: SC + "12", border: "1px solid " + SC + "40" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: SC, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>Se incide = "não"</div>
              <code style={{ fontSize: 13, color: TX, display: "block", lineHeight: 1.8 }}>
                preco_novo = preco_atual<br />
                valor_imposto = 0
              </code>
              <div style={{ marginTop: 8, fontSize: 12, color: TXL }}>Produto isento — preço mantido sem alteração.</div>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ fontSize: 14, fontWeight: 700, color: TX, marginBottom: 16 }}>Planilha de Saída (colunas geradas)</div>
          {[
            { col: "produto", desc: "Mantida da entrada sem alteração", color: TXL },
            { col: "preco_atual", desc: "Preço original da entrada", color: TXL },
            { col: "incide", desc: "Mantida da entrada sem alteração", color: TXL },
            { col: "valor_imposto", desc: "Valor calculado do IBS+CBS (ou 0)", color: WN },
            { col: "preco_novo", desc: "Preço final = preco_atual + valor_imposto", color: SC },
            { col: "variacao_%", desc: "Percentual de aumento (ou — se isento)", color: BR },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid #f0f4f8" }}>
              <code style={{ background: r.color + "18", color: r.color, padding: "2px 8px", borderRadius: 4, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{r.col}</code>
              <span style={{ fontSize: 12, color: TXM }}>{r.desc}</span>
            </div>
          ))}
        </Card>
      </div>

      {/* Validações do parser */}
      <Card>
        <div style={{ fontSize: 14, fontWeight: 700, color: TX, marginBottom: 16 }}>Validações do Parser (antes do cálculo)</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { label: "Colunas obrigatórias presentes", acao: "Bloqueia o processamento e exibe erro específico", color: DG },
            { label: "Coluna 'preco' é numérica", acao: "Normaliza vírgula → ponto; rejeita texto não-numérico", color: WN },
            { label: "Coluna 'incide' é 'sim' ou 'não'", acao: "Valores inválidos são sinalizados linha a linha", color: WN },
            { label: "Arquivo é CSV ou XLSX", acao: "Outros formatos rejeitados com mensagem de tipo inválido", color: DG },
            { label: "Limite de linhas por plano", acao: "Bloqueia e exibe modal de upgrade se exceder o limite", color: PU },
            { label: "Arquivo não está vazio", acao: "Valida ao menos 1 linha de dados além do cabeçalho", color: TXM },
          ].map((r, i) => (
            <div key={i} style={{ padding: "12px 14px", borderRadius: 8, border: "1px solid " + BD, background: r.color + "08" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: r.color, marginBottom: 4 }}>✓ {r.label}</div>
              <div style={{ fontSize: 12, color: TXM }}>{r.acao}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}


// ─────────────────────────────────────────────────
// EQUIPE — alocação calculada mês a mês
// ─────────────────────────────────────────────────
function PageEquipe() {
  // alocação em % de FTE (0–100). 0 = não alocado
  const membros = [
    {
      role: "Gestor de Projetos",
      tipo: "Gestão",
      cor: "#0891b2",
      initials: "GP",
      horas: "160h",
      nota: "Acompanhamento de entregas, alinhamento com cliente, gestão de riscos e cerimônias",
      meses: [
        { pct: 25, h: 40,  label: "25%" },
        { pct: 25, h: 40,  label: "25%" },
        { pct: 25, h: 40,  label: "25%" },
        { pct: 25, h: 40,  label: "25%" },
      ],
    },
    {
      role: "Dev Backend",
      tipo: "Backend",
      cor: PU,
      initials: "BE",
      horas: "425h",
      nota: "Auth · CRUDs · Planilhas · Tributos · Motor · Pagamentos · Infra — 160h+160h+65h+40h = 425h",
      meses: [
        { pct: 100, h: 160, label: "100%" },
        { pct: 100, h: 160, label: "100%" },
        { pct: 41,  h: 65,  label: "~41%" },
        { pct: 25,  h: 40,  label: "~25%" },
      ],
    },
    {
      role: "Product Designer Pleno",
      tipo: "Design",
      cor: "#e67e22",
      initials: "PD",
      horas: "~100h",
      nota: "Prototipação e handoff completo no Mês 1 (part-time). Suporte e ajustes no Mês 2 (20h).",
      meses: [
        { pct: 50, h: 80, label: "50%" },
        { pct: 13, h: 20, label: "20h" },
        { pct: 0,  h: 0,  label: "—"  },
        { pct: 0,  h: 0,  label: "—"  },
      ],
    },
    {
      role: "QA Engineer",
      tipo: "Qualidade",
      cor: SC,
      initials: "QA",
      horas: "120h",
      nota: "Testes funcionais, validação de cálculos tributários e fluxos de upload/download. Part-time no Mês 3, 40h no Mês 4.",
      meses: [
        { pct: 0,  h: 0,  label: "—"    },
        { pct: 0,  h: 0,  label: "—"    },
        { pct: 50, h: 80, label: "~50%" },
        { pct: 25, h: 40, label: "25%"  },
      ],
    },
    {
      role: "Dev Frontend",
      tipo: "Frontend",
      cor: BR,
      initials: "FE",
      horas: "370h",
      nota: "Inicia semana 3 do Mês 1. 80h+160h+80h+50h = 370h",
      meses: [
        { pct: 50,  h: 80,  label: "~50%", obs: "Inicia sem. 3" },
        { pct: 100, h: 160, label: "100%" },
        { pct: 50,  h: 80,  label: "~50%" },
        { pct: 31,  h: 50,  label: "~31%" },
      ],
    },
  ];

  const mColors = [BR, ACC, WN, SC];
  const mLabels = ["Mês 1", "Mês 2", "Mês 3", "Mês 4"];

  function BarPct({ pct, color }) {
    if (pct === 0) return <div style={{ height: 8, borderRadius: 4, background: "#f0f4f8", width: "100%" }} />;
    return (
      <div style={{ height: 8, borderRadius: 4, background: "#f0f4f8", width: "100%", overflow: "hidden" }}>
        <div style={{ height: "100%", width: pct + "%", background: color, borderRadius: 4, transition: "width 0.4s" }} />
      </div>
    );
  }

  // totais por mês
  const totaisMes = [0,1,2,3].map(mi =>
    membros.reduce((acc, m) => acc + m.meses[mi].h, 0)
  );

  return (
    <div className="fi" style={{ padding: 32, maxWidth: 1000 }}>
      <div style={{ fontSize: 13, color: TXL, marginBottom: 6 }}>Equipe <span style={{ margin: "0 6px" }}>·</span> Mutuus</div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: TX, marginBottom: 6 }}>Equipe & Alocação</h1>
      <p style={{ fontSize: 14, color: TXM, marginBottom: 24, maxWidth: 680 }}>
        Alocação calculada com base em 40h/semana por profissional (160h/mês em full time). O Product Designer Pleno atua part-time no Mês 1 e com 20h no Mês 2. O Dev Frontend inicia 15 dias após o designer (semana 3 do Mês 1). O Gestor de Projetos atua 40h/mês durante todos os meses.
      </p>

      {/* Resumo por mês */}
      <div style={{ display: "flex", gap: 14, marginBottom: 28 }}>
        {mLabels.map((m, i) => (
          <div key={m} style={{ flex: 1, background: WH, border: "1px solid " + BD, borderTop: "3px solid " + mColors[i], borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: TXL, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>{m}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: TX }}>{totaisMes[i]}h</div>
            <div style={{ fontSize: 11, color: TXL, marginTop: 2 }}>total alocado</div>
          </div>
        ))}
      </div>

      {/* Cards de profissionais */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
        {membros.map((m, i) => (
          <Card key={i} style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: m.cor + "20", color: m.cor, fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{m.initials}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: TX }}>{m.role}</span>
                  <Badge color={m.cor}>{m.tipo}</Badge>
                  {m.horas !== "—" && <Badge color={TXL}>{m.horas}</Badge>}
                </div>
                <div style={{ fontSize: 12, color: TXL, marginBottom: 16, lineHeight: 1.5 }}>{m.nota}</div>

                {/* Grade de meses */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                  {m.meses.map((mes, mi) => (
                    <div key={mi}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: mColors[mi] }}>{mLabels[mi]}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: mes.pct === 0 ? TXL : TX }}>{mes.label}</span>
                      </div>
                      <BarPct pct={mes.pct} color={mColors[mi]} />
                      <div style={{ fontSize: 11, color: TXL, marginTop: 4 }}>
                        {mes.h > 0 ? mes.h + "h" : "—"}
                        {mes.obs && <span style={{ color: WN, fontWeight: 600 }}> · {mes.obs}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tabela resumo */}
      <Card>
        <div style={{ fontSize: 14, fontWeight: 700, color: TX, marginBottom: 16 }}>Resumo de Alocação — Horas por Mês</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: BG }}>
                {["Profissional", "Mês 1", "Mês 2", "Mês 3", "Mês 4", "Total"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, fontSize: 11, color: TXL, textTransform: "uppercase", letterSpacing: "0.4px", borderBottom: "1px solid " + BD }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {membros.map((m, i) => {
                const total = m.meses.reduce((a, b) => a + b.h, 0);
                return (
                  <tr key={i} style={{ borderBottom: "1px solid #f0f4f8" }}>
                    <td style={{ padding: "10px 14px" }}>
                      <div style={{ fontWeight: 600, color: TX }}>{m.role}</div>
                    </td>
                    {m.meses.map((mes, mi) => (
                      <td key={mi} style={{ padding: "10px 14px" }}>
                        {mes.h > 0
                          ? <span style={{ fontWeight: 600, color: mColors[mi] }}>{mes.h}h</span>
                          : <span style={{ color: TXL }}>—</span>
                        }
                      </td>
                    ))}
                    <td style={{ padding: "10px 14px", fontWeight: 700, color: TX }}>{total}h</td>
                  </tr>
                );
              })}
              <tr style={{ background: BRL, borderTop: "2px solid " + BD }}>
                <td style={{ padding: "10px 14px", fontWeight: 700, color: TX }}>Total</td>
                {totaisMes.map((t, i) => (
                  <td key={i} style={{ padding: "10px 14px", fontWeight: 700, color: mColors[i] }}>{t}h</td>
                ))}
                <td style={{ padding: "10px 14px", fontWeight: 700, color: TX }}>{totaisMes.reduce((a,b)=>a+b,0)}h</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────
// ROADMAP — Gantt visual por mês
// ─────────────────────────────────────────────────
function PageRoadmap() {
  // Cada tarefa tem: label, track (BE/FE/DESIGN), startWeek (1–16), durationWeeks
  // 4 meses × 4 semanas = 16 semanas
  // FE inicia semana 3 (15 dias após designer que inicia semana 1)
  const TOTAL_WEEKS = 16;

  const tarefas = [
    // DESIGN
    { label: "Prototipação e Handoff",           track: "DESIGN", start: 1,  dur: 4  },
    { label: "Suporte e ajustes",                track: "DESIGN", start: 5,  dur: 2  },
    // BACKEND
    { label: "Autenticação",                     track: "BE",     start: 1,  dur: 3  },
    { label: "CRUD de fornecedores",             track: "BE",     start: 2,  dur: 2  },
    { label: "CRUD de produtos",                 track: "BE",     start: 3,  dur: 3  },
    { label: "Processamento de planilhas",       track: "BE",     start: 5,  dur: 3  },
    { label: "Tabela de Tributos",               track: "BE",     start: 6,  dur: 4  },
    { label: "Motor tributário",                 track: "BE",     start: 9,  dur: 4  },
    { label: "Integração de pagamentos",         track: "BE",     start: 13, dur: 3  },
    { label: "Infra / DevOps (contínuo)",        track: "BE",     start: 1,  dur: 16 },
    // FRONTEND (inicia semana 3, distribui por 4 meses = 370h)
    { label: "Componentização, layouts, state",  track: "FE",     start: 3,  dur: 3  },
    { label: "Autenticação e permissões",        track: "FE",     start: 3,  dur: 3  },
    { label: "Dashboard",                        track: "FE",     start: 5,  dur: 5  },
    { label: "Importação de tabela de tributos", track: "FE",     start: 5,  dur: 3  },
    { label: "Página de Fornecedores",           track: "FE",     start: 6,  dur: 3  },
    { label: "Página de Produtos",               track: "FE",     start: 7,  dur: 3  },
    { label: "Importação de produtos",           track: "FE",     start: 9,  dur: 3  },
    { label: "Calculadora tributária",           track: "FE",     start: 11, dur: 4  },
    { label: "Assinaturas e gerenciamento",      track: "FE",     start: 14, dur: 2  },
    // QA (part-time mês 3, 40h mês 4)
    { label: "Testes de autenticação e CRUDs",   track: "QA",     start: 9,  dur: 2  },
    { label: "Testes de upload e planilhas",      track: "QA",     start: 10, dur: 2  },
    { label: "Testes do motor tributário",        track: "QA",     start: 11, dur: 2  },
    { label: "Testes de integração e regressão", track: "QA",     start: 13, dur: 3  },
  ];

  const trackConfig = {
    DESIGN: { label: "Design",   color: "#e67e22", bg: "#fef3e8" },
    BE:     { label: "Backend",  color: PU,        bg: "#f5f3ff" },
    FE:     { label: "Frontend", color: BR,        bg: BRL       },
    QA:     { label: "QA",       color: SC,        bg: "#f0faf4" },
  };

  const mColors = [BR, ACC, WN, SC];
  const mLabels = ["Mês 1", "Mês 2", "Mês 3", "Mês 4"];

  // month markers
  const months = [
    { label: "Mês 1", startWeek: 1, weeks: 4 },
    { label: "Mês 2", startWeek: 5, weeks: 4 },
    { label: "Mês 3", startWeek: 9, weeks: 4 },
    { label: "Mês 4", startWeek: 13, weeks: 4 },
  ];

  const W = 100 / TOTAL_WEEKS; // % per week

  function GanttBar({ start, dur, color }) {
    const left = ((start - 1) / TOTAL_WEEKS) * 100;
    const width = (dur / TOTAL_WEEKS) * 100;
    return (
      <div style={{
        position: "absolute",
        left: left + "%",
        width: width + "%",
        top: "50%", transform: "translateY(-50%)",
        height: 20, borderRadius: 4,
        background: color,
        opacity: 0.85,
        minWidth: 4,
      }} />
    );
  }

  const tracks = ["DESIGN", "BE", "FE", "QA"];

  return (
    <div className="fi" style={{ padding: 32, maxWidth: 1100 }}>
      <div style={{ fontSize: 13, color: TXL, marginBottom: 6 }}>Roadmap <span style={{ margin: "0 6px" }}>·</span> Mutuus</div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: TX, marginBottom: 6 }}>Roadmap — Gantt</h1>
      <p style={{ fontSize: 14, color: TXM, marginBottom: 24, maxWidth: 700 }}>
        4 meses de desenvolvimento. Product Designer Pleno atua part-time no Mês 1. Dev Frontend inicia na semana 3 (15 dias após o designer).
      </p>

      {/* Mês markers */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {mLabels.map((m, i) => (
          <div key={m} style={{ flex: 1, background: WH, border: "1px solid " + BD, borderTop: "3px solid " + mColors[i], borderRadius: 10, padding: "10px 16px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: mColors[i] }}>{m}</div>
            <div style={{ fontSize: 11, color: TXL, marginTop: 2 }}>Semanas {(i*4)+1}–{(i*4)+4}</div>
          </div>
        ))}
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        {/* Header com semanas */}
        <div style={{ display: "flex", borderBottom: "2px solid " + BD }}>
          <div style={{ width: 220, flexShrink: 0, padding: "10px 16px", fontSize: 11, fontWeight: 700, color: TXL, textTransform: "uppercase", letterSpacing: "0.5px", borderRight: "1px solid " + BD }}>Tarefa</div>
          <div style={{ flex: 1, position: "relative", display: "flex" }}>
            {months.map((mo, mi) => (
              <div key={mi} style={{ flex: mo.weeks, borderRight: mi < 3 ? "1px solid " + BD : "none", padding: "10px 8px", background: mColors[mi] + "12" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: mColors[mi] }}>{mo.label}</div>
                <div style={{ display: "flex", gap: 0, marginTop: 4 }}>
                  {Array.from({length: mo.weeks}).map((_, wi) => (
                    <div key={wi} style={{ flex: 1, fontSize: 10, color: TXL, textAlign: "center" }}>S{mo.startWeek + wi}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Linhas por track */}
        {tracks.map(track => {
          const cfg = trackConfig[track];
          const trackTarefas = tarefas.filter(t => t.track === track);
          return (
            <div key={track}>
              {/* Track header */}
              <div style={{ display: "flex", background: cfg.bg, borderBottom: "1px solid " + BD }}>
                <div style={{ width: 220, flexShrink: 0, padding: "8px 16px", fontSize: 11, fontWeight: 700, color: cfg.color, textTransform: "uppercase", letterSpacing: "0.5px", borderRight: "1px solid " + BD }}>
                  {cfg.label}
                </div>
                <div style={{ flex: 1 }} />
              </div>

              {/* Tarefas do track */}
              {trackTarefas.map((t, i) => (
                <div key={i} style={{ display: "flex", borderBottom: "1px solid #f0f4f8", minHeight: 36 }}>
                  <div style={{ width: 220, flexShrink: 0, padding: "8px 16px", fontSize: 12, color: TXM, borderRight: "1px solid " + BD, display: "flex", alignItems: "center", lineHeight: 1.3 }}>
                    {t.label}
                  </div>
                  <div style={{ flex: 1, position: "relative" }}>
                    {/* Month dividers */}
                    {[1,2,3].map(m => (
                      <div key={m} style={{ position: "absolute", left: (m * 25) + "%", top: 0, bottom: 0, borderLeft: "1px dashed #e2e8f0" }} />
                    ))}
                    <GanttBar start={t.start} dur={t.dur} color={cfg.color} />
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        {/* Legenda */}
        <div style={{ padding: "14px 20px", borderTop: "1px solid " + BD, display: "flex", gap: 20, background: BG }}>
          {Object.entries(trackConfig).map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 24, height: 10, borderRadius: 3, background: v.color, opacity: 0.85 }} />
              <span style={{ fontSize: 12, color: TXM }}>{v.label}</span>
            </div>
          ))}
          <div style={{ marginLeft: "auto", fontSize: 12, color: TXL }}>⚡ Frontend inicia semana 3 (15 dias após designer)</div>
        </div>
      </Card>

      {/* Entregas por mês */}
      <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          {
            mes: "Mês 1", color: BR,
            be: ["Autenticação", "CRUD de fornecedores"],
            fe: ["— (Designer part-time até sem. 4)", "Componentização e layouts (sem. 3+)", "Autenticação e permissões (sem. 3+)"],
            design: ["Prototipação e Handoff completo"],
            qa: [],
          },
          {
            mes: "Mês 2", color: ACC,
            be: ["CRUD de produtos", "Processamento de planilhas", "Tabela de Tributos (início)"],
            fe: ["Dashboard", "Importação de tabela de tributos", "Página de Fornecedores", "Página de Produtos"],
            design: ["Suporte e ajustes (20h)"],
            qa: [],
          },
          {
            mes: "Mês 3", color: WN,
            be: ["Tabela de Tributos (conclusão)", "Motor tributário (~65h)"],
            fe: ["Importação de produtos", "Calculadora tributária (início)"],
            design: [],
            qa: ["Testes de autenticação e CRUDs", "Testes de upload e planilhas", "Testes do motor tributário"],
          },
          {
            mes: "Mês 4", color: SC,
            be: ["Motor tributário (conclusão)", "Integração de pagamentos (~40h)"],
            fe: ["Calculadora tributária (conclusão)", "Assinaturas e gerenciamento"],
            design: [],
            qa: ["Testes de integração e regressão"],
          },
        ].map((m, i) => (
          <Card key={i} style={{ borderTop: "3px solid " + m.color, padding: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: TX, marginBottom: 14 }}>{m.mes}</div>
            {m.design.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#e67e22", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 6 }}>Design</div>
                {m.design.map((d, j) => <div key={j} style={{ fontSize: 12, color: TXM, padding: "2px 0" }}>· {d}</div>)}
              </div>
            )}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: PU, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 6 }}>Backend</div>
              {m.be.map((d, j) => <div key={j} style={{ fontSize: 12, color: TXM, padding: "2px 0" }}>· {d}</div>)}
            </div>
            <div style={{ marginBottom: m.qa.length > 0 ? 12 : 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: BR, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 6 }}>Frontend</div>
              {m.fe.map((d, j) => <div key={j} style={{ fontSize: 12, color: TXM, padding: "2px 0" }}>· {d}</div>)}
            </div>
            {m.qa.length > 0 && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: SC, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 6 }}>QA</div>
                {m.qa.map((d, j) => <div key={j} style={{ fontSize: 12, color: TXM, padding: "2px 0" }}>· {d}</div>)}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function PageEscopo() {
  return (
    <div className="fi" style={{ padding: 32, maxWidth: 900 }}>
      <div style={{ fontSize: 13, color: TXL, marginBottom: 6 }}>Escopo <span style={{ margin: "0 6px" }}>·</span> Mutuus</div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: TX, marginBottom: 20 }}>Escopo & Critérios de Aceite</h1>

      {/* No Escopo */}
      <Card style={{ marginBottom: 20, border: "1px solid " + SC + "40" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: SC + "20", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: SC, fontSize: 16 }}>✓</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: TX }}>No Escopo</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
          {[
            "Upload de planilha CSV e XLSX",
            "Leitura da coluna 'incide' (sim / não)",
            "Cálculo automático IBS + CBS (26,36%) por produto",
            "Produtos com incide=não mantêm preço original",
            "Download da planilha atualizada (CSV e XLSX)",
            "Cadastro e listagem de fornecedores",
            "Histórico de simulações por usuário",
            "Planos Free · Pro · Enterprise",
            "Dashboard com métricas de impacto",
            "Auth completo (cadastro, login, senha)",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: TXM, padding: "4px 0" }}>
              <span style={{ color: SC, flexShrink: 0 }}>✓</span> {item}
            </div>
          ))}
        </div>
      </Card>

      {/* Fora do Escopo */}
      <Card style={{ marginBottom: 20, border: "1px solid " + DG + "40" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: DG + "20", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: DG, fontSize: 16 }}>✕</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: TX }}>Fora do Escopo</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
          {[
            "Emissão de notas fiscais",
            "Integração com ERPs (versão inicial)",
            "Consultoria tributária personalizada",
            "Cálculo retroativo (pré-2025)",
            "App mobile nativo",
            "Suporte a moeda estrangeira",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: TXM, padding: "4px 0" }}>
              <span style={{ color: DG, flexShrink: 0 }}>✕</span> {item}
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}

// ── Login ──
function LoginPage({ onLogin }) {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);
  const [show, setShow] = useState(false);

  function handleSubmit() {
    if (senha === "mutuus_e_guidance") {
      onLogin();
    } else {
      setErro(true);
      setSenha("");
      setTimeout(() => setErro(false), 2500);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: BG, fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden",
    }}>
      <style>{G}</style>

      {/* Fundo decorativo */}
      <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, borderRadius: "50%", background: BRL, opacity: 0.6, zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 320, height: 320, borderRadius: "50%", background: BR + "12", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "40%", left: "10%", width: 8, height: 8, borderRadius: "50%", background: ACC, opacity: 0.4 }} />
      <div style={{ position: "absolute", top: "20%", right: "15%", width: 5, height: 5, borderRadius: "50%", background: BR, opacity: 0.3 }} />

      <div className="fis" style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 420, padding: "0 24px" }}>

        {/* Card */}
        <div style={{
          background: WH, borderRadius: 16,
          border: "1px solid " + BD,
          boxShadow: "0 4px 40px rgba(22,104,140,0.08)",
          padding: "40px 40px 36px",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 32 }}>
            <svg width={56} height={56} viewBox="0 0 40 40" fill="none" style={{ marginBottom: 14 }}>
              <rect width="40" height="40" rx="10" fill={BRL} />
              <rect x="6" y="8"  width="28" height="3" rx="1.5" fill={BR} opacity="0.9"/>
              <rect x="6" y="14" width="22" height="3" rx="1.5" fill={BR} opacity="0.7"/>
              <rect x="6" y="20" width="17" height="3" rx="1.5" fill={BR} opacity="0.55"/>
              <rect x="6" y="26" width="24" height="3" rx="1.5" fill={BR} opacity="0.7"/>
              <rect x="6" y="32" width="28" height="3" rx="1.5" fill={BR} opacity="0.9"/>
              <rect x="26" y="16" width="8" height="14" rx="2" fill={BR}/>
              <circle cx="30" cy="14" r="5" fill={BR}/>
              <text x="30" y="18" textAnchor="middle" fill="white" fontSize="7" fontWeight="700" fontFamily="Inter,sans-serif">M</text>
            </svg>
            <div style={{ fontSize: 22, fontWeight: 700, color: BR, letterSpacing: "-0.4px", marginBottom: 4 }}>Mutuus</div>
            <div style={{ fontSize: 12, color: TXL, letterSpacing: "0.8px", textTransform: "uppercase", fontWeight: 500 }}>Gestão Tributária · PRD</div>
          </div>

          {/* Título */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: TX, marginBottom: 6 }}>Acesso restrito</div>
            <div style={{ fontSize: 13, color: TXL, lineHeight: 1.5 }}>Insira a senha para acessar a documentação do produto.</div>
          </div>

          {/* Campo senha */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: TXM, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Senha</label>
            <div style={{ position: "relative" }}>
              <input
                type={show ? "text" : "password"}
                value={senha}
                onChange={e => { setSenha(e.target.value); setErro(false); }}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                placeholder="••••••••••••••••"
                style={{
                  width: "100%", padding: "11px 44px 11px 14px",
                  border: "1.5px solid " + (erro ? DG : BD),
                  borderRadius: 8, fontSize: 14, color: TX,
                  background: erro ? "#fff5f5" : WH, outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
              />
              <button
                onClick={() => setShow(!show)}
                style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", color: TXL, padding: 2,
                  fontSize: 13,
                }}
              >{show ? "🙈" : "👁"}</button>
            </div>
            {erro && (
              <div style={{ marginTop: 6, fontSize: 12, color: DG, fontWeight: 500 }}>
                Senha incorreta. Tente novamente.
              </div>
            )}
          </div>

          {/* Botão */}
          <button
            onClick={handleSubmit}
            style={{
              width: "100%", padding: "12px",
              background: BR, color: "#fff",
              border: "none", borderRadius: 8,
              fontSize: 14, fontWeight: 600, cursor: "pointer",
              letterSpacing: "0.2px",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.target.style.background = BRD}
            onMouseLeave={e => e.target.style.background = BR}
          >
            Acessar documentação →
          </button>
        </div>

        {/* Rodapé */}
        <div style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: TXL }}>
          Mutuus × Guidance · Uso interno
        </div>
      </div>
    </div>
  );
}

// ── App ──
export default function App() {
  const [auth, setAuth] = useState(false);
  const [page, setPage] = useState("overview");

  if (!auth) return <LoginPage onLogin={() => setAuth(true)} />;

  const PAGES = {
    overview: <PageOverview />,
    arquitetura: <PageArquitetura />,
    calculo: <PageCalculo />,
    equipe: <PageEquipe />,
    roadmap: <PageRoadmap />,
    escopo: <PageEscopo />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: BG, fontFamily: "'Inter', sans-serif" }}>
      <style>{G}</style>
      <Sidebar page={page} setPage={setPage} />
      <div style={{ flex: 1, overflowY: "auto" }}>
        {PAGES[page] || <PageOverview />}
      </div>
    </div>
  );
}
