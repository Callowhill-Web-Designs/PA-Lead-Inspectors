/**
 * Stats Animation - Fade In and Slide Up on Scroll
 * Animates stat numbers when they scroll into view
 */

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.getElementById('services-stats');
    
    if (!statsSection) return;
    
    const statItems = statsSection.querySelectorAll('.cs-item');
    
    // Set initial state - hidden and translated down
    statItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Create Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the element is visible
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the index to create staggered animation
                const index = Array.from(statItems).indexOf(entry.target);
                
                // Animate with a slight delay for each item
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // 100ms delay between each item
                
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all stat items
    statItems.forEach(item => {
        observer.observe(item);
    });
});
