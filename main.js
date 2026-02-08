// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        });
    });
}

// Form submission (placeholder)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Close mobile menu on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 767 && navLinks) {
        navLinks.classList.remove('active');
        if (mobileMenuBtn) mobileMenuBtn.textContent = '☰';
    }
});

// WhatsApp function
function openWhatsApp(productMessage) {
    const phoneNumber = '+265992698447';
    const message = `Hello Big2Projects! ${productMessage}. Please provide me with more information about pricing and availability.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

// Tab functionality for Resources section
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons and contents
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Show corresponding content
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Functions to show specific tabs from footer links
function showGalleryTab() {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    document.querySelector('[data-tab="gallery-tab"]').classList.add('active');
    document.getElementById('gallery-tab').classList.add('active');
}

function showPublicationsTab() {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    document.querySelector('[data-tab="publications-tab"]').classList.add('active');
    document.getElementById('publications-tab').classList.add('active');
}

// Video mute/unmute functionality
const aboutVideo = document.getElementById('aboutVideo');
const videoMuteBtn = document.getElementById('videoMuteBtn');

if (aboutVideo && videoMuteBtn) {
    videoMuteBtn.addEventListener('click', function() {
        if (aboutVideo.muted) {
            aboutVideo.muted = false;
            this.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            aboutVideo.muted = true;
            this.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
}

// Handle scroll indicators for sliders
function updateScrollIndicators() {
    const sliders = document.querySelectorAll('.slider-track');
    
    sliders.forEach(slider => {
        const container = slider.parentElement;
        const indicator = container.querySelector('.scroll-indicator');
        
        if (indicator) {
            // Check if there's more content to scroll
            const hasMoreContent = slider.scrollWidth > slider.clientWidth;
            
            if (hasMoreContent && window.innerWidth <= 767) {
                indicator.style.display = 'block';
                
                // Update indicator based on scroll position
                slider.addEventListener('scroll', function() {
                    const scrollEnd = slider.scrollWidth - slider.clientWidth;
                    const currentScroll = slider.scrollLeft;
                    
                    // Hide indicator when scrolled to the end
                    if (currentScroll >= scrollEnd - 10) {
                        indicator.style.opacity = '0';
                    } else {
                        indicator.style.opacity = '1';
                    }
                });
            } else {
                indicator.style.display = 'none';
            }
        }
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    // Update scroll indicators
    updateScrollIndicators();
    
    // Image error handling
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            // Set placeholder for team images
            if (this.parentElement.classList.contains('team-member-img') || this.classList.contains('team-img')) {
                this.src = 'https://via.placeholder.com/400x320/2d8a4e/ffffff?text=' + encodeURIComponent(this.alt.split(' - ')[0]);
                this.style.objectFit = 'cover';
                this.style.objectPosition = 'center top';
            }
            // Set placeholder for slider items
            else if (this.classList.contains('slider-item-img')) {
                this.src = 'https://via.placeholder.com/400x180/7cb342/ffffff?text=' + encodeURIComponent(this.alt);
            } else if (this.classList.contains('publication-cover')) {
                this.src = 'https://via.placeholder.com/250x350/2d8a4e/ffffff?text=' + encodeURIComponent(this.alt);
            } else if (this.classList.contains('gallery-img')) {
                this.src = 'https://via.placeholder.com/300x200/1a5632/ffffff?text=' + encodeURIComponent(this.alt);
            } else if (this.classList.contains('clinic-image')) {
                this.src = 'https://via.placeholder.com/800x500/7cb342/ffffff?text=Farmers+Clinic+Market';
            } else if (this.classList.contains('app-flyer-large')) {
                this.src = 'https://via.placeholder.com/800x600/1a5632/ffffff?text=Digital+App+Coming+Soon';
            } else if (this.classList.contains('hero-image')) {
                this.src = 'https://via.placeholder.com/800x600/2d8a4e/ffffff?text=Big2Projects+Farming';
            } else if (this.classList.contains('logo-img')) {
                this.src = 'https://via.placeholder.com/150x50/1a5632/ffffff?text=Big2Projects+Logo';
            }
        });
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    updateScrollIndicators();
});
