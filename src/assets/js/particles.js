/**
 * Floating Particles Animation for Hero Section
 * Creates particles that float upward in the background
 */

class ParticleSystem {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        // Configuration
        this.config = {
            particleCount: options.particleCount || 50,
            minSize: options.minSize || 2,
            maxSize: options.maxSize || 8,
            minSpeed: options.minSpeed || 1,
            maxSpeed: options.maxSpeed || 3,
            colors: options.colors || ['rgba(255, 255, 255, 0.3)', 'rgba(237, 137, 0, 0.2)', 'rgba(255, 255, 255, 0.5)'],
            shapes: options.shapes || ['circle', 'square']
        };

        this.particles = [];
        this.animationId = null;
        
        this.init();
    }

    init() {
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'particles-canvas';
        this.ctx = this.canvas.getContext('2d');
        
        // Insert canvas as first child of hero section
        this.container.insertBefore(this.canvas, this.container.firstChild);
        
        // Set canvas size
        this.resizeCanvas();
        
        // Create particles
        this.createParticles();
        
        // Start animation
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle() {
        const size = Math.random() * (this.config.maxSize - this.config.minSize) + this.config.minSize;
        const speed = Math.random() * (this.config.maxSpeed - this.config.minSpeed) + this.config.minSpeed;
        
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: size,
            speed: speed,
            color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
            shape: this.config.shapes[Math.floor(Math.random() * this.config.shapes.length)],
            drift: (Math.random() - 0.5) * 0.5, // Horizontal drift
            opacity: Math.random() * 0.5 + 0.3 // Random opacity between 0.3 and 0.8
        };
    }

    drawParticle(particle) {
        this.ctx.fillStyle = particle.color;
        this.ctx.globalAlpha = particle.opacity;
        
        if (particle.shape === 'circle') {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        } else if (particle.shape === 'square') {
            this.ctx.fillRect(
                particle.x - particle.size / 2,
                particle.y - particle.size / 2,
                particle.size,
                particle.size
            );
        }
        
        this.ctx.globalAlpha = 1;
    }

    updateParticle(particle) {
        // Move particle upward
        particle.y -= particle.speed;
        
        // Add horizontal drift
        particle.x += particle.drift;
        
        // Reset particle when it goes off screen
        if (particle.y + particle.size < 0) {
            particle.y = this.canvas.height + particle.size;
            particle.x = Math.random() * this.canvas.width;
        }
        
        // Keep particles within horizontal bounds
        if (particle.x < -particle.size) {
            particle.x = this.canvas.width + particle.size;
        } else if (particle.x > this.canvas.width + particle.size) {
            particle.x = -particle.size;
        }
    }

    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw each particle
        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });
        
        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        window.removeEventListener('resize', () => this.resizeCanvas());
    }
}

// Initialize particles when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('hero-home');
    if (heroSection) {
        new ParticleSystem('hero-home', {
            particleCount: 60,
            minSize: 2,
            maxSize: 6,
            minSpeed: 0.2,
            maxSpeed: 0.8,
            colors: [
                'rgba(255, 255, 255, 0.4)',
                'rgba(237, 137, 0, 0.3)',
                'rgba(255, 255, 255, 0.6)',
                'rgba(237, 137, 0, 0.2)'
            ],
            shapes: ['circle', 'square']
        });
    }
});
