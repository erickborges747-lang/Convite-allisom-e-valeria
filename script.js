async function carregarConvite() {

    const parametros = new URLSearchParams(window.location.search);

    const id = parametros.get("id");

    if (!id) return;

    try {

        const resposta = await fetch(`dados/${id}.json`);

        if (!resposta.ok) {
            throw new Error("Convite não encontrado");
        }

        const convite = await resposta.json();

        document.getElementById("familiaConvidada").textContent =
            convite.familia;

        document.getElementById("nomesConvidados").innerHTML =
            convite.nomes
                .map(nome => `<p>${nome}</p>`)
                .join("");

    } catch (erro) {

        document.getElementById("familiaConvidada").textContent =
            "Convite inválido";

        document.getElementById("nomesConvidados").innerHTML =
            "<p>Não foi possível localizar este convite.</p>";

    }

}

carregarConvite();

/*==================================================
CONFIGURAÇÕES
==================================================*/

const CONFIG = {

    whatsapp:
        "https://wa.me/5591984916451?text=Olá,%20Allisom%20e%20Valéria!%20Confirmo%20a%20presença%20de%20no%20casamento.",

    cerimonia:
        "https://maps.app.goo.gl/Yx8ifeeAZajMZBrJ9",

    recepcao:
        "https://maps.app.goo.gl/riSQK96AtgipU7zU8",

    presentes:
        "https://lista.com",

    pix:
        "91984916451"
};

/*==================================================
ANIMAÇÃO AO ROLAR
==================================================*/

const sections = document.querySelectorAll(
    ".foto-casal, .data, .calendar-section, .texto-convite, .buque, .cerimonia, .aviso, .foto-final"
);

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.2
});

sections.forEach(section=>{

    section.classList.add("fade");

    observer.observe(section);

});

/*==================================================
BOTÕES
==================================================*/

const botoes = document.querySelectorAll(".buttons a");

botoes[0].addEventListener("click",(e)=>{

    e.preventDefault();

    window.open(CONFIG.whatsapp,"_blank");

});

botoes[1].addEventListener("click",(e)=>{

    e.preventDefault();

    window.open(CONFIG.cerimonia,"_blank");

});

botoes[2].addEventListener("click",(e)=>{

    e.preventDefault();

    window.open(CONFIG.recepcao,"_blank");

});

botoes[3].addEventListener("click",(e)=>{

    e.preventDefault();

    window.open(CONFIG.presentes,"_blank");

});

botoes[4].addEventListener("click",(e)=>{

    e.preventDefault();

    abrirPix();

});

/*==================================================
MODAL PIX
==================================================*/

function abrirPix(){

    const modal=document.createElement("div");

    modal.className="modal";

    modal.innerHTML=`

        <div class="modal-box">

            <h2>Presentear via Pix</h2>

            <img src="img/Captura de tela 2026-03-23 115529.png">

            <p>

            Ou copie a chave abaixo.

            </p>

            <input
            id="pixKey"
            value="${CONFIG.pix}"
            readonly>

            <button id="copiar">

            Copiar chave

            </button>

            <button id="fechar">

            Fechar

            </button>

        </div>

    `;

    document.body.appendChild(modal);

    document.getElementById("copiar").onclick=()=>{

        navigator.clipboard.writeText(CONFIG.pix);

        alert("Chave copiada!");

    };

    document.getElementById("fechar").onclick=()=>{

        modal.remove();

    };

}

/*==================================================
EFEITO BOTÕES
==================================================*/

botoes.forEach(botao=>{

    botao.addEventListener("mouseenter",()=>{

        botao.style.transform="scale(1.03)";

    });

    botao.addEventListener("mouseleave",()=>{

        botao.style.transform="scale(1)";

    });

});

/*==================================================
SCROLL SUAVE
==================================================*/

document.querySelector(".scroll-btn")
.addEventListener("click",function(e){

    e.preventDefault();

    document.querySelector("#convite")
    .scrollIntoView({

        behavior:"smooth"

    });

});

/*==================================================
ANO AUTOMÁTICO NO FOOTER
==================================================*/

console.log("Convite carregado.");