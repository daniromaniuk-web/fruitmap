import { useState } from 'react';

const INITIAL_TREES = [
  {
    id: 1,
    fruitName: 'Mangueira',
    description: 'Manga grande e doce, colheita em dezembro/janeiro.',
    lat: -23.5505,
    lng: -46.6333,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/320px-Hapus_Mango.jpg',
    addedBy: 'Maria S.',
    date: '2025-11-10',
    rating: 4.8,
    votes: 23,
    confirmed: true,
    tag: '🥭',
    season: 'Dez–Jan',
    seasonActive: true,
  },
  {
    id: 2,
    fruitName: 'Jabuticabeira',
    description: 'Árvore centenária no parque, frutos direto no tronco.',
    lat: -23.558,
    lng: -46.639,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Jabuticaba_1.jpg/320px-Jabuticaba_1.jpg',
    addedBy: 'Carlos M.',
    date: '2025-10-03',
    rating: 4.9,
    votes: 41,
    confirmed: true,
    tag: '🫐',
    season: 'Out–Nov',
    seasonActive: false,
  },
  {
    id: 3,
    fruitName: 'Laranjeira',
    description: 'Laranja pêra, muito doce. Boa sombra também!',
    lat: -23.545,
    lng: -46.628,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Ambersweet_oranges.jpg/320px-Ambersweet_oranges.jpg',
    addedBy: 'Ana L.',
    date: '2026-01-15',
    rating: 4.2,
    votes: 17,
    confirmed: true,
    tag: '🍊',
    season: 'Jun–Ago',
    seasonActive: false,
  },
  {
    id: 4,
    fruitName: 'Pitangueira',
    description: 'Frutos pequenos e ácidos, ótimos para suco!',
    lat: -23.562,
    lng: -46.645,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Pitangas_-_Eugenia_uniflora.jpg/320px-Pitangas_-_Eugenia_uniflora.jpg',
    addedBy: 'João R.',
    date: '2026-02-20',
    rating: 4.5,
    votes: 12,
    confirmed: false,
    tag: '🍒',
    season: 'Nov–Fev',
    seasonActive: true,
  },
  {
    id: 5,
    fruitName: 'Bananeira',
    description: 'Nanica bem madura, farta o ano todo.',
    lat: -23.54,
    lng: -46.65,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Whole-and-Split.jpg/320px-Banana-Whole-and-Split.jpg',
    addedBy: 'Lucia P.',
    date: '2026-03-01',
    rating: 4.0,
    votes: 8,
    confirmed: true,
    tag: '🍌',
    season: 'Ano todo',
    seasonActive: true,
  },
];
const PARTNERS = [
  {
    id: 1,
    name: 'Horta Viva SP',
    type: 'Horta Urbana',
    description:
      'Maior horta comunitária do bairro. Venda de mudas e cestas orgânicas toda sexta. Usuários Premium têm 10% de desconto!',
    lat: -23.548,
    lng: -46.635,
    tag: '🌿',
    badge: 'Parceiro Gold',
    color: '#f59e0b',
    phone: '(11) 99999-0001',
    hours: 'Sex 8h–13h',
  },
  {
    id: 2,
    name: 'Mercado Verde',
    type: 'Mercado Orgânico',
    description:
      'Produtos orgânicos certificados. 10% de desconto para usuários Premium do FruitMap!',
    lat: -23.555,
    lng: -46.64,
    tag: '🛒',
    badge: 'Parceiro Silver',
    color: '#94a3b8',
    phone: '(11) 99999-0002',
    hours: 'Seg–Sáb 7h–19h',
  },
  {
    id: 3,
    name: 'NaturaBio',
    type: 'Loja de Sementes',
    description:
      'Sementes nativas e exóticas. Especialistas em frutíferas urbanas da cidade.',
    lat: -23.543,
    lng: -46.652,
    tag: '🌱',
    badge: 'Anunciante',
    color: '#4ade80',
    phone: '(11) 99999-0003',
    hours: 'Seg–Sex 9h–18h',
  },
];
const FREE_LIMIT = 3;

function StarRating({ value }: { value: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          style={{
            fontSize: 12,
            color: s <= Math.round(value) ? '#FFD700' : '#2d4a35',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
function SeasonBadge({ active, season }: { active: boolean; season: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        background: active ? '#14532d' : '#1a2e1a',
        border: `1px solid ${active ? '#4ade80' : '#2d4a35'}`,
        borderRadius: 20,
        padding: '3px 10px',
        fontSize: 11,
        fontWeight: 700,
        color: active ? '#4ade80' : '#5a7a5a',
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: active ? '#4ade80' : '#2d4a35',
          display: 'inline-block',
        }}
      />
      {active ? '🟢 Colhendo agora' : `⏳ ${season}`}
    </div>
  );
}
function PremiumBadge() {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        background: 'linear-gradient(90deg,#78350f,#92400e)',
        border: '1px solid #f59e0b',
        borderRadius: 20,
        padding: '2px 10px',
        fontSize: 11,
        fontWeight: 800,
        color: '#fcd34d',
      }}
    >
      👑 PREMIUM
    </div>
  );
}
function MapPin({ tree, onClick, isSelected }: any) {
  const x = ((tree.lng - -46.66) / 0.05) * 100;
  const y = ((tree.lat - -23.57) / -0.04) * 100;
  return (
    <div
      onClick={() => onClick(tree)}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%,-100%)',
        cursor: 'pointer',
        zIndex: isSelected ? 20 : 10,
        filter: isSelected
          ? 'drop-shadow(0 0 12px #4ade80)'
          : 'drop-shadow(0 3px 6px rgba(0,0,0,0.5))',
        transition: 'all 0.25s',
        scale: isSelected ? '1.35' : '1',
      }}
    >
      <div
        style={{
          background: isSelected
            ? 'linear-gradient(135deg,#4ade80,#22c55e)'
            : 'linear-gradient(135deg,#16a34a,#15803d)',
          borderRadius: '50% 50% 50% 0',
          width: 40,
          height: 40,
          transform: 'rotate(-45deg)',
          border: '3px solid white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ transform: 'rotate(45deg)', fontSize: 18 }}>
          {tree.tag}
        </span>
      </div>
      {tree.seasonActive && (
        <div
          style={{
            position: 'absolute',
            top: -4,
            right: -4,
            width: 10,
            height: 10,
            background: '#4ade80',
            borderRadius: '50%',
            border: '2px solid #0a1a0f',
          }}
        />
      )}
    </div>
  );
}
function PartnerPin({ partner, onClick }: any) {
  const x = ((partner.lng - -46.66) / 0.05) * 100;
  const y = ((partner.lat - -23.57) / -0.04) * 100;
  return (
    <div
      onClick={() => onClick(partner)}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%,-100%)',
        cursor: 'pointer',
        zIndex: 15,
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg,${partner.color},#92400e)`,
          borderRadius: '50% 50% 50% 0',
          width: 36,
          height: 36,
          transform: 'rotate(-45deg)',
          border: '3px solid #fcd34d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ transform: 'rotate(45deg)', fontSize: 15 }}>
          {partner.tag}
        </span>
      </div>
    </div>
  );
}

