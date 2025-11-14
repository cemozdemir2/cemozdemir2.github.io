// ===================================
// Typing Effect
// ===================================
const typingText = document.querySelector('.typing-text');
const phrases = [
    'Full-Stack Developer',
    'Backend Specialist',
    'Docker Enthusiast',
    'Vue.js Developer',
    'API Architect'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = 100;
    
    if (isDeleting) {
        typeSpeed = 50;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
}

// Start typing effect
setTimeout(type, 1000);

// ===================================
// Particle Effect for Hero
// ===================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: ${Math.random() > 0.5 ? '#00d9ff' : '#ff2e63'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Particles container style
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    .particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
    }
    
    .particle {
        filter: blur(1px);
    }
    
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Create particles on load
createParticles();

// ===================================
// Navigation
// ===================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===================================
// Smooth Scroll
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Skill Bars Animation
// ===================================
const skillsSection = document.getElementById('skills');
let skillsAnimated = false;

function animateSkillBars() {
    if (!skillsAnimated) {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
        
        skillsAnimated = true;
    }
}

// Intersection Observer for skills animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
        }
    });
}, { 
    threshold: 0.3,  // Lower threshold for better mobile detection
    rootMargin: '0px 0px -50px 0px'  // Trigger earlier on mobile
});

if (skillsSection) {
    skillsObserver.observe(skillsSection);
    
    // Fallback for mobile: trigger after a delay if not triggered
    setTimeout(() => {
        if (!skillsAnimated && window.scrollY > 0) {
            const rect = skillsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                animateSkillBars();
            }
        }
    }, 2000);
}

// ===================================
// Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
    '.skill-category, .project-card, .timeline-item, .contact-item, .stat-item, .tech-icon'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===================================
// Scroll to Top Button
// ===================================
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Contact Form Validation
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate
    if (!name || !email || !subject || !message) {
        showNotification('Lütfen tüm alanları doldurunuz!', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Lütfen geçerli bir email adresi giriniz!', 'error');
        return;
    }
    
    // Create mailto link
    const mailtoLink = `mailto:cemozdemirr@outlook.com.tr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`İsim: ${name}\nEmail: ${email}\n\nMesaj:\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Email istemciniz açılıyor...', 'success');
    
    // Reset form
    setTimeout(() => {
        contactForm.reset();
    }, 1000);
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification function
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// ===================================
// Parallax Effect for Hero Section
// ===================================
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const heroImage = document.querySelector('.hero-image');
    
//     if (heroImage && scrolled < window.innerHeight) {
//         heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
//     }
// });

// ===================================
// Lazy Loading for Images
// ===================================
const images = document.querySelectorAll('img[data-src]');

const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imgObserver.observe(img));

// ===================================
// Project Card Tilt Effect
// ===================================
const projectCardsForTilt = document.querySelectorAll('.project-card');

projectCardsForTilt.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// ===================================
// Cursor Trail Effect (Optional)
// ===================================
let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// ===================================
// Page Load Animation
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Console Easter Egg
// ===================================
console.log('%c👋 Merhaba!', 'font-size: 24px; font-weight: bold; color: #4a90e2;');
console.log('%cBu siteyi inceledin mi? Harika!', 'font-size: 16px; color: #2c3e50;');
console.log('%cBenimle çalışmak istersen: cemozdemirr@outlook.com.tr', 'font-size: 14px; color: #666;');
console.log('%c☕ Kahve içelim ve bir şeyler yapalım!', 'font-size: 14px; color: #e74c3c;');

