
import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   TechnoStore — Simulateur de gestion de magasin
   Bac Pro MCV Option A — Terminale
   Compétences 4.1A · 4.2A · 4.3A
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── DATA ────────────────────────────────────────────────────────────────────

const STORE_NAME = "TechnoStore";

const PRODUCTS = [
  { id: 1, name: "Sony WH-1000XM5", cat: "audio", stock: 12, seuil: 5, prixAchat: 220, prixVente: 349.99, emplacement: "A3", fournisseur: "Sony France" },
  { id: 2, name: "MacBook Air M3", cat: "computing", stock: 3, seuil: 4, prixAchat: 950, prixVente: 1299, emplacement: "B1", fournisseur: "Apple Distribution" },
  { id: 3, name: 'Samsung OLED 55"', cat: "tv", stock: 2, seuil: 2, prixAchat: 680, prixVente: 999.99, emplacement: "C2", fournisseur: "Samsung Electronics" },
  { id: 4, name: "PS5 Slim", cat: "gaming", stock: 8, seuil: 6, prixAchat: 380, prixVente: 549.99, emplacement: "D1", fournisseur: "PlayStation FR" },
  { id: 5, name: "Canon EOS R6 II", cat: "photo", stock: 1, seuil: 2, prixAchat: 1800, prixVente: 2499, emplacement: "E1", fournisseur: "Canon France" },
  { id: 6, name: "Le Comte de Monte-Cristo", cat: "books", stock: 25, seuil: 10, prixAchat: 6.5, prixVente: 12.9, emplacement: "F4", fournisseur: "Hachette Livre" },
  { id: 7, name: "JBL Charge 5", cat: "audio", stock: 0, seuil: 4, prixAchat: 95, prixVente: 169.99, emplacement: "A5", fournisseur: "Harman France" },
  { id: 8, name: "Nintendo Switch OLED", cat: "gaming", stock: 5, seuil: 5, prixAchat: 270, prixVente: 349.99, emplacement: "D2", fournisseur: "Nintendo France" },
  { id: 9, name: "Logitech MX Master 3S", cat: "computing", stock: 15, seuil: 8, prixAchat: 55, prixVente: 99.99, emplacement: "B3", fournisseur: "Logitech France" },
  { id: 10, name: "Kindle Paperwhite", cat: "books", stock: 7, seuil: 5, prixAchat: 100, prixVente: 159.99, emplacement: "F1", fournisseur: "Amazon EU" },
];

const MISSIONS_DATA = {
  reception: { id: "reception", title: "Réception & contrôle", bloc: "4.1A", icon: "📦", desc: "Réceptionner une livraison, contrôler les quantités et la qualité.", competences: ["Réceptionner, contrôler et stocker les marchandises"], xp: 150 },
  commande: { id: "commande", title: "Passer une commande", bloc: "4.1A", icon: "📝", desc: "Analyser les stocks et établir une commande fournisseur adaptée.", competences: ["Établir les commandes des produits", "Veiller à la gestion des stocks"], xp: 200 },
  prix: { id: "prix", title: "Calcul des prix", bloc: "4.1A", icon: "💰", desc: "Calculer le PV à partir du coût d'achat, taux de marge et coefficient.", competences: ["Établir le prix en fonction de variables commerciales"], xp: 180 },
  inventaire: { id: "inventaire", title: "Inventaire & démarque", bloc: "4.1A", icon: "📋", desc: "Réaliser un inventaire partiel, identifier les écarts et la démarque.", competences: ["Opérations d'inventaire", "Lutter contre la démarque"], xp: 220 },
  omnicanal: { id: "omnicanal", title: "Click & Collect", bloc: "4.1A", icon: "🖱️", desc: "Préparer les commandes web et gérer les cas problématiques.", competences: ["Préparer les commandes omnicanal", "Gérer les retours clients"], xp: 170 },
  retours: { id: "retours", title: "Retours fournisseurs", bloc: "4.1A", icon: "↩️", desc: "Identifier les produits défectueux et préparer les retours.", competences: ["Préparer les retours fournisseurs", "Valorisation des déchets"], xp: 160 },
  implantation: { id: "implantation", title: "Implantation rayon", bloc: "4.2A", icon: "🗺️", desc: "Organiser l'implantation selon les règles de merchandising.", competences: ["Implanter les produits", "Agencement surface de vente"], xp: 200 },
  vitrine: { id: "vitrine", title: "Aménager la vitrine", bloc: "4.2A", icon: "🪟", desc: "Concevoir la vitrine selon la saison, l'offre et la cible.", competences: ["Aménager la vitrine", "Mettre en scène l'offre"], xp: 190 },
  balisage: { id: "balisage", title: "Balisage & étiquetage", bloc: "4.2A", icon: "🏷️", desc: "Vérifier les étiquettes, corriger les erreurs et sécuriser.", competences: ["Vérifier l'étiquetage", "Signalétique", "Étiqueter et sécuriser"], xp: 140 },
  hygiene: { id: "hygiene", title: "Hygiène & sécurité", bloc: "4.2A", icon: "🧹", desc: "Vérifier la conformité avec les normes de sécurité et d'hygiène.", competences: ["Règles d'hygiène et de sécurité", "Bonne tenue du rayon"], xp: 130 },
  promo: { id: "promo", title: "Action commerciale", bloc: "4.3A", icon: "📢", desc: "Planifier une opération promotionnelle et évaluer les résultats.", competences: ["Actions commerciales", "Planification des promotions"], xp: 250 },
  reseaux: { id: "reseaux", title: "Réseaux sociaux", bloc: "4.3A", icon: "📱", desc: "Rédiger un post pour promouvoir une offre sur les réseaux.", competences: ["Réseaux sociaux", "Valoriser l'offre en ligne"], xp: 180 },
  performance: { id: "performance", title: "Analyse des performances", bloc: "4.3A", icon: "📊", desc: "Analyser les résultats de ventes et proposer des actions correctrices.", competences: ["Comparer résultats/objectifs", "Évaluer les performances"], xp: 230 },
};

const BLOCS = [
  { id: "4.1A", label: "Opérations préalables à la vente", color: "#0a65c2", missions: ["reception","commande","prix","inventaire","omnicanal","retours"] },
  { id: "4.2A", label: "Rendre l'UC attractive et fonctionnelle", color: "#1a8a4e", missions: ["implantation","vitrine","balisage","hygiene"] },
  { id: "4.3A", label: "Développer la clientèle", color: "#b8860b", missions: ["promo","reseaux","performance"] },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --blue: #0a65c2;
  --blue-light: #e8f1fa;
  --blue-dark: #084a91;
  --cream: #ffffd9;
  --black: #000000;
  --white: #ffffff;
  --gray-50: #f8f9fa;
  --gray-100: #f1f3f5;
  --gray-200: #e9ecef;
  --gray-300: #dee2e6;
  --gray-400: #ced4da;
  --gray-500: #adb5bd;
  --gray-600: #868e96;
  --gray-700: #495057;
  --gray-800: #343a40;
  --green: #1a8a4e;
  --green-light: #e6f4ed;
  --orange: #b8860b;
  --orange-light: #fdf3e0;
  --red: #dc3545;
  --red-light: #fde8ea;
  --radius: 10px;
  --radius-sm: 6px;
  --radius-lg: 14px;
  --shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.1);
}

body, html {
  font-family: 'DM Sans', -apple-system, sans-serif;
  background: var(--gray-50);
  color: var(--gray-800);
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
}

.app-root {
  min-height: 100vh;
  background: var(--gray-50);
}

/* ── HEADER ── */
.app-header {
  background: var(--white);
  border-bottom: 1px solid var(--gray-200);
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  font-size: 28px;
}

.header-brand h1 {
  font-size: 20px;
  font-weight: 700;
  color: var(--black);
  letter-spacing: -0.02em;
}

.brand-sub {
  font-size: 12px;
  color: var(--gray-600);
  font-weight: 400;
}

.header-center {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-center h2 {
  font-size: 17px;
  font-weight: 600;
}

.header-icon {
  font-size: 22px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.student-info {
  text-align: right;
}

.student-name {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--black);
}

.student-role {
  font-size: 11px;
  color: var(--gray-600);
}

.btn-back {
  background: none;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-sm);
  padding: 6px 14px;
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  color: var(--gray-700);
  transition: all 0.15s;
}

.btn-back:hover {
  background: var(--gray-100);
  border-color: var(--gray-400);
}

.bloc-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  color: white;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