function PremiumModal({ onClose, onUpgrade }: any) {
  const perks = [
    ['🤖', 'IA Ilimitada', 'Identifique qualquer planta sem limite'],
    ['🌳', 'Cadastros Ilimitados', 'Adicione quantas árvores quiser'],
    [
      '🔔',
      'Alertas de Colheita',
      'Notificação quando frutas estiverem prontas',
    ],
    ['🛒', 'Desconto Parceiros', '10% em lojas e mercados parceiros'],
    ['⭐', 'Badge Exclusivo', 'Perfil destacado na comunidade'],
    ['📊', 'Estatísticas', 'Veja seu impacto no mapeamento urbano'],
  ];
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.92)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{
          background: '#0a1a0f',
          borderRadius: '24px 24px 0 0',
          padding: 24,
          border: '1px solid #92400e',
          maxHeight: '90dvh',
          overflow: 'auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <div style={{ fontSize: 52, marginBottom: 8 }}>👑</div>
          <div
            style={{
              fontWeight: 900,
              fontSize: 28,
              background: 'linear-gradient(90deg,#fcd34d,#f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            FruitMap Premium
          </div>
          <div style={{ fontSize: 14, color: '#a78a5a', marginTop: 6 }}>
            Desbloqueie todo o potencial do app
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          {perks.map(([icon, title, desc]) => (
            <div
              key={title as string}
              style={{
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
                padding: '11px 0',
                borderBottom: '1px solid #1a2a10',
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  flexShrink: 0,
                  minWidth: 28,
                  textAlign: 'center',
                }}
              >
                {icon}
              </span>
              <div>
                <div
                  style={{ fontWeight: 800, fontSize: 15, color: '#fcd34d' }}
                >
                  {title}
                </div>
                <div style={{ fontSize: 13, color: '#8aab6a', marginTop: 2 }}>
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
            marginBottom: 18,
          }}
        >
          {[
            { label: 'Mensal', price: 'R$ 9,90', sub: '/mês', h: false },
            { label: 'Anual', price: 'R$ 79,90', sub: '/ano 🔥 -33%', h: true },
          ].map((p) => (
            <button
              key={p.label}
              onClick={() => onUpgrade(p.label)}
              style={{
                background: p.h
                  ? 'linear-gradient(135deg,#78350f,#92400e)'
                  : '#0f2a16',
                border: `2px solid ${p.h ? '#f59e0b' : '#2d4a35'}`,
                borderRadius: 16,
                padding: 18,
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: '#a78a5a',
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                {p.label}
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: p.h ? '#fcd34d' : '#e2f0e9',
                }}
              >
                {p.price}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: p.h ? '#f59e0b' : '#6aab76',
                  marginTop: 4,
                }}
              >
                {p.sub}
              </div>
            </button>
          ))}
        </div>
        <div
          style={{
            background: '#0f2a16',
            border: '1px solid #1e4a24',
            borderRadius: 14,
            padding: 14,
            marginBottom: 14,
            display: 'flex',
            gap: 12,
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 28 }}>💠</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>
              Pagamento via PIX
            </div>
            <div style={{ fontSize: 12, color: '#6aab76' }}>
              Ativação imediata após confirmação
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            width: '100%',
            background: 'none',
            border: '1px solid #2d4a35',
            borderRadius: 16,
            padding: 14,
            color: '#6aab76',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Continuar no plano gratuito
        </button>
      </div>
    </div>
  );
}

