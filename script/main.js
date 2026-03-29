function createParticles() {
    const emojis = ['❤️', '🌎', '🌠', '💝', '🌟', '💞'];
    const container = document.body;
    let lastTime = 0;

    function animate(timestamp) {
        if (!lastTime || timestamp - lastTime >= 500) {
            const particle = document.createElement('div');
            particle.className = 'love-particle';
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = Math.random() * 3 + 3 + 's';
            container.appendChild(particle);
            setTimeout(() => particle.remove(), 6000);
            lastTime = timestamp;
        }
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

let currentMessage = 0;
const messages = document.querySelectorAll('.message');
const finalQuestion = document.querySelector('.final-question');

function showNextMessage() {
    requestAnimationFrame(() => {
        if (currentMessage > 0) {
            messages[currentMessage - 1].classList.add('exit');
        }
        if (currentMessage < messages.length) {
            messages[currentMessage].classList.add('active');
            currentMessage++;
            setTimeout(showNextMessage, 3000);
        } else {
            finalQuestion.style.display = 'block';
            finalQuestion.style.opacity = '1';
        }
    });
}

// track how many times no-btn is hit
let noHitCount = 0;

function showFloatingImage(src) {
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = `
        position: fixed;
        width: 120px;
        height: 120px;
        object-fit: contain;
        left: ${Math.random() * 70 + 10}%;
        top: ${Math.random() * 70 + 10}%;
        opacity: 1;
        transition: opacity 1s ease;
        z-index: 9999;
        pointer-events: none;
        border-radius: 12px;
    `;
    document.body.appendChild(img);
    setTimeout(() => { img.style.opacity = '0'; }, 1500);
    setTimeout(() => img.remove(), 2500);
}

document.querySelector('.yes-btn').addEventListener('click', function() {
    const celebration = document.querySelector('.celebration');
    celebration.style.display = 'block';

    requestAnimationFrame(() => {
        for (let i = 0; i < 50; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart-burst';
            heart.textContent = '❤️';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 0.5 + 's';
            celebration.appendChild(heart);
        }
    });

    finalQuestion.innerHTML = `
        <h2>You make me the happiest 💕</h2>
        <p>Every moment with you is a gift</p>
        <p style='font-size: 0.95rem; margin-top: 1rem; opacity: 0.9;'>And I can't wait to spend forever showing you how much you mean to me</p>
        <div style='margin-top: 2rem;'>
            <img src='assets/celebration.gif' style='width:200px; height:200px; object-fit:contain; border-radius:16px;' />
        </div>
    `;
});

const noBtn = document.querySelector('.no-btn');

// run away on hover
noBtn.addEventListener('mouseover', function() {
    requestAnimationFrame(() => {
        this.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg)`;
        this.style.transition = 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
    });
});

// shrink + show image on click
noBtn.addEventListener('click', function() {
    noHitCount++;
    const scale = Math.max(0.2, 1 - noHitCount * 0.15);
    this.style.transform = `scale(${scale}) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`;
    this.style.transition = 'all 0.3s ease';
    showFloatingImage('assets/caught.png');

    // hide button completely after 5 hits
    if (noHitCount >= 5) {
        this.style.display = 'none';
    }
});

createParticles();
setTimeout(showNextMessage, 1000);