/* ── NAME MODAL ── */
.name-modal-overlay {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, var(--blue) 0%, var(--blue-dark) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.name-modal {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 48px 40px;
  max-width: 440px;
  width: 100%;
  text-align: center;
  box-shadow: var(--shadow-lg);
}

.modal-icon {
  font-size: 56px;
  margin-bottom: 12px;
}

.name-modal h1 {
  font-size: 28px;
  font-weight: 700;
  color: var(--black);
  margin-bottom: 4px;
  letter-spacing: -0.03em;
}

.modal-subtitle {
  color: var(--gray-600);
  font-size: 14px;
  margin-bottom: 32px;
}

.modal-form {
  text-align: left;
}

.modal-form label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 6px;
}

/* ── DASHBOARD ── */
.dashboard-main {
  max-width: 1080px;
  margin: 0 auto;
  padding: 24px 20px 60px;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
  margin-bottom: 32px;
}

.stat-card {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius);
  padding: 18px 20px;
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: var(--blue);
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 12px;
  color: var(--gray-600);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: 2px;
}

.progress-bar {
  height: 4px;
  background: var(--gray-200);
  border-radius: 4px;
  margin-top: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--blue);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-fill.xp {
  background: var(--orange);
}

.bloc-section {
  margin-bottom: 28px;
}

.bloc-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
}

.bloc-line {
  width: 4px;
  height: 24px;
  border-radius: 4px;
}

.bloc-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-800);
}

.bloc-id {
  font-weight: 700;
  margin-right: 6px;
}

.missions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
}

.mission-card {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius);
  padding: 18px 20px 16px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  font-family: inherit;
}

.mission-card:hover {
  border-color: var(--blue);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.mission-card.mission-done {
  border-color: var(--green);
  background: var(--green-light);
}

.mission-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.mission-icon {
  font-size: 26px;
}

.stars-display {
  color: var(--orange);
  font-size: 14px;
  letter-spacing: 1px;
}

.mission-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--black);
  margin-bottom: 4px;
}

.mission-desc {
  font-size: 12.5px;
  color: var(--gray-600);
  line-height: 1.45;
  flex: 1;
  margin-bottom: 12px;
}

.mission-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid var(--gray-200);
}

.xp-badge {
  font-size: 12px;
  font-weight: 600;
  color: var(--blue);
  background: var(--blue-light);
  padding: 2px 8px;
  border-radius: 12px;
}

.status-done {
  font-size: 12px;
  color: var(--green);
  font-weight: 600;
}

.status-todo {
  font-size: 12px;
  color: var(--gray-500);
  font-weight: 500;
}

/* ── MISSION VIEW ── */
.mission-main {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 20px 60px;
}

.competences-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
  padding: 10px 14px;
  background: var(--blue-light);
  border-radius: var(--radius-sm);
}

.competences-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--blue);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.competence-tag {
  font-size: 11px;
  color: var(--blue-dark);
  background: rgba(10,101,194,0.1);
  padding: 2px 8px;
  border-radius: 4px;
}

.mission-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.scenario-box {
  background: var(--cream);
  border: 1px solid #e8e8a0;
  border-radius: var(--radius);
  padding: 18px 20px;
}

.scenario-box h3 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--black);
}

.scenario-box p {
  font-size: 13.5px;
  color: var(--gray-700);
  line-height: 1.55;
}

.scenario-box em {
  color: var(--gray-600);
  font-size: 12.5px;
}

.formulas-box {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-left: 3px solid var(--blue);
  border-radius: var(--radius-sm);
  padding: 14px 18px;
}

.formulas-box h4 {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
}

.formulas-box p {
  font-size: 12.5px;
  color: var(--gray-700);
  margin-bottom: 3px;
}

/* ── TABLES ── */
.data-table-wrap {
  overflow-x: auto;
  border-radius: var(--radius);
  border: 1px solid var(--gray-200);
  background: var(--white);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.data-table th {
  background: var(--gray-100);
  padding: 10px 14px;
  text-align: left;
  font-weight: 600;
  font-size: 11.5px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--gray-600);
  white-space: nowrap;
}

.data-table td {
  padding: 10px 14px;
  border-top: 1px solid var(--gray-100);
  vertical-align: middle;
}

.data-table tr:hover td {
  background: var(--gray-50);
}

.font-medium { font-weight: 500; }
.text-center { text-align: center; }
.text-right { text-align: right; }

.text-green { color: var(--green); font-weight: 600; }
.text-red { color: var(--red); font-weight: 600; }

/* ── STATUS TAGS ── */
.status-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11.5px;
  font-weight: 500;
}

.status-ok { background: var(--green-light); color: var(--green); }
.status-warn { background: var(--orange-light); color: var(--orange); }
.status-error { background: var(--red-light); color: var(--red); }

/* ── INPUTS ── */
.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.radio-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border: 1px solid var(--gray-300);
  border-radius: 20px;
  font-size: 12.5px;
  cursor: pointer;
  transition: all 0.15s;
  background: var(--white);
  color: var(--gray-700);
  font-family: inherit;
}

.radio-pill:hover { border-color: var(--blue); }

.radio-pill.selected {
  background: var(--blue);
  color: var(--white);
  border-color: var(--blue);
}

.radio-pill input { display: none; }

.question-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.question-block label {
  font-size: 13px;
  font-weight: 500;
  color: var(--gray-800);
}

.input-small {
  width: 72px;
  padding: 6px 10px;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-family: inherit;
  text-align: center;
  transition: border-color 0.15s;
}

.input-small:focus {
  outline: none;
  border-color: var(--blue);
  box-shadow: 0 0 0 2px rgba(10,101,194,0.1);
}

.input-prix {
  width: 140px;
  padding: 8px 12px;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.15s;
}

.input-prix:focus {
  outline: none;
  border-color: var(--blue);
  box-shadow: 0 0 0 2px rgba(10,101,194,0.1);
}

.input-full {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-sm);
  font-size: 13.5px;
  font-family: inherit;
  transition: border-color 0.15s;
}

.input-full:focus {
  outline: none;
  border-color: var(--blue);
  box-shadow: 0 0 0 2px rgba(10,101,194,0.1);
}

.input-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.unit {
  font-size: 14px;
  color: var(--gray-600);
  font-weight: 500;
}

.text-area {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-family: inherit;
  resize: vertical;
  line-height: 1.5;
  transition: border-color 0.15s;
}

.text-area:focus {
  outline: none;
  border-color: var(--blue);
  box-shadow: 0 0 0 2px rgba(10,101,194,0.1);
}

.select-zone {
  padding: 8px 12px;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-family: inherit;
  background: var(--white);
  cursor: pointer;
  max-width: 280px;
}

.select-zone:focus {
  outline: none;
  border-color: var(--blue);
}

.helper-text {
  font-size: 11px;
  color: var(--gray-500);
}

/* ── CHIPS ── */
.chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  padding: 7px 16px;
  border: 1px solid var(--gray-300);
  border-radius: 20px;
  font-size: 12.5px;
  font-family: inherit;
  cursor: pointer;
  background: var(--white);
  color: var(--gray-700);
  transition: all 0.15s;
}

.chip:hover:not(:disabled) { border-color: var(--blue); }

.chip-selected {
  background: var(--blue) !important;
  color: var(--white) !important;
  border-color: var(--blue) !important;
}

.chip:disabled { opacity: 0.7; cursor: default; }

/* ── CARDS ── */
.exercice-card {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius);
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.exercice-card h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--black);
}

.exercice-card p {
  font-size: 13px;
  color: var(--gray-700);
}

.commande-card {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius);
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.commande-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.commande-id {
  font-weight: 700;
  font-size: 14px;
  color: var(--blue);
  font-family: 'DM Sans', monospace;
}

.commande-retrait {
  font-size: 12px;
  color: var(--gray-600);
}

.commande-card p {
  font-size: 13px;
  color: var(--gray-700);
}

.alert-text {
  color: var(--red) !important;
  font-weight: 500 !important;
  font-size: 12.5px !important;
  background: var(--red-light);
  padding: 6px 10px;
  border-radius: var(--radius-sm);
}

.situation-desc {
  font-size: 13.5px !important;
  color: var(--gray-800) !important;
  font-weight: 500 !important;
  line-height: 1.5;
}

.info-cards-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.info-card {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius);
  padding: 14px 18px;
  flex: 1;
  min-width: 140px;
  text-align: center;
}

.info-card.warn {
  border-color: var(--red);
  background: var(--red-light);
}

.info-label {
  display: block;
  font-size: 11px;
  color: var(--gray-600);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 4px;
}

