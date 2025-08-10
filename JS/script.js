// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Sidebar functionality
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        sidebar.classList.toggle('active');
    } else {
        sidebar.classList.toggle('hidden');
    }
}

// Game filtering with sidebar
function filterGames(category) {
    const cards = document.querySelectorAll('.game-card');
    const sidebarItems = document.querySelectorAll('.category-item');
    
    // Remove active class from all sidebar items
    sidebarItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to clicked item
    const clickedItem = document.querySelector(`[data-category="${category}"]`);
    if (clickedItem) {
        clickedItem.classList.add('active');
    }
    
    // Filter cards
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    // Close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('active');
    }
}

// View mode switching
function changeView(viewType) {
    const gamesGrid = document.getElementById('gamesGrid');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    // Update active button
    viewButtons.forEach(btn => btn.classList.remove('active'));
    const activeButton = document.querySelector(`[onclick="changeView('${viewType}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Toggle view class
    if (viewType === 'list') {
        gamesGrid.classList.add('list-view');
        
        // Restructure cards for list view
        document.querySelectorAll('.game-card').forEach(card => {
            const gameInfo = card.querySelector('.game-info');
            const gameTitle = gameInfo.querySelector('.game-title');
            const gameCategory = gameInfo.querySelector('.game-category');
            const gameRating = gameInfo.querySelector('.game-rating');
            const gameStats = gameInfo.querySelector('.game-stats');
            
            // Create details wrapper
            const detailsWrapper = document.createElement('div');
            detailsWrapper.className = 'game-details';
            detailsWrapper.appendChild(gameTitle);
            detailsWrapper.appendChild(gameCategory);
            detailsWrapper.appendChild(gameRating);
            
            // Clear and rebuild info section
            gameInfo.innerHTML = '';
            gameInfo.appendChild(detailsWrapper);
            gameInfo.appendChild(gameStats);
        });
    } else {
        gamesGrid.classList.remove('list-view');
        
        // Restore original structure
        document.querySelectorAll('.game-card').forEach(card => {
            const gameInfo = card.querySelector('.game-info');
            const detailsWrapper = gameInfo.querySelector('.game-details');
            
            if (detailsWrapper) {
                const gameTitle = detailsWrapper.querySelector('.game-title');
                const gameCategory = detailsWrapper.querySelector('.game-category');
                const gameRating = detailsWrapper.querySelector('.game-rating');
                const gameStats = gameInfo.querySelector('.game-stats');
                
                // Clear and rebuild in original structure
                gameInfo.innerHTML = '';
                gameInfo.appendChild(gameTitle);
                gameInfo.appendChild(gameCategory);
                gameInfo.appendChild(gameRating);
                gameInfo.appendChild(gameStats);
            }
        });
    }
}

// Close sidebar when clicking outside (mobile)
document.addEventListener('click', function(e) {
    const sidebar = document.getElementById('sidebar');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && sidebar.classList.contains('active')) {
        if (!sidebar.contains(e.target) && !mobileBtn.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
        sidebar.classList.remove('active');
        sidebar.classList.remove('hidden');
    } else {
        sidebar.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.querySelector('.search-box');
    
    if (searchBox) {
        searchBox.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const gameCards = document.querySelectorAll('.game-card');
            
            gameCards.forEach(card => {
                const title = card.querySelector('.game-title').textContent.toLowerCase();
                const category = card.querySelector('.game-category').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || category.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        if (!title.includes(searchBox.value.toLowerCase()) && 
                            !category.includes(searchBox.value.toLowerCase())) {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
            
            // Reset category filter when searching
            if (searchTerm.length > 0) {
                const buttons = document.querySelectorAll('.category-btn');
                buttons.forEach(btn => btn.classList.remove('active'));
            }
        });
    }
});

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 26, 46, 0.95)';
        } else {
            header.style.background = 'rgba(26, 26, 46, 0.9)';
        }
    }
});

// Game card click functionality
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', function() {
            const gameTitle = this.querySelector('.game-title').textContent;
            alert(`Carregando ${gameTitle}... 🎮\n(Aqui você integraria com o sistema de jogos real)`);
        });
    });
});

// Mobile menu toggle (for future implementation)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('mobile-active');
    }
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to clear search
    if (e.key === 'Escape') {
        const searchBox = document.querySelector('.search-box');
        if (searchBox && searchBox === document.activeElement) {
            searchBox.value = '';
            searchBox.dispatchEvent(new Event('input'));
            searchBox.blur();
        }
    }
    
    // Enter key on game cards
    if (e.key === 'Enter' && e.target.classList.contains('game-card')) {
        e.target.click();
    }
});

// Performance optimization: Debounce search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced search with debounce and sidebar integration
document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.querySelector('.search-box');
    
    if (searchBox) {
        const debouncedSearch = debounce(function(searchTerm) {
            const gameCards = document.querySelectorAll('.game-card');
            
            gameCards.forEach(card => {
                const title = card.querySelector('.game-title').textContent.toLowerCase();
                const category = card.querySelector('.game-category').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || category.includes(searchTerm)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Reset sidebar selection when searching
            if (searchTerm.length > 0) {
                const sidebarItems = document.querySelectorAll('.category-item');
                sidebarItems.forEach(item => item.classList.remove('active'));
            } else {
                // Restore "all" selection when search is cleared
                const allItem = document.querySelector('[data-category="all"]');
                if (allItem) {
                    allItem.classList.add('active');
                }
            }
        }, 300);
        
        searchBox.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            debouncedSearch(searchTerm);
        });
    }
});