// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterBtn = document.querySelector('.filter-btn');
    const regionSelect = document.querySelector('.filter-select:nth-of-type(1)');
    const typeSelect = document.querySelector('.filter-select:nth-of-type(2)');
    const priceSelect = document.querySelector('.filter-select:nth-of-type(3)');
    
    filterBtn.addEventListener('click', function() {
        const selectedRegion = regionSelect.value;
        const selectedType = typeSelect.value;
        const selectedPrice = priceSelect.value;
        
        filterDestinations(selectedRegion, selectedType, selectedPrice);
    });
    
    function filterDestinations(region, type, price) {
        const cards = document.querySelectorAll('.destination-card');
        
        cards.forEach(card => {
            // This is a simplified version - in a real application,
            // you would have proper data attributes on the cards
            const destinationName = card.querySelector('h3').textContent;
            const destinationPrice = card.querySelector('.price').textContent;
            
            // Create a mapping of destination names to regions/types for demo purposes
            const regionMap = {
                'Bali, Indonesia': 'asia',
                'Santorini, Greece': 'europe',
                'Kyoto, Japan': 'asia',
                'Costa Rica': 'americas',
                'Barcelona, Spain': 'europe',
                'Machu Picchu, Peru': 'americas',
                'Maldives': 'asia',
                'New York City, USA': 'americas',
                'Marrakech, Morocco': 'africa'
            };
            
            const typeMap = {
                'Bali, Indonesia': 'beach',
                'Santorini, Greece': 'cultural',
                'Kyoto, Japan': 'cultural',
                'Costa Rica': 'adventure',
                'Barcelona, Spain': 'city',
                'Machu Picchu, Peru': 'adventure',
                'Maldives': 'luxury',
                'New York City, USA': 'city',
                'Marrakech, Morocco': 'cultural'
            };
            
            // Extract price value for price filtering
            const priceValue = parseInt(destinationPrice.replace(/\D/g, ''));
            let priceCategory = '';
            
            if (priceValue < 500) priceCategory = 'budget';
            else if (priceValue < 1000) priceCategory = 'moderate';
            else priceCategory = 'luxury';
            
            // Check if the destination matches the selected filters
            const matchesRegion = !region || regionMap[destinationName] === region;
            const matchesType = !type || typeMap[destinationName] === type;
            const matchesPrice = !price || priceCategory === price;
            
            // Show or hide the card
            if (matchesRegion && matchesType && matchesPrice) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show a message if no results
        const visibleCards = document.querySelectorAll('.destination-card[style="display: block"]');
        const container = document.querySelector('.destinations-grid');
        
        if (visibleCards.length === 0) {
            let noResults = document.querySelector('.no-results');
            if (!noResults) {
                noResults = document.createElement('p');
                noResults.className = 'no-results';
                noResults.textContent = 'No destinations match your filters. Try different criteria.';
                noResults.style.textAlign = 'center';
                noResults.style.gridColumn = '1 / -1';
                noResults.style.padding = '2rem';
                container.appendChild(noResults);
            }
        } else {
            const noResults = document.querySelector('.no-results');
            if (noResults) {
                noResults.remove();
            }
        }
    }
    
    // Navigation toggle for mobile
    const logo = document.querySelector('.logo');
    const navLinks = document.querySelector('.nav-links');
    
    logo.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        }
    });
    
    // Resize handler to fix navigation on screen resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
    
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    // Pagination functionality
    const paginationLinks = document.querySelectorAll('.pagination a');
    
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            paginationLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // In a real application, you would load new content here
            // For demo purposes, we'll just show a loading effect
            const destinationsGrid = document.querySelector('.destinations-grid');
            destinationsGrid.style.opacity = '0.5';
            
            setTimeout(() => {
                destinationsGrid.style.opacity = '1';
            }, 500);
        });
    });
    
    // Add hover effects for destination cards
    const destinationCards = document.querySelectorAll('.destination-card');
    
    destinationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
    
    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Image loading error handling
    const destinationImages = document.querySelectorAll('.destination-img');
    
    destinationImages.forEach(img => {
        // Check if background image fails to load
        const url = img.style.backgroundImage.replace(/url\(['"]?([^'"]+)['"]?\)/gi, '$1');
        const image = new Image();
        
        image.onerror = function() {
            // If image fails to load, set a fallback
            img.style.backgroundImage = 'none';
            img.style.backgroundColor = '#f0f0f0';
            img.innerHTML = destinationName || 'Destination';
        };
        
        const destinationName = img.textContent.trim();
        image.src = url;
    });
    
    // Add a back-to-top button
    const body = document.querySelector('body');
    const backToTopBtn = document.createElement('button');
    
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.position = 'fixed';
    backToTopBtn.style.bottom = '20px';
    backToTopBtn.style.right = '20px';
    backToTopBtn.style.backgroundColor = 'var(--primary)';
    backToTopBtn.style.color = 'white';
    backToTopBtn.style.width = '40px';
    backToTopBtn.style.height = '40px';
    backToTopBtn.style.borderRadius = '50%';
    backToTopBtn.style.border = 'none';
    backToTopBtn.style.cursor = 'pointer';
    backToTopBtn.style.display = 'none';
    backToTopBtn.style.zIndex = '99';
    
    body.appendChild(backToTopBtn);
    
    // Show/hide back-to-top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});