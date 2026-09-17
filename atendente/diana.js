/* Diana · atendente do Spa Diamond La Evidence
   Uso: <script src="atendente/diana.js" defer></script>
   Base: mesmo widget do atendente da agencia, com as mesmas correcoes de mobile
   e de audio. Se corrigir bug aqui, olhar tambem o arquivo de origem.
*/
(function () {
  'use strict';

  var script  = document.currentScript || (function () {
    var s = document.getElementsByTagName('script');
    return s[s.length - 1];
  })();

  var API     = 'https://n8n.dionefolador.com/webhook/spa-diamond-voz';
  var WHATS   = script.getAttribute('data-whats') || '5565981089959';
  var SESSAO  = 'spa-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);

  var CONVITES = ['Posso te ajudar?', 'Quer saber dos procedimentos?', 'Fala comigo'];

  var ABERTURA = 'Oi! Eu sou a Diana, do Spa Diamond. Me conta o que você gostaria de melhorar, que eu te explico como funciona e já vejo um horário pra você.';

  /* ---------------- estilo ---------------- */
  var css = ''
  + '.diana-b,.diana-p,.diana-c{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;box-sizing:border-box}'
  + '.diana-b *,.diana-p *{box-sizing:border-box}'
  + '.diana-b{position:relative;width:78px;height:78px;flex:none;border:0;padding:0;'
  +   'cursor:pointer;background:transparent;display:grid;place-items:center;'
  +   'animation:diana-flutua 4.2s ease-in-out infinite;transition:transform .22s ease;'
  +   'filter:drop-shadow(0 10px 16px rgba(0,0,0,.45)) drop-shadow(0 0 14px rgba(201,162,39,.22))}'
  + '.diana-b:hover{transform:scale(1.06)}'
  + '.diana-b:active{transform:scale(.95)}'
  + '.diana-b svg{width:100%;height:100%;overflow:visible}'
  + '.diana-av svg{width:120%;height:120%;overflow:visible}'
  + '.diana-av{background:transparent!important;filter:drop-shadow(0 2px 5px rgba(0,0,0,.4))}'
  + '.diana-olho{transform-origin:center;animation:diana-pisca-olho 5.6s infinite}'
  + '.diana-farol{animation:diana-farol 2.8s ease-in-out infinite}'
  + '.diana-sombra{animation:diana-sombra 4.2s ease-in-out infinite}'
  + '@keyframes diana-farol{0%,100%{opacity:.45}50%{opacity:1}}'
  + '@keyframes diana-sombra{0%,100%{transform:scaleX(1);opacity:.3}50%{transform:scaleX(.86);opacity:.2}}'
  + '.diana-antena{transform-origin:22px 9px;animation:diana-antena 3.4s ease-in-out infinite}'
  + '@keyframes diana-pisca-olho{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.12)}}'
  + '@keyframes diana-antena{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}'
  + '.diana-orb{position:fixed;right:18px;bottom:18px;z-index:2147483000;display:flex;align-items:center;gap:10px;'
  +   'flex-direction:row-reverse;animation:diana-ronda 26s ease-in-out infinite;will-change:transform}'
  + '.diana-orb.diana-parado{animation:none;transform:none}'
  + '@keyframes diana-ronda{'
  +   '0%,8%{transform:translateX(0)}'
  +   '38%,54%{transform:translateX(calc(-1 * min(46vw, 380px)))}'
  +   '84%,100%{transform:translateX(0)}}'
    + '@keyframes diana-flutua{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}'
  + '.diana-orb.diana-off{display:none}'
  + '.diana-cv{max-width:200px;flex:none;'
  +   'background:#fff;color:#15130f;padding:11px 15px;border-radius:16px 16px 3px 16px;'
  +   'font-size:14px;line-height:1.45;font-weight:500;box-shadow:0 8px 26px rgba(0,0,0,.24);'
  +   'opacity:0;transform:translateY(6px) scale(.94);transition:opacity .3s ease,transform .3s ease;'
  +   'cursor:pointer;pointer-events:none}'
  + '.diana-cv.diana-ver{opacity:1;transform:none;pointer-events:auto}'
  + '.diana-p{position:fixed;right:18px;bottom:18px;z-index:2147483001;width:min(370px,calc(100vw - 24px));'
  +   'height:min(560px,calc(100dvh - 36px));background:#15130f;border:1px solid rgba(230,189,79,.26);'
  +   'border-radius:20px;box-shadow:0 22px 60px rgba(0,0,0,.5);display:none;flex-direction:column;overflow:hidden}'
  + '.diana-p.diana-ver{display:flex;animation:diana-abre .26s ease forwards}'
  + '@keyframes diana-abre{from{opacity:0;transform:translateY(14px) scale(.97)}to{opacity:1;transform:none}}'
  + '.diana-h{flex:none;padding:14px 15px;background:linear-gradient(140deg,#211c12,#15130f);'
  +   'border-bottom:1px solid rgba(230,189,79,.2);display:flex;align-items:center;gap:11px}'
  + '.diana-av{width:38px;height:38px;border-radius:50%;flex:none;display:grid;place-items:center;'
  +   'background:linear-gradient(140deg,#f0d585,#c99a1f);color:#231a03}'
  + '.diana-av svg{width:20px;height:20px}'
  + '.diana-hn{flex:1;min-width:0}'
  + '.diana-hn b{display:block;font-size:14.5px;color:#f5efe2;font-weight:600;line-height:1.2}'
  + '.diana-hn i{display:block;font-style:normal;font-size:11.5px;color:#9c9484;margin-top:2px}'
  + '.diana-hn i::before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;'
  +   'background:#4ec77d;margin-right:5px;vertical-align:middle}'
  + '.diana-x{flex:none;width:44px;height:44px;border:0;background:transparent;color:#9c9484;'
  +   'cursor:pointer;border-radius:9px;font-size:21px;line-height:1}'
  + '.diana-x:hover{background:rgba(255,255,255,.07);color:#f5efe2}'
  + '.diana-atalho{flex:none;padding:9px 15px;border-bottom:1px solid rgba(255,255,255,.06);'
  +   'background:rgba(14,122,62,.09)}'
  + '.diana-atalho a{display:flex;align-items:center;justify-content:center;gap:8px;min-height:38px;'
  +   'border-radius:99px;background:rgba(14,122,62,.16);border:1px solid rgba(78,199,125,.3);'
  +   'color:#7fe0a4;font-size:12.5px;font-weight:600;text-decoration:none;letter-spacing:.02em}'
  + '.diana-atalho a:hover{background:rgba(14,122,62,.26)}'
  + '.diana-atalho svg{width:15px;height:15px;flex:none}'
  + '.diana-c{flex:1;overflow-y:auto;padding:16px 15px;display:flex;flex-direction:column;gap:11px;'
  +   '-webkit-overflow-scrolling:touch}'
  + '.diana-m{max-width:86%;padding:10px 14px;border-radius:15px;font-size:14.5px;line-height:1.55;'
  +   'animation:diana-sobe .26s ease both;white-space:pre-wrap;word-wrap:break-word}'
  + '@keyframes diana-sobe{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}'
  + '.diana-m.diana-ele{align-self:flex-start;background:#221d14;color:#ece5d7;border-bottom-left-radius:4px}'
  + '.diana-m.diana-eu{align-self:flex-end;background:linear-gradient(140deg,#f0d585,#c99a1f);'
  +   'color:#231a03;border-bottom-right-radius:4px;font-weight:500}'
  + '.diana-pt{align-self:flex-start;display:flex;gap:4px;padding:13px 15px;background:#221d14;'
  +   'border-radius:15px;border-bottom-left-radius:4px}'
  + '.diana-pt i{width:6px;height:6px;border-radius:50%;background:#c99a1f;animation:diana-pisca 1.3s infinite}'
  + '.diana-pt i:nth-child(2){animation-delay:.18s}.diana-pt i:nth-child(3){animation-delay:.36s}'
  + '@keyframes diana-pisca{0%,60%,100%{opacity:.25}30%{opacity:1}}'
  + '.diana-m a.diana-link{color:#f0d585;text-decoration:underline;text-underline-offset:3px;word-break:break-all}'
  + '.diana-m a.diana-link:hover{color:#fff}'
  + '.diana-zap{display:inline-flex;align-items:center;gap:8px;margin-top:10px;min-height:42px;'
  +   'padding:10px 18px;border-radius:99px;background:#0e7a3e;color:#fff;font-size:13px;font-weight:600;'
  +   'text-decoration:none;box-shadow:0 6px 18px rgba(14,122,62,.32)}'
  + '.diana-zap:hover{background:#0b6b35}'
  + '.diana-zap svg{width:16px;height:16px;flex:none}'
  + '.diana-f{flex:none;display:flex;gap:8px;padding:11px 13px;border-top:1px solid rgba(255,255,255,.07);'
  +   'background:#15130f}'
  + '.diana-f input{flex:1 1 0;min-width:0;min-height:44px;padding:11px 16px;border-radius:99px;background:#221d14;'
  +   'border:1px solid rgba(255,255,255,.09);color:#ece5d7;font-size:16px;font-family:inherit;outline:none}'
  + '.diana-f input::placeholder{color:#6f6757}'
  + '.diana-f input:focus{border-color:rgba(230,189,79,.5)}'
  + '.diana-f button{flex:none;width:44px;height:44px;border-radius:50%;border:0;cursor:pointer;'
  +   'background:linear-gradient(140deg,#f0d585,#c99a1f);color:#231a03;display:grid;place-items:center}'
  + '.diana-f button svg{width:19px;height:19px}'
  + '.diana-f button:disabled{opacity:.45;cursor:default}'
  + '.diana-mic{flex:none;width:44px;height:44px;border-radius:50%;border:1px solid rgba(230,189,79,.35);'
  +   'cursor:pointer;background:transparent;color:#e6bd4f;display:grid;place-items:center}'
  + '.diana-mic svg{width:19px;height:19px}'
  + '.diana-mic:hover{background:rgba(230,189,79,.12)}'
  + '.diana-mic.diana-ouvindo{background:#b93636;border-color:#b93636;color:#fff;animation:diana-pulsa 1.4s infinite}'
  + '@keyframes diana-pulsa{0%,100%{box-shadow:0 0 0 0 rgba(185,54,54,.5)}70%{box-shadow:0 0 0 9px rgba(185,54,54,0)}}'
  + '.diana-mic[hidden]{display:none}'
  + '@media (max-width:420px){.diana-p{right:10px;left:10px;bottom:10px;width:auto;height:min(78dvh,560px)}'
  +   '.diana-orb{right:14px;bottom:14px}.diana-cv{max-width:150px;font-size:13px;padding:9px 13px}'
  +   '@keyframes diana-ronda{0%,8%{transform:translateX(0)}38%,54%{transform:translateX(-38vw)}84%,100%{transform:translateX(0)}}}'
  + '@media (prefers-reduced-motion:reduce){.diana-b,.diana-b::after,.diana-m,.diana-p,.diana-orb,.diana-olho,.diana-antena{animation:none!important}}';

  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  /* ---------------- ícones ---------------- */
  var icoRobo = ''
    + '<svg viewBox="0 0 96 96" fill="none" aria-hidden="true" class="diana-robo">'
    +   '<defs>'
    +     '<linearGradient id="zbMetal" x1="18" y1="16" x2="78" y2="82" gradientUnits="userSpaceOnUse">'
    +       '<stop offset="0" stop-color="#fff3cf"/><stop offset=".22" stop-color="#f3d68e"/>'
    +       '<stop offset=".5" stop-color="#caa03a"/><stop offset=".74" stop-color="#8f6d18"/>'
    +       '<stop offset="1" stop-color="#c9a544"/></linearGradient>'
    +     '<linearGradient id="zbTopo" x1="48" y1="16" x2="48" y2="34" gradientUnits="userSpaceOnUse">'
    +       '<stop offset="0" stop-color="#fffdf3" stop-opacity=".92"/>'
    +       '<stop offset=".55" stop-color="#fff3d2" stop-opacity=".28"/>'
    +       '<stop offset="1" stop-color="#fff8e4" stop-opacity="0"/></linearGradient>'
    +     '<linearGradient id="zbBase" x1="48" y1="58" x2="48" y2="78" gradientUnits="userSpaceOnUse">'
    +       '<stop offset="0" stop-color="#5c440d" stop-opacity="0"/>'
    +       '<stop offset="1" stop-color="#5c440d" stop-opacity=".42"/></linearGradient>'
    +     '<linearGradient id="zbVisor" x1="48" y1="33" x2="48" y2="60" gradientUnits="userSpaceOnUse">'
    +       '<stop offset="0" stop-color="#0d1418"/><stop offset=".55" stop-color="#04080b"/>'
    +       '<stop offset="1" stop-color="#101c22"/></linearGradient>'
    +     '<linearGradient id="zbBrilho" x1="26" y1="34" x2="46" y2="52" gradientUnits="userSpaceOnUse">'
    +       '<stop offset="0" stop-color="#ffffff" stop-opacity=".3"/>'
    +       '<stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient>'
    +     '<radialGradient id="zbLuz" cx="0" cy="0" r="1" gradientTransform="translate(48 47) scale(26 16)">'
    +       '<stop offset="0" stop-color="#8fe9ff" stop-opacity=".55"/>'
    +       '<stop offset="1" stop-color="#8fe9ff" stop-opacity="0"/></radialGradient>'
    +     '<filter id="zbGlow" x="-60%" y="-60%" width="220%" height="220%">'
    +       '<feGaussianBlur stdDeviation="2.1" result="b"/>'
    +       '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'
    +     '<clipPath id="zbCorte"><rect x="26" y="33" width="44" height="27" rx="12"/></clipPath>'
    +   '</defs>'
    +   '<ellipse cx="48" cy="88" rx="21" ry="4.4" fill="#000" opacity=".3" class="diana-sombra"/>'
    +   '<g class="diana-antena">'
    +     '<path d="M48 17V8" stroke="url(#zbMetal)" stroke-width="3.4" stroke-linecap="round"/>'
    +     '<circle cx="48" cy="5.6" r="3.9" fill="#7fe3ff" filter="url(#zbGlow)" class="diana-farol"/>'
    +   '</g>'
    +   '<rect x="10.5" y="38" width="8.5" height="19" rx="4.2" fill="url(#zbMetal)"/>'
    +   '<rect x="77" y="38" width="8.5" height="19" rx="4.2" fill="url(#zbMetal)"/>'
    +   '<rect x="12.8" y="42.5" width="3.9" height="10" rx="1.9" fill="#6d5416" opacity=".75"/>'
    +   '<rect x="79.3" y="42.5" width="3.9" height="10" rx="1.9" fill="#6d5416" opacity=".75"/>'
    +   '<rect x="18" y="16" width="60" height="62" rx="21" fill="url(#zbMetal)"/>'
    +   '<rect x="18" y="16" width="60" height="62" rx="21" fill="url(#zbTopo)"/>'
    +   '<rect x="18" y="16" width="60" height="62" rx="21" fill="url(#zbBase)"/>'
    +   '<rect x="21.5" y="19.5" width="53" height="55" rx="18" stroke="#fff6dd" stroke-opacity=".5" stroke-width="1.2"/>'
    +   '<rect x="26" y="33" width="44" height="27" rx="12" fill="url(#zbVisor)"/>'
    +   '<g clip-path="url(#zbCorte)">'
    +     '<rect x="26" y="33" width="44" height="27" fill="url(#zbLuz)"/>'
    +     '<path d="M26 33h44v27z" fill="url(#zbBrilho)"/>'
    +   '</g>'
    +   '<rect x="26" y="33" width="44" height="27" rx="12" stroke="#2b3a42" stroke-width="1.1"/>'
    +   '<g class="diana-olhos" filter="url(#zbGlow)">'
    +     '<rect x="34.5" y="41.5" width="7" height="10" rx="3.5" fill="#a8f0ff" class="diana-olho"/>'
    +     '<rect x="54.5" y="41.5" width="7" height="10" rx="3.5" fill="#a8f0ff" class="diana-olho"/>'
    +   '</g>'
    +   '<path d="M39.5 65q8.5 5.2 17 0" stroke="#5c440d" stroke-opacity=".72" stroke-width="2.8" stroke-linecap="round" class="diana-boca"/>'
    + '</svg>';
  var icoChat = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.9 8.9 0 0 1-4-.9L3 21l1.9-5a8.4 8.4 0 0 1-.9-4 8.4 8.4 0 0 1 8.4-8.4h.5a8.4 8.4 0 0 1 8.1 8z"/></svg>';
  var icoZap  = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.6-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.7.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.4z"/><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>';
  var icoMic  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><rect x="9" y="2" width="6" height="11" rx="3" fill="currentColor" stroke="none"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/><path d="M8.5 21h7"/></svg>';
  var icoEnv  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/></svg>';

  /* ---------------- elementos ---------------- */
  var bolha = document.createElement('button');
  bolha.className = 'diana-b';
  bolha.setAttribute('aria-label', 'Falar com o atendente');
  bolha.innerHTML = icoRobo;

  var convite = document.createElement('div');
  convite.className = 'diana-cv';

  var painel = document.createElement('div');
  painel.className = 'diana-p';
  painel.setAttribute('role', 'dialog');
  painel.setAttribute('aria-label', 'Atendimento');
  painel.innerHTML =
      '<div class="diana-h">'
    +   '<div class="diana-av">' + icoRobo + '</div>'
    +   '<div class="diana-hn"><b>Diana</b><i>Spa Diamond · responde na hora</i></div>'
    +   '<button class="diana-x" aria-label="Fechar">&times;</button>'
    + '</div>'
    + '<div class="diana-atalho">'
    +   '<a href="https://wa.me/' + WHATS + '?text=' + encodeURIComponent('Olá Dione! Vim pelo link da bio.') + '" target="_blank" rel="noopener">'
    +     icoZap + 'Prefiro falar direto no WhatsApp</a>'
    + '</div>'
    + '<div class="diana-c"></div>'
    + '<form class="diana-f"><input type="text" placeholder="Escreva aqui" autocomplete="off">'
    +   '<button type="button" class="diana-mic" aria-label="Falar" hidden>' + icoMic + '</button>'
    +   '<button type="submit" aria-label="Enviar">' + icoEnv + '</button></form>';

  var orbita = document.createElement('div');
  orbita.className = 'diana-orb';
  orbita.appendChild(bolha);
  orbita.appendChild(convite);

  document.body.appendChild(orbita);
  document.body.appendChild(painel);

  // o widget substitui o botao flutuante de WhatsApp da pagina, se houver
  ['.wa-float', '.whatsapp-float', '.btn-whats-float'].forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) { el.style.display = 'none'; });
  });

  // a ronda para assim que a pessoa interage, e nao volta mais
  function pararRonda() { orbita.classList.add('diana-parado'); }
  orbita.addEventListener('pointerenter', pararRonda);
  orbita.addEventListener('pointerdown', pararRonda);

  var corpo  = painel.querySelector('.diana-c');
  var form   = painel.querySelector('.diana-f');
  var campo  = form.querySelector('input');
  var enviar = form.querySelector('button');
  var fechar = painel.querySelector('.diana-x');
  var mic    = painel.querySelector('.diana-mic');
  var tocando = null;

  var aberto = false, ocupado = false, jaAbriu = false, iConvite = 0, giro = null;

  /* ---------------- convite rotativo ---------------- */
  function mostraConvite() {
    if (aberto || jaAbriu) return;
    convite.textContent = CONVITES[iConvite % CONVITES.length];
    convite.classList.add('diana-ver');
    setTimeout(function () { convite.classList.remove('diana-ver'); }, 4200);
    iConvite++;
    if (iConvite >= CONVITES.length) { clearInterval(giro); giro = null; }
  }

  var comecou = false;
  function comecarConvites() {
    if (comecou || jaAbriu) return;
    comecou = true;
    mostraConvite();
    giro = setInterval(mostraConvite, 13000);
  }
  setTimeout(comecarConvites, 8000);
  window.addEventListener('scroll', function aoRolar() {
    if (window.scrollY > window.innerHeight * 0.4) {
      comecarConvites();
      window.removeEventListener('scroll', aoRolar);
    }
  }, { passive: true });

  /* ---------------- mensagens ---------------- */
  function comLinks(texto) {
    // transforma endereco em link clicavel, sem deixar passar HTML da resposta
    var caixa = document.createElement('span');
    var re = /https?:\/\/[^\s<>"')]+/g;
    var pos = 0, m;
    while ((m = re.exec(texto)) !== null) {
      if (m.index > pos) caixa.appendChild(document.createTextNode(texto.slice(pos, m.index)));
      var url = m[0].replace(/[.,;:)]+$/, '');
      var a = document.createElement('a');
      a.className = 'diana-link';
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = url.replace(/^https?:\/\//, '');
      caixa.appendChild(a);
      pos = m.index + url.length;
    }
    if (pos < texto.length) caixa.appendChild(document.createTextNode(texto.slice(pos)));
    return caixa;
  }

  function msg(quem, texto) {
    var d = document.createElement('div');
    d.className = 'diana-m diana-' + quem;
    d.appendChild(comLinks(texto));
    corpo.appendChild(d);
    corpo.scrollTop = corpo.scrollHeight;
    return d;
  }

  function botaoZap(dados) {
    var a = document.createElement('a');
    a.className = 'diana-zap';
    a.href = dados.link;
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = icoZap + 'Falar no WhatsApp';
    return a;
  }

  function abrir() {
    aberto = true;
    painel.classList.add('diana-ver');
    orbita.classList.add('diana-off');
    convite.classList.remove('diana-ver');
    if (giro) { clearInterval(giro); giro = null; }
    pararRonda();
    if (!jaAbriu) { jaAbriu = true; msg('ele', ABERTURA); }
    setTimeout(function () { campo.focus(); }, 120);
  }

  function fecharPainel() {
    aberto = false;
    painel.classList.remove('diana-ver');
    orbita.classList.remove('diana-off');
  }

  bolha.addEventListener('click', abrir);
  convite.addEventListener('click', abrir);
  fechar.addEventListener('click', fecharPainel);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && aberto) fecharPainel();
  });

  /* ---------------- conversa ---------------- */
  function tocar(base64) {
    try {
      if (tocando) { tocando.pause(); tocando = null; }
      var a = new Audio('data:audio/mpeg;base64,' + base64);
      tocando = a;
      a.onended = function () { tocando = null; };
      a.play().catch(function () { tocando = null; });
    } catch (e) { tocando = null; }
  }

  function enviarAudio(base64, mimeType) {
    if (ocupado) return;
    ocupado = true;
    enviar.disabled = true;

    var minha = msg('eu', 'Áudio enviado');
    var pensando = document.createElement('div');
    pensando.className = 'diana-pt';
    pensando.innerHTML = '<i></i><i></i><i></i>';
    corpo.appendChild(pensando);
    corpo.scrollTop = corpo.scrollHeight;

    var corpoReq = { audio: base64, mimeType: mimeType, sessao: SESSAO };

    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpoReq)
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        pensando.remove();
        if (d.ouvido) minha.textContent = d.ouvido;   // mostra o que foi entendido
        var bloco = msg('ele', (d.resposta || '').trim()
          || 'Não consegui entender o áudio. Pode repetir?');
        if (d.audio) tocar(d.audio);
        if (d.whatsapp && d.whatsapp.link) {
          bloco.appendChild(document.createElement('br'));
          bloco.appendChild(botaoZap(d.whatsapp));
        }
      })
      .catch(function () {
        pensando.remove();
        msg('ele', 'Tive um problema de conexão. Pode tentar de novo?');
      })
      .then(function () {
        ocupado = false;
        enviar.disabled = false;
        corpo.scrollTop = corpo.scrollHeight;
      });
  }

  function perguntar(texto, modo) {
    if (!texto || ocupado) return;
    modo = modo || 'texto';
    ocupado = true;
    enviar.disabled = true;
    msg('eu', texto);

    var pensando = document.createElement('div');
    pensando.className = 'diana-pt';
    pensando.innerHTML = '<i></i><i></i><i></i>';
    corpo.appendChild(pensando);
    corpo.scrollTop = corpo.scrollHeight;

    var corpoReq = { mensagem: texto, sessao: SESSAO, modo: modo };

    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpoReq)
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        pensando.remove();
        var bloco = msg('ele', (d.resposta || '').trim()
          || 'Não consegui responder agora. Pode repetir?');
        if (d.audio) tocar(d.audio);
        if (d.whatsapp && d.whatsapp.link) {
          bloco.appendChild(document.createElement('br'));
          bloco.appendChild(botaoZap(d.whatsapp));
          corpo.scrollTop = corpo.scrollHeight;
        }
      })
      .catch(function () {
        pensando.remove();
        var b = msg('ele', 'Tive um problema de conexão. Se preferir, fale direto no WhatsApp:');
        b.appendChild(document.createElement('br'));
        b.appendChild(botaoZap({
          link: 'https://wa.me/' + WHATS + '?text=' + encodeURIComponent('Olá Dione! Vim pelo link da bio.')
        }));
      })
      .then(function () {
        ocupado = false;
        enviar.disabled = false;
        corpo.scrollTop = corpo.scrollHeight;
      });
  }

  /* ---------------- gravar audio de verdade ---------------- */
  var gravador = null, pedacos = [], gravando = false, faixa = null, tempoInicio = 0;

  function podeGravar() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  }

  if (podeGravar()) mic.hidden = false;

  function tipoSuportado() {
    var tipos = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'];
    for (var i = 0; i < tipos.length; i++) {
      if (MediaRecorder.isTypeSupported(tipos[i])) return tipos[i];
    }
    return '';
  }

  function pararTudo() {
    if (faixa) { faixa.getTracks().forEach(function (t) { t.stop() }); faixa = null; }
    gravando = false;
    mic.classList.remove('diana-ouvindo');
    campo.placeholder = 'Escreva aqui';
  }

  async function comecarGravacao() {
    try {
      faixa = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e) {
      msg('ele', 'Preciso da sua permissão para usar o microfone. Toque no cadeado ao lado do endereço do site, libere o microfone e recarregue a página. Se preferir, é só escrever aqui embaixo.');
      return;
    }
    var tipo = tipoSuportado();
    try {
      gravador = tipo ? new MediaRecorder(faixa, { mimeType: tipo }) : new MediaRecorder(faixa);
    } catch (e) {
      pararTudo();
      msg('ele', 'Este navegador não conseguiu gravar áudio. Pode escrever aqui embaixo?');
      return;
    }

    pedacos = [];
    tempoInicio = Date.now();
    gravador.ondataavailable = function (ev) { if (ev.data && ev.data.size) pedacos.push(ev.data); };
    gravador.onstop = function () {
      var duracao = Date.now() - tempoInicio;
      var blob = new Blob(pedacos, { type: gravador.mimeType || 'audio/webm' });
      pararTudo();
      if (duracao < 700 || blob.size < 1200) {
        campo.placeholder = 'Segure um instante a mais para gravar';
        return;
      }
      var leitor = new FileReader();
      leitor.onloadend = function () {
        var base64 = String(leitor.result).split(',')[1];
        enviarAudio(base64, (gravador.mimeType || 'audio/webm').split(';')[0]);
      };
      leitor.readAsDataURL(blob);
    };

    gravador.start();
    gravando = true;
    mic.classList.add('diana-ouvindo');
    campo.placeholder = 'Gravando, toque de novo para enviar';
  }

  function encerrarGravacao() {
    if (gravador && gravador.state === 'recording') gravador.stop();
    else pararTudo();
  }

  mic.addEventListener('click', function () {
    if (tocando) { tocando.pause(); tocando = null; return; }
    if (ocupado) return;
    if (gravando) { encerrarGravacao(); return; }
    comecarGravacao();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var t = campo.value.trim();
    if (!t) return;
    campo.value = '';
    perguntar(t);
  });
})();