// ===================================
// Performance Monitoring
// ===================================
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Sayfa yükleme süresi: ${pageLoadTime}ms`);
        }, 0);
    });
}

// ===================================
// Project Detail Panel
// ===================================
const projectCards = document.querySelectorAll('.project-card-link');
const detailPanel = document.getElementById('projectDetailPanel');
const mobileDetailPanel = document.getElementById('mobileDetailPanel');
const closePanel = document.getElementById('closePanel');
const projectsGrid = document.querySelector('.projects-grid');

// GitHub API Base URL
const GITHUB_API = 'https://api.github.com/repos/';

// Check if mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Project card click handler
projectCards.forEach(card => {
    card.addEventListener('click', async (e) => {
        e.preventDefault();
        const repo = card.getAttribute('data-repo');
        if (!repo) return;
        
        // Remove active class from all cards
        projectCards.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked card
        card.classList.add('active');
        
        // Choose panel based on screen size
        const activePanel = isMobile() ? mobileDetailPanel : detailPanel;
        
        // Open panel with animation and hide other cards
        activePanel.classList.add('active');
        projectsGrid.classList.add('detail-active');
        
        // Show loading
        const loadingEl = activePanel.querySelector('.detail-loading');
        const loadedEl = activePanel.querySelector('.detail-loaded');
        if (loadingEl) loadingEl.style.display = 'block';
        if (loadedEl) loadedEl.style.display = 'none';
        
        // Fetch repo data
        await loadProjectDetails(repo, isMobile());
    });
});

// Close panel handler - needs to work for both panels
const closePanelButtons = document.querySelectorAll('.close-panel');
closePanelButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        detailPanel.classList.remove('active');
        mobileDetailPanel.classList.remove('active');
        projectsGrid.classList.remove('detail-active');
        projectCards.forEach(c => c.classList.remove('active'));
    });
});

// Load project details from GitHub API
async function loadProjectDetails(repo, useMobilePanel = false) {
    try {
        const activePanel = useMobilePanel ? mobileDetailPanel : detailPanel;
        
        // Check cache first
        const cacheKey = `github_repo_${repo.replace('/', '_')}`;
        const cached = localStorage.getItem(cacheKey);
        const cacheTime = localStorage.getItem(`${cacheKey}_time`);
        
        // Use cache if less than 1 hour old
        if (cached && cacheTime && (Date.now() - parseInt(cacheTime)) < 3600000) {
            const cachedData = JSON.parse(cached);
            displayCachedData(cachedData, useMobilePanel);
            return;
        }
        
        // Fetch repository info
        const repoResponse = await fetch(`${GITHUB_API}${repo}`);
        
        // Check for rate limit error
        if (repoResponse.status === 403) {
            const errorData = await repoResponse.json();
            if (errorData.message && errorData.message.includes('rate limit')) {
                loadingEl.innerHTML = `
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>GitHub API rate limit aşıldı. Lütfen biraz sonra tekrar deneyin.</p>
                    <small>Rate limit saatte 60 istek ile sınırlıdır.</small>
                `;
                return;
            }
        }
        
        const repoData = await repoResponse.json();
        
        // Update repo info in the correct panel
        const repoNameEl = activePanel.querySelector('#repoName, h2');
        const repoDescEl = activePanel.querySelector('#repoDescription, .repo-description');
        const repoLinkEl = activePanel.querySelector('#repoLink, .github-link');
        const repoStarsEl = activePanel.querySelector('#repoStars');
        const repoForksEl = activePanel.querySelector('#repoForks');
        const repoWatchersEl = activePanel.querySelector('#repoWatchers');
        const repoLanguageEl = activePanel.querySelector('#repoLanguage');
        const repoUpdatedEl = activePanel.querySelector('#repoUpdated');
        
        if (repoNameEl) repoNameEl.textContent = repoData.name;
        if (repoDescEl) repoDescEl.textContent = repoData.description || 'Açıklama mevcut değil';
        if (repoLinkEl) repoLinkEl.href = repoData.html_url;
        if (repoStarsEl) repoStarsEl.textContent = repoData.stargazers_count;
        if (repoForksEl) repoForksEl.textContent = repoData.forks_count;
        if (repoWatchersEl) repoWatchersEl.textContent = repoData.watchers_count;
        if (repoLanguageEl) repoLanguageEl.textContent = repoData.language || 'N/A';
        
        // Format updated date
        const updatedDate = new Date(repoData.updated_at);
        if (repoUpdatedEl) repoUpdatedEl.textContent = updatedDate.toLocaleDateString('tr-TR');
        
        // Fetch file structure
        const contentsResponse = await fetch(`${GITHUB_API}${repo}/contents`);
        const contentsData = await contentsResponse.json();
        displayFileStructure(contentsData, useMobilePanel);
        
        // Fetch README
        let readmeText = '';
        try {
            const readmeResponse = await fetch(`${GITHUB_API}${repo}/readme`, {
                headers: { 'Accept': 'application/vnd.github.v3.raw' }
            });
            readmeText = await readmeResponse.text();
            displayReadme(readmeText, useMobilePanel);
        } catch (error) {
            const readmeEl = activePanel.querySelector('#readmeContent, .readme-content');
            if (readmeEl) readmeEl.innerHTML = '<p>README.md dosyası bulunamadı.</p>';
        }
        
        // Cache the data
        const dataToCache = {
            repo: repoData,
            contents: contentsData,
            readme: readmeText
        };
        localStorage.setItem(cacheKey, JSON.stringify(dataToCache));
        localStorage.setItem(`${cacheKey}_time`, Date.now().toString());
        
        // Hide loading, show content
        const loadingEl = activePanel.querySelector('.detail-loading');
        const loadedEl = activePanel.querySelector('.detail-loaded');
        if (loadingEl) loadingEl.style.display = 'none';
        if (loadedEl) loadedEl.style.display = 'block';
        
    } catch (error) {
        console.error('Error loading project details:', error);
        document.querySelector('.detail-loading').innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <p>Proje detayları yüklenirken bir hata oluştu.</p>
        `;
    }
}