function PartnerModal({ partner, onClose }: any) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{
          background: '#0a1a0f',
          borderRadius: '24px 24px 0 0',
          padding: 24,
          border: `1px solid ${partner.color}44`,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 14,
            alignItems: 'flex-start',
            marginBottom: 18,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              background: `${partner.color}22`,
              border: `2px solid ${partner.color}`,
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              flexShrink: 0,
            }}
          >
            {partner.tag}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 900, fontSize: 20 }}>{partner.name}</div>
            <div style={{ fontSize: 13, color: '#6aab76' }}>{partner.type}</div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: partner.color,
                background: `${partner.color}22`,
                border: `1px solid ${partner.color}44`,
                borderRadius: 20,
                padding: '2px 8px',
                display: 'inline-block',
                marginTop: 4,
              }}
            >
              {partner.badge}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#0f2a16',
              border: '1px solid #1e4a24',
              borderRadius: '50%',
              width: 36,
              height: 36,
              color: '#e2f0e9',
              fontSize: 18,
            }}
          >
            ×
          </button>
        </div>
        <p
          style={{
            fontSize: 14,
            color: '#c5e8cc',
            lineHeight: 1.6,
            marginBottom: 16,
          }}
        >
          {partner.description}
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              background: '#0f2a16',
              borderRadius: 12,
              padding: 12,
              border: '1px solid #1e4a24',
            }}
          >
            <div style={{ fontSize: 11, color: '#6aab76' }}>📞 Telefone</div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: '#a7f3c0',
                marginTop: 4,
              }}
            >
              {partner.phone}
            </div>
          </div>
          <div
            style={{
              background: '#0f2a16',
              borderRadius: 12,
              padding: 12,
              border: '1px solid #1e4a24',
            }}
          >
            <div style={{ fontSize: 11, color: '#6aab76' }}>🕐 Horário</div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: '#a7f3c0',
                marginTop: 4,
              }}
            >
              {partner.hours}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() =>
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${partner.lat},${partner.lng}`
              )
            }
            style={{
              flex: 1,
              background: `linear-gradient(135deg,${partner.color},${partner.color}88)`,
              borderRadius: 16,
              padding: 14,
              fontWeight: 800,
              fontSize: 14,
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            🗺️ Ver Rota
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              background: '#0f2a16',
              border: '1px solid #1e4a24',
              borderRadius: 16,
              padding: 14,
              fontWeight: 700,
              fontSize: 14,
              color: '#86efac',
              cursor: 'pointer',
            }}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FruitMapApp() {
  const [trees, setTrees] = useState(INITIAL_TREES);
  const [selected, setSelected] = useState<any>(null);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [view, setView] = useState('map');
  const [addStep, setAddStep] = useState(1);
  const [newTree, setNewTree] = useState({
    fruitName: '',
    description: '',
    lat: 0,
    lng: 0,
    imageUrl: '',
    tag: '🌳',
    season: '',
    seasonActive: false,
    hasLocation: false,
  });
  const [isPremium, setIsPremium] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [showPartners, setShowPartners] = useState(true);
  const [filterSeason, setFilterSeason] = useState(false);
  const [toast, setToast] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapTap, setMapTap] = useState<any>(null);
  const userTreeCount = trees.filter((t) => t.addedBy === 'Você').length;
  const showToast = (msg: string, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };
  const filteredTrees = trees.filter(
    (t) =>
      (!searchQuery ||
        t.fruitName.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!filterSeason || t.seasonActive)
  );
  const handleAddClick = () => {
    if (!isPremium && userTreeCount >= FREE_LIMIT) {
      setShowPremium(true);
      return;
    }
    setView('add');
    setAddStep(1);
    setMapTap(null);
    setNewTree({
      fruitName: '',
      description: '',
      lat: 0,
      lng: 0,
      imageUrl: '',
      tag: '🌳',
      season: '',
      seasonActive: false,
      hasLocation: false,
    });
  };
  const handleSubmit = () => {
    if (!newTree.fruitName || !newTree.hasLocation) {
      showToast('Preencha o nome e a localização!', 'error');
      return;
    }
    setTrees((p) => [
      ...p,
      {
        id: Date.now(),
        ...newTree,
        imageUrl:
          newTree.imageUrl ||
          `https://via.placeholder.com/320x200/15803d/white?text=${encodeURIComponent(
            newTree.fruitName
          )}`,
        addedBy: 'Você',
        date: new Date().toISOString().split('T')[0],
        rating: 0,
        votes: 0,
        confirmed: false,
      },
    ]);
    setView('map');
    setMapTap(null);
    setAddStep(1);
    showToast('🌳 Árvore cadastrada com sucesso!');
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 430,
        height: '100dvh',
        margin: '0 auto',
        fontFamily: "'Nunito','Segoe UI',sans-serif",
        background: '#0a1a0f',
        color: '#e2f0e9',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');*{box-sizing:border-box;margin:0;padding:0}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.35}}@keyframes slideUp{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes toastIn{from{transform:translateX(120%)}to{transform:translateX(0)}}input,textarea{font-family:inherit;outline:none}button{font-family:inherit;cursor:pointer;border:none}`}</style>

      <div
        style={{
          background: '#061009',
          padding: '12px 16px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
          borderBottom: '1px solid #1a3020',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 30,
              height: 30,
              background: 'linear-gradient(135deg,#4ade80,#16a34a)',
              borderRadius: 9,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
            }}
          >
            🌿
          </div>
          <span
            style={{
              fontWeight: 900,
              fontSize: 20,
              letterSpacing: -0.5,
              background: 'linear-gradient(90deg,#4ade80,#86efac)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            FruitMap
          </span>
          {isPremium && <PremiumBadge />}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {!isPremium && (
            <button
              onClick={() => setShowPremium(true)}
              style={{
                background: 'linear-gradient(90deg,#78350f,#92400e)',
                border: '1px solid #f59e0b',
                borderRadius: 20,
                padding: '4px 12px',
                fontSize: 12,
                fontWeight: 800,
                color: '#fcd34d',
              }}
            >
              👑 Premium
            </button>
          )}
          <div
            style={{
              background: '#16a34a22',
              borderRadius: 20,
              padding: '4px 10px',
              fontSize: 12,
              color: '#4ade80',
              fontWeight: 700,
            }}
          >
            {trees.length} 🌳
          </div>
          <button
            onClick={() => setView('profile')}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: isPremium
                ? 'linear-gradient(135deg,#78350f,#f59e0b)'
                : 'linear-gradient(135deg,#2d5a27,#16a34a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
            }}
          >
            {isPremium ? '👑' : '👤'}
          </button>
        </div>
      </div>

      {view === 'map' && (
        <div
          style={{ padding: '8px 16px', background: '#061009', flexShrink: 0 }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <div
              style={{
                flex: 1,
                background: '#0f2a16',
                border: '1px solid #1e4a24',
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                padding: '8px 14px',
                gap: 8,
              }}
            >
              <span>🔍</span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar fruta..."
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#e2f0e9',
                  fontSize: 14,
                  flex: 1,
                }}
              />
            </div>
            <button
              onClick={() => setFilterSeason(!filterSeason)}
              style={{
                background: filterSeason ? '#16a34a' : '#0f2a16',
                border: `1px solid ${filterSeason ? '#4ade80' : '#1e4a24'}`,
                borderRadius: 14,
                padding: '0 12px',
                fontSize: 13,
                fontWeight: 800,
                color: filterSeason ? 'white' : '#4ade80',
              }}
            >
              🟢
            </button>
            <button
              onClick={() => setShowPartners(!showPartners)}
              style={{
                background: showPartners ? '#92400e' : '#0f2a16',
                border: `1px solid ${showPartners ? '#f59e0b' : '#1e4a24'}`,
                borderRadius: 14,
                padding: '0 12px',
                fontSize: 18,
              }}
            >
              🏪
            </button>
          </div>
        </div>
      )}

      {view === 'map' && (
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              background: '#1a3320',
            }}
          >
            <svg
              width="100%"
              height="100%"
              style={{ position: 'absolute', inset: 0 }}
            >
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#1e3d24"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {[
                [0, 30, 100, 30],
                [0, 55, 100, 55],
                [0, 75, 100, 75],
                [20, 0, 20, 100],
                [45, 0, 45, 100],
                [70, 0, 70, 100],
              ].map(([x1, y1, x2, y2], i) => (
                <line
                  key={i}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke="#24472a"
                  strokeWidth={i < 3 ? '3' : '2'}
                />
              ))}
              <rect
                x="22%"
                y="32%"
                width="20%"
                height="20%"
                rx="8"
                fill="#162e1a"
                stroke="#1e4a24"
              />
              <rect
                x="48%"
                y="10%"
                width="18%"
                height="16%"
                rx="8"
                fill="#162e1a"
                stroke="#1e4a24"
              />
              <text
                x="32%"
                y="43%"
                textAnchor="middle"
                fill="#2d5a27"
                fontSize="10"
                fontFamily="Nunito"
              >
                Parque
              </text>
              <text
                x="57%"
                y="19%"
                textAnchor="middle"
                fill="#2d5a27"
                fontSize="9"
                fontFamily="Nunito"
              >
                Praça
              </text>
              <path
                d="M 0 85 Q 25 80 50 85 Q 75 90 100 85 L 100 100 L 0 100 Z"
                fill="#0a1e14"
                opacity="0.8"
              />
            </svg>
            {filteredTrees.map((tree) => (
              <MapPin
                key={tree.id}
                tree={tree}
                onClick={(t: any) => {
                  setSelected(t);
                  setView('detail');
                }}
                isSelected={selected?.id === tree.id}
              />
            ))}
            {showPartners &&
              PARTNERS.map((p) => (
                <PartnerPin
                  key={p.id}
                  partner={p}
                  onClick={setSelectedPartner}
                />
              ))}
            {showPartners && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 72,
                  left: 0,
                  right: 0,
                  padding: '0 12px',
                }}
              >
                <div
                  style={{
                    background: '#061009ee',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 16,
                    padding: '10px 14px',
                    border: '1px solid #92400e44',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span style={{ fontSize: 14, flexShrink: 0 }}>🏪</span>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div
                      style={{
                        fontSize: 10,
                        color: '#a78a5a',
                        fontWeight: 700,
                        marginBottom: 4,
                      }}
                    >
                      PARCEIROS NA REGIÃO
                    </div>
                    <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
                      {PARTNERS.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setSelectedPartner(p)}
                          style={{
                            flexShrink: 0,
                            background: `${p.color}22`,
                            border: `1px solid ${p.color}44`,
                            borderRadius: 20,
                            padding: '4px 10px',
                            fontSize: 11,
                            fontWeight: 700,
                            color: p.color,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {p.tag} {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handleAddClick}
            style={{
              position: 'absolute',
              bottom: 80,
              right: 20,
              width: 60,
              height: 60,
              background: isPremium
                ? 'linear-gradient(135deg,#f59e0b,#d97706)'
                : 'linear-gradient(135deg,#4ade80,#16a34a)',
              borderRadius: '50%',
              fontSize: 28,
              boxShadow: `0 4px 20px ${
                isPremium ? 'rgba(245,158,11,0.5)' : 'rgba(74,222,128,0.5)'
              }`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid rgba(255,255,255,0.2)',
              zIndex: 40,
            }}
          >
            {!isPremium && userTreeCount >= FREE_LIMIT ? '🔒' : '➕'}
          </button>
          {!isPremium && (
            <div
              style={{
                position: 'absolute',
                bottom: 152,
                right: 14,
                background: '#0a1a0fdd',
                borderRadius: 10,
                padding: '5px 10px',
                border: '1px solid #1e4a24',
                fontSize: 11,
                color: '#6aab76',
              }}
            >
              {userTreeCount}/{FREE_LIMIT} grátis
            </div>
          )}
        </div>
      )}

      {view === 'detail' && selected && (
        <div style={{ flex: 1, overflow: 'auto' }}>
          <div style={{ position: 'relative' }}>
            <img
              src={selected.imageUrl}
              alt={selected.fruitName}
              style={{ width: '100%', height: 220, objectFit: 'cover' }}
              onError={(e: any) =>
                (e.target.src =
                  'https://via.placeholder.com/400x220/15803d/white?text=🌳')
              }
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom,transparent 40%,#0a1a0f)',
              }}
            />
            <button
              onClick={() => {
                setView('map');
                setSelected(null);
              }}
              style={{
                position: 'absolute',
                top: 12,
                left: 12,
                background: '#0a1a0faa',
                borderRadius: '50%',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                color: 'white',
              }}
            >
              ←
            </button>
            <div
              style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                }}
              >
                {selected.tag} {selected.fruitName}
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center',
                  marginTop: 6,
                  flexWrap: 'wrap',
                }}
              >
                <StarRating value={selected.rating} />
                <span style={{ fontSize: 12, color: '#86efac' }}>
                  {selected.rating.toFixed(1)} ({selected.votes})
                </span>
                <SeasonBadge
                  active={selected.seasonActive}
                  season={selected.season}
                />
              </div>
            </div>
          </div>
          <div style={{ padding: 20 }}>
            <div
              style={{
                background: '#0f2a16',
                borderRadius: 14,
                padding: 16,
                marginBottom: 14,
                border: '1px solid #1e4a24',
              }}
            >
              <p style={{ fontSize: 14, color: '#c5e8cc', lineHeight: 1.65 }}>
                {selected.description}
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
                marginBottom: 14,
              }}
            >
              {[
                ['👤', selected.addedBy],
                ['📅', selected.date],
                ['🌍', selected.lat?.toFixed(4)],
                ['📍', selected.lng?.toFixed(4)],
              ].map(([ic, v]) => (
                <div
                  key={ic + v}
                  style={{
                    background: '#0f2a16',
                    borderRadius: 12,
                    padding: 12,
                    border: '1px solid #1e4a24',
                    fontSize: 13,
                    color: '#a7f3c0',
                    fontWeight: 700,
                  }}
                >
                  {ic} {v}
                </div>
              ))}
            </div>
            {isPremium && (
              <div
                style={{
                  background: 'linear-gradient(135deg,#78350f33,#92400e33)',
                  border: '1px solid #f59e0b44',
                  borderRadius: 14,
                  padding: 14,
                  marginBottom: 14,
                  display: 'flex',
                  gap: 10,
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 22 }}>🏪</span>
                <div>
                  <div
                    style={{ fontSize: 13, fontWeight: 800, color: '#fcd34d' }}
                  >
                    10% de desconto nos parceiros
                  </div>
                  <div style={{ fontSize: 12, color: '#a78a5a' }}>
                    Benefício exclusivo Premium
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`
                )
              }
              style={{
                width: '100%',
                background: 'linear-gradient(135deg,#4ade80,#16a34a)',
                border: 'none',
                borderRadius: 16,
                padding: 16,
                fontSize: 16,
                fontWeight: 800,
                color: 'white',
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              🗺️ Ver Rota
            </button>
            <div
              style={{
                background: '#0f2a16',
                borderRadius: 14,
                padding: 16,
                border: '1px solid #1e4a24',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: '#6aab76',
                  fontWeight: 700,
                  marginBottom: 10,
                }}
              >
                🗳️ Esta árvore existe?
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => {
                    setTrees((p) =>
                      p.map((t) =>
                        t.id === selected.id
                          ? {
                              ...t,
                              votes: t.votes + 1,
                              rating: Math.min(5, t.rating + 0.1),
                            }
                          : t
                      )
                    );
                    showToast('👍 Obrigado!');
                  }}
                  style={{
                    flex: 1,
                    background: '#14532d',
                    border: '1px solid #16a34a',
                    borderRadius: 12,
                    padding: 12,
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#4ade80',
                  }}
                >
                  👍 Confirmei!
                </button>
                <button
                  onClick={() => showToast('❌ Feedback registrado', 'info')}
                  style={{
                    flex: 1,
                    background: '#1a0a0a',
                    border: '1px solid #7f1d1d',
                    borderRadius: 12,
                    padding: 12,
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#fca5a5',
                  }}
                >
                  ❌ Não achei
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'add' && (
        <div style={{ flex: 1, overflow: 'auto' }}>
          <div style={{ padding: 20 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 20,
              }}
            >
              <button
                onClick={() => {
                  setView('map');
                  setMapTap(null);
                }}
                style={{
                  background: '#0f2a16',
                  border: '1px solid #1e4a24',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  fontSize: 18,
                  color: '#4ade80',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ←
              </button>
              <div>
                <div style={{ fontWeight: 900, fontSize: 20 }}>
                  🌱 Nova Árvore
                </div>
                <div style={{ fontSize: 12, color: '#6aab76' }}>
                  {isPremium ? (
                    <PremiumBadge />
                  ) : (
                    `${userTreeCount}/${FREE_LIMIT} cadastros grátis`
                  )}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 22 }}>
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  style={{
                    flex: 1,
                    height: 4,
                    borderRadius: 2,
                    background:
                      s <= addStep
                        ? 'linear-gradient(90deg,#4ade80,#16a34a)'
                        : '#1e4a24',
                    transition: 'all 0.3s',
                  }}
                />
              ))}
            </div>
            {addStep === 1 && (
              <div>
                <div
                  style={{
                    fontSize: 14,
                    color: '#86efac',
                    fontWeight: 700,
                    marginBottom: 16,
                  }}
                >
                  Passo 1 — Identificar a fruta
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label
                    style={{
                      fontSize: 12,
                      color: '#6aab76',
                      fontWeight: 700,
                      marginBottom: 6,
                      display: 'block',
                    }}
                  >
                    NOME DA FRUTA *
                  </label>
                  <input
                    value={newTree.fruitName}
                    onChange={(e) =>
                      setNewTree((p) => ({ ...p, fruitName: e.target.value }))
                    }
                    placeholder="Ex: Mangueira, Jabuticabeira..."
                    style={{
                      width: '100%',
                      background: '#0f2a16',
                      border: '1px solid #1e4a24',
                      borderRadius: 14,
                      padding: '14px 16px',
                      color: '#e2f0e9',
                      fontSize: 15,
                    }}
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label
                    style={{
                      fontSize: 12,
                      color: '#6aab76',
                      fontWeight: 700,
                      marginBottom: 6,
                      display: 'block',
                    }}
                  >
                    DESCRIÇÃO
                  </label>
                  <textarea
                    value={newTree.description}
                    onChange={(e) =>
                      setNewTree((p) => ({ ...p, description: e.target.value }))
                    }
                    placeholder="Como é a fruta? Dicas..."
                    rows={3}
                    style={{
                      width: '100%',
                      background: '#0f2a16',
                      border: '1px solid #1e4a24',
                      borderRadius: 14,
                      padding: '12px 16px',
                      color: '#e2f0e9',
                      fontSize: 14,
                      resize: 'none',
                    }}
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label
                    style={{
                      fontSize: 12,
                      color: '#6aab76',
                      fontWeight: 700,
                      marginBottom: 6,
                      display: 'block',
                    }}
                  >
                    URL DA FOTO (opcional)
                  </label>
                  <input
                    value={newTree.imageUrl}
                    onChange={(e) =>
                      setNewTree((p) => ({ ...p, imageUrl: e.target.value }))
                    }
                    placeholder="https://..."
                    style={{
                      width: '100%',
                      background: '#0f2a16',
                      border: '1px solid #1e4a24',
                      borderRadius: 14,
                      padding: '12px 16px',
                      color: '#e2f0e9',
                      fontSize: 14,
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    if (!newTree.fruitName) {
                      showToast('Informe o nome da fruta!', 'error');
                      return;
                    }
                    setAddStep(2);
                  }}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg,#4ade80,#16a34a)',
                    borderRadius: 16,
                    padding: 16,
                    fontSize: 16,
                    fontWeight: 800,
                    color: 'white',
                  }}
                >
                  Próximo →
                </button>
              </div>
            )}
            {addStep === 2 && (
              <div>
                <div
                  style={{
                    fontSize: 14,
                    color: '#86efac',
                    fontWeight: 700,
                    marginBottom: 14,
                  }}
                >
                  Passo 2 — Localização
                </div>
                <div
                  style={{
                    height: 200,
                    borderRadius: 16,
                    overflow: 'hidden',
                    border: '2px solid #1e4a24',
                    marginBottom: 14,
                    position: 'relative',
                    cursor: 'crosshair',
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const px = (e.clientX - rect.left) / rect.width;
                    const py = (e.clientY - rect.top) / rect.height;
                    const lat = -23.57 + py * 0.04;
                    const lng = -46.66 + px * 0.05;
                    setNewTree((p) => ({
                      ...p,
                      lat: parseFloat(lat.toFixed(5)),
                      lng: parseFloat(lng.toFixed(5)),
                      hasLocation: true,
                    }));
                    setMapTap({ lat, lng });
                  }}
                >
                  <svg
                    width="100%"
                    height="100%"
                    style={{ background: '#1a3320' }}
                  >
                    <rect width="100%" height="100%" fill="#1a3320" />
                    {[
                      [0, 30, 100, 30],
                      [0, 60, 100, 60],
                      [25, 0, 25, 100],
                      [65, 0, 65, 100],
                    ].map(([x1, y1, x2, y2], i) => (
                      <line
                        key={i}
                        x1={`${x1}%`}
                        y1={`${y1}%`}
                        x2={`${x2}%`}
                        y2={`${y2}%`}
                        stroke="#24472a"
                        strokeWidth="2"
                      />
                    ))}
                    <rect
                      x="27%"
                      y="32%"
                      width="18%"
                      height="18%"
                      rx="6"
                      fill="#162e1a"
                      stroke="#1e4a24"
                    />
                  </svg>
                  {mapTap && (
                    <div
                      style={{
                        position: 'absolute',
                        left: `${((mapTap.lng - -46.66) / 0.05) * 100}%`,
                        top: `${((mapTap.lat - -23.57) / 0.04) * 100}%`,
                        transform: 'translate(-50%,-100%)',
                        pointerEvents: 'none',
                      }}
                    >
                      <div
                        style={{
                          background: '#f59e0b',
                          borderRadius: '50% 50% 50% 0',
                          width: 32,
                          height: 32,
                          transform: 'rotate(-45deg)',
                          border: '2px solid white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <span
                          style={{ transform: 'rotate(45deg)', fontSize: 14 }}
                        >
                          🌱
                        </span>
                      </div>
                    </div>
                  )}
                  {!mapTap && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: 4,
                        background: 'rgba(0,0,0,0.35)',
                      }}
                    >
                      <span style={{ fontSize: 28 }}>👆</span>
                      <span
                        style={{
                          fontSize: 13,
                          color: '#86efac',
                          fontWeight: 700,
                        }}
                      >
                        Toque para marcar localização
                      </span>
                    </div>
                  )}
                </div>
                {mapTap && (
                  <div
                    style={{
                      background: '#0f2a16',
                      border: '1px solid #16a34a',
                      borderRadius: 12,
                      padding: 12,
                      marginBottom: 12,
                      display: 'flex',
                      gap: 16,
                    }}
                  >
                    <div>
                      <span style={{ fontSize: 11, color: '#6aab76' }}>
                        LAT
                      </span>
                      <br />
                      <span style={{ fontWeight: 700, color: '#4ade80' }}>
                        {newTree.lat}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontSize: 11, color: '#6aab76' }}>
                        LNG
                      </span>
                      <br />
                      <span style={{ fontWeight: 700, color: '#4ade80' }}>
                        {newTree.lng}
                      </span>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => {
                    setNewTree((p) => ({
                      ...p,
                      lat: -23.5505 + (Math.random() - 0.5) * 0.02,
                      lng: -46.6333 + (Math.random() - 0.5) * 0.02,
                      hasLocation: true,
                    }));
                    setMapTap({ lat: -23.5505, lng: -46.6333 });
                    showToast('📍 Localização detectada!');
                  }}
                  style={{
                    width: '100%',
                    background: '#0f2a16',
                    border: '1px solid #1e4a24',
                    borderRadius: 16,
                    padding: 14,
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#4ade80',
                    marginBottom: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  📡 Usar Minha Localização
                </button>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={() => setAddStep(1)}
                    style={{
                      flex: 1,
                      background: '#0f2a16',
                      border: '1px solid #1e4a24',
                      borderRadius: 16,
                      padding: 14,
                      fontWeight: 700,
                      color: '#86efac',
                    }}
                  >
                    ← Voltar
                  </button>
                  <button
                    onClick={() => {
                      if (!newTree.hasLocation) {
                        showToast('Marque a localização!', 'error');
                        return;
                      }
                      setAddStep(3);
                    }}
                    style={{
                      flex: 2,
                      background: 'linear-gradient(135deg,#4ade80,#16a34a)',
                      borderRadius: 16,
                      padding: 14,
                      fontSize: 15,
                      fontWeight: 800,
                      color: 'white',
                    }}
                  >
                    Próximo →
                  </button>
                </div>
              </div>
            )}
            {addStep === 3 && (
              <div>
                <div
                  style={{
                    fontSize: 14,
                    color: '#86efac',
                    fontWeight: 700,
                    marginBottom: 14,
                  }}
                >
                  Passo 3 — Confirmar
                </div>
                <div
                  style={{
                    background: '#0f2a16',
                    borderRadius: 16,
                    padding: 18,
                    border: '1px solid #1e4a24',
                    marginBottom: 16,
                  }}
                >
                  {newTree.imageUrl && (
                    <img
                      src={newTree.imageUrl}
                      alt=""
                      style={{
                        width: '100%',
                        height: 120,
                        objectFit: 'cover',
                        borderRadius: 12,
                        marginBottom: 12,
                      }}
                      onError={(e: any) => (e.target.style.display = 'none')}
                    />
                  )}
                  <div
                    style={{ fontSize: 22, fontWeight: 900, marginBottom: 8 }}
                  >
                    {newTree.tag} {newTree.fruitName}
                  </div>
                  {newTree.description && (
                    <p
                      style={{
                        fontSize: 13,
                        color: '#86efac',
                        lineHeight: 1.5,
                        marginBottom: 10,
                      }}
                    >
                      {newTree.description}
                    </p>
                  )}
                  {[
                    ['📍 Latitude', newTree.lat?.toFixed(5)],
                    ['📍 Longitude', newTree.lng?.toFixed(5)],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 13,
                        color: '#6aab76',
                        padding: '5px 0',
                        borderTop: '1px solid #1a2e1a',
                      }}
                    >
                      <span>{k}</span>
                      <span style={{ color: '#4ade80', fontWeight: 700 }}>
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={() => setAddStep(2)}
                    style={{
                      flex: 1,
                      background: '#0f2a16',
                      border: '1px solid #1e4a24',
                      borderRadius: 16,
                      padding: 14,
                      fontWeight: 700,
                      color: '#86efac',
                    }}
                  >
                    ← Voltar
                  </button>
                  <button
                    onClick={handleSubmit}
                    style={{
                      flex: 2,
                      background: 'linear-gradient(135deg,#4ade80,#16a34a)',
                      borderRadius: 16,
                      padding: 14,
                      fontSize: 15,
                      fontWeight: 800,
                      color: 'white',
                    }}
                  >
                    🌳 Cadastrar!
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {view === 'partners' && (
        <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
          <div style={{ fontWeight: 900, fontSize: 22, marginBottom: 4 }}>
            🏪 Parceiros
          </div>
          <div style={{ fontSize: 13, color: '#6aab76', marginBottom: 18 }}>
            Negócios locais que apoiam o FruitMap
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg,#0f2a16,#162e1a)',
              border: '1px solid #f59e0b55',
              borderRadius: 18,
              padding: 18,
              marginBottom: 20,
            }}
          >
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 40 }}>🤝</span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: '#a78a5a',
                    fontWeight: 700,
                    marginBottom: 2,
                  }}
                >
                  SEJA PARCEIRO
                </div>
                <div style={{ fontWeight: 900, fontSize: 18 }}>
                  Anuncie aqui!
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: '#6aab76',
                    marginTop: 4,
                    lineHeight: 1.5,
                  }}
                >
                  Alcance +2.000 usuários ativos. Planos a partir de R$49/mês.
                </div>
                <button
                  onClick={() =>
                    showToast('📧 parceiros@fruitmap.com.br', 'info')
                  }
                  style={{
                    marginTop: 10,
                    background: 'linear-gradient(90deg,#78350f,#92400e)',
                    border: '1px solid #f59e0b',
                    borderRadius: 20,
                    padding: '8px 18px',
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#fcd34d',
                  }}
                >
                  Saiba mais →
                </button>
              </div>
            </div>
          </div>
          {PARTNERS.map((p) => (
            <div
              key={p.id}
              style={{
                background: '#0f2a16',
                border: `1px solid ${p.color}44`,
                borderRadius: 18,
                padding: 16,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    background: `${p.color}22`,
                    border: `2px solid ${p.color}55`,
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    flexShrink: 0,
                  }}
                >
                  {p.tag}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 900, fontSize: 16 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: '#6aab76' }}>{p.type}</div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: p.color,
                      background: `${p.color}22`,
                      border: `1px solid ${p.color}44`,
                      borderRadius: 20,
                      padding: '2px 8px',
                      display: 'inline-block',
                      marginTop: 4,
                    }}
                  >
                    {p.badge}
                  </span>
                </div>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: '#c5e8cc',
                  marginBottom: 12,
                  lineHeight: 1.5,
                }}
              >
                {p.description}
              </p>
              {isPremium && p.badge.includes('Gold') && (
                <div
                  style={{
                    background: '#78350f44',
                    border: '1px solid #f59e0b44',
                    borderRadius: 10,
                    padding: '8px 12px',
                    marginBottom: 10,
                    fontSize: 13,
                    color: '#fcd34d',
                    fontWeight: 700,
                  }}
                >
                  👑 Seu desconto Premium: 10% OFF
                </div>
              )}
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`
                    )
                  }
                  style={{
                    flex: 1,
                    background: `${p.color}22`,
                    border: `1px solid ${p.color}44`,
                    borderRadius: 12,
                    padding: 10,
                    fontSize: 13,
                    fontWeight: 700,
                    color: p.color,
                  }}
                >
                  🗺️ Rota
                </button>
                <button
                  onClick={() => setSelectedPartner(p)}
                  style={{
                    flex: 1,
                    background: '#0a1a0f',
                    border: '1px solid #1e4a24',
                    borderRadius: 12,
                    padding: 10,
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#86efac',
                  }}
                >
                  Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'profile' && (
        <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 24,
            }}
          >
            <button
              onClick={() => setView('map')}
              style={{
                background: '#0f2a16',
                border: '1px solid #1e4a24',
                borderRadius: '50%',
                width: 40,
                height: 40,
                fontSize: 18,
                color: '#4ade80',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ←
            </button>
            <div style={{ fontWeight: 900, fontSize: 22 }}>Meu Perfil</div>
          </div>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div
              style={{
                width: 80,
                height: 80,
                background: isPremium
                  ? 'linear-gradient(135deg,#78350f,#f59e0b)'
                  : 'linear-gradient(135deg,#4ade80,#16a34a)',
                borderRadius: '50%',
                margin: '0 auto 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 36,
                border: `3px solid ${isPremium ? '#fcd34d' : '#2d5a27'}`,
              }}
            >
              {isPremium ? '👑' : '🌿'}
            </div>
            <div style={{ fontWeight: 800, fontSize: 20 }}>
              Explorador Urbano
            </div>
            <div style={{ marginTop: 4 }}>
              {isPremium ? (
                <PremiumBadge />
              ) : (
                <span style={{ color: '#6aab76', fontSize: 13 }}>
                  Plano Gratuito
                </span>
              )}
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 10,
              marginBottom: 20,
            }}
          >
            {[
              ['🌳', userTreeCount, 'Minhas'],
              ['✓', trees.filter((t) => t.confirmed).length, 'Confirm.'],
              ['⭐', '4.6', 'Média'],
            ].map(([ic, v, l]) => (
              <div
                key={l as string}
                style={{
                  background: '#0f2a16',
                  border: '1px solid #1e4a24',
                  borderRadius: 14,
                  padding: 12,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 20 }}>{ic}</div>
                <div
                  style={{ fontWeight: 900, fontSize: 20, color: '#4ade80' }}
                >
                  {v}
                </div>
                <div style={{ fontSize: 11, color: '#6aab76' }}>{l}</div>
              </div>
            ))}
          </div>
          {!isPremium && (
            <button
              onClick={() => setShowPremium(true)}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg,#78350f,#92400e)',
                border: '1px solid #f59e0b',
                borderRadius: 16,
                padding: 16,
                fontSize: 15,
                fontWeight: 800,
                color: '#fcd34d',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              👑 Fazer Upgrade Premium →
            </button>
          )}
          {isPremium && (
            <div
              style={{
                background: 'linear-gradient(135deg,#78350f33,#92400e33)',
                border: '1px solid #f59e0b44',
                borderRadius: 16,
                padding: 16,
                marginBottom: 16,
                textAlign: 'center',
              }}
            >
              <div style={{ fontWeight: 800, color: '#fcd34d', fontSize: 15 }}>
                👑 Assinante Premium Ativo
              </div>
              <div style={{ fontSize: 12, color: '#a78a5a', marginTop: 4 }}>
                Renovação em 30 dias · R$ 9,90/mês
              </div>
            </div>
          )}
          <div
            style={{
              background: '#0f2a16',
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid #1e4a24',
            }}
          >
            {[
              ['🔔', 'Alertas de Colheita'],
              ['❤️', 'Favoritas'],
              ['📤', 'Compartilhar App'],
              ['⚙️', 'Configurações'],
            ].map(([ic, l], i, arr) => (
              <button
                key={l}
                onClick={() => showToast(`${ic} Em breve!`, 'info')}
                style={{
                  width: '100%',
                  background: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '16px 20px',
                  color: '#e2f0e9',
                  fontSize: 15,
                  fontWeight: 600,
                  borderBottom:
                    i < arr.length - 1 ? '1px solid #1a2e1a' : 'none',
                  justifyContent: 'space-between',
                }}
              >
                <span>
                  {ic} {l}
                </span>
                <span style={{ color: '#4aab5a' }}>›</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div
        style={{
          background: '#061009',
          borderTop: '1px solid #1a3020',
          padding: '8px 0 12px',
          display: 'flex',
          justifyContent: 'space-around',
          flexShrink: 0,
        }}
      >
        {[
          { id: 'map', icon: '🗺️', label: 'Mapa' },
          { id: 'partners', icon: '🏪', label: 'Parceiros' },
          { id: 'add', icon: '➕', label: 'Adicionar', action: handleAddClick },
          { id: 'profile', icon: '👤', label: 'Perfil' },
        ].map(({ id, icon, label, action }) => (
          <button
            key={id}
            onClick={() => (action ? action() : setView(id))}
            style={{
              background: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              padding: '6px 14px',
              borderRadius: 12,
              color: view === id ? '#4ade80' : '#4aab5a55',
            }}
          >
            <span style={{ fontSize: view === id ? 22 : 20 }}>{icon}</span>
            <span style={{ fontSize: 10, fontWeight: view === id ? 800 : 600 }}>
              {label}
            </span>
            {view === id && (
              <div
                style={{
                  width: 4,
                  height: 4,
                  background: '#4ade80',
                  borderRadius: '50%',
                }}
              />
            )}
          </button>
        ))}
      </div>

      {showPremium && (
        <PremiumModal
          onClose={() => setShowPremium(false)}
          onUpgrade={(plan: string) => {
            setIsPremium(true);
            setShowPremium(false);
            showToast(`👑 Bem-vindo ao Premium ${plan}!`);
          }}
        />
      )}
      {selectedPartner && (
        <PartnerModal
          partner={selectedPartner}
          onClose={() => setSelectedPartner(null)}
        />
      )}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            right: 16,
            background:
              toast.type === 'error'
                ? '#7f1d1d'
                : toast.type === 'info'
                ? '#1e3a5f'
                : '#14532d',
            border: `1px solid ${
              toast.type === 'error'
                ? '#ef4444'
                : toast.type === 'info'
                ? '#3b82f6'
                : '#4ade80'
            }`,
            borderRadius: 16,
            padding: '12px 16px',
            fontSize: 14,
            fontWeight: 700,
            color: 'white',
            zIndex: 1000,
            maxWidth: 290,
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}
