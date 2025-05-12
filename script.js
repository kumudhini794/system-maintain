document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active-section'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('href');
            document.querySelector(sectionId).classList.add('active-section');
        });
    });
    
    // Sample Recipes Data
    let recipes = [
        {
            id: 1,
            name: "Pancakes",
            category: "breakfast",
            difficulty: "easy",
            time: 20,
            ingredients: "1 cup flour\n1 tbsp sugar\n1 tsp baking powder\n1 cup milk\n1 egg",
            steps: "Mix dry ingredients\nAdd wet ingredients\nCook on a hot griddle",
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1559561892-336a88682699?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 2,
            name: "Spaghetti Carbonara",
            category: "dinner",
            difficulty: "medium",
            time: 30,
            ingredients: "200g spaghetti\n100g pancetta\n2 eggs\n50g parmesan\nBlack pepper",
            steps: "Cook pasta\nFry pancetta\nMix eggs and cheese\nCombine everything",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 3,
            name: "Chocolate Cake",
            category: "dessert",
            difficulty: "hard",
            time: 60,
            ingredients: "2 cups flour\n1 cup sugar\n1/2 cup cocoa\n1 tsp baking soda\n1 cup milk\n1/2 cup oil",
            steps: "Mix dry ingredients\nAdd wet ingredients\nBake at 180°C for 30 mins",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1562440499-64c9a111f713?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }
    ];
    
    // Display Recipes
    function displayRecipes(recipeList, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        
        if (recipeList.length === 0) {
            container.innerHTML = '<p>No recipes found.</p>';
            return;
        }
        
        recipeList.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.innerHTML = `
                <img src="${recipe.image || 'https://via.placeholder.com/300x180?text=No+Image'}" alt="${recipe.name}" class="recipe-img">
                <div class="recipe-content">
                    <h3 class="recipe-title">${recipe.name}</h3>
                    <div class="recipe-meta">
                        <span>${recipe.time} mins</span>
                        <span class="recipe-rating">${'★'.repeat(Math.floor(recipe.rating))}${'☆'.repeat(5 - Math.floor(recipe.rating))}</span>
                    </div>
                    <p class="recipe-desc">${recipe.category} • ${recipe.difficulty}</p>
                    <a href="#" class="view-recipe">View Recipe</a>
                </div>
            `;
            container.appendChild(recipeCard);
        });
    }
    
    // Load Featured Recipes (first 3)
    displayRecipes(recipes.slice(0, 3), 'featured-recipes-grid');
    
    // Load All Recipes
    displayRecipes(recipes, 'all-recipes-grid');
    
    // Filter Recipes
    document.getElementById('apply-filters').addEventListener('click', function() {
        const category = document.getElementById('category-filter').value;
        const difficulty = document.getElementById('difficulty-filter').value;
        
        let filteredRecipes = recipes;
        
        if (category !== 'all') {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.category === category);
        }
        
        if (difficulty !== 'all') {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.difficulty === difficulty);
        }
        
        displayRecipes(filteredRecipes, 'all-recipes-grid');
    });
    
    // Submit New Recipe
    document.getElementById('recipe-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newRecipe = {
            id: recipes.length + 1,
            name: document.getElementById('recipe-name').value,
            category: document.getElementById('recipe-category').value,
            difficulty: document.getElementById('recipe-difficulty').value,
            time: parseInt(document.getElementById('recipe-time').value),
            ingredients: document.getElementById('recipe-ingredients').value,
            steps: document.getElementById('recipe-steps').value,
            rating: 0, // New recipes start unrated
            image: document.getElementById('recipe-image').value || 'https://via.placeholder.com/300x180?text=No+Image'
        };
        
        recipes.unshift(newRecipe); // Add to beginning of array
        displayRecipes(recipes.slice(0, 3), 'featured-recipes-grid');
        displayRecipes(recipes, 'all-recipes-grid');
        
        // Reset form
        this.reset();
        alert('Recipe submitted successfully!');
    });
});