// Display cached data
function displayCachedData(data, useMobilePanel = false) {
    const repoData = data.repo;
    const activePanel = useMobilePanel ? mobileDetailPanel : detailPanel;
    
    // Update repo info
    const repoNameEl = activePanel.querySelector('#repoName, h2');
    const repoDescEl = activePanel.querySelector('#repoDescription, .repo-description');
    const repoLinkEl = activePanel.querySelector('#repoLink, .github-link');
    const repoStarsEl = activePanel.querySelector('#repoStars');
    const repoForksEl = activePanel.querySelector('#repoForks');
    const repoWatchersEl = activePanel.querySelector('#repoWatchers');
    const repoLanguageEl = activePanel.querySelector('#repoLanguage');
    const repoUpdatedEl = activePanel.querySelector('#repoUpdated');
    
    if (repoNameEl) repoNameEl.textContent = repoData.name;
    if (repoDescEl) repoDescEl.textContent = repoData.description || 'Açıklama mevcut değil';
    if (repoLinkEl) repoLinkEl.href = repoData.html_url;
    if (repoStarsEl) repoStarsEl.textContent = repoData.stargazers_count;
    if (repoForksEl) repoForksEl.textContent = repoData.forks_count;
    if (repoWatchersEl) repoWatchersEl.textContent = repoData.watchers_count;
    if (repoLanguageEl) repoLanguageEl.textContent = repoData.language || 'N/A';
    
    // Format updated date
    const updatedDate = new Date(repoData.updated_at);
    if (repoUpdatedEl) repoUpdatedEl.textContent = updatedDate.toLocaleDateString('tr-TR');
    
    // Display file structure
    displayFileStructure(data.contents, useMobilePanel);
    
    // Display README
    if (data.readme) {
        displayReadme(data.readme, useMobilePanel);
    } else {
        const readmeEl = activePanel.querySelector('#readmeContent, .readme-content');
        if (readmeEl) readmeEl.innerHTML = '<p>README.md dosyası bulunamadı.</p>';
    }
    
    // Hide loading, show content
    const loadingEl = activePanel.querySelector('.detail-loading');
    const loadedEl = activePanel.querySelector('.detail-loaded');
    if (loadingEl) loadingEl.style.display = 'none';
    if (loadedEl) loadedEl.style.display = 'block';
}

// Display file structure
function displayFileStructure(files, useMobilePanel = false) {
    const activePanel = useMobilePanel ? mobileDetailPanel : detailPanel;
    const fileTree = activePanel.querySelector('#fileTree, .file-tree');
    if (!fileTree) return;
    fileTree.innerHTML = '';
    
    files.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item' + (file.type === 'dir' ? ' folder' : '');
        
        const icon = file.type === 'dir' ? 'fa-folder' : 'fa-file';
        fileItem.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${file.name}</span>
        `;
        
        fileTree.appendChild(fileItem);
    });
}

// Display README with basic markdown parsing
function displayReadme(markdown, useMobilePanel = false) {
    const activePanel = useMobilePanel ? mobileDetailPanel : detailPanel;
    const readmeContent = activePanel.querySelector('#readmeContent, .readme-content');
    if (!readmeContent) return;
    
    // Basic markdown to HTML conversion
    let html = markdown
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Code blocks
        .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>')
        // Inline code
        .replace(/`(.*?)`/g, '<code>$1</code>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
        // Line breaks
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
    
    readmeContent.innerHTML = `<p>${html}</p>`;
}
