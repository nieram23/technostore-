import { useState } from "react";

const STORE_NAME = "TechnoStore";

const PRODUCTS = [
  { id: 1, name: "Sony WH-1000XM5", cat: "audio", stockActuel: 12, stockInitial: 20, stockMinimal: 5, stockSecurite: 3, stockAlerte: 8, prixAchat: 220, prixVente: 349.99, emplacement: "A3", fournisseur: "Sony France", delaiLivraison: 5, lotMinimum: 5 },
  { id: 2, name: "MacBook Air M3", cat: "computing", stockActuel: 3, stockInitial: 10, stockMinimal: 2, stockSecurite: 1, stockAlerte: 4, prixAchat: 950, prixVente: 1299, emplacement: "B1", fournisseur: "Apple Distribution", delaiLivraison: 7, lotMinimum: 2 },
  { id: 3, name: 'Samsung OLED 55"', cat: "tv", stockActuel: 2, stockInitial: 6, stockMinimal: 1, stockSecurite: 1, stockAlerte: 3, prixAchat: 680, prixVente: 999.99, emplacement: "C2", fournisseur: "Samsung Electronics", delaiLivraison: 4, lotMinimum: 1 },
  { id: 4, name: "PS5 Slim", cat: "gaming", stockActuel: 8, stockInitial: 15, stockMinimal: 4, stockSecurite: 2, stockAlerte: 6, prixAchat: 380, prixVente: 549.99, emplacement: "D1", fournisseur: "PlayStation FR", delaiLivraison: 6, lotMinimum: 3 },
  { id: 5, name: "Canon EOS R6 II", cat: "photo", stockActuel: 1, stockInitial: 4, stockMinimal: 1, stockSecurite: 1, stockAlerte: 2, prixAchat: 1800, prixVente: 2499, emplacement: "E1", fournisseur: "Canon France", delaiLivraison: 8, lotMinimum: 1 },
  { id: 6, name: "Le Comte de Monte-Cristo", cat: "books", stockActuel: 25, stockInitial: 40, stockMinimal: 8, stockSecurite: 5, stockAlerte: 15, prixAchat: 6.5, prixVente: 12.9, emplacement: "F4", fournisseur: "Hachette Livre", delaiLivraison: 3, lotMinimum: 10 },
  { id: 7, name: "JBL Charge 5", cat: "audio", stockActuel: 0, stockInitial: 12, stockMinimal: 3, stockSecurite: 2, stockAlerte: 5, prixAchat: 95, prixVente: 169.99, emplacement: "A5", fournisseur: "Harman France", delaiLivraison: 4, lotMinimum: 4 },
  { id: 8, name: "Nintendo Switch OLED", cat: "gaming", stockActuel: 5, stockInitial: 12, stockMinimal: 3, stockSecurite: 2, stockAlerte: 6, prixAchat: 270, prixVente: 349.99, emplacement: "D2", fournisseur: "Nintendo France", delaiLivraison: 5, lotMinimum: 3 },
  { id: 9, name: "Logitech MX Master 3S", cat: "computing", stockActuel: 15, stockInitial: 25, stockMinimal: 6, stockSecurite: 4, stockAlerte: 10, prixAchat: 55, prixVente: 99.99, emplacement: "B3", fournisseur: "Logitech France", delaiLivraison: 3, lotMinimum: 5 },
  { id: 10, name: "Kindle Paperwhite", cat: "books", stockActuel: 7, stockInitial: 15, stockMinimal: 4, stockSecurite: 2, stockAlerte: 6, prixAchat: 100, prixVente: 159.99, emplacement: "F1", fournisseur: "Amazon EU", delaiLivraison: 2, lotMinimum: 3 },
];

PRODUCTS.forEach(p => { p.stock = p.stockActuel; p.seuil = p.stockAlerte; });

const MISSIONS_DATA = {
  reception: { id: "reception", title: "Réception & contrôle", bloc: "4.1A", icon: "📦", desc: "Réceptionner une livraison, contrôler quantités/qualité, rédiger les documents.", competences: ["Réceptionner, contrôler et stocker les marchandises"], xp: 150 },
  commande: { id: "commande", title: "Gestion des stocks & commande", bloc: "4.1A", icon: "📝", desc: "Maîtriser les niveaux de stock et établir une commande fournisseur optimisée.", competences: ["Établir les commandes des produits", "Veiller à la gestion des stocks"], xp: 250 },
  prix: { id: "prix", title: "Calcul des prix", bloc: "4.1A", icon: "💰", desc: "Calculer PV, marges, coefficients et analyser la rentabilité.", competences: ["Établir le prix en fonction de variables commerciales"], xp: 200 },
  inventaire: { id: "inventaire", title: "Inventaire & démarque", bloc: "4.1A", icon: "📋", desc: "Réaliser un inventaire, analyser les écarts et proposer des solutions.", competences: ["Opérations d'inventaire", "Lutter contre la démarque"], xp: 220 },
  omnicanal: { id: "omnicanal", title: "Click & Collect", bloc: "4.1A", icon: "🖱️", desc: "Gérer les commandes web, résoudre les problèmes et communiquer avec les clients.", competences: ["Préparer les commandes omnicanal", "Gérer les retours clients"], xp: 170 },
  retours: { id: "retours", title: "Retours fournisseurs", bloc: "4.1A", icon: "↩️", desc: "Gérer les litiges, préparer les retours et rédiger les relances.", competences: ["Préparer les retours fournisseurs", "Valorisation des déchets"], xp: 160 },
  implantation: { id: "implantation", title: "Implantation rayon", bloc: "4.2A", icon: "🗺️", desc: "Organiser l'implantation selon les règles de merchandising.", competences: ["Implanter les produits", "Agencement surface de vente"], xp: 200 },
  vitrine: { id: "vitrine", title: "Aménager la vitrine", bloc: "4.2A", icon: "🪟", desc: "Concevoir un concept vitrine complet et argumenté.", competences: ["Aménager la vitrine", "Mettre en scène l'offre"], xp: 190 },
  balisage: { id: "balisage", title: "Balisage & étiquetage", bloc: "4.2A", icon: "🏷️", desc: "Contrôler le balisage, détecter les anomalies et appliquer les corrections.", competences: ["Vérifier l'étiquetage", "Signalétique", "Étiqueter et sécuriser"], xp: 140 },
  hygiene: { id: "hygiene", title: "Hygiène & sécurité", bloc: "4.2A", icon: "🧹", desc: "Évaluer les risques, hiérarchiser les urgences et appliquer les procédures.", competences: ["Règles d'hygiène et de sécurité", "Bonne tenue du rayon"], xp: 130 },
  promo: { id: "promo", title: "Action commerciale", bloc: "4.3A", icon: "📢", desc: "Concevoir une opération promotionnelle complète avec budget et KPI.", competences: ["Actions commerciales", "Planification des promotions"], xp: 250 },
  reseaux: { id: "reseaux", title: "Réseaux sociaux", bloc: "4.3A", icon: "📱", desc: "Élaborer une stratégie de publication et rédiger un post professionnel.", competences: ["Réseaux sociaux", "Valoriser l'offre en ligne"], xp: 180 },
  performance: { id: "performance", title: "Analyse des performances", bloc: "4.3A", icon: "📊", desc: "Analyser un tableau de bord commercial et construire un plan d'action.", competences: ["Comparer résultats/objectifs", "Évaluer les performances"], xp: 230 },
};

