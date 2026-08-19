# Système de Gestion des Images

## Vue d'ensemble
Le système d'images permet d'uploader des photos et de les enregistrer dans la base de données avec les autres données (profil, projet, compétence, expérience). Les images sont sauvegardées en tant que fichiers locaux et les URLs sont stockées dans la BD.

## Architecture

### 1. **Image Service** (`src/modules/image/image.service.ts`)
- `uploadImage(fileBase64, name)` - Upload une image en base64 et retourne l'URL
- `getImage(fileName)` - Récupère une image par son nom
- `removeImage(fileName)` - Supprime une image

### 2. **Image Controller** (`src/modules/image/image.controller.ts`)
Endpoints d'API pour gérer les images directement

### 3. **Image Routes** (`src/modules/image/image.routes.ts`)
Routes disponibles :
- `POST /api/v1/images/upload` - Upload une image
- `GET /api/v1/images/:fileName` - Récupère une image
- `DELETE /api/v1/images/:fileName` - Supprime une image

## Intégration avec les Services

### 1️⃣ Profile avec photo
```bash
POST /api/v1/profile
{
  "bio": "Ma bio",
  "titre": "Mon titre",
  "linkedin": "...",
  "github": "...",
  "utilisateurId": 1,
  "photoBase64": "data:image/png;base64,iVBORw0KG...",
  "photoName": "profile-photo.png"
}

Response avec URL stockée dans url_localphoto
```

### 2️⃣ Projet avec photo
```bash
POST /api/v1/projet
{
  "titre": "Mon projet",
  "description": "Description du projet",
  "utilisateurId": 1,
  "photoBase64": "data:image/png;base64,iVBORw0KG...",
  "photoName": "project-photo.png"
}

Response avec URL dans url_localphoto
```

### 3️⃣ Compétence avec photo
```bash
POST /api/v1/competences
{
  "nom": "React",
  "niveau": "Expert",
  "utilisateurId": 1,
  "photoBase64": "data:image/png;base64,iVBORw0KG...",
  "photoName": "competence-photo.png"
}

Response avec URL dans url_localphoto
```

### 4️⃣ Expérience avec photo
```bash
POST /api/v1/experiences
{
  "titre": "Développeur Senior",
  "entreprise": "Tech Corp",
  "description": "...",
  "dateDebut": "2020-01-01",
  "utilisateurId": 1,
  "photoBase64": "data:image/png;base64,iVBORw0KG...",
  "photoName": "experience-photo.png"
}

Response avec URL dans url_photo
```

## GET - Récupération des images

### Récupérer profil (avec image)
```bash
GET /api/v1/profile/:userId
Response:
{
  "id": 1,
  "bio": "Ma bio",
  "titre": "Mon titre",
  "url_localphoto": "http://localhost:3000/uploads/profile-photo.png",
  "utilisateurId": 1
}
```

### Récupérer projets (avec images)
```bash
GET /api/v1/projet?page=1&limit=10
Response:
[
  {
    "id": 1,
    "titre": "Mon projet",
    "description": "...",
    "url_localphoto": "http://localhost:3000/uploads/project-photo.png",
    "utilisateurId": 1
  }
]
```

### Récupérer compétences (avec images)
```bash
GET /api/v1/competences?page=1&limit=10
Response:
[
  {
    "id": 1,
    "nom": "React",
    "niveau": "Expert",
    "url_localphoto": "http://localhost:3000/uploads/competence-photo.png",
    "utilisateurId": 1
  }
]
```

### Récupérer expériences (avec images)
```bash
GET /api/v1/experiences?page=1&limit=10
Response:
[
  {
    "id": 1,
    "titre": "Développeur Senior",
    "entreprise": "Tech Corp",
    "url_photo": "http://localhost:3000/uploads/experience-photo.png",
    "utilisateurId": 1
  }
]
```

## Mise à jour avec nouvelle photo
```bash
PUT /api/v1/profile/:userId
PUT /api/v1/projet/:id
PUT /api/v1/competences/:id
PUT /api/v1/experiences/:id

{
  "titre": "Nouveau titre",
  "photoBase64": "data:image/png;base64,iVBORw0KG...",
  "photoName": "new-photo.png"
}
```

## Paramètres optionnels

- `photoBase64` (optionnel) - Image encodée en base64
- `photoName` (optionnel) - Nom du fichier pour l'image

> ⚠️ Si `photoBase64` est fourni, `photoName` est **obligatoire**

## Flux d'enregistrement complet

```
Client envoie : { données + photoBase64 + photoName }
         ↓
    Contrôleur (extrait photo)
         ↓
    Service (profil/projet/competence/experience)
         ↓
    Image Service (uploadImage)
         ↓
    Fichier sauvegardé + URL retournée
         ↓
    Repository
         ↓
    BD : données + URL dans url_localphoto/url_photo
         ↓
    Response : données complètes avec URL
```

## Champs dans la BD

### Profile
- `url_localphoto` - URL locale de la photo de profil
- `url_cloud` - URL cloud (optionnel)
- `photo` - Autre champ photo (optionnel)

### Projet
- `url_localphoto` - URL locale de la photo du projet
- `url_cloud` - URL cloud (optionnel)

### Competence
- `url_localphoto` - URL locale de la photo de compétence
- `url_cloud` - URL cloud (optionnel)

### Experience
- `url_photo` - URL de la photo d'expérience

## Sécurité

✅ Toutes les routes images et l'intégration dans tous les modules sont **protégées par authMiddleware**
✅ Seuls les utilisateurs authentifiés peuvent uploader/modifier des images
✅ Les images sont stockées dans le dossier `/uploads`
✅ Les URLs sont accessibles via `/uploads/:fileName`
✅ Validation de base64 et du nom de fichier

## Endpoints résumé

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/v1/images/upload` | Upload une image directement |
| GET | `/api/v1/images/:fileName` | Récupère une image |
| DELETE | `/api/v1/images/:fileName` | Supprime une image |
| POST | `/api/v1/profile` | Crée profil avec photo |
| PUT | `/api/v1/profile/:userId` | Met à jour profil avec photo |
| GET | `/api/v1/profile/:userId` | Récupère profil (avec URL image) |
| POST | `/api/v1/projet` | Crée projet avec photo |
| PUT | `/api/v1/projet/:id` | Met à jour projet avec photo |
| GET | `/api/v1/projet` | Récupère projets (avec URLs images) |
| POST | `/api/v1/competences` | Crée compétence avec photo |
| PUT | `/api/v1/competences/:id` | Met à jour compétence avec photo |
| GET | `/api/v1/competences` | Récupère compétences (avec URLs images) |
| POST | `/api/v1/experiences` | Crée expérience avec photo |
| PUT | `/api/v1/experiences/:id` | Met à jour expérience avec photo |
| GET | `/api/v1/experiences` | Récupère expériences (avec URLs images) |
