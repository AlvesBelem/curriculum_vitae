# Currículo do Marcelo — Next.js (Tailwind + PDF via impressão)
<img width="2560" height="2538" alt="image" src="https://github.com/user-attachments/assets/f78611d6-a252-452c-8d4b-4fd326b625c5" />


Projeto simples e **estático**. Exibe o currículo e permite **baixar como PDF** (imprimir -> Salvar como PDF).

## Como rodar
```bash
npm install
npm run dev
# abra http://localhost:3000
```

Clique no botão **“Baixar PDF”** (ou `Ctrl/Cmd + P`) e escolha **Salvar como PDF**.
O layout de impressão está otimizado (A4, margens, botão oculto).

## Foto
Troque `public/foto.jpg` pela sua foto (ex: 600x600px).

## Editar conteúdo
Edite `app/page.jsx`. Estilos em `app/globals.css`.
