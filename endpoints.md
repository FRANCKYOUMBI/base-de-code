Je vais organiser les endpoints RESTful par domaine et par fonctionnalité. Pour chaque endpoint, je préciserai la méthode HTTP.

### Authentification
```
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh-token
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
```

### Gestion des Utilisateurs
```
GET    /api/users
POST   /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
PUT    /api/users/:id/change-password
GET    /api/users/:id/permissions
```

### Gestion des Fournisseurs
```
GET    /api/suppliers
POST   /api/suppliers
GET    /api/suppliers/:id
PUT    /api/suppliers/:id
DELETE /api/suppliers/:id
GET    /api/suppliers/:id/products
POST   /api/suppliers/:id/products
GET    /api/suppliers/:id/purchases
```

### Gestion des Clients
```
GET    /api/customers
POST   /api/customers
GET    /api/customers/:id
PUT    /api/customers/:id
DELETE /api/customers/:id
GET    /api/customers/:id/sales
GET    /api/customers/:id/loyalty-points
PUT    /api/customers/:id/loyalty-points
```

### Gestion des Produits
```
GET    /api/products
POST   /api/products
GET    /api/products/:id
PUT    /api/products/:id
DELETE /api/products/:id
GET    /api/products/:id/stock
GET    /api/products/:id/suppliers
GET    /api/products/:id/price-history
PUT    /api/products/:id/units
GET    /api/products/barcode/:code
```

### Gestion des Catégories
```
GET    /api/categories
POST   /api/categories
GET    /api/categories/:id
PUT    /api/categories/:id
DELETE /api/categories/:id
GET    /api/categories/:id/products
```

### Gestion des Unités
```
GET    /api/units
POST   /api/units
GET    /api/units/:id
PUT    /api/units/:id
DELETE /api/units/:id
GET    /api/units/conversions
POST   /api/units/conversions
```

### Gestion des Stocks
```
GET    /api/stock
GET    /api/stock/:productId
POST   /api/stock/movements
GET    /api/stock/movements
POST   /api/stock/adjustments
GET    /api/stock/adjustments
GET    /api/stock/low-stock
POST   /api/stock/inventory
```

### Gestion des Ventes
```
GET    /api/sales
POST   /api/sales
GET    /api/sales/:id
PUT    /api/sales/:id
DELETE /api/sales/:id
POST   /api/sales/:id/items
DELETE /api/sales/:id/items/:itemId
POST   /api/sales/:id/payments
GET    /api/sales/:id/payments
PUT    /api/sales/:id/status
GET    /api/sales/daily
POST   /api/sales/hold
GET    /api/sales/hold
```

### Gestion des Achats
```
GET    /api/purchases
POST   /api/purchases
GET    /api/purchases/:id
PUT    /api/purchases/:id
DELETE /api/purchases/:id
POST   /api/purchases/:id/items
DELETE /api/purchases/:id/items/:itemId
POST   /api/purchases/:id/payments
GET    /api/purchases/:id/payments
PUT    /api/purchases/:id/status
```

### Rapports et Statistiques
```
GET    /api/reports/sales
GET    /api/reports/purchases
GET    /api/reports/inventory
GET    /api/reports/profit-loss
GET    /api/reports/taxes
GET    /api/reports/cash-flow
GET    /api/reports/product-performance
GET    /api/reports/customer-performance
GET    /api/reports/supplier-performance
```

### Configuration Système
```
GET    /api/settings
PUT    /api/settings
GET    /api/settings/company
PUT    /api/settings/company
GET    /api/settings/tax-rates
PUT    /api/settings/tax-rates
```

Notes importantes :
1. Tous les endpoints sont préfixés par `/api`
2. Les endpoints de liste supportent la pagination, le tri et le filtrage via query params
3. Les endpoints protégés nécessitent un token JWT valide
4. Les réponses d'erreur suivent un format standard
5. La validation des données est effectuée côté serveur
6. Les endpoints supportent la gestion des versions via headers

Voulez-vous que je détaille la structure des requêtes/réponses pour certains endpoints spécifiques ?