.info-value {
  font-size: 22px;
  font-weight: 700;
  color: var(--blue);
}

.info-card.warn .info-value {
  color: var(--red);
}

/* ── FEEDBACK ── */
.inline-feedback {
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-size: 12.5px;
  margin-top: 4px;
}

.fb-correct { background: var(--green-light); color: var(--green); }
.fb-wrong { background: var(--red-light); color: var(--red); }

.result-box {
  border-radius: var(--radius);
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

.result-box h4 {
  font-size: 16px;
  font-weight: 600;
}

.result-box p {
  font-size: 13.5px;
  color: var(--gray-700);
}

.result-detail {
  font-size: 12.5px !important;
  color: var(--gray-600) !important;
  line-height: 1.5;
}

.result-success { background: var(--green-light); border: 1px solid #b5dfca; }
.result-partial { background: var(--orange-light); border: 1px solid #e8d5a0; }
.result-fail { background: var(--red-light); border: 1px solid #f5c6cb; }

/* ── BUTTONS ── */
.btn-primary {
  background: var(--blue);
  color: var(--white);
  border: none;
  border-radius: var(--radius-sm);
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s;
  margin-top: 4px;
}

.btn-primary:hover { background: var(--blue-dark); }
.btn-primary:disabled { opacity: 0.5; cursor: default; }

.btn-secondary {
  background: var(--white);
  color: var(--blue);
  border: 1px solid var(--blue);
  border-radius: var(--radius-sm);
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s;
  margin-top: 4px;
}

.btn-secondary:hover { background: var(--blue-light); }

/* ── FOOTER ── */
.app-footer {
  text-align: center;
  padding: 24px;
  margin-top: 20px;
  color: var(--gray-500);
  font-size: 12px;
  border-top: 1px solid var(--gray-200);
}

/* ── RESPONSIVE ── */
@media (max-width: 640px) {
  .app-header { padding: 10px 14px; }
  .header-brand h1 { font-size: 16px; }
  .dashboard-main { padding: 14px 12px 40px; }
  .missions-grid { grid-template-columns: 1fr; }
  .stats-row { grid-template-columns: 1fr 1fr; }
  .data-table { font-size: 12px; }
  .data-table th, .data-table td { padding: 8px 10px; }
  .name-modal { padding: 32px 24px; }
  .info-cards-row { flex-direction: column; }
}
`;

// ─── MISSION COMPONENTS ──────────────────────────────────────────────────────

function MissionReception({ onComplete }) {
  const livraison = [
    { ref: "WH-1000XM5", cmdQty: 10, recuQty: 10, etat: "ok" },
    { ref: "JBL Charge 5", cmdQty: 8, recuQty: 6, etat: "manquant" },
    { ref: "MacBook Air M3", cmdQty: 5, recuQty: 5, etat: "ok" },
    { ref: "Kindle Paperwhite", cmdQty: 12, recuQty: 12, etat: "1 carton abîmé" },
    { ref: "PS5 Slim", cmdQty: 4, recuQty: 3, etat: "1 colis manquant" },
  ];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let pts = 0;
    if (answers.conforme0 === "oui") pts++;
    if (answers.conforme1 === "non") pts++;
    if (answers.conforme2 === "oui") pts++;
    if (answers.conforme3 === "non") pts++;
    if (answers.conforme4 === "non") pts++;
    if (answers.action1 === "relance") pts++;
    if (answers.action3 === "reserve") pts++;
    if (answers.action4 === "relance") pts++;
    if (answers.anomalies === "3") pts++;
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box">
        <h3>📋 Scénario</h3>
        <p>Le camion du transporteur vient d'arriver. Vous avez le bon de commande sous les yeux. Contrôlez chaque ligne de la livraison : quantités et état des colis.</p>
      </div>
      <div className="data-table-wrap">
        <table className="data-table">
          <thead><tr><th>Référence</th><th>Qté cmdée</th><th>Qté reçue</th><th>État</th><th>Conforme ?</th></tr></thead>
          <tbody>
            {livraison.map((l, i) => (
              <tr key={i}>
                <td className="font-medium">{l.ref}</td>
                <td className="text-center">{l.cmdQty}</td>
                <td className="text-center">{l.recuQty}</td>
                <td><span className={`status-tag ${l.etat === "ok" ? "status-ok" : "status-warn"}`}>{l.etat}</span></td>
                <td>
                  <div className="radio-group">
                    {["oui","non"].map(v => (
                      <label key={v} className={`radio-pill ${answers[`conforme${i}`]===v?"selected":""}`}>
                        <input type="radio" name={`conforme${i}`} value={v} onChange={e=>setAnswers(a=>({...a,[`conforme${i}`]:e.target.value}))} disabled={submitted}/> {v==="oui"?"Oui":"Non"}
                      </label>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="question-block">
        <label>Combien d'anomalies au total ?</label>
        <div className="radio-group">
          {["1","2","3","4","5"].map(n=>(<label key={n} className={`radio-pill ${answers.anomalies===n?"selected":""}`}><input type="radio" name="anomalies" value={n} onChange={e=>setAnswers(a=>({...a,anomalies:e.target.value}))} disabled={submitted}/> {n}</label>))}
        </div>
      </div>
      <div className="question-block">
        <label>JBL Charge 5 (2 manquants) — Action ?</label>
        <div className="radio-group">
          {[["relance","Relancer le fournisseur"],["rien","Ne rien faire"],["retour","Retourner tout"]].map(([v,l])=>(<label key={v} className={`radio-pill ${answers.action1===v?"selected":""}`}><input type="radio" name="action1" value={v} onChange={e=>setAnswers(a=>({...a,action1:e.target.value}))} disabled={submitted}/> {l}</label>))}
        </div>
      </div>
      <div className="question-block">
        <label>Kindle Paperwhite (1 carton abîmé) — Action ?</label>
        <div className="radio-group">
          {[["reserve","Émettre une réserve sur le BL"],["rien","Accepter sans réserve"],["retour","Tout refuser"]].map(([v,l])=>(<label key={v} className={`radio-pill ${answers.action3===v?"selected":""}`}><input type="radio" name="action3" value={v} onChange={e=>setAnswers(a=>({...a,action3:e.target.value}))} disabled={submitted}/> {l}</label>))}
        </div>
      </div>
      <div className="question-block">
        <label>PS5 Slim (1 colis manquant) — Action ?</label>
        <div className="radio-group">
          {[["relance","Relancer le fournisseur"],["rien","Ne rien faire"],["annuler","Annuler la commande"]].map(([v,l])=>(<label key={v} className={`radio-pill ${answers.action4===v?"selected":""}`}><input type="radio" name="action4" value={v} onChange={e=>setAnswers(a=>({...a,action4:e.target.value}))} disabled={submitted}/> {l}</label>))}
        </div>
      </div>
      {!submitted ? <button className="btn-primary" onClick={handleSubmit}>Valider mes réponses</button> : (
        <div className={`result-box ${score>=7?"result-success":score>=5?"result-partial":"result-fail"}`}>
          <h4>{score>=7?"✅ Excellent !":score>=5?"⚠️ Pas mal !":"❌ À retravailler"}</h4>
          <p>Score : {score}/9</p>
          <p className="result-detail">3 anomalies : JBL (manquant ×2), Kindle (carton abîmé), PS5 (colis manquant). Relancer le fournisseur pour les manquants, émettre une réserve pour les dommages.</p>
          {score>=5?<button className="btn-primary" onClick={()=>onComplete(score>=7?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setAnswers({})}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

function MissionCommande({ onComplete }) {
  const produitsACommander = PRODUCTS.filter(p => p.stock <= p.seuil);
  const [commande, setCommande] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [justification, setJustification] = useState("");
  const total = produitsACommander.reduce((s, p) => s + (commande[p.id]||0)*p.prixAchat, 0);

  const handleSubmit = () => {
    let pts = 0;
    produitsACommander.forEach(p => { const q=commande[p.id]||0; if(q>0&&q>=(p.seuil-p.stock)) pts+=2; else if(q>0) pts+=1; });
    if (justification.length > 20) pts += 2;
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box">
        <h3>📋 Scénario</h3>
        <p>Votre responsable vous demande de vérifier les niveaux de stock et de préparer un bon de commande pour les produits en rupture ou sous le seuil de réapprovisionnement.</p>
      </div>
      <div className="info-cards-row">
        <div className="info-card"><span className="info-label">Produits sous seuil</span><span className="info-value">{produitsACommander.length}</span></div>
        <div className="info-card"><span className="info-label">Montant total HT</span><span className="info-value">{total.toFixed(2)} €</span></div>
      </div>
      <div className="data-table-wrap">
        <table className="data-table">
          <thead><tr><th>Produit</th><th>Stock</th><th>Seuil</th><th>Écart</th><th>Fournisseur</th><th>Qté à commander</th></tr></thead>
          <tbody>
            {produitsACommander.map(p=>(
              <tr key={p.id}>
                <td className="font-medium">{p.name}</td>
                <td className="text-center"><span className={`status-tag ${p.stock===0?"status-error":"status-warn"}`}>{p.stock}</span></td>
                <td className="text-center">{p.seuil}</td>
                <td className="text-center">{p.stock-p.seuil}</td>
                <td>{p.fournisseur}</td>
                <td><input type="number" min="0" className="input-small" value={commande[p.id]||""} onChange={e=>setCommande(c=>({...c,[p.id]:Math.max(0,parseInt(e.target.value)||0)}))} disabled={submitted} placeholder="Qté"/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="question-block">
        <label>Justifiez vos quantités (contraintes budget, délai, minimum…) :</label>
        <textarea className="text-area" value={justification} onChange={e=>setJustification(e.target.value)} disabled={submitted} placeholder="Ex : JBL à 0, je commande davantage car forte demande…" rows={4}/>
      </div>
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Valider la commande</button>:(
        <div className={`result-box ${score>=8?"result-success":score>=5?"result-partial":"result-fail"}`}>
          <h4>{score>=8?"✅ Commande validée !":score>=5?"⚠️ Commande partielle":"❌ Commande insuffisante"}</h4>
          <p>Score : {score}/{produitsACommander.length*2+2}</p>
          <p className="result-detail">Couvrez au minimum l'écart stock/seuil. Vérifiez les minimums de commande fournisseur.</p>
          {score>=5?<button className="btn-primary" onClick={()=>onComplete(score>=8?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setCommande({});setJustification("")}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

function MissionPrix({ onComplete }) {
  const exercices = [
    { produit: "Casque Bluetooth", prixAchat: 45, question: "PV HT avec un taux de marque de 40%", correctPV: 75, formula: "PV = PA/(1-TM) = 45/0.6 = 75 €" },
    { produit: "Enceinte portable", prixAchat: 80, question: "PV TTC avec un coef multiplicateur de 2.2", correctPV: 176, formula: "PV = PA×coef = 80×2.2 = 176 €" },
    { produit: "Clé USB 128Go", prixAchat: 12, question: "PV HT avec un taux de marge de 60%", correctPV: 19.2, formula: "PV = PA×(1+TM) = 12×1.6 = 19,20 €" },
  ];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let pts = 0;
    exercices.forEach((ex, i) => { const v=parseFloat(answers[i]); if(Math.abs(v-ex.correctPV)<0.5) pts+=3; else if(Math.abs(v-ex.correctPV)<5) pts+=1; });
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box"><h3>📋 Scénario</h3><p>3 nouveaux produits à étiqueter. Calculez les prix de vente à partir des données commerciales.</p></div>
      <div className="formulas-box">
        <h4>📐 Rappels</h4>
        <p><strong>Taux de marque</strong> : PV HT = PA HT / (1 - taux de marque)</p>
        <p><strong>Coefficient</strong> : PV TTC = PA HT × coefficient</p>
        <p><strong>Taux de marge</strong> : PV HT = PA HT × (1 + taux de marge)</p>
      </div>
      {exercices.map((ex,i)=>(
        <div key={i} className="exercice-card">
          <h4>{ex.produit}</h4>
          <p>PA HT : <strong>{ex.prixAchat} €</strong> — {ex.question}</p>
          <div className="input-row">
            <input type="number" step="0.01" className="input-prix" value={answers[i]||""} onChange={e=>setAnswers(a=>({...a,[i]:e.target.value}))} disabled={submitted} placeholder="Réponse"/>
            <span className="unit">€</span>
          </div>
          {submitted&&<div className={`inline-feedback ${Math.abs(parseFloat(answers[i])-ex.correctPV)<0.5?"fb-correct":"fb-wrong"}`}>{Math.abs(parseFloat(answers[i])-ex.correctPV)<0.5?"✅":"❌"} Attendu : {ex.correctPV} € — {ex.formula}</div>}
        </div>
      ))}
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Vérifier</button>:(
        <div className={`result-box ${score>=7?"result-success":score>=4?"result-partial":"result-fail"}`}>
          <h4>{score>=7?"✅ Parfait !":score>=4?"⚠️ Quelques erreurs":"❌ Revoyez les formules"}</h4>
          <p>Score : {score}/9</p>
          {score>=4?<button className="btn-primary" onClick={()=>onComplete(score>=7?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setAnswers({})}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

function MissionInventaire({ onComplete }) {
  const rayonData = [
    { ref: "Sony WH-1000XM5", stockTheo: 12, stockPhys: 11, pa: 220 },
    { ref: "Logitech MX Master 3S", stockTheo: 15, stockPhys: 15, pa: 55 },
    { ref: "MacBook Air M3", stockTheo: 3, stockPhys: 2, pa: 950 },
    { ref: "PS5 Slim", stockTheo: 8, stockPhys: 8, pa: 380 },
    { ref: "Nintendo Switch OLED", stockTheo: 5, stockPhys: 3, pa: 270 },
    { ref: "Le Comte de Monte-Cristo", stockTheo: 25, stockPhys: 24, pa: 6.5 },
  ];
  const [physiques, setPhysiques] = useState({});
  const [ecarts, setEcarts] = useState({});
  const [demarqueVal, setDemarqueVal] = useState("");
  const [causes, setCauses] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let pts = 0;
    rayonData.forEach((r,i)=>{ if(parseInt(physiques[i])===r.stockPhys) pts++; if(parseInt(ecarts[i])===(r.stockPhys-r.stockTheo)) pts++; });
    if(Math.abs(parseFloat(demarqueVal)-1716.5)<10) pts+=3; else if(Math.abs(parseFloat(demarqueVal)-1716.5)<100) pts+=1;
    if(causes.length>15) pts+=1;
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box"><h3>📋 Scénario</h3><p>Inventaire tournant : comptez les produits, calculez les écarts et la valeur de la démarque inconnue.</p><p><em>Les quantités physiques sont indiquées en placeholder. Saisissez-les puis calculez les écarts.</em></p></div>
      <div className="data-table-wrap">
        <table className="data-table">
          <thead><tr><th>Référence</th><th>Stock théo.</th><th>Stock physique</th><th>Écart</th></tr></thead>
          <tbody>
            {rayonData.map((r,i)=>(
              <tr key={i}><td className="font-medium">{r.ref}</td><td className="text-center">{r.stockTheo}</td>
              <td><input type="number" className="input-small" value={physiques[i]??""} onChange={e=>setPhysiques(p=>({...p,[i]:e.target.value}))} disabled={submitted} placeholder={`${r.stockPhys}`}/></td>
              <td><input type="number" className="input-small" value={ecarts[i]??""} onChange={e=>setEcarts(ec=>({...ec,[i]:e.target.value}))} disabled={submitted} placeholder="?"/></td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="question-block">
        <label>Valeur totale de la démarque inconnue (€) :</label>
        <div className="input-row"><input type="number" step="0.01" className="input-prix" value={demarqueVal} onChange={e=>setDemarqueVal(e.target.value)} disabled={submitted} placeholder="Montant"/><span className="unit">€</span></div>
      </div>
      <div className="question-block">
        <label>Causes possibles de cette démarque :</label>
        <textarea className="text-area" value={causes} onChange={e=>setCauses(e.target.value)} disabled={submitted} placeholder="Vol, casse, erreur de saisie…" rows={3}/>
      </div>
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Valider l'inventaire</button>:(
        <div className={`result-box ${score>=12?"result-success":score>=8?"result-partial":"result-fail"}`}>
          <h4>{score>=12?"✅ Inventaire maîtrisé !":score>=8?"⚠️ Quelques imprécisions":"❌ À retravailler"}</h4>
          <p>Score : {score}/16</p>
          <p className="result-detail">Démarque : (1×220)+(1×950)+(2×270)+(1×6.5) = 1 716,50 €. Causes : vol, casse, erreurs saisie.</p>
          {score>=8?<button className="btn-primary" onClick={()=>onComplete(score>=12?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setPhysiques({});setEcarts({});setDemarqueVal("");setCauses("")}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

function MissionOmnicanal({ onComplete }) {
  const commandes = [
    { id: "WEB-4021", client: "Martin Lefèvre", produit: "PS5 Slim", retrait: "Aujourd'hui 14h" },
    { id: "WEB-4022", client: "Clara Dumont", produit: "Sony WH-1000XM5", retrait: "Aujourd'hui 16h" },
    { id: "WEB-4023", client: "Lucas Bernard", produit: "JBL Charge 5", retrait: "Demain 10h", probleme: true },
  ];
  const [actions, setActions] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let pts=0;
    if(actions["WEB-4021"]==="preparer") pts+=3;
    if(actions["WEB-4022"]==="preparer") pts+=3;
    if(actions["WEB-4023"]==="contacter") pts+=3;
    if(actions.ordre==="4021first") pts+=2;
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box"><h3>📋 Scénario</h3><p>3 commandes Click & Collect ce matin. Vérifiez la disponibilité, choisissez l'action et l'ordre de préparation.</p></div>
      {commandes.map(c=>(
        <div key={c.id} className="commande-card">
          <div className="commande-header"><span className="commande-id">{c.id}</span><span className="commande-retrait">🕐 {c.retrait}</span></div>
          <p><strong>Client :</strong> {c.client} — <strong>Produit :</strong> {c.produit}</p>
          {c.probleme&&<p className="alert-text">⚠️ Ce produit est en rupture de stock !</p>}
          <div className="question-block"><label>Action :</label>
            <div className="radio-group">
              {[["preparer","Préparer"],["contacter","Contacter le client"],["annuler","Annuler"],["reporter","Reporter"]].map(([v,l])=>(
                <label key={v} className={`radio-pill ${actions[c.id]===v?"selected":""}`}><input type="radio" name={c.id} value={v} onChange={e=>setActions(a=>({...a,[c.id]:e.target.value}))} disabled={submitted}/> {l}</label>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="question-block"><label>Ordre de préparation ?</label>
        <div className="radio-group">
          {[["4021first","WEB-4021 d'abord (14h) puis 4022 (16h)"],["4022first","WEB-4022 d'abord"],["nimporte","Peu importe"]].map(([v,l])=>(
            <label key={v} className={`radio-pill ${actions.ordre===v?"selected":""}`}><input type="radio" name="ordre" value={v} onChange={e=>setActions(a=>({...a,ordre:e.target.value}))} disabled={submitted}/> {l}</label>
          ))}
        </div>
      </div>
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Valider</button>:(
        <div className={`result-box ${score>=9?"result-success":score>=6?"result-partial":"result-fail"}`}>
          <h4>{score>=9?"✅ Parfait !":score>=6?"⚠️ Presque !":"❌ À retravailler"}</h4>
          <p>Score : {score}/11</p>
          <p className="result-detail">JBL en rupture → contacter le client. Toujours traiter par urgence de retrait.</p>
          {score>=6?<button className="btn-primary" onClick={()=>onComplete(score>=9?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setActions({})}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

function MissionRetours({ onComplete }) {
  const cas = [
    { produit: "Casque Sony WH-1000XM5", probleme: "Arceau cassé à la livraison, jamais vendu", delai: "Il y a 3 jours" },
    { produit: "Lot 20 romans Hachette", probleme: "5 exemplaires tachés (défaut d'impression)", delai: "Il y a 2 semaines" },
    { produit: 'Écran Samsung 27"', probleme: "Mauvaise référence livrée", delai: "Hier" },
  ];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let pts=0;
    if(answers.action0==="retour") pts+=2; if(answers.action1==="avoir") pts+=2; if(answers.action2==="retour") pts+=2;
    if(answers.doc0==="bl") pts+=1; if(answers.doc1==="bl") pts+=1; if(answers.doc2==="bl") pts+=1;
    if((answers.relance||"").length>10) pts+=2;
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box"><h3>📋 Scénario</h3><p>3 cas de produits défectueux/non conformes en réserve. Décidez de l'action et du document à fournir.</p></div>
      {cas.map((c,i)=>(
        <div key={i} className="exercice-card">
          <h4>{c.produit}</h4><p>{c.probleme} — Réceptionné : {c.delai}</p>
          <div className="question-block"><label>Action :</label>
            <div className="radio-group">
              {[["retour","Retour fournisseur"],["avoir","Demander un avoir"],["solde","Solder"],["detruire","Détruire/recycler"]].map(([v,l])=>(
                <label key={v} className={`radio-pill ${answers[`action${i}`]===v?"selected":""}`}><input type="radio" name={`action${i}`} value={v} onChange={e=>setAnswers(a=>({...a,[`action${i}`]:e.target.value}))} disabled={submitted}/> {l}</label>
              ))}
            </div>
          </div>
          <div className="question-block"><label>Document transporteur :</label>
            <div className="radio-group">
              {[["bl","Bon de retour"],["facture","Facture"],["rien","Aucun"]].map(([v,l])=>(
                <label key={v} className={`radio-pill ${answers[`doc${i}`]===v?"selected":""}`}><input type="radio" name={`doc${i}`} value={v} onChange={e=>setAnswers(a=>({...a,[`doc${i}`]:e.target.value}))} disabled={submitted}/> {l}</label>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="question-block"><label>Rédigez un message de relance au fournisseur Sony :</label>
        <textarea className="text-area" value={answers.relance||""} onChange={e=>setAnswers(a=>({...a,relance:e.target.value}))} disabled={submitted} placeholder="Objet : Retour produit défectueux…" rows={4}/>
      </div>
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Valider</button>:(
        <div className={`result-box ${score>=8?"result-success":score>=5?"result-partial":"result-fail"}`}>
          <h4>{score>=8?"✅ Très bien !":score>=5?"⚠️ Correct":"❌ À revoir"}</h4>
          <p>Score : {score}/11</p>
          <p className="result-detail">Casque → retour. Livres (5/20 tachés) → avoir. Écran mauvaise réf → retour. Toujours un bon de retour.</p>
          {score>=5?<button className="btn-primary" onClick={()=>onComplete(score>=8?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setAnswers({})}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

function MissionImplantation({ onComplete }) {
  const zones = ["Entrée / Zone chaude","Fond / Zone froide","Caisse / Impulsion","Allée centrale","Vitrine"];
  const items = [
    { name: "Nouveauté : Casque Sony dernier cri", correct: 0 },
    { name: "Accessoires téléphone (coques, câbles)", correct: 2 },
    { name: "TV grand format premium", correct: 3 },
    { name: "Livres / BD en promo", correct: 1 },
    { name: "PS5 Collector édition limitée", correct: 4 },
  ];
  const [placements, setPlacements] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let pts=0; items.forEach((p,i)=>{ if(parseInt(placements[i])===p.correct) pts+=2; });
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box"><h3>📋 Scénario</h3><p>Réorganisez l'implantation de 5 familles de produits. Choisissez la zone la plus adaptée selon le merchandising.</p></div>
      <div className="formulas-box">
        <h4>📐 Rappels merchandising</h4>
        <p><strong>Zone chaude</strong> (entrée) : nouveautés, produits d'appel</p>
        <p><strong>Zone froide</strong> (fond) : produits destination, le client se déplace exprès</p>
        <p><strong>Caisse</strong> : achats d'impulsion, petits prix</p>
        <p><strong>Allée centrale</strong> : produits phares, promotions</p>
        <p><strong>Vitrine</strong> : image de marque, éditions limitées</p>
      </div>
      {items.map((p,i)=>(
        <div key={i} className="exercice-card">
          <h4>{p.name}</h4>
          <select className="select-zone" value={placements[i]??""} onChange={e=>setPlacements(pl=>({...pl,[i]:e.target.value}))} disabled={submitted}>
            <option value="">— Choisir —</option>{zones.map((z,zi)=><option key={zi} value={zi}>{z}</option>)}
          </select>
          {submitted&&<div className={`inline-feedback ${parseInt(placements[i])===p.correct?"fb-correct":"fb-wrong"}`}>{parseInt(placements[i])===p.correct?"✅ Correct":`❌ → ${zones[p.correct]}`}</div>}
        </div>
      ))}
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Valider</button>:(
        <div className={`result-box ${score>=8?"result-success":score>=4?"result-partial":"result-fail"}`}>
          <h4>{score>=8?"✅ Implantation optimale !":score>=4?"⚠️ Ajustements nécessaires":"❌ Revoyez les zones"}</h4>
          <p>Score : {score}/10</p>
          {score>=4?<button className="btn-primary" onClick={()=>onComplete(score>=8?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setPlacements({})}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

function MissionVitrine({ onComplete }) {
  const themes = ["Rentrée scolaire","Black Friday","Noël & Cadeaux","Soldes d'été","Fête des mères"];
  const [theme, setTheme] = useState("");
  const [produits, setProduits] = useState([]);
  const [couleurs, setCouleurs] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const toggleP = p => setProduits(prev=>prev.includes(p)?prev.filter(x=>x!==p):prev.length<5?[...prev,p]:prev);
  const handleSubmit = () => {
    let pts=0; if(theme) pts+=2; if(produits.length>=3&&produits.length<=5) pts+=3; if(couleurs.length>5) pts+=2; if(message.length>10) pts+=3;
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box"><h3>📋 Scénario</h3><p>Concevez la vitrine pour la prochaine opération commerciale. Proposez un concept complet.</p></div>
      <div className="question-block"><label>Thème :</label><div className="chip-group">{themes.map(t=><button key={t} className={`chip ${theme===t?"chip-selected":""}`} onClick={()=>!submitted&&setTheme(t)} disabled={submitted}>{t}</button>)}</div></div>
      <div className="question-block"><label>Produits en vitrine (3-5) :</label><div className="chip-group">{PRODUCTS.map(p=><button key={p.id} className={`chip ${produits.includes(p.name)?"chip-selected":""}`} onClick={()=>!submitted&&toggleP(p.name)} disabled={submitted}>{p.name}</button>)}</div><span className="helper-text">{produits.length}/5</span></div>
      <div className="question-block"><label>Couleurs & ambiance :</label><textarea className="text-area" value={couleurs} onChange={e=>setCouleurs(e.target.value)} disabled={submitted} placeholder="Tons rouges et dorés, éclairage tamisé…" rows={2}/></div>
      <div className="question-block"><label>Accroche vitrine :</label><input type="text" className="input-full" value={message} onChange={e=>setMessage(e.target.value)} disabled={submitted} placeholder="« Offrez la tech qu'ils méritent ! »"/></div>
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Soumettre</button>:(
        <div className={`result-box ${score>=8?"result-success":score>=5?"result-partial":"result-fail"}`}>
          <h4>{score>=8?"✅ Concept convaincant !":score>=5?"⚠️ Bonne base":"❌ Incomplet"}</h4>
          <p>Score : {score}/10</p>
          <p className="result-detail">Bonne vitrine = thème clair, 3-5 produits, harmonie visuelle, accroche percutante.</p>
          {score>=5?<button className="btn-primary" onClick={()=>onComplete(score>=8?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setTheme("");setProduits([]);setCouleurs("");setMessage("")}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

function MissionBalisage({ onComplete }) {
  const etiquettes = [
    { produit: "Sony WH-1000XM5", prixAffiche: "349,99 €", obs: "RAS", isErr: false },
    { produit: "MacBook Air M3", prixAffiche: "1 199,00 €", obs: "Prix réel : 1 299,00 €", isErr: true },
    { produit: "PS5 Slim", prixAffiche: "549,99 €", obs: "RAS", isErr: false },
    { produit: "Nintendo Switch OLED", prixAffiche: "349,99 €", obs: "Étiquette déchirée", isErr: true },
    { produit: "Canon EOS R6 II", prixAffiche: "2 499,00 €", obs: "Antivol absent", isErr: true },
    { produit: "JBL Charge 5", prixAffiche: "169,99 €", obs: "Rupture encore en rayon", isErr: true },
  ];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let pts=0;
    etiquettes.forEach((e,i)=>{ if(answers[`err${i}`]===(e.isErr?"oui":"non")) pts+=2; });
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box"><h3>📋 Scénario</h3><p>Tournée de contrôle : vérifiez chaque étiquette et signalez les anomalies.</p></div>
      <div className="data-table-wrap">
        <table className="data-table">
          <thead><tr><th>Produit</th><th>Prix affiché</th><th>Observation</th><th>Anomalie ?</th></tr></thead>
          <tbody>
            {etiquettes.map((e,i)=>(
              <tr key={i}><td className="font-medium">{e.produit}</td><td>{e.prixAffiche}</td><td>{e.obs}</td>
              <td><div className="radio-group">
                {["oui","non"].map(v=><label key={v} className={`radio-pill ${answers[`err${i}`]===v?"selected":""}`}><input type="radio" name={`err${i}`} value={v} onChange={ev=>setAnswers(a=>({...a,[`err${i}`]:ev.target.value}))} disabled={submitted}/> {v==="oui"?"Oui":"Non"}</label>)}
              </div></td></tr>
            ))}
          </tbody>
        </table>
      </div>
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Valider</button>:(
        <div className={`result-box ${score>=10?"result-success":score>=6?"result-partial":"result-fail"}`}>
          <h4>{score>=10?"✅ Contrôle impeccable !":score>=6?"⚠️ Oublis":"❌ Insuffisant"}</h4>
          <p>Score : {score}/12</p>
          <p className="result-detail">4 anomalies : MacBook (prix faux), Switch (étiquette déchirée), Canon (antivol absent), JBL (rupture affichée).</p>
          {score>=6?<button className="btn-primary" onClick={()=>onComplete(score>=10?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setAnswers({})}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

function MissionHygiene({ onComplete }) {
  const situations = [
    { desc: "Un carton bloque partiellement l'issue de secours en réserve.", urgent: true, action: "deplacer" },
    { desc: "Le sol du rayon gaming est mouillé, aucun panneau posé.", urgent: true, action: "panneau" },
    { desc: "Un extincteur périmé depuis 2 mois au rayon informatique.", urgent: true, action: "signaler" },
    { desc: "Les néons du rayon livres clignotent.", urgent: false, action: "signaler" },
    { desc: "Un client a renversé du café dans l'allée principale.", urgent: true, action: "nettoyer" },
  ];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let pts=0;
    situations.forEach((s,i)=>{ if(answers[`urg${i}`]===(s.urgent?"oui":"non")) pts+=1; if(answers[`act${i}`]===s.action) pts+=2; });
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box"><h3>📋 Scénario</h3><p>Ronde d'ouverture : 5 situations à évaluer. Urgence ou non ? Quelle action prioritaire ?</p></div>
      {situations.map((s,i)=>(
        <div key={i} className="exercice-card">
          <p className="situation-desc">{s.desc}</p>
          <div className="question-block"><label>Urgent ?</label>
            <div className="radio-group">
              {["oui","non"].map(v=><label key={v} className={`radio-pill ${answers[`urg${i}`]===v?"selected":""}`}><input type="radio" name={`urg${i}`} value={v} onChange={e=>setAnswers(a=>({...a,[`urg${i}`]:e.target.value}))} disabled={submitted}/> {v==="oui"?"Oui":"Non"}</label>)}
            </div>
          </div>
          <div className="question-block"><label>Action :</label>
            <div className="radio-group">
              {[["deplacer","Dégager"],["panneau","Panneau sol glissant"],["signaler","Signaler au responsable"],["nettoyer","Nettoyer"],["rien","Ne rien faire"]].map(([v,l])=>(
                <label key={v} className={`radio-pill ${answers[`act${i}`]===v?"selected":""}`}><input type="radio" name={`act${i}`} value={v} onChange={e=>setAnswers(a=>({...a,[`act${i}`]:e.target.value}))} disabled={submitted}/> {l}</label>
              ))}
            </div>
          </div>
        </div>
      ))}
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Valider</button>:(
        <div className={`result-box ${score>=12?"result-success":score>=8?"result-partial":"result-fail"}`}>
          <h4>{score>=12?"✅ Vigilance exemplaire !":score>=8?"⚠️ Bonne conscience sécurité":"❌ Points de vigilance"}</h4>
          <p>Score : {score}/15</p>
          {score>=8?<button className="btn-primary" onClick={()=>onComplete(score>=12?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setAnswers({})}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

function MissionPromo({ onComplete }) {
  const [typePromo, setTypePromo] = useState("");
  const [produitsCibles, setProduitsCibles] = useState([]);
  const [reduction, setReduction] = useState("");
  const [objectif, setObjectif] = useState("");
  const [duree, setDuree] = useState("");
  const [support, setSupport] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const toggleP = p => setProduitsCibles(prev=>prev.includes(p)?prev.filter(x=>x!==p):[...prev,p]);
  const toggleS = s => setSupport(prev=>prev.includes(s)?prev.filter(x=>x!==s):[...prev,s]);

  const handleSubmit = () => {
    let pts=0;
    if(typePromo) pts+=2; if(produitsCibles.length>=2&&produitsCibles.length<=5) pts+=3;
    if(reduction&&parseFloat(reduction)>0&&parseFloat(reduction)<=50) pts+=2;
    if(objectif.length>10) pts+=2; if(duree) pts+=1; if(support.length>=2) pts+=2;
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box"><h3>📋 Scénario</h3><p>Le rayon audio est en baisse de 15% vs le mois dernier. Planifiez une action commerciale pour dynamiser les ventes.</p></div>
      <div className="info-cards-row">
        <div className="info-card warn"><span className="info-label">Rayon Audio</span><span className="info-value">-15%</span></div>
        <div className="info-card"><span className="info-label">Objectif</span><span className="info-value">12 000 €</span></div>
        <div className="info-card"><span className="info-label">CA actuel</span><span className="info-value">10 200 €</span></div>
      </div>
      <div className="question-block"><label>Type d'opération :</label><div className="chip-group">{["Remise immédiate","Lot / Bundle","Vente flash","Offre remboursement","Jeu concours"].map(t=><button key={t} className={`chip ${typePromo===t?"chip-selected":""}`} onClick={()=>!submitted&&setTypePromo(t)} disabled={submitted}>{t}</button>)}</div></div>
      <div className="question-block"><label>Produits à mettre en avant :</label><div className="chip-group">{PRODUCTS.filter(p=>p.cat==="audio"||p.cat==="gaming").map(p=><button key={p.id} className={`chip ${produitsCibles.includes(p.name)?"chip-selected":""}`} onClick={()=>!submitted&&toggleP(p.name)} disabled={submitted}>{p.name}</button>)}</div></div>
      <div className="question-block"><label>Réduction (%) :</label><div className="input-row"><input type="number" className="input-prix" value={reduction} onChange={e=>setReduction(e.target.value)} disabled={submitted} placeholder="Ex : 20"/><span className="unit">%</span></div></div>
      <div className="question-block"><label>Durée :</label><div className="chip-group">{["1 week-end","1 semaine","2 semaines","1 mois"].map(d=><button key={d} className={`chip ${duree===d?"chip-selected":""}`} onClick={()=>!submitted&&setDuree(d)} disabled={submitted}>{d}</button>)}</div></div>
      <div className="question-block"><label>Supports de communication :</label><div className="chip-group">{["Affichage magasin","Réseaux sociaux","Newsletter","SMS clients","Site web","Radio locale"].map(s=><button key={s} className={`chip ${support.includes(s)?"chip-selected":""}`} onClick={()=>!submitted&&toggleS(s)} disabled={submitted}>{s}</button>)}</div></div>
      <div className="question-block"><label>Objectif de l'opération :</label><textarea className="text-area" value={objectif} onChange={e=>setObjectif(e.target.value)} disabled={submitted} placeholder="Augmenter le CA audio de 20%, écouler le stock JBL…" rows={3}/></div>
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Valider</button>:(
        <div className={`result-box ${score>=10?"result-success":score>=6?"result-partial":"result-fail"}`}>
          <h4>{score>=10?"✅ Plan solide !":score>=6?"⚠️ Bonne base":"❌ Incomplet"}</h4>
          <p>Score : {score}/12</p>
          <p className="result-detail">Bonne action : type clair, 2-5 produits ciblés, réduction réaliste (10-30%), 2+ supports, objectif chiffré.</p>
          {score>=6?<button className="btn-primary" onClick={()=>onComplete(score>=10?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setTypePromo("");setProduitsCibles([]);setReduction("");setObjectif("");setDuree("");setSupport([])}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

function MissionReseaux({ onComplete }) {
  const [plateforme, setPlateforme] = useState("");
  const [accroche, setAccroche] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [cta, setCta] = useState("");
  const [heure, setHeure] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let pts=0;
    if(plateforme) pts+=1; if(accroche.length>=5&&accroche.length<=100) pts+=2;
    if(description.length>=20) pts+=3; if(hashtags.includes("#")&&hashtags.split("#").length>=3) pts+=2;
    if(cta.length>5) pts+=2; if(heure) pts+=1;
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box"><h3>📋 Scénario</h3><p>Vente flash sur le casque Sony WH-1000XM5 ce week-end (-20%). Rédigez le post pour les réseaux sociaux du magasin.</p></div>
      <div className="question-block"><label>Plateforme :</label><div className="chip-group">{["Instagram","Facebook","TikTok","X (Twitter)"].map(p=><button key={p} className={`chip ${plateforme===p?"chip-selected":""}`} onClick={()=>!submitted&&setPlateforme(p)} disabled={submitted}>{p}</button>)}</div></div>
      <div className="question-block"><label>Accroche (max 100 car.) :</label><input type="text" className="input-full" value={accroche} onChange={e=>setAccroche(e.target.value)} disabled={submitted} placeholder="🔥 Vente flash ce week-end !" maxLength={100}/><span className="helper-text">{accroche.length}/100</span></div>
      <div className="question-block"><label>Corps du message :</label><textarea className="text-area" value={description} onChange={e=>setDescription(e.target.value)} disabled={submitted} placeholder="Offre, avantages produit, conditions…" rows={4}/></div>
      <div className="question-block"><label>Hashtags (≥3) :</label><input type="text" className="input-full" value={hashtags} onChange={e=>setHashtags(e.target.value)} disabled={submitted} placeholder="#VenteFlash #TechnoStore #Audio #BonPlan"/></div>
      <div className="question-block"><label>Call-to-action :</label><input type="text" className="input-full" value={cta} onChange={e=>setCta(e.target.value)} disabled={submitted} placeholder="Rendez-vous en magasin ou sur notre site !"/></div>
      <div className="question-block"><label>Heure de publication :</label><div className="chip-group">{["8h-10h","12h-14h","17h-19h","20h-22h"].map(h=><button key={h} className={`chip ${heure===h?"chip-selected":""}`} onClick={()=>!submitted&&setHeure(h)} disabled={submitted}>{h}</button>)}</div></div>
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Publier</button>:(
        <div className={`result-box ${score>=9?"result-success":score>=5?"result-partial":"result-fail"}`}>
          <h4>{score>=9?"✅ Post parfait !":score>=5?"⚠️ Correct":"❌ À améliorer"}</h4>
          <p>Score : {score}/11</p>
          <p className="result-detail">Bon post = accroche percutante, offre claire, ≥3 hashtags, CTA clair, heures d'audience (17h-22h).</p>
          {score>=5?<button className="btn-primary" onClick={()=>onComplete(score>=9?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setPlateforme("");setAccroche("");setDescription("");setHashtags("");setCta("");setHeure("")}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

function MissionPerformance({ onComplete }) {
  const data = [
    { rayon: "Audio", objectif: 12000, realise: 10200, moisPrec: 11800 },
    { rayon: "Gaming", objectif: 18000, realise: 19500, moisPrec: 17200 },
    { rayon: "Informatique", objectif: 25000, realise: 23100, moisPrec: 24800 },
    { rayon: "Livres", objectif: 5000, realise: 5400, moisPrec: 4900 },
    { rayon: "Photo/Vidéo", objectif: 8000, realise: 6200, moisPrec: 7800 },
    { rayon: "TV/Home Cinéma", objectif: 15000, realise: 14800, moisPrec: 15100 },
  ];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let pts=0;
    if(answers.best==="Gaming") pts+=2; if(answers.worst==="Photo/Vidéo") pts+=2;
    const totalCA=data.reduce((s,d)=>s+d.realise,0);
    if(Math.abs(parseFloat(answers.totalCA)-totalCA)<500) pts+=2;
    const totalObj=data.reduce((s,d)=>s+d.objectif,0);
    if(Math.abs(parseFloat(answers.tauxRea)-(totalCA/totalObj*100))<2) pts+=2;
    if((answers.actions||"").length>20) pts+=3;
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box"><h3>📋 Scénario</h3><p>Fin de mois : analysez les performances par rayon, identifiez les forces/faiblesses et proposez des actions correctrices.</p></div>
      <div className="data-table-wrap">
        <table className="data-table">
          <thead><tr><th>Rayon</th><th>Objectif</th><th>Réalisé</th><th>M-1</th><th>Écart obj.</th><th>Évolution</th></tr></thead>
          <tbody>
            {data.map((d,i)=>{
              const ecart=((d.realise-d.objectif)/d.objectif*100).toFixed(1);
              const evol=((d.realise-d.moisPrec)/d.moisPrec*100).toFixed(1);
              return(<tr key={i}><td className="font-medium">{d.rayon}</td><td className="text-right">{d.objectif.toLocaleString()} €</td><td className="text-right">{d.realise.toLocaleString()} €</td><td className="text-right">{d.moisPrec.toLocaleString()} €</td><td className="text-right"><span className={parseFloat(ecart)>=0?"text-green":"text-red"}>{ecart}%</span></td><td className="text-right"><span className={parseFloat(evol)>=0?"text-green":"text-red"}>{evol}%</span></td></tr>);
            })}
          </tbody>
        </table>
      </div>
      <div className="question-block"><label>Meilleure performance vs objectif :</label><div className="chip-group">{data.map(d=><button key={d.rayon} className={`chip ${answers.best===d.rayon?"chip-selected":""}`} onClick={()=>!submitted&&setAnswers(a=>({...a,best:d.rayon}))} disabled={submitted}>{d.rayon}</button>)}</div></div>
      <div className="question-block"><label>Rayon le plus en difficulté :</label><div className="chip-group">{data.map(d=><button key={d.rayon} className={`chip ${answers.worst===d.rayon?"chip-selected":""}`} onClick={()=>!submitted&&setAnswers(a=>({...a,worst:d.rayon}))} disabled={submitted}>{d.rayon}</button>)}</div></div>
      <div className="question-block"><label>CA total réalisé :</label><div className="input-row"><input type="number" className="input-prix" value={answers.totalCA||""} onChange={e=>setAnswers(a=>({...a,totalCA:e.target.value}))} disabled={submitted} placeholder="Montant"/><span className="unit">€</span></div></div>
      <div className="question-block"><label>Taux de réalisation global (%) :</label><div className="input-row"><input type="number" step="0.1" className="input-prix" value={answers.tauxRea||""} onChange={e=>setAnswers(a=>({...a,tauxRea:e.target.value}))} disabled={submitted} placeholder="%"/><span className="unit">%</span></div></div>
      <div className="question-block"><label>Actions correctrices (2-3) :</label><textarea className="text-area" value={answers.actions||""} onChange={e=>setAnswers(a=>({...a,actions:e.target.value}))} disabled={submitted} placeholder="Pour le rayon Photo, organiser une démonstration…" rows={4}/></div>
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Valider</button>:(
        <div className={`result-box ${score>=9?"result-success":score>=5?"result-partial":"result-fail"}`}>
          <h4>{score>=9?"✅ Analyse complète !":score>=5?"⚠️ Analyse partielle":"❌ Insuffisante"}</h4>
          <p>Score : {score}/11</p>
          <p className="result-detail">Gaming = meilleure perf (+8.3%). Photo/Vidéo = plus en difficulté (-22.5%). CA total : 79 200 €. Taux réalisation : ~95,4%.</p>
          {score>=5?<button className="btn-primary" onClick={()=>onComplete(score>=9?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setAnswers({})}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

// ─── COMPONENT MAP ───────────────────────────────────────────────────────────

const MISSION_COMPONENTS = {
  reception: MissionReception, commande: MissionCommande, prix: MissionPrix,
  inventaire: MissionInventaire, omnicanal: MissionOmnicanal, retours: MissionRetours,
  implantation: MissionImplantation, vitrine: MissionVitrine, balisage: MissionBalisage,
  hygiene: MissionHygiene, promo: MissionPromo, reseaux: MissionReseaux, performance: MissionPerformance,
};

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState("dashboard");
  const [currentMission, setCurrentMission] = useState(null);
  const [completed, setCompleted] = useState({});
  const [studentName, setStudentName] = useState("");
  const [showNameModal, setShowNameModal] = useState(true);

  const totalXP = Object.entries(completed).reduce((sum, [id, stars]) => {
    const m = MISSIONS_DATA[id];
    return sum + (m ? Math.round(m.xp * (stars/3)) : 0);
  }, 0);
  const maxXP = Object.values(MISSIONS_DATA).reduce((s, m) => s + m.xp, 0);
  const completedCount = Object.keys(completed).length;
  const totalMissions = Object.keys(MISSIONS_DATA).length;

  const handleMissionComplete = (stars) => {
    setCompleted(c => ({...c, [currentMission]: Math.max(c[currentMission]||0, stars)}));
    setView("dashboard"); setCurrentMission(null);
  };

  if (showNameModal) {
    return (
      <>
        <style>{styles}</style>
        <div className="app-root">
          <div className="name-modal-overlay">
            <div className="name-modal">
              <div className="modal-icon">🏪</div>
              <h1>{STORE_NAME}</h1>
              <p className="modal-subtitle">Simulateur de gestion — Bac Pro MCV Option A</p>
              <div className="modal-form">
                <label>Votre nom & prénom :</label>
                <input type="text" className="input-full" value={studentName} onChange={e=>setStudentName(e.target.value)} placeholder="Ex : Martin Lefèvre" autoFocus onKeyDown={e=>e.key==="Enter"&&studentName.trim()&&setShowNameModal(false)}/>
                <button className="btn-primary" style={{width:"100%",marginTop:12}} onClick={()=>studentName.trim()&&setShowNameModal(false)} disabled={!studentName.trim()}>Entrer dans le magasin</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (view === "mission" && currentMission) {
    const mission = MISSIONS_DATA[currentMission];
    const Comp = MISSION_COMPONENTS[currentMission];
    return (
      <>
        <style>{styles}</style>
        <div className="app-root">
          <header className="app-header">
            <button className="btn-back" onClick={()=>{setView("dashboard");setCurrentMission(null)}}>← Retour</button>
            <div className="header-center"><span className="header-icon">{mission.icon}</span><h2>{mission.title}</h2></div>
            <div className="header-right"><span className="bloc-badge" style={{background:BLOCS.find(b=>b.id===mission.bloc)?.color}}>{mission.bloc}</span></div>
          </header>
          <main className="mission-main">
            <div className="competences-bar">
              <span className="competences-label">Compétences :</span>
              {mission.competences.map((c,i)=><span key={i} className="competence-tag">{c}</span>)}
            </div>
            {Comp ? <Comp onComplete={handleMissionComplete}/> : <p>En développement…</p>}
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="app-root">
        <header className="app-header">
          <div className="header-brand">
            <span className="brand-icon">🏪</span>
            <div><h1>{STORE_NAME}</h1><span className="brand-sub">Simulateur de gestion</span></div>
          </div>
          <div className="header-right">
            <div className="student-info"><span className="student-name">{studentName}</span><span className="student-role">Vendeur·se conseil</span></div>
          </div>
        </header>
        <main className="dashboard-main">
          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-value">{completedCount}/{totalMissions}</span><span className="stat-label">Missions</span>
              <div className="progress-bar"><div className="progress-fill" style={{width:`${(completedCount/totalMissions)*100}%`}}/></div>
            </div>
            <div className="stat-card">
              <span className="stat-value">{totalXP}</span><span className="stat-label">XP gagnés</span>
              <div className="progress-bar"><div className="progress-fill xp" style={{width:`${(totalXP/maxXP)*100}%`}}/></div>
            </div>
            <div className="stat-card">
              <span className="stat-value">{completedCount===totalMissions?"⭐":`${Math.round((completedCount/totalMissions)*100)}%`}</span>
              <span className="stat-label">Progression</span>
            </div>
          </div>
          {BLOCS.map(bloc=>(
            <section key={bloc.id} className="bloc-section">
              <div className="bloc-header"><div className="bloc-line" style={{background:bloc.color}}/><h2 className="bloc-title"><span className="bloc-id" style={{color:bloc.color}}>{bloc.id}</span> {bloc.label}</h2></div>
              <div className="missions-grid">
                {bloc.missions.map(mId=>{
                  const m=MISSIONS_DATA[mId]; const stars=completed[mId]||0; const done=stars>0;
                  return(
                    <button key={mId} className={`mission-card ${done?"mission-done":""}`} onClick={()=>{setCurrentMission(mId);setView("mission")}}>
                      <div className="mission-card-top"><span className="mission-icon">{m.icon}</span>{done&&<div className="stars-display">{"★".repeat(stars)}{"☆".repeat(3-stars)}</div>}</div>
                      <h3 className="mission-title">{m.title}</h3>
                      <p className="mission-desc">{m.desc}</p>
                      <div className="mission-card-footer"><span className="xp-badge">+{m.xp} XP</span>{done?<span className="status-done">✓ Terminé</span>:<span className="status-todo">À faire</span>}</div>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
          <footer className="app-footer"><p>Bac Pro MCV Option A — Compétences 4.1A · 4.2A · 4.3A</p></footer>
        </main>
      </div>
    </>
  );
}