const BLOCS = [
  { id: "4.1A", label: "Opérations préalables à la vente", color: "#0a65c2", missions: ["reception","commande","prix","inventaire","omnicanal","retours"] },
  { id: "4.2A", label: "Rendre l'UC attractive et fonctionnelle", color: "#1a8a4e", missions: ["implantation","vitrine","balisage","hygiene"] },
  { id: "4.3A", label: "Développer la clientèle", color: "#b8860b", missions: ["promo","reseaux","performance"] },
];

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{--blue:#0a65c2;--blue-light:#e8f1fa;--blue-dark:#084a91;--cream:#ffffd9;--black:#000;--white:#fff;--gray-50:#f8f9fa;--gray-100:#f1f3f5;--gray-200:#e9ecef;--gray-300:#dee2e6;--gray-400:#ced4da;--gray-500:#adb5bd;--gray-600:#868e96;--gray-700:#495057;--gray-800:#343a40;--green:#1a8a4e;--green-light:#e6f4ed;--orange:#b8860b;--orange-light:#fdf3e0;--red:#dc3545;--red-light:#fde8ea;--radius:10px;--radius-sm:6px;--radius-lg:14px;--shadow:0 1px 3px rgba(0,0,0,.06),0 1px 2px rgba(0,0,0,.04);--shadow-md:0 4px 12px rgba(0,0,0,.08);--shadow-lg:0 8px 24px rgba(0,0,0,.1)}
body,html{font-family:'DM Sans',-apple-system,sans-serif;background:var(--gray-50);color:var(--gray-800);-webkit-font-smoothing:antialiased;line-height:1.5}
.app-root{min-height:100vh;background:var(--gray-50)}
.app-header{background:var(--white);border-bottom:1px solid var(--gray-200);padding:12px 24px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;backdrop-filter:blur(8px)}
.header-brand{display:flex;align-items:center;gap:12px}
.brand-icon{font-size:28px}
.header-brand h1{font-size:20px;font-weight:700;color:var(--black);letter-spacing:-.02em}
.brand-sub{font-size:12px;color:var(--gray-600);font-weight:400}
.header-center{display:flex;align-items:center;gap:10px}
.header-center h2{font-size:17px;font-weight:600}
.header-icon{font-size:22px}
.header-right{display:flex;align-items:center;gap:12px}
.student-info{text-align:right}
.student-name{display:block;font-size:14px;font-weight:600;color:var(--black)}
.student-role{font-size:11px;color:var(--gray-600)}
.btn-back{background:none;border:1px solid var(--gray-300);border-radius:var(--radius-sm);padding:6px 14px;font-size:13px;font-family:inherit;cursor:pointer;color:var(--gray-700);transition:all .15s}
.btn-back:hover{background:var(--gray-100);border-color:var(--gray-400)}
.bloc-badge{display:inline-block;padding:3px 10px;border-radius:20px;color:#fff;font-size:11px;font-weight:600;letter-spacing:.02em}
.name-modal-overlay{position:fixed;inset:0;background:linear-gradient(135deg,var(--blue),var(--blue-dark));display:flex;align-items:center;justify-content:center;padding:20px}
.name-modal{background:var(--white);border-radius:var(--radius-lg);padding:48px 40px;max-width:440px;width:100%;text-align:center;box-shadow:var(--shadow-lg)}
.modal-icon{font-size:56px;margin-bottom:12px}
.name-modal h1{font-size:28px;font-weight:700;color:var(--black);margin-bottom:4px;letter-spacing:-.03em}
.modal-subtitle{color:var(--gray-600);font-size:14px;margin-bottom:32px}
.modal-form{text-align:left}
.modal-form label{display:block;font-size:13px;font-weight:500;color:var(--gray-700);margin-bottom:6px}
.dashboard-main{max-width:1080px;margin:0 auto;padding:24px 20px 60px}
.stats-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:32px}
.stat-card{background:var(--white);border:1px solid var(--gray-200);border-radius:var(--radius);padding:18px 20px;text-align:center}
.stat-value{display:block;font-size:28px;font-weight:700;color:var(--blue);letter-spacing:-.02em}
.stat-label{font-size:12px;color:var(--gray-600);text-transform:uppercase;letter-spacing:.06em;margin-top:2px}
.progress-bar{height:4px;background:var(--gray-200);border-radius:4px;margin-top:10px;overflow:hidden}
.progress-fill{height:100%;background:var(--blue);border-radius:4px;transition:width .5s ease}
.progress-fill.xp{background:var(--orange)}
.bloc-section{margin-bottom:28px}
.bloc-header{display:flex;align-items:center;gap:14px;margin-bottom:14px}
.bloc-line{width:4px;height:24px;border-radius:4px}
.bloc-title{font-size:16px;font-weight:600;color:var(--gray-800)}
.bloc-id{font-weight:700;margin-right:6px}
.missions-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}
.mission-card{background:var(--white);border:1px solid var(--gray-200);border-radius:var(--radius);padding:18px 20px 16px;text-align:left;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;font-family:inherit}
.mission-card:hover{border-color:var(--blue);box-shadow:var(--shadow-md);transform:translateY(-1px)}
.mission-card.mission-done{border-color:var(--green);background:var(--green-light)}
.mission-card-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.mission-icon{font-size:26px}
.stars-display{color:var(--orange);font-size:14px;letter-spacing:1px}
.mission-title{font-size:15px;font-weight:600;color:var(--black);margin-bottom:4px}
.mission-desc{font-size:12.5px;color:var(--gray-600);line-height:1.45;flex:1;margin-bottom:12px}
.mission-card-footer{display:flex;align-items:center;justify-content:space-between;padding-top:10px;border-top:1px solid var(--gray-200)}
.xp-badge{font-size:12px;font-weight:600;color:var(--blue);background:var(--blue-light);padding:2px 8px;border-radius:12px}
.status-done{font-size:12px;color:var(--green);font-weight:600}
.status-todo{font-size:12px;color:var(--gray-500);font-weight:500}
.mission-main{max-width:800px;margin:0 auto;padding:20px 20px 60px}
.competences-bar{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-bottom:20px;padding:10px 14px;background:var(--blue-light);border-radius:var(--radius-sm)}
.competences-label{font-size:11px;font-weight:600;color:var(--blue);text-transform:uppercase;letter-spacing:.04em}
.competence-tag{font-size:11px;color:var(--blue-dark);background:rgba(10,101,194,.1);padding:2px 8px;border-radius:4px}
.mission-content{display:flex;flex-direction:column;gap:18px}
.scenario-box{background:var(--cream);border:1px solid #e8e8a0;border-radius:var(--radius);padding:18px 20px}
.scenario-box h3{font-size:14px;font-weight:600;margin-bottom:8px;color:var(--black)}
.scenario-box p{font-size:13.5px;color:var(--gray-700);line-height:1.55}
.scenario-box em{color:var(--gray-600);font-size:12.5px}
.formulas-box{background:var(--white);border:1px solid var(--gray-200);border-left:3px solid var(--blue);border-radius:var(--radius-sm);padding:14px 18px}
.formulas-box h4{font-size:13px;font-weight:600;margin-bottom:6px}
.formulas-box p{font-size:12.5px;color:var(--gray-700);margin-bottom:3px}
.data-table-wrap{overflow-x:auto;border-radius:var(--radius);border:1px solid var(--gray-200);background:var(--white)}
.data-table{width:100%;border-collapse:collapse;font-size:13px}
.data-table th{background:var(--gray-100);padding:10px 14px;text-align:left;font-weight:600;font-size:11.5px;text-transform:uppercase;letter-spacing:.04em;color:var(--gray-600);white-space:nowrap}
.data-table td{padding:10px 14px;border-top:1px solid var(--gray-100);vertical-align:middle}
.data-table tr:hover td{background:var(--gray-50)}
.font-medium{font-weight:500}.text-center{text-align:center}.text-right{text-align:right}
.text-green{color:var(--green);font-weight:600}.text-red{color:var(--red);font-weight:600}
.status-tag{display:inline-block;padding:2px 8px;border-radius:4px;font-size:11.5px;font-weight:500}
.status-ok{background:var(--green-light);color:var(--green)}.status-warn{background:var(--orange-light);color:var(--orange)}.status-error{background:var(--red-light);color:var(--red)}
.radio-group{display:flex;flex-wrap:wrap;gap:6px}
.radio-pill{display:inline-flex;align-items:center;gap:4px;padding:6px 14px;border:1px solid var(--gray-300);border-radius:20px;font-size:12.5px;cursor:pointer;transition:all .15s;background:var(--white);color:var(--gray-700);font-family:inherit}
.radio-pill:hover{border-color:var(--blue)}
.radio-pill.selected{background:var(--blue);color:var(--white);border-color:var(--blue)}
.radio-pill input{display:none}
.question-block{display:flex;flex-direction:column;gap:8px}
.question-block label{font-size:13px;font-weight:500;color:var(--gray-800)}
.input-small{width:72px;padding:6px 10px;border:1px solid var(--gray-300);border-radius:var(--radius-sm);font-size:13px;font-family:inherit;text-align:center;transition:border-color .15s}
.input-small:focus{outline:none;border-color:var(--blue);box-shadow:0 0 0 2px rgba(10,101,194,.1)}
.input-prix{width:140px;padding:8px 12px;border:1px solid var(--gray-300);border-radius:var(--radius-sm);font-size:14px;font-family:inherit;transition:border-color .15s}
.input-prix:focus{outline:none;border-color:var(--blue);box-shadow:0 0 0 2px rgba(10,101,194,.1)}
.input-full{width:100%;padding:10px 14px;border:1px solid var(--gray-300);border-radius:var(--radius-sm);font-size:13.5px;font-family:inherit;transition:border-color .15s}
.input-full:focus{outline:none;border-color:var(--blue);box-shadow:0 0 0 2px rgba(10,101,194,.1)}
.input-row{display:flex;align-items:center;gap:8px}
.unit{font-size:14px;color:var(--gray-600);font-weight:500}
.text-area{width:100%;padding:10px 14px;border:1px solid var(--gray-300);border-radius:var(--radius-sm);font-size:13px;font-family:inherit;resize:vertical;line-height:1.5;transition:border-color .15s}
.text-area:focus{outline:none;border-color:var(--blue);box-shadow:0 0 0 2px rgba(10,101,194,.1)}
.select-zone{padding:8px 12px;border:1px solid var(--gray-300);border-radius:var(--radius-sm);font-size:13px;font-family:inherit;background:var(--white);cursor:pointer;max-width:280px}
.select-zone:focus{outline:none;border-color:var(--blue)}
.helper-text{font-size:11px;color:var(--gray-500)}
.chip-group{display:flex;flex-wrap:wrap;gap:6px}
.chip{padding:7px 16px;border:1px solid var(--gray-300);border-radius:20px;font-size:12.5px;font-family:inherit;cursor:pointer;background:var(--white);color:var(--gray-700);transition:all .15s}
.chip:hover:not(:disabled){border-color:var(--blue)}
.chip-selected{background:var(--blue)!important;color:var(--white)!important;border-color:var(--blue)!important}
.chip:disabled{opacity:.7;cursor:default}
.exercice-card{background:var(--white);border:1px solid var(--gray-200);border-radius:var(--radius);padding:16px 20px;display:flex;flex-direction:column;gap:10px}
.exercice-card h4{font-size:14px;font-weight:600;color:var(--black)}
.exercice-card p{font-size:13px;color:var(--gray-700)}
.commande-card{background:var(--white);border:1px solid var(--gray-200);border-radius:var(--radius);padding:16px 20px;display:flex;flex-direction:column;gap:8px}
.commande-header{display:flex;align-items:center;justify-content:space-between}
.commande-id{font-weight:700;font-size:14px;color:var(--blue);font-family:'DM Sans',monospace}
.commande-retrait{font-size:12px;color:var(--gray-600)}
.commande-card p{font-size:13px;color:var(--gray-700)}
.alert-text{color:var(--red)!important;font-weight:500!important;font-size:12.5px!important;background:var(--red-light);padding:6px 10px;border-radius:var(--radius-sm)}
.situation-desc{font-size:13.5px!important;color:var(--gray-800)!important;font-weight:500!important;line-height:1.5}
.info-cards-row{display:flex;gap:12px;flex-wrap:wrap}
.info-card{background:var(--white);border:1px solid var(--gray-200);border-radius:var(--radius);padding:14px 18px;flex:1;min-width:140px;text-align:center}
.info-card.warn{border-color:var(--red);background:var(--red-light)}
.info-label{display:block;font-size:11px;color:var(--gray-600);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px}
.info-value{font-size:22px;font-weight:700;color:var(--blue)}
.info-card.warn .info-value{color:var(--red)}
.inline-feedback{padding:6px 12px;border-radius:var(--radius-sm);font-size:12.5px;margin-top:4px}
.fb-correct{background:var(--green-light);color:var(--green)}.fb-wrong{background:var(--red-light);color:var(--red)}
.result-box{border-radius:var(--radius);padding:20px 24px;display:flex;flex-direction:column;gap:8px;align-items:flex-start}
.result-box h4{font-size:16px;font-weight:600}
.result-box p{font-size:13.5px;color:var(--gray-700)}
.result-detail{font-size:12.5px!important;color:var(--gray-600)!important;line-height:1.5}
.result-success{background:var(--green-light);border:1px solid #b5dfca}
.result-partial{background:var(--orange-light);border:1px solid #e8d5a0}
.result-fail{background:var(--red-light);border:1px solid #f5c6cb}
.btn-primary{background:var(--blue);color:var(--white);border:none;border-radius:var(--radius-sm);padding:10px 24px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;transition:all .15s;margin-top:4px}
.btn-primary:hover{background:var(--blue-dark)}
.btn-primary:disabled{opacity:.5;cursor:default}
.btn-secondary{background:var(--white);color:var(--blue);border:1px solid var(--blue);border-radius:var(--radius-sm);padding:10px 24px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;transition:all .15s;margin-top:4px}
.btn-secondary:hover{background:var(--blue-light)}
.app-footer{text-align:center;padding:24px;margin-top:20px;color:var(--gray-500);font-size:12px;border-top:1px solid var(--gray-200)}
.phase-indicator{display:flex;gap:8px;margin-bottom:4px}
.phase-dot{width:32px;height:4px;border-radius:4px;background:var(--gray-300)}
.phase-dot.active{background:var(--blue)}
.phase-dot.done{background:var(--green)}
@media(max-width:640px){.app-header{padding:10px 14px}.header-brand h1{font-size:16px}.dashboard-main{padding:14px 12px 40px}.missions-grid{grid-template-columns:1fr}.stats-row{grid-template-columns:1fr 1fr}.data-table{font-size:12px}.data-table th,.data-table td{padding:8px 10px}.name-modal{padding:32px 24px}.info-cards-row{flex-direction:column}}
`;

// ─── MISSION COMPONENTS ──────────────────────────────────────────────────────

function MissionReception({ onComplete }) {
  const [phase, setPhase] = useState(1);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Phase 1: le BL du fournisseur montre des infos, l'élève doit détecter les problèmes
  // On ne montre PAS si c'est conforme ou non — l'élève doit comparer lui-même
  const bonCommande = [
    { ref: "SNY-WH5-BLK", designation: "Casque Sony WH-1000XM5 Noir", qteCommandee: 10, puHT: 220 },
    { ref: "JBL-CHG5-BLU", designation: "JBL Charge 5 Bleu", qteCommandee: 8, puHT: 95 },
    { ref: "APL-MBA-M3", designation: "MacBook Air M3 256Go", qteCommandee: 5, puHT: 950 },
    { ref: "KDL-PW-2024", designation: "Kindle Paperwhite 2024", qteCommandee: 12, puHT: 100 },
    { ref: "PS5-SLM-WHT", designation: "PS5 Slim Blanche", qteCommandee: 4, puHT: 380 },
  ];

  const bonLivraison = [
    { ref: "SNY-WH5-BLK", designation: "Casque Sony WH-1000XM5 Noir", qteLivree: 10, puHT: 220, observation: "" },
    { ref: "JBL-CHG5-BLU", designation: "JBL Charge 5 Bleu", qteLivree: 6, puHT: 95, observation: "" },
    { ref: "APL-MBA-M3", designation: "MacBook Air M3 256Go", qteLivree: 5, puHT: 949, observation: "" },
    { ref: "KDL-PW-2024", designation: "Kindle Paperwhite 2024", qteLivree: 12, puHT: 100, observation: "1 carton présentant des traces d'humidité" },
    { ref: "PS5-SLM-WHT", designation: "PS5 Slim Blanche", qteLivree: 3, puHT: 380, observation: "" },
  ];

  // Anomalies réelles : JBL qté (8→6), MacBook prix (950→949), Kindle carton humide, PS5 qté (4→3) = 4 anomalies

  const handleSubmitP1 = () => {
    let pts = 0;
    // Anomalie détection
    if(answers.anom_jbl === "oui") pts += 2; // qté
    if(answers.anom_mac === "oui") pts += 2; // prix
    if(answers.anom_kindle === "oui") pts += 2; // état
    if(answers.anom_ps5 === "oui") pts += 2; // qté
    if(answers.anom_sony === "non") pts += 1; // pas d'anomalie
    // Total anomalies
    if(answers.nb_anomalies === "4") pts += 2;
    // Montant BL vs BC
    const montantBC = 10*220 + 8*95 + 5*950 + 12*100 + 4*380;
    const montantBL = 10*220 + 6*95 + 5*949 + 12*100 + 3*380;
    if(Math.abs(parseFloat(answers.montant_bc) - montantBC) < 5) pts += 2;
    if(Math.abs(parseFloat(answers.montant_bl) - montantBL) < 5) pts += 2;
    setScore(pts);
    setSubmitted(true);
  };

  const handleSubmitP2 = () => {
    let pts = score; // cumul phase 1
    if(answers.action_jbl === "relance") pts += 2;
    if(answers.action_mac === "corriger") pts += 2;
    if(answers.action_kindle === "reserve") pts += 2;
    if(answers.action_ps5 === "relance") pts += 2;
    if((answers.email_relance || "").length > 30) pts += 3;
    if(answers.signer === "reserve") pts += 1;
    setScore(pts);
    setSubmitted(true);
  };

  if (phase === 1) {
    return (
      <div className="mission-content">
        <div className="phase-indicator"><div className="phase-dot active"/><div className="phase-dot"/></div>
        <div className="scenario-box">
          <h3>📋 Phase 1 — Contrôle de la livraison</h3>
          <p>Le transporteur vient de déposer 5 colis. Vous disposez du <strong>bon de commande</strong> (ce que vous avez commandé) et du <strong>bon de livraison</strong> (ce que le fournisseur déclare livrer). Comparez les deux documents et identifiez chaque anomalie.</p>
        </div>

        <h4 style={{fontSize:"13px",fontWeight:600,color:"var(--blue)"}}>BON DE COMMANDE (votre commande)</h4>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead><tr><th>Réf.</th><th>Désignation</th><th>Qté</th><th>PU HT</th><th>Total HT</th></tr></thead>
            <tbody>{bonCommande.map((l,i) => (
              <tr key={i}><td>{l.ref}</td><td>{l.designation}</td><td className="text-center">{l.qteCommandee}</td><td className="text-right">{l.puHT} €</td><td className="text-right">{(l.qteCommandee*l.puHT).toFixed(2)} €</td></tr>
            ))}</tbody>
          </table>
        </div>

        <h4 style={{fontSize:"13px",fontWeight:600,color:"var(--orange)",marginTop:8}}>BON DE LIVRAISON (du fournisseur)</h4>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead><tr><th>Réf.</th><th>Désignation</th><th>Qté livrée</th><th>PU HT</th><th>Observation</th></tr></thead>
            <tbody>{bonLivraison.map((l,i) => (
              <tr key={i}><td>{l.ref}</td><td>{l.designation}</td><td className="text-center">{l.qteLivree}</td><td className="text-right">{l.puHT} €</td><td>{l.observation || "—"}</td></tr>
            ))}</tbody>
          </table>
        </div>

        <div className="exercice-card">
          <h4>Détection des anomalies</h4>
          <p>Pour chaque ligne, indiquez si vous constatez une anomalie entre le BC et le BL :</p>
          {[["sony","Casque Sony WH-1000XM5"],["jbl","JBL Charge 5"],["mac","MacBook Air M3"],["kindle","Kindle Paperwhite"],["ps5","PS5 Slim"]].map(([key,label]) => (
            <div key={key} className="question-block" style={{marginTop:8}}>
              <label>{label} — Anomalie ?</label>
              <div className="radio-group">
                {["oui","non"].map(v => (
                  <label key={v} className={`radio-pill ${answers[`anom_${key}`]===v?"selected":""}`}>
                    <input type="radio" name={`anom_${key}`} value={v} onChange={e=>setAnswers(a=>({...a,[`anom_${key}`]:e.target.value}))} disabled={submitted}/> {v==="oui"?"Oui":"Non"}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="question-block">
          <label>Nombre total d'anomalies détectées :</label>
          <div className="radio-group">
            {["1","2","3","4","5"].map(n => (
              <label key={n} className={`radio-pill ${answers.nb_anomalies===n?"selected":""}`}>
                <input type="radio" name="nb_anomalies" value={n} onChange={e=>setAnswers(a=>({...a,nb_anomalies:e.target.value}))} disabled={submitted}/> {n}
              </label>
            ))}
          </div>
        </div>

        <div className="question-block">
          <label>Montant total HT du Bon de Commande :</label>
          <div className="input-row"><input type="number" className="input-prix" value={answers.montant_bc||""} onChange={e=>setAnswers(a=>({...a,montant_bc:e.target.value}))} disabled={submitted} placeholder="Montant BC"/><span className="unit">€</span></div>
        </div>
        <div className="question-block">
          <label>Montant total HT du Bon de Livraison :</label>
          <div className="input-row"><input type="number" className="input-prix" value={answers.montant_bl||""} onChange={e=>setAnswers(a=>({...a,montant_bl:e.target.value}))} disabled={submitted} placeholder="Montant BL"/><span className="unit">€</span></div>
        </div>

        {!submitted ? <button className="btn-primary" onClick={handleSubmitP1}>Valider le contrôle</button> : (
          <div className={`result-box ${score>=11?"result-success":score>=7?"result-partial":"result-fail"}`}>
            <h4>{score>=11?"✅ Contrôle rigoureux !":score>=7?"⚠️ Des anomalies vous ont échappé":"❌ Contrôle insuffisant"}</h4>
            <p>Score Phase 1 : {score}/15</p>
            {score >= 7 ? <button className="btn-primary" onClick={()=>{setPhase(2);setSubmitted(false)}}>Phase 2 : Actions →</button>
            : <button className="btn-secondary" onClick={()=>{setSubmitted(false);setAnswers({})}}>Réessayer</button>}
          </div>
        )}
      </div>
    );
  }

  // Phase 2 : actions
  return (
    <div className="mission-content">
      <div className="phase-indicator"><div className="phase-dot done"/><div className="phase-dot active"/></div>
      <div className="scenario-box">
        <h3>📋 Phase 2 — Actions correctives</h3>
        <p>Vous avez identifié les anomalies. Décidez maintenant de l'action à mener pour chaque cas, puis rédigez un e-mail de relance au fournisseur.</p>
      </div>

      {[
        {key:"jbl",label:"JBL Charge 5 — 6 reçues au lieu de 8",options:[["relance","Relancer le fournisseur pour les 2 manquantes"],["accepter","Accepter la livraison partielle"],["retour","Retourner les 6 reçues"]]},
        {key:"mac",label:"MacBook Air M3 — PU HT à 949 € au lieu de 950 €",options:[["corriger","Demander une facture rectificative"],["accepter","Accepter tel quel"],["retour","Refuser la livraison"]]},
        {key:"kindle",label:"Kindle Paperwhite — 1 carton avec traces d'humidité",options:[["reserve","Émettre une réserve sur le BL"],["accepter","Accepter sans réserve"],["retour","Refuser tout le lot"]]},
        {key:"ps5",label:"PS5 Slim — 3 reçues au lieu de 4",options:[["relance","Relancer le fournisseur pour la manquante"],["accepter","Accepter la livraison partielle"],["annuler","Annuler toute la ligne"]]},
      ].map(item => (
        <div key={item.key} className="exercice-card">
          <h4>{item.label}</h4>
          <div className="radio-group">
            {item.options.map(([v,l]) => (
              <label key={v} className={`radio-pill ${answers[`action_${item.key}`]===v?"selected":""}`}>
                <input type="radio" name={`action_${item.key}`} value={v} onChange={e=>setAnswers(a=>({...a,[`action_${item.key}`]:e.target.value}))} disabled={submitted}/> {l}
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="question-block">
        <label>Signez-vous le BL en l'état ?</label>
        <div className="radio-group">
          {[["oui","Oui, sans réserve"],["reserve","Oui, avec réserves"],["non","Non, je refuse de signer"]].map(([v,l]) => (
            <label key={v} className={`radio-pill ${answers.signer===v?"selected":""}`}>
              <input type="radio" name="signer" value={v} onChange={e=>setAnswers(a=>({...a,signer:e.target.value}))} disabled={submitted}/> {l}
            </label>
          ))}
        </div>
      </div>

      <div className="question-block">
        <label>Rédigez un e-mail de relance au fournisseur pour les produits manquants :</label>
        <textarea className="text-area" value={answers.email_relance||""} onChange={e=>setAnswers(a=>({...a,email_relance:e.target.value}))} disabled={submitted} placeholder="Objet : Livraison incomplète — Commande n°...&#10;&#10;Madame, Monsieur,&#10;&#10;..." rows={6}/>
      </div>

      {!submitted ? <button className="btn-primary" onClick={handleSubmitP2}>Valider</button> : (
        <div className={`result-box ${score>=22?"result-success":score>=15?"result-partial":"result-fail"}`}>
          <h4>{score>=22?"✅ Gestion exemplaire !":score>=15?"⚠️ Quelques points à revoir":"❌ Procédures à réviser"}</h4>
          <p>Score total : {score}/27</p>
          <p className="result-detail">4 anomalies : JBL (qté -2), MacBook (prix erroné -1€), Kindle (carton humide), PS5 (qté -1). Le BL se signe toujours avec réserves quand il y a des anomalies.</p>
          {score>=15?<button className="btn-primary" onClick={()=>onComplete(score>=22?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setAnswers(a=>({...a,action_jbl:undefined,action_mac:undefined,action_kindle:undefined,action_ps5:undefined,signer:undefined,email_relance:""}))}}>Réessayer Phase 2</button>}
        </div>
      )}
    </div>
  );
}

function MissionCommande({ onComplete }) {
  const [phase, setPhase] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [commande, setCommande] = useState({});
  const [justification, setJustification] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const definitions = [
    { question: "Quantité maximale de produits que le rayon peut contenir pour une référence donnée.", correct: "initial" },
    { question: "Seuil qui déclenche automatiquement une procédure de réapprovisionnement.", correct: "alerte" },
    { question: "Quantité tampon destinée à absorber les aléas (retard de livraison, pic de demande imprévu).", correct: "securite" },
    { question: "En dessous de ce niveau, la rupture de stock est quasi certaine avant la prochaine livraison.", correct: "minimal" },
  ];

  const handleQuizSubmit = () => {
    let pts = 0;
    definitions.forEach((d,i) => { if(quizAnswers[i]===d.correct) pts+=2; });
    setQuizScore(pts); setQuizSubmitted(true);
  };

  const getStatut = p => {
    if(p.stockActuel===0) return {label:"RUPTURE",color:"status-error",urgence:4};
    if(p.stockActuel<=p.stockSecurite) return {label:"Critique",color:"status-error",urgence:3};
    if(p.stockActuel<=p.stockMinimal) return {label:"Bas",color:"status-warn",urgence:2};
    if(p.stockActuel<=p.stockAlerte) return {label:"À surveiller",color:"status-warn",urgence:1};
    return {label:"OK",color:"status-ok",urgence:0};
  };

  const produitsAnalyse = PRODUCTS.map(p=>({...p,statut:getStatut(p)})).sort((a,b)=>b.statut.urgence-a.statut.urgence);
  const produitsCritiques = produitsAnalyse.filter(p=>p.statut.urgence>0);
  const total = produitsCritiques.reduce((s,p)=>s+(commande[p.id]||0)*p.prixAchat,0);

  const handleCommandeSubmit = () => {
    let pts = quizScore;
    produitsCritiques.forEach(p => {
      const qty=commande[p.id]||0;
      const qtyIdeale=p.stockInitial-p.stockActuel;
      const respectLot=qty>0&&qty%p.lotMinimum===0;
      if(qty>=qtyIdeale&&respectLot) pts+=3;
      else if(qty>=(p.stockAlerte-p.stockActuel)&&qty>0) pts+=2;
      else if(qty>0) pts+=1;
      if(p.stockActuel===0&&qty>0) pts+=1;
    });
    if(justification.length>30) pts+=3;
    else if(justification.length>15) pts+=1;
    setScore(pts); setSubmitted(true);
  };

  const maxScore = 8 + produitsCritiques.length*3 + produitsCritiques.filter(p=>p.stockActuel===0).length + 3;

  if(phase===1) {
    return (
      <div className="mission-content">
        <div className="phase-indicator"><div className="phase-dot active"/><div className="phase-dot"/></div>
        <div className="scenario-box">
          <h3>📋 Phase 1 — Les niveaux de stock</h3>
          <p>Associez chaque description au bon type de stock. Attention aux pièges : les formulations sont proches.</p>
        </div>
        <div className="formulas-box">
          <h4>📐 Rappels</h4>
          <p><strong>Stock initial</strong> — capacité maximale de stockage pour une référence</p>
          <p><strong>Stock d'alerte</strong> — seuil déclenchant le réapprovisionnement</p>
          <p><strong>Stock de sécurité</strong> — marge de précaution contre les aléas</p>
          <p><strong>Stock minimal</strong> — seuil critique, rupture imminente</p>
        </div>
        {definitions.map((d,i) => (
          <div key={i} className="exercice-card">
            <p className="situation-desc">« {d.question} »</p>
            <div className="radio-group">
              {[["initial","Stock initial"],["alerte","Stock d'alerte"],["securite","Stock de sécurité"],["minimal","Stock minimal"]].map(([v,l])=>(
                <label key={v} className={`radio-pill ${quizAnswers[i]===v?"selected":""}`}><input type="radio" name={`def${i}`} value={v} onChange={e=>setQuizAnswers(a=>({...a,[i]:e.target.value}))} disabled={quizSubmitted}/> {l}</label>
              ))}
            </div>
            {quizSubmitted && <div className={`inline-feedback ${quizAnswers[i]===d.correct?"fb-correct":"fb-wrong"}`}>{quizAnswers[i]===d.correct?"✅":"❌"} {["Stock initial","Stock d'alerte","Stock de sécurité","Stock minimal"][["initial","alerte","securite","minimal"].indexOf(d.correct)]}</div>}
          </div>
        ))}
        {!quizSubmitted ? <button className="btn-primary" onClick={handleQuizSubmit}>Vérifier</button> : (
          <div className={`result-box ${quizScore>=6?"result-success":quizScore>=4?"result-partial":"result-fail"}`}>
            <h4>{quizScore>=6?"✅ Bien !":quizScore>=4?"⚠️ Confusions":"❌ À revoir"}</h4>
            <p>Score : {quizScore}/8</p>
            {quizScore>=4?<button className="btn-primary" onClick={()=>setPhase(2)}>Phase 2 →</button>:<button className="btn-secondary" onClick={()=>{setQuizSubmitted(false);setQuizAnswers({})}}>Réessayer</button>}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mission-content">
      <div className="phase-indicator"><div className="phase-dot done"/><div className="phase-dot active"/></div>
      <div className="scenario-box">
        <h3>📋 Phase 2 — Analyse & commande</h3>
        <p>Analysez les niveaux de stock. Identifiez les produits à réapprovisionner par ordre d'urgence. Passez commande en respectant les <strong>lots minimum fournisseur</strong>. L'objectif est de remonter au stock initial.</p>
      </div>
      <div className="info-cards-row">
        <div className="info-card warn"><span className="info-label">Produits critiques</span><span className="info-value">{produitsCritiques.length}</span></div>
        <div className="info-card"><span className="info-label">Dont en rupture</span><span className="info-value" style={{color:"var(--red)"}}>{produitsCritiques.filter(p=>p.stockActuel===0).length}</span></div>
        <div className="info-card"><span className="info-label">Montant HT</span><span className="info-value">{total.toFixed(2)} €</span></div>
      </div>
      <div className="data-table-wrap">
        <table className="data-table">
          <thead><tr><th>Produit</th><th>Actuel</th><th>Minimal</th><th>Sécurité</th><th>Alerte</th><th>Initial</th><th>Statut</th><th>Lot min.</th><th>Délai</th><th>Commander</th></tr></thead>
          <tbody>{produitsAnalyse.map(p=>(
            <tr key={p.id} style={p.statut.urgence>=3?{background:"var(--red-light)"}:p.statut.urgence>=1?{background:"var(--orange-light)"}:{}}>
              <td className="font-medium">{p.name}</td><td className="text-center"><strong>{p.stockActuel}</strong></td><td className="text-center">{p.stockMinimal}</td><td className="text-center">{p.stockSecurite}</td><td className="text-center">{p.stockAlerte}</td><td className="text-center">{p.stockInitial}</td>
              <td><span className={`status-tag ${p.statut.color}`}>{p.statut.label}</span></td><td className="text-center">{p.lotMinimum}</td><td className="text-center">{p.delaiLivraison}j</td>
              <td>{p.statut.urgence>0?<input type="number" min="0" className="input-small" value={commande[p.id]||""} onChange={e=>setCommande(c=>({...c,[p.id]:Math.max(0,parseInt(e.target.value)||0)}))} disabled={submitted} placeholder="Qté"/>:<span style={{fontSize:"11px",color:"var(--gray-500)"}}>—</span>}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="question-block">
        <label>Justifiez vos choix (priorités, quantités, contraintes lot minimum, délai) :</label>
        <textarea className="text-area" value={justification} onChange={e=>setJustification(e.target.value)} disabled={submitted} placeholder="Expliquez votre raisonnement pour chaque ligne commandée…" rows={5}/>
      </div>
      {!submitted?<button className="btn-primary" onClick={handleCommandeSubmit}>Valider</button>:(
        <div className={`result-box ${score>=Math.round(maxScore*.75)?"result-success":score>=Math.round(maxScore*.5)?"result-partial":"result-fail"}`}>
          <h4>{score>=Math.round(maxScore*.75)?"✅ Commande optimale !":score>=Math.round(maxScore*.5)?"⚠️ Acceptable":"❌ À retravailler"}</h4>
          <p>Score : {score}/{maxScore}</p>
          <p className="result-detail">Commander par multiples du lot minimum. Priorité aux ruptures puis aux produits sous stock de sécurité.
          {produitsCritiques.map(p=>{const ideal=p.stockInitial-p.stockActuel;const lot=Math.ceil(ideal/p.lotMinimum)*p.lotMinimum;return ` • ${p.name}: ${lot} (${lot/p.lotMinimum}×${p.lotMinimum}).`}).join("")}</p>
          {score>=Math.round(maxScore*.5)?<button className="btn-primary" onClick={()=>onComplete(score>=Math.round(maxScore*.75)?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setCommande({});setJustification("")}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

function MissionPrix({ onComplete }) {
  const exercices = [
    { produit: "Casque Bluetooth X200", prixAchat: 45, donnee: "Taux de marque : 40%", type: "marque", correctPV: 75 },
    { produit: "Enceinte Nomad Pro", prixAchat: 80, donnee: "Coefficient multiplicateur : 2.2", type: "coef", correctPV: 176 },
    { produit: "Clé USB UltraSpeed 128Go", prixAchat: 12, donnee: "Taux de marge : 60%", type: "marge", correctPV: 19.2 },
    { produit: "Webcam StreamHD", prixAchat: 35, donnee: "Le magasin souhaite réaliser une marge brute de 21 €", type: "marge_brute", correctPV: 56 },
    { produit: "Câble HDMI Premium 2m", prixAchat: 8, donnee: "PV TTC souhaité : 19,90 € (TVA 20%)", type: "tva_inverse", correctPV: 16.58 },
  ];

  const [answers, setAnswers] = useState({});
  const [marges, setMarges] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let pts = 0;
    exercices.forEach((ex,i) => {
      const v = parseFloat(answers[i]);
      if(Math.abs(v - ex.correctPV) < 0.1) pts += 3;
      else if(Math.abs(v - ex.correctPV) < 1) pts += 2;
      else if(Math.abs(v - ex.correctPV) < 5) pts += 1;
    });
    // Marge brute pour exercice 0
    if(Math.abs(parseFloat(marges[0]) - 30) < 0.5) pts += 2;
    // Taux de marge pour exercice 1
    if(Math.abs(parseFloat(marges[1]) - 120) < 2) pts += 2;
    // Quel produit a le meilleur taux de marge ?
    if(answers.best_marge === "cable") pts += 2;
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box">
        <h3>📋 Scénario</h3>
        <p>5 nouveaux produits arrivent en rayon. Le responsable vous transmet les conditions d'achat et les consignes tarifaires. À vous de calculer chaque prix de vente et d'analyser la rentabilité.</p>
      </div>
      <div className="formulas-box">
        <h4>📐 Formules à connaître</h4>
        <p>Taux de marque : PV HT = PA HT ÷ (1 − taux de marque)</p>
        <p>Coefficient : PV TTC = PA HT × coefficient</p>
        <p>Taux de marge : PV HT = PA HT × (1 + taux de marge)</p>
        <p>Marge brute = PV HT − PA HT</p>
        <p>PV HT = PV TTC ÷ (1 + taux TVA)</p>
      </div>
      {exercices.map((ex,i) => (
        <div key={i} className="exercice-card">
          <h4>{ex.produit}</h4>
          <p>PA HT : <strong>{ex.prixAchat} €</strong> — Consigne : {ex.donnee}</p>
          <div className="question-block">
            <label>Prix de vente :</label>
            <div className="input-row"><input type="number" step="0.01" className="input-prix" value={answers[i]||""} onChange={e=>setAnswers(a=>({...a,[i]:e.target.value}))} disabled={submitted} placeholder="PV"/><span className="unit">€</span></div>
          </div>
          {i===0 && <div className="question-block"><label>Marge brute unitaire sur ce produit :</label><div className="input-row"><input type="number" step="0.01" className="input-prix" value={marges[0]||""} onChange={e=>setMarges(m=>({...m,[0]:e.target.value}))} disabled={submitted} placeholder="Marge"/><span className="unit">€</span></div></div>}
          {i===1 && <div className="question-block"><label>Taux de marge réalisé sur ce produit :</label><div className="input-row"><input type="number" step="0.1" className="input-prix" value={marges[1]||""} onChange={e=>setMarges(m=>({...m,[1]:e.target.value}))} disabled={submitted} placeholder="Taux"/><span className="unit">%</span></div></div>}
          {submitted && <div className={`inline-feedback ${Math.abs(parseFloat(answers[i])-ex.correctPV)<1?"fb-correct":"fb-wrong"}`}>{Math.abs(parseFloat(answers[i])-ex.correctPV)<1?"✅":"❌"} Attendu : {ex.correctPV} €</div>}
        </div>
      ))}
      <div className="question-block">
        <label>Parmi ces 5 produits, lequel offre le meilleur taux de marge ?</label>
        <div className="radio-group">
          {[["casque","Casque X200"],["enceinte","Enceinte Nomad"],["cle","Clé USB"],["webcam","Webcam"],["cable","Câble HDMI"]].map(([v,l])=>(
            <label key={v} className={`radio-pill ${answers.best_marge===v?"selected":""}`}><input type="radio" name="best_marge" value={v} onChange={e=>setAnswers(a=>({...a,best_marge:e.target.value}))} disabled={submitted}/> {l}</label>
          ))}
        </div>
      </div>
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Vérifier</button>:(
        <div className={`result-box ${score>=17?"result-success":score>=11?"result-partial":"result-fail"}`}>
          <h4>{score>=17?"✅ Excellent !":score>=11?"⚠️ Quelques erreurs":"❌ Revoyez les formules"}</h4>
          <p>Score : {score}/21</p>
          <p className="result-detail">Câble HDMI = meilleur taux de marge (~107%). Marge brute casque = 30 €. Taux de marge enceinte = 120%.</p>
          {score>=11?<button className="btn-primary" onClick={()=>onComplete(score>=17?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setAnswers({});setMarges({})}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

function MissionInventaire({ onComplete }) {
  const rayonData = [
    { ref: "Sony WH-1000XM5", stockTheo: 12, stockPhys: 11, pa: 220, pv: 349.99 },
    { ref: "Logitech MX Master 3S", stockTheo: 15, stockPhys: 15, pa: 55, pv: 99.99 },
    { ref: "MacBook Air M3", stockTheo: 3, stockPhys: 2, pa: 950, pv: 1299 },
    { ref: "PS5 Slim", stockTheo: 8, stockPhys: 8, pa: 380, pv: 549.99 },
    { ref: "Nintendo Switch OLED", stockTheo: 5, stockPhys: 3, pa: 270, pv: 349.99 },
    { ref: "Le Comte de Monte-Cristo", stockTheo: 25, stockPhys: 24, pa: 6.5, pv: 12.9 },
  ];
  const [ecarts, setEcarts] = useState({});
  const [demarquePAVal, setDemarquePAVal] = useState("");
  const [demarquePVVal, setDemarquePVVal] = useState("");
  const [tauxDemarque, setTauxDemarque] = useState("");
  const [causes, setCauses] = useState("");
  const [solutions, setSolutions] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Démarque PA: 1×220 + 1×950 + 2×270 + 1×6.5 = 1716.5
  // Démarque PV: 1×349.99 + 1×1299 + 2×349.99 + 1×12.9 = 2361.87
  // Taux démarque = démarque PV / CA théorique total PV
  // CA théo = 12*349.99+15*99.99+3*1299+8*549.99+5*349.99+25*12.9 = 4199.88+1499.85+3897+4399.92+1749.95+322.5 = 16069.1
  // Taux = 2361.87/16069.1 = ~14.7%

  const handleSubmit = () => {
    let pts = 0;
    const correctEcarts = [1,0,1,0,2,1];
    rayonData.forEach((r,i) => { if(parseInt(ecarts[i])===correctEcarts[i]) pts+=1; });
    if(Math.abs(parseFloat(demarquePAVal)-1716.5)<10) pts+=3; else if(Math.abs(parseFloat(demarquePAVal)-1716.5)<100) pts+=1;
    if(Math.abs(parseFloat(demarquePVVal)-2361.87)<15) pts+=3; else if(Math.abs(parseFloat(demarquePVVal)-2361.87)<100) pts+=1;
    if(Math.abs(parseFloat(tauxDemarque)-14.7)<1) pts+=3; else if(Math.abs(parseFloat(tauxDemarque)-14.7)<3) pts+=1;
    if(causes.length>20) pts+=2;
    if(solutions.length>20) pts+=2;
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box"><h3>📋 Scénario</h3><p>Inventaire tournant du rayon high-tech. Le stock informatique est affiché. Vous avez compté physiquement les produits. Calculez les écarts, la démarque inconnue et le taux de démarque, puis proposez des actions concrètes.</p></div>
      <div className="data-table-wrap">
        <table className="data-table">
          <thead><tr><th>Référence</th><th>Stock info.</th><th>Stock physique</th><th>Écart (à calculer)</th><th>PA HT</th><th>PV TTC</th></tr></thead>
          <tbody>{rayonData.map((r,i)=>(
            <tr key={i}><td className="font-medium">{r.ref}</td><td className="text-center">{r.stockTheo}</td><td className="text-center">{r.stockPhys}</td>
            <td><input type="number" className="input-small" value={ecarts[i]??""} onChange={e=>setEcarts(ec=>({...ec,[i]:e.target.value}))} disabled={submitted} placeholder="?"/></td>
            <td className="text-right">{r.pa} €</td><td className="text-right">{r.pv} €</td></tr>
          ))}</tbody>
        </table>
      </div>
      <div className="question-block"><label>Démarque inconnue au coût d'achat (PA) :</label><div className="input-row"><input type="number" step="0.01" className="input-prix" value={demarquePAVal} onChange={e=>setDemarquePAVal(e.target.value)} disabled={submitted} placeholder="Montant PA"/><span className="unit">€</span></div></div>
      <div className="question-block"><label>Démarque inconnue au prix de vente (PV) :</label><div className="input-row"><input type="number" step="0.01" className="input-prix" value={demarquePVVal} onChange={e=>setDemarquePVVal(e.target.value)} disabled={submitted} placeholder="Montant PV"/><span className="unit">€</span></div></div>
      <div className="question-block"><label>Taux de démarque (démarque PV / CA théorique × 100) :</label><div className="input-row"><input type="number" step="0.1" className="input-prix" value={tauxDemarque} onChange={e=>setTauxDemarque(e.target.value)} disabled={submitted} placeholder="%"/><span className="unit">%</span></div></div>
      <div className="question-block"><label>Quelles sont les causes probables de cette démarque ?</label><textarea className="text-area" value={causes} onChange={e=>setCauses(e.target.value)} disabled={submitted} placeholder="Analysez les produits concernés et identifiez les causes les plus probables pour chacun…" rows={3}/></div>
      <div className="question-block"><label>Proposez 3 actions concrètes pour réduire la démarque :</label><textarea className="text-area" value={solutions} onChange={e=>setSolutions(e.target.value)} disabled={submitted} placeholder="Actions de prévention, contrôle, sécurisation…" rows={3}/></div>
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Valider</button>:(
        <div className={`result-box ${score>=16?"result-success":score>=10?"result-partial":"result-fail"}`}>
          <h4>{score>=16?"✅ Inventaire maîtrisé !":score>=10?"⚠️ Imprécisions":"❌ À retravailler"}</h4>
          <p>Score : {score}/20</p>
          <p className="result-detail">Écarts : Sony -1, Logitech 0, MacBook -1, PS5 0, Switch -2, Livre -1. Démarque PA : 1 716,50 €. Démarque PV : 2 361,87 €. Taux : ~14,7%. Un taux supérieur à 2% est critique en distribution spécialisée.</p>
          {score>=10?<button className="btn-primary" onClick={()=>onComplete(score>=16?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setEcarts({});setDemarquePAVal("");setDemarquePVVal("");setTauxDemarque("");setCauses("");setSolutions("")}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

function MissionOmnicanal({ onComplete }) {
  const commandes = [
    { id:"WEB-4021", client:"Martin Lefèvre", produit:"PS5 Slim", retrait:"Aujourd'hui 14h", stock:8 },
    { id:"WEB-4022", client:"Clara Dumont", produit:"Sony WH-1000XM5", retrait:"Aujourd'hui 16h", stock:12 },
    { id:"WEB-4023", client:"Lucas Bernard", produit:"JBL Charge 5", retrait:"Demain 10h", stock:0, probleme:true },
    { id:"WEB-4024", client:"Sophie Martin", produit:"MacBook Air M3", retrait:"Aujourd'hui 17h", stock:3, note:"Cliente a précisé par téléphone qu'elle veut la version Gris Sidéral. Vous n'avez que la version Argent." },
  ];
  const [actions, setActions] = useState({});
  const [msgs, setMsgs] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let pts=0;
    if(actions["WEB-4021"]==="preparer") pts+=2;
    if(actions["WEB-4022"]==="preparer") pts+=2;
    if(actions["WEB-4023"]==="contacter") pts+=3;
    if(actions["WEB-4024"]==="contacter") pts+=3;
    if(actions.ordre==="4021first") pts+=2;
    if((msgs["WEB-4023"]||"").length>15) pts+=2;
    if((msgs["WEB-4024"]||"").length>15) pts+=2;
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box"><h3>📋 Scénario</h3><p>4 commandes Click & Collect sont en attente. Analysez chaque situation et décidez de l'action. Pour les cas problématiques, rédigez le message SMS à envoyer au client.</p></div>
      {commandes.map(c=>(
        <div key={c.id} className="commande-card">
          <div className="commande-header"><span className="commande-id">{c.id}</span><span className="commande-retrait">🕐 {c.retrait}</span></div>
          <p><strong>Client :</strong> {c.client} — <strong>Produit :</strong> {c.produit} — Stock dispo : {c.stock}</p>
          {c.probleme&&<p className="alert-text">⚠️ Stock à 0 pour cette référence.</p>}
          {c.note&&<p style={{fontSize:"12.5px",color:"var(--orange)",fontWeight:500}}>📝 {c.note}</p>}
          <div className="question-block"><label>Action :</label>
            <div className="radio-group">
              {[["preparer","Préparer le colis"],["contacter","Contacter le client"],["annuler","Annuler"],["reporter","Reporter"]].map(([v,l])=>(
                <label key={v} className={`radio-pill ${actions[c.id]===v?"selected":""}`}><input type="radio" name={c.id} value={v} onChange={e=>setActions(a=>({...a,[c.id]:e.target.value}))} disabled={submitted}/> {l}</label>
              ))}
            </div>
          </div>
          {(c.probleme||c.note)&&<div className="question-block"><label>Message au client :</label><textarea className="text-area" value={msgs[c.id]||""} onChange={e=>setMsgs(m=>({...m,[c.id]:e.target.value}))} disabled={submitted} placeholder="Bonjour M./Mme..., votre commande..." rows={3}/></div>}
        </div>
      ))}
      <div className="question-block"><label>Ordre de préparation des commandes disponibles ?</label>
        <div className="radio-group">
          {[["4021first","4021 (14h) → 4022 (16h) → 4024 (17h)"],["4022first","4022 d'abord"],["nimporte","Peu importe"]].map(([v,l])=>(
            <label key={v} className={`radio-pill ${actions.ordre===v?"selected":""}`}><input type="radio" name="ordre" value={v} onChange={e=>setActions(a=>({...a,ordre:e.target.value}))} disabled={submitted}/> {l}</label>
          ))}
        </div>
      </div>
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Valider</button>:(
        <div className={`result-box ${score>=13?"result-success":score>=8?"result-partial":"result-fail"}`}>
          <h4>{score>=13?"✅ Gestion omnicanale maîtrisée !":score>=8?"⚠️ Des points à revoir":"❌ À retravailler"}</h4>
          <p>Score : {score}/16</p>
          <p className="result-detail">JBL en rupture → contacter + proposer alternative. MacBook coloris indisponible → contacter AVANT de préparer. Ordre = urgence retrait.</p>
          {score>=8?<button className="btn-primary" onClick={()=>onComplete(score>=13?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setActions({});setMsgs({})}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

function MissionRetours({ onComplete }) {
  const cas = [
    { produit:"Casque Sony WH-1000XM5", probleme:"Arceau fissuré constaté à la mise en rayon, produit jamais vendu, reçu il y a 3 jours", qte:1 },
    { produit:"Lot de 20 romans Hachette", probleme:"5 exemplaires avec couvertures gondolées (défaut d'impression visible)", qte:"5/20" },
    { produit:'Écran Samsung 27"', probleme:"Référence livrée : LS27BG950 — Référence commandée : LS27AG950. Mauvais modèle.", qte:1 },
    { produit:"Lot de 3 Kindle Paperwhite", probleme:"Emballages intacts mais date de fabrication > 18 mois. Garantie constructeur potentiellement réduite.", qte:3 },
  ];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let pts=0;
    if(answers.action0==="retour") pts+=2;
    if(answers.action1==="avoir") pts+=2;
    if(answers.action2==="retour") pts+=2;
    if(answers.action3==="negocier") pts+=2;
    if(answers.doc0==="bl_retour") pts+=1;
    if(answers.doc1==="bl_retour") pts+=1;
    if(answers.doc2==="bl_retour") pts+=1;
    if(answers.doc3==="courrier") pts+=1;
    if(answers.priorite==="ecran") pts+=2;
    if((answers.relance||"").length>30) pts+=3;
    if(answers.dechet==="recyclage") pts+=1;
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box"><h3>📋 Scénario</h3><p>4 cas de produits non conformes en réserve. Pour chacun, déterminez l'action, le document adapté, puis priorisez et rédigez la relance la plus urgente.</p></div>
      {cas.map((c,i)=>(
        <div key={i} className="exercice-card">
          <h4>{c.produit} (×{c.qte})</h4><p>{c.probleme}</p>
          <div className="question-block"><label>Action :</label>
            <div className="radio-group">
              {[["retour","Retour fournisseur"],["avoir","Demander un avoir"],["solde","Solder en magasin"],["negocier","Négocier une remise"],["detruire","Détruire/recycler"]].map(([v,l])=>(
                <label key={v} className={`radio-pill ${answers[`action${i}`]===v?"selected":""}`}><input type="radio" name={`action${i}`} value={v} onChange={e=>setAnswers(a=>({...a,[`action${i}`]:e.target.value}))} disabled={submitted}/> {l}</label>
              ))}
            </div>
          </div>
          <div className="question-block"><label>Document :</label>
            <div className="radio-group">
              {[["bl_retour","Bon de retour"],["courrier","Courrier de réclamation"],["rien","Aucun"]].map(([v,l])=>(
                <label key={v} className={`radio-pill ${answers[`doc${i}`]===v?"selected":""}`}><input type="radio" name={`doc${i}`} value={v} onChange={e=>setAnswers(a=>({...a,[`doc${i}`]:e.target.value}))} disabled={submitted}/> {l}</label>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="question-block"><label>Quel cas traitez-vous en priorité ?</label>
        <div className="radio-group">
          {[["casque","Casque Sony"],["romans","Romans Hachette"],["ecran","Écran Samsung"],["kindle","Kindle"]].map(([v,l])=>(
            <label key={v} className={`radio-pill ${answers.priorite===v?"selected":""}`}><input type="radio" name="priorite" value={v} onChange={e=>setAnswers(a=>({...a,priorite:e.target.value}))} disabled={submitted}/> {l}</label>
          ))}
        </div>
      </div>
      <div className="question-block"><label>Que faites-vous des 5 romans gondolés s'ils ne sont pas repris ?</label>
        <div className="radio-group">
          {[["poubelle","Poubelle"],["recyclage","Filière recyclage papier"],["don","Don association"],["solde","Soldés à -70%"]].map(([v,l])=>(
            <label key={v} className={`radio-pill ${answers.dechet===v?"selected":""}`}><input type="radio" name="dechet" value={v} onChange={e=>setAnswers(a=>({...a,dechet:e.target.value}))} disabled={submitted}/> {l}</label>
          ))}
        </div>
      </div>
      <div className="question-block"><label>Rédigez l'e-mail de relance pour le cas prioritaire :</label>
        <textarea className="text-area" value={answers.relance||""} onChange={e=>setAnswers(a=>({...a,relance:e.target.value}))} disabled={submitted} placeholder="Objet : ...&#10;&#10;Madame, Monsieur,&#10;..." rows={6}/>
      </div>
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Valider</button>:(
        <div className={`result-box ${score>=14?"result-success":score>=9?"result-partial":"result-fail"}`}>
          <h4>{score>=14?"✅ Gestion rigoureuse !":score>=9?"⚠️ Correct":"❌ À revoir"}</h4>
          <p>Score : {score}/18</p>
          <p className="result-detail">Casque → retour (défaut). Romans 5/20 → avoir (retour disproportionné). Écran → retour + prioritaire (mauvaise réf = erreur fournisseur bloquante). Kindle → négocier remise (pas défectueux mais garantie réduite). Romans non repris → recyclage papier (valorisation des déchets).</p>
          {score>=9?<button className="btn-primary" onClick={()=>onComplete(score>=14?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setAnswers({})}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

function MissionImplantation({ onComplete }) {
  const zones = ["Entrée / Zone chaude","Fond / Zone froide","Caisse / Impulsion","Allée centrale","Vitrine"];
  const items = [
    { name:"Nouveauté casque Sony (lancement national)", correct:0 },
    { name:"Coques iPhone et protections d'écran", correct:2 },
    { name:"TV Samsung OLED 65\" (produit premium)", correct:3 },
    { name:"Romans en promotion (-30%)", correct:1 },
    { name:"PS5 édition collector limitée (50 ex. en France)", correct:4 },
    { name:"Pile bouton et carte micro-SD", correct:2 },
    { name:"Enceinte JBL (meilleure vente du mois)", correct:0 },
  ];
  const [placements, setPlacements] = useState({});
  const [justif, setJustif] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let pts=0;
    items.forEach((p,i)=>{ if(parseInt(placements[i])===p.correct) pts+=2; });
    if(justif.length>20) pts+=2;
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box"><h3>📋 Scénario</h3><p>Réorganisation du magasin. Le directeur vous demande de placer 7 familles/produits dans la zone la plus adaptée. Justifiez ensuite votre logique d'implantation.</p></div>
      <div className="formulas-box">
        <h4>📐 Rappels merchandising</h4>
        <p><strong>Zone chaude</strong> (entrée) : fort passage, nouveautés, produits d'appel</p>
        <p><strong>Zone froide</strong> (fond) : produits destination, le client fait l'effort</p>
        <p><strong>Caisse / Impulsion</strong> : petit prix, achat non prémédité</p>
        <p><strong>Allée centrale</strong> : produits phares, promotions, visibilité maximale</p>
        <p><strong>Vitrine</strong> : image de marque, exclusivités, prestige</p>
      </div>
      {items.map((p,i)=>(
        <div key={i} className="exercice-card">
          <h4>{p.name}</h4>
          <select className="select-zone" value={placements[i]??""} onChange={e=>setPlacements(pl=>({...pl,[i]:e.target.value}))} disabled={submitted}>
            <option value="">— Zone —</option>{zones.map((z,zi)=><option key={zi} value={zi}>{z}</option>)}
          </select>
          {submitted&&<div className={`inline-feedback ${parseInt(placements[i])===p.correct?"fb-correct":"fb-wrong"}`}>{parseInt(placements[i])===p.correct?"✅":`❌ → ${zones[p.correct]}`}</div>}
        </div>
      ))}
      <div className="question-block"><label>Justifiez votre logique d'implantation globale :</label><textarea className="text-area" value={justif} onChange={e=>setJustif(e.target.value)} disabled={submitted} placeholder="Pourquoi avez-vous placé les nouveautés ici, les achats d'impulsion là…" rows={4}/></div>
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Valider</button>:(
        <div className={`result-box ${score>=12?"result-success":score>=8?"result-partial":"result-fail"}`}>
          <h4>{score>=12?"✅ Implantation cohérente !":score>=8?"⚠️ Ajustements":"❌ Revoyez les zones"}</h4>
          <p>Score : {score}/16</p>
          {score>=8?<button className="btn-primary" onClick={()=>onComplete(score>=12?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setPlacements({});setJustif("")}}>Réessayer</button>}
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
  const [disposition, setDisposition] = useState("");
  const [cible, setCible] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const toggleP = p=>setProduits(prev=>prev.includes(p)?prev.filter(x=>x!==p):prev.length<5?[...prev,p]:prev);
  const handleSubmit = () => {
    let pts=0;
    if(theme) pts+=1;
    if(produits.length>=3&&produits.length<=5) pts+=2;
    if(couleurs.length>10) pts+=2;
    if(message.length>10) pts+=2;
    if(disposition.length>15) pts+=3;
    if(cible.length>10) pts+=2;
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box"><h3>📋 Scénario</h3><p>Concevez un concept vitrine complet pour la prochaine opération. Votre proposition doit convaincre le directeur : thème, produits, ambiance, disposition physique, cible et accroche.</p></div>
      <div className="question-block"><label>Thème :</label><div className="chip-group">{themes.map(t=><button key={t} className={`chip ${theme===t?"chip-selected":""}`} onClick={()=>!submitted&&setTheme(t)} disabled={submitted}>{t}</button>)}</div></div>
      <div className="question-block"><label>Produits en vitrine (3-5) :</label><div className="chip-group">{PRODUCTS.map(p=><button key={p.id} className={`chip ${produits.includes(p.name)?"chip-selected":""}`} onClick={()=>!submitted&&toggleP(p.name)} disabled={submitted}>{p.name}</button>)}</div><span className="helper-text">{produits.length}/5</span></div>
      <div className="question-block"><label>Cible visée et pourquoi :</label><textarea className="text-area" value={cible} onChange={e=>setCible(e.target.value)} disabled={submitted} placeholder="Ex : Étudiants 18-25 ans, car rentrée = équipement informatique + budget serré…" rows={2}/></div>
      <div className="question-block"><label>Couleurs, éclairage & ambiance :</label><textarea className="text-area" value={couleurs} onChange={e=>setCouleurs(e.target.value)} disabled={submitted} placeholder="Décrivez l'atmosphère recherchée, les matériaux, la lumière…" rows={2}/></div>
      <div className="question-block"><label>Disposition physique des produits (décrivez le placement) :</label><textarea className="text-area" value={disposition} onChange={e=>setDisposition(e.target.value)} disabled={submitted} placeholder="Ex : Produit phare au centre sur un podium éclairé, accessoires en périphérie sur des étagères en escalier…" rows={3}/></div>
      <div className="question-block"><label>Accroche vitrine :</label><input type="text" className="input-full" value={message} onChange={e=>setMessage(e.target.value)} disabled={submitted} placeholder="Phrase d'accroche pour attirer le passant"/></div>
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Soumettre le concept</button>:(
        <div className={`result-box ${score>=9?"result-success":score>=6?"result-partial":"result-fail"}`}>
          <h4>{score>=9?"✅ Concept professionnel !":score>=6?"⚠️ Bonne base":"❌ Concept trop vague"}</h4>
          <p>Score : {score}/12</p>
          <p className="result-detail">Un concept pro = thème clair, cible identifiée, 3-5 produits cohérents, ambiance décrite, disposition physique précise, et accroche percutante.</p>
          {score>=6?<button className="btn-primary" onClick={()=>onComplete(score>=9?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setTheme("");setProduits([]);setCouleurs("");setMessage("");setDisposition("");setCible("")}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

function MissionBalisage({ onComplete }) {
  const etiquettes = [
    { produit:"Sony WH-1000XM5", prixAffiche:"349,99 €", obs:"Étiquette propre, antivol en place", isErr:false },
    { produit:"MacBook Air M3", prixAffiche:"1 199,00 €", obs:"Le prix catalogue fournisseur a changé le mois dernier", isErr:true },
    { produit:"PS5 Slim", prixAffiche:"549,99 €", obs:"Étiquette en place, produit bien rangé", isErr:false },
    { produit:"Nintendo Switch OLED", prixAffiche:"349,99 €", obs:"L'étiquette est partiellement illisible (déchirée)", isErr:true },
    { produit:"Canon EOS R6 II", prixAffiche:"2 499,00 €", obs:"Pas de dispositif antivol sur ce produit à 2 499 €", isErr:true },
    { produit:"JBL Charge 5", prixAffiche:"169,99 €", obs:"L'emplacement physique est vide mais l'étiquette est toujours en rayon", isErr:true },
  ];
  const [answers, setAnswers] = useState({});
  const [corrections, setCorrections] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let pts=0;
    etiquettes.forEach((e,i)=>{ if(answers[`err${i}`]===(e.isErr?"oui":"non")) pts+=2; });
    if(corrections.length>20) pts+=3;
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box"><h3>📋 Scénario</h3><p>Tournée de contrôle avant l'ouverture. Pour chaque produit, analysez la situation décrite et déterminez s'il y a une anomalie à corriger. Attention : les anomalies ne sont pas toujours évidentes, il faut raisonner.</p></div>
      <div className="data-table-wrap">
        <table className="data-table">
          <thead><tr><th>Produit</th><th>Prix affiché</th><th>Situation observée</th><th>Anomalie ?</th></tr></thead>
          <tbody>{etiquettes.map((e,i)=>(
            <tr key={i}><td className="font-medium">{e.produit}</td><td>{e.prixAffiche}</td><td style={{maxWidth:220}}>{e.obs}</td>
            <td><div className="radio-group">
              {["oui","non"].map(v=><label key={v} className={`radio-pill ${answers[`err${i}`]===v?"selected":""}`}><input type="radio" name={`err${i}`} value={v} onChange={ev=>setAnswers(a=>({...a,[`err${i}`]:ev.target.value}))} disabled={submitted}/> {v==="oui"?"Oui":"Non"}</label>)}
            </div></td></tr>
          ))}</tbody>
        </table>
      </div>
      <div className="question-block"><label>Pour chaque anomalie détectée, décrivez la correction à appliquer :</label><textarea className="text-area" value={corrections} onChange={e=>setCorrections(e.target.value)} disabled={submitted} placeholder="MacBook : ... / Switch : ... / Canon : ... / JBL : ..." rows={5}/></div>
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Valider</button>:(
        <div className={`result-box ${score>=13?"result-success":score>=8?"result-partial":"result-fail"}`}>
          <h4>{score>=13?"✅ Œil de lynx !":score>=8?"⚠️ Des oublis":"❌ Contrôle insuffisant"}</h4>
          <p>Score : {score}/15</p>
          <p className="result-detail">4 anomalies : MacBook (prix potentiellement obsolète → vérifier et réétiqueter), Switch (étiquette déchirée → remplacer), Canon (antivol absent sur produit à 2 499 € → sécuriser), JBL (étiquette fantôme sur emplacement vide → retirer).</p>
          {score>=8?<button className="btn-primary" onClick={()=>onComplete(score>=13?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setAnswers({});setCorrections("")}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

function MissionHygiene({ onComplete }) {
  const situations = [
    { desc:"Un carton de livraison bloque partiellement une issue de secours en réserve.", action:"deplacer", priorite:1 },
    { desc:"Le sol devant le rayon gaming est mouillé suite à une fuite du climatiseur. Pas de signalétique.", action:"panneau", priorite:1 },
    { desc:"Un extincteur du rayon informatique affiche une date de vérification dépassée de 2 mois.", action:"signaler", priorite:2 },
    { desc:"Deux néons du rayon livres clignotent de façon intermittente.", action:"signaler", priorite:3 },
    { desc:"Un client vient de faire tomber une bouteille d'eau dans l'allée principale. Le sol est glissant.", action:"nettoyer", priorite:1 },
    { desc:"Vous remarquez qu'un câble électrique dénudé dépasse derrière un présentoir TV.", action:"isoler", priorite:1 },
  ];
  const [answers, setAnswers] = useState({});
  const [classement, setClassement] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let pts=0;
    situations.forEach((s,i)=>{ if(answers[`act${i}`]===s.action) pts+=2; });
    if(classement.length>15) pts+=3;
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box"><h3>📋 Scénario</h3><p>Ronde d'ouverture : 6 situations identifiées. Pour chacune, choisissez l'action prioritaire. Puis classez les 6 situations par ordre d'urgence et justifiez.</p></div>
      {situations.map((s,i)=>(
        <div key={i} className="exercice-card">
          <p className="situation-desc">{i+1}. {s.desc}</p>
          <div className="question-block"><label>Action immédiate :</label>
            <div className="radio-group">
              {[["deplacer","Dégager/déplacer"],["panneau","Baliser (panneau)"],["signaler","Signaler au responsable"],["nettoyer","Nettoyer"],["isoler","Isoler/sécuriser la zone"],["rien","Ne rien faire"]].map(([v,l])=>(
                <label key={v} className={`radio-pill ${answers[`act${i}`]===v?"selected":""}`}><input type="radio" name={`act${i}`} value={v} onChange={e=>setAnswers(a=>({...a,[`act${i}`]:e.target.value}))} disabled={submitted}/> {l}</label>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="question-block"><label>Classez les 6 situations de la plus urgente à la moins urgente (numéros) et justifiez :</label><textarea className="text-area" value={classement} onChange={e=>setClassement(e.target.value)} disabled={submitted} placeholder="1er : situation n°... car...&#10;2e : situation n°... car...&#10;..." rows={5}/></div>
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Valider</button>:(
        <div className={`result-box ${score>=12?"result-success":score>=8?"result-partial":"result-fail"}`}>
          <h4>{score>=12?"✅ Réflexes sécurité solides !":score>=8?"⚠️ Bon niveau":"❌ Points de vigilance"}</h4>
          <p>Score : {score}/15</p>
          <p className="result-detail">Priorités maximales : câble dénudé (électrocution), sol mouillé (chute client), issue de secours bloquée (évacuation), eau renversée. L'extincteur périmé et les néons sont importants mais moins urgents.</p>
          {score>=8?<button className="btn-primary" onClick={()=>onComplete(score>=12?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setAnswers({});setClassement("")}}>Réessayer</button>}
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
  const [budget, setBudget] = useState("");
  const [kpi, setKpi] = useState("");
  const [risques, setRisques] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const toggleP = p=>setProduitsCibles(prev=>prev.includes(p)?prev.filter(x=>x!==p):[...prev,p]);
  const toggleS = s=>setSupport(prev=>prev.includes(s)?prev.filter(x=>x!==s):[...prev,s]);

  const handleSubmit = () => {
    let pts=0;
    if(typePromo) pts+=1;
    if(produitsCibles.length>=2&&produitsCibles.length<=5) pts+=2;
    if(reduction&&parseFloat(reduction)>0&&parseFloat(reduction)<=50) pts+=2;
    if(objectif.length>15) pts+=2;
    if(duree) pts+=1;
    if(support.length>=2) pts+=2;
    if(budget.length>0&&parseFloat(budget)>0) pts+=1;
    if(kpi.length>15) pts+=3;
    if(risques.length>15) pts+=2;
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box"><h3>📋 Scénario</h3><p>Le rayon audio affiche -15% vs objectif mensuel (CA actuel : 10 200 € / objectif : 12 000 €). Le directeur vous demande un plan d'action commercial complet incluant budget, KPI de suivi et analyse des risques.</p></div>
      <div className="info-cards-row">
        <div className="info-card warn"><span className="info-label">Écart</span><span className="info-value">-15%</span></div>
        <div className="info-card"><span className="info-label">Objectif</span><span className="info-value">12 000 €</span></div>
        <div className="info-card"><span className="info-label">CA actuel</span><span className="info-value">10 200 €</span></div>
      </div>
      <div className="question-block"><label>Type d'opération :</label><div className="chip-group">{["Remise immédiate","Lot / Bundle","Vente flash 48h","Offre remboursement","Jeu concours","Démonstration en magasin"].map(t=><button key={t} className={`chip ${typePromo===t?"chip-selected":""}`} onClick={()=>!submitted&&setTypePromo(t)} disabled={submitted}>{t}</button>)}</div></div>
      <div className="question-block"><label>Produits ciblés :</label><div className="chip-group">{PRODUCTS.filter(p=>p.cat==="audio"||p.cat==="gaming").map(p=><button key={p.id} className={`chip ${produitsCibles.includes(p.name)?"chip-selected":""}`} onClick={()=>!submitted&&toggleP(p.name)} disabled={submitted}>{p.name}</button>)}</div></div>
      <div className="question-block"><label>Réduction (%) :</label><div className="input-row"><input type="number" className="input-prix" value={reduction} onChange={e=>setReduction(e.target.value)} disabled={submitted} placeholder="Ex : 15"/><span className="unit">%</span></div></div>
      <div className="question-block"><label>Durée :</label><div className="chip-group">{["1 week-end","1 semaine","2 semaines","1 mois"].map(d=><button key={d} className={`chip ${duree===d?"chip-selected":""}`} onClick={()=>!submitted&&setDuree(d)} disabled={submitted}>{d}</button>)}</div></div>
      <div className="question-block"><label>Supports de communication :</label><div className="chip-group">{["Affichage magasin","Réseaux sociaux","Newsletter","SMS fidélité","Site web","Radio locale"].map(s=><button key={s} className={`chip ${support.includes(s)?"chip-selected":""}`} onClick={()=>!submitted&&toggleS(s)} disabled={submitted}>{s}</button>)}</div></div>
      <div className="question-block"><label>Budget communication estimé :</label><div className="input-row"><input type="number" className="input-prix" value={budget} onChange={e=>setBudget(e.target.value)} disabled={submitted} placeholder="€"/><span className="unit">€</span></div></div>
      <div className="question-block"><label>Objectif chiffré et argumenté :</label><textarea className="text-area" value={objectif} onChange={e=>setObjectif(e.target.value)} disabled={submitted} placeholder="Quel CA supplémentaire visez-vous ? Combien de pièces vendues ? En combien de temps ?" rows={3}/></div>
      <div className="question-block"><label>KPI de suivi (comment mesurez-vous le succès ?) :</label><textarea className="text-area" value={kpi} onChange={e=>setKpi(e.target.value)} disabled={submitted} placeholder="Ex : CA audio hebdo, nombre de pièces vendues, taux de transformation, panier moyen…" rows={3}/></div>
      <div className="question-block"><label>Risques identifiés et solutions :</label><textarea className="text-area" value={risques} onChange={e=>setRisques(e.target.value)} disabled={submitted} placeholder="Ex : Si les stocks JBL ne sont pas réapprovisionnés à temps…" rows={3}/></div>
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Valider</button>:(
        <div className={`result-box ${score>=13?"result-success":score>=8?"result-partial":"result-fail"}`}>
          <h4>{score>=13?"✅ Plan d'action pro !":score>=8?"⚠️ À compléter":"❌ Plan insuffisant"}</h4>
          <p>Score : {score}/16</p>
          <p className="result-detail">Un plan complet : type clair, produits ciblés, réduction réaliste, 2+ supports, budget chiffré, objectif mesurable, KPI de suivi précis, et risques anticipés.</p>
          {score>=8?<button className="btn-primary" onClick={()=>onComplete(score>=13?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setTypePromo("");setProduitsCibles([]);setReduction("");setObjectif("");setDuree("");setSupport([]);setBudget("");setKpi("");setRisques("")}}>Réessayer</button>}
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
  const [justifHeure, setJustifHeure] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let pts=0;
    if(plateforme) pts+=1;
    if(accroche.length>=5&&accroche.length<=100) pts+=2;
    if(description.length>=30) pts+=3;
    if(hashtags.includes("#")&&hashtags.split("#").length>=4) pts+=2;
    if(cta.length>5) pts+=2;
    if(heure) pts+=1;
    if(justifHeure.length>10) pts+=2;
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box"><h3>📋 Scénario</h3><p>Le magasin lance une vente flash sur le casque Sony WH-1000XM5 ce week-end. Rédigez un post professionnel pour les réseaux sociaux. Chaque choix doit être justifié.</p></div>
      <div className="question-block"><label>Plateforme :</label><div className="chip-group">{["Instagram","Facebook","TikTok","X (Twitter)"].map(p=><button key={p} className={`chip ${plateforme===p?"chip-selected":""}`} onClick={()=>!submitted&&setPlateforme(p)} disabled={submitted}>{p}</button>)}</div></div>
      <div className="question-block"><label>Accroche (max 100 car.) :</label><input type="text" className="input-full" value={accroche} onChange={e=>setAccroche(e.target.value)} disabled={submitted} placeholder="Première phrase pour capter l'attention" maxLength={100}/><span className="helper-text">{accroche.length}/100</span></div>
      <div className="question-block"><label>Corps du message :</label><textarea className="text-area" value={description} onChange={e=>setDescription(e.target.value)} disabled={submitted} placeholder="Offre, bénéfices produit, conditions, durée…" rows={5}/></div>
      <div className="question-block"><label>Hashtags (minimum 3, pertinents) :</label><input type="text" className="input-full" value={hashtags} onChange={e=>setHashtags(e.target.value)} disabled={submitted} placeholder="#VenteFlash #Audio #TechnoStore..."/></div>
      <div className="question-block"><label>Call-to-action :</label><input type="text" className="input-full" value={cta} onChange={e=>setCta(e.target.value)} disabled={submitted} placeholder="Quelle action attendez-vous du lecteur ?"/></div>
      <div className="question-block"><label>Créneau de publication :</label><div className="chip-group">{["8h-10h","12h-14h","17h-19h","20h-22h"].map(h=><button key={h} className={`chip ${heure===h?"chip-selected":""}`} onClick={()=>!submitted&&setHeure(h)} disabled={submitted}>{h}</button>)}</div></div>
      <div className="question-block"><label>Pourquoi ce créneau ?</label><textarea className="text-area" value={justifHeure} onChange={e=>setJustifHeure(e.target.value)} disabled={submitted} placeholder="Justifiez votre choix en lien avec la cible et la plateforme…" rows={2}/></div>
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Soumettre</button>:(
        <div className={`result-box ${score>=10?"result-success":score>=6?"result-partial":"result-fail"}`}>
          <h4>{score>=10?"✅ Post pro !":score>=6?"⚠️ Correct":"❌ À retravailler"}</h4>
          <p>Score : {score}/13</p>
          <p className="result-detail">Bon post = accroche captivante, offre claire avec conditions, 3+ hashtags ciblés, CTA précis, créneau justifié (17h-22h = pic d'audience).</p>
          {score>=6?<button className="btn-primary" onClick={()=>onComplete(score>=10?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setPlateforme("");setAccroche("");setDescription("");setHashtags("");setCta("");setHeure("");setJustifHeure("")}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

function MissionPerformance({ onComplete }) {
  const data = [
    { rayon:"Audio", objectif:12000, realise:10200, moisPrec:11800 },
    { rayon:"Gaming", objectif:18000, realise:19500, moisPrec:17200 },
    { rayon:"Informatique", objectif:25000, realise:23100, moisPrec:24800 },
    { rayon:"Livres", objectif:5000, realise:5400, moisPrec:4900 },
    { rayon:"Photo/Vidéo", objectif:8000, realise:6200, moisPrec:7800 },
    { rayon:"TV/Home Cinéma", objectif:15000, realise:14800, moisPrec:15100 },
  ];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let pts=0;
    if(answers.best==="Gaming") pts+=2;
    if(answers.worst==="Photo/Vidéo") pts+=2;
    const totalCA=data.reduce((s,d)=>s+d.realise,0);
    if(Math.abs(parseFloat(answers.totalCA)-totalCA)<500) pts+=2;
    const totalObj=data.reduce((s,d)=>s+d.objectif,0);
    if(Math.abs(parseFloat(answers.tauxRea)-(totalCA/totalObj*100))<2) pts+=2;
    // Marge de progression
    if(Math.abs(parseFloat(answers.ecartTotal)-(totalObj-totalCA))<500) pts+=2;
    if((answers.actions||"").length>30) pts+=3;
    if((answers.gaming_analyse||"").length>15) pts+=2;
    setScore(pts); setSubmitted(true);
  };

  return (
    <div className="mission-content">
      <div className="scenario-box"><h3>📋 Scénario</h3><p>Fin de mois. Le directeur vous demande une analyse complète : identifier les performances, calculer les indicateurs clés, et construire un plan d'action argumenté.</p></div>
      <div className="data-table-wrap">
        <table className="data-table">
          <thead><tr><th>Rayon</th><th>Objectif</th><th>Réalisé</th><th>M-1</th><th>Écart obj.</th><th>Évolution M/M-1</th></tr></thead>
          <tbody>{data.map((d,i)=>{
            const ecart=((d.realise-d.objectif)/d.objectif*100).toFixed(1);
            const evol=((d.realise-d.moisPrec)/d.moisPrec*100).toFixed(1);
            return(<tr key={i}><td className="font-medium">{d.rayon}</td><td className="text-right">{d.objectif.toLocaleString()} €</td><td className="text-right">{d.realise.toLocaleString()} €</td><td className="text-right">{d.moisPrec.toLocaleString()} €</td><td className="text-right"><span className={parseFloat(ecart)>=0?"text-green":"text-red"}>{ecart}%</span></td><td className="text-right"><span className={parseFloat(evol)>=0?"text-green":"text-red"}>{evol}%</span></td></tr>);
          })}</tbody>
        </table>
      </div>
      <div className="question-block"><label>Meilleure performance vs objectif :</label><div className="chip-group">{data.map(d=><button key={d.rayon} className={`chip ${answers.best===d.rayon?"chip-selected":""}`} onClick={()=>!submitted&&setAnswers(a=>({...a,best:d.rayon}))} disabled={submitted}>{d.rayon}</button>)}</div></div>
      <div className="question-block"><label>Rayon le plus en difficulté :</label><div className="chip-group">{data.map(d=><button key={d.rayon} className={`chip ${answers.worst===d.rayon?"chip-selected":""}`} onClick={()=>!submitted&&setAnswers(a=>({...a,worst:d.rayon}))} disabled={submitted}>{d.rayon}</button>)}</div></div>
      <div className="question-block"><label>CA total réalisé (tous rayons) :</label><div className="input-row"><input type="number" className="input-prix" value={answers.totalCA||""} onChange={e=>setAnswers(a=>({...a,totalCA:e.target.value}))} disabled={submitted} placeholder="€"/><span className="unit">€</span></div></div>
      <div className="question-block"><label>Taux de réalisation global (%) :</label><div className="input-row"><input type="number" step="0.1" className="input-prix" value={answers.tauxRea||""} onChange={e=>setAnswers(a=>({...a,tauxRea:e.target.value}))} disabled={submitted} placeholder="%"/><span className="unit">%</span></div></div>
      <div className="question-block"><label>Montant total de l'écart à rattraper :</label><div className="input-row"><input type="number" className="input-prix" value={answers.ecartTotal||""} onChange={e=>setAnswers(a=>({...a,ecartTotal:e.target.value}))} disabled={submitted} placeholder="€"/><span className="unit">€</span></div></div>
      <div className="question-block"><label>Le Gaming dépasse son objectif. Est-ce forcément positif ? Analysez :</label><textarea className="text-area" value={answers.gaming_analyse||""} onChange={e=>setAnswers(a=>({...a,gaming_analyse:e.target.value}))} disabled={submitted} placeholder="Réfléchissez aux causes possibles et aux limites d'un dépassement d'objectif…" rows={3}/></div>
      <div className="question-block"><label>Plan d'action pour les rayons en difficulté (Audio, Photo, Informatique) :</label><textarea className="text-area" value={answers.actions||""} onChange={e=>setAnswers(a=>({...a,actions:e.target.value}))} disabled={submitted} placeholder="Proposez au moins une action par rayon, chiffrée si possible…" rows={5}/></div>
      {!submitted?<button className="btn-primary" onClick={handleSubmit}>Valider</button>:(
        <div className={`result-box ${score>=12?"result-success":score>=8?"result-partial":"result-fail"}`}>
          <h4>{score>=12?"✅ Analyse solide !":score>=8?"⚠️ Analyse partielle":"❌ Insuffisante"}</h4>
          <p>Score : {score}/15</p>
          <p className="result-detail">Gaming = +8.3% vs obj. Photo = -22.5%. CA total : 79 200 €. Taux : ~95.4%. Écart : 3 800 €. Le dépassement Gaming peut masquer des objectifs trop bas, un déstockage agressif, ou un effet ponctuel (sortie jeu).</p>
          {score>=8?<button className="btn-primary" onClick={()=>onComplete(score>=12?3:2)}>Continuer</button>:<button className="btn-secondary" onClick={()=>{setSubmitted(false);setAnswers({})}}>Réessayer</button>}
        </div>
      )}
    </div>
  );
}

const MISSION_COMPONENTS = {
  reception:MissionReception, commande:MissionCommande, prix:MissionPrix,
  inventaire:MissionInventaire, omnicanal:MissionOmnicanal, retours:MissionRetours,
  implantation:MissionImplantation, vitrine:MissionVitrine, balisage:MissionBalisage,
  hygiene:MissionHygiene, promo:MissionPromo, reseaux:MissionReseaux, performance:MissionPerformance,
};

export default function App() {
  const [view, setView] = useState("dashboard");
  const [currentMission, setCurrentMission] = useState(null);
  const [completed, setCompleted] = useState({});
  const [studentName, setStudentName] = useState("");
  const [showNameModal, setShowNameModal] = useState(true);

  const totalXP = Object.entries(completed).reduce((sum,[id,stars])=>{
    const m=MISSIONS_DATA[id]; return sum+(m?Math.round(m.xp*(stars/3)):0);
  },0);
  const maxXP = Object.values(MISSIONS_DATA).reduce((s,m)=>s+m.xp,0);
  const completedCount = Object.keys(completed).length;
  const totalMissions = Object.keys(MISSIONS_DATA).length;

  const handleMissionComplete = stars => {
    setCompleted(c=>({...c,[currentMission]:Math.max(c[currentMission]||0,stars)}));
    setView("dashboard"); setCurrentMission(null);
  };

  if(showNameModal) {
    return (<><style>{styles}</style><div className="app-root"><div className="name-modal-overlay"><div className="name-modal">
      <div className="modal-icon">🏪</div><h1>{STORE_NAME}</h1>
      <p className="modal-subtitle">Simulateur de gestion — Bac Pro MCV Option A</p>
      <div className="modal-form"><label>Votre nom & prénom :</label>
      <input type="text" className="input-full" value={studentName} onChange={e=>setStudentName(e.target.value)} placeholder="Ex : Martin Lefèvre" autoFocus onKeyDown={e=>e.key==="Enter"&&studentName.trim()&&setShowNameModal(false)}/>
      <button className="btn-primary" style={{width:"100%",marginTop:12}} onClick={()=>studentName.trim()&&setShowNameModal(false)} disabled={!studentName.trim()}>Entrer dans le magasin</button>
    </div></div></div></div></>);
  }

  if(view==="mission"&&currentMission) {
    const mission=MISSIONS_DATA[currentMission]; const Comp=MISSION_COMPONENTS[currentMission];
    return (<><style>{styles}</style><div className="app-root">
      <header className="app-header">
        <button className="btn-back" onClick={()=>{setView("dashboard");setCurrentMission(null)}}>← Retour</button>
        <div className="header-center"><span className="header-icon">{mission.icon}</span><h2>{mission.title}</h2></div>
        <div className="header-right"><span className="bloc-badge" style={{background:BLOCS.find(b=>b.id===mission.bloc)?.color}}>{mission.bloc}</span></div>
      </header>
      <main className="mission-main">
        <div className="competences-bar"><span className="competences-label">Compétences :</span>{mission.competences.map((c,i)=><span key={i} className="competence-tag">{c}</span>)}</div>
        {Comp?<Comp onComplete={handleMissionComplete}/>:<p>En développement…</p>}
      </main>
    </div></>);
  }

  return (<><style>{styles}</style><div className="app-root">
    <header className="app-header">
      <div className="header-brand"><span className="brand-icon">🏪</span><div><h1>{STORE_NAME}</h1><span className="brand-sub">Simulateur de gestion</span></div></div>
      <div className="header-right"><div className="student-info"><span className="student-name">{studentName}</span><span className="student-role">Vendeur·se conseil</span></div></div>
    </header>
    <main className="dashboard-main">
      <div className="stats-row">
        <div className="stat-card"><span className="stat-value">{completedCount}/{totalMissions}</span><span className="stat-label">Missions</span><div className="progress-bar"><div className="progress-fill" style={{width:`${(completedCount/totalMissions)*100}%`}}/></div></div>
        <div className="stat-card"><span className="stat-value">{totalXP}</span><span className="stat-label">XP gagnés</span><div className="progress-bar"><div className="progress-fill xp" style={{width:`${(totalXP/maxXP)*100}%`}}/></div></div>
        <div className="stat-card"><span className="stat-value">{completedCount===totalMissions?"⭐":`${Math.round((completedCount/totalMissions)*100)}%`}</span><span className="stat-label">Progression</span></div>
      </div>
      {BLOCS.map(bloc=>(
        <section key={bloc.id} className="bloc-section">
          <div className="bloc-header"><div className="bloc-line" style={{background:bloc.color}}/><h2 className="bloc-title"><span className="bloc-id" style={{color:bloc.color}}>{bloc.id}</span> {bloc.label}</h2></div>
          <div className="missions-grid">{bloc.missions.map(mId=>{
            const m=MISSIONS_DATA[mId];const stars=completed[mId]||0;const done=stars>0;
            return(<button key={mId} className={`mission-card ${done?"mission-done":""}`} onClick={()=>{setCurrentMission(mId);setView("mission")}}>
              <div className="mission-card-top"><span className="mission-icon">{m.icon}</span>{done&&<div className="stars-display">{"★".repeat(stars)}{"☆".repeat(3-stars)}</div>}</div>
              <h3 className="mission-title">{m.title}</h3><p className="mission-desc">{m.desc}</p>
              <div className="mission-card-footer"><span className="xp-badge">+{m.xp} XP</span>{done?<span className="status-done">✓ Terminé</span>:<span className="status-todo">À faire</span>}</div>
            </button>);
          })}</div>
        </section>
      ))}
      <footer className="app-footer"><p>Bac Pro MCV Option A — Compétences 4.1A · 4.2A · 4.3A</p></footer>
    </main>
  </div></>);
}
