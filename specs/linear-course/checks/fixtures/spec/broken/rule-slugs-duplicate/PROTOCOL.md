# fixture: the protocol

Rules named by slug, in two families. A rule is cited by its slug, « (règle `first-rule`) », as
in rule `second-rule`.

## 1. Démarrage

### Accueil (`onboarding`)

**first-rule** Le premier message part sans appel d'outil.

**second-rule** Le premier message présente le cours ; puis la règle `first-rule` vaut encore.

**first-rule** Le premier message nomme le cours.

## 2. Mémoire

**save-points** Après l'accueil (groupe `onboarding`), les points de sauvegarde, selon le tableau ci-dessous (règles `first-rule` et
`second-rule`).

| Ligne | Quoi | Où |
|---|---|---|
| **save-next-step** | Où on en est (règle `save-points`) | `learner/parcours.md` |

## Keys and parameters

| Key | French value | Used in |
|---|---|---|
| `phrases.example` | « Exemple » | `first-rule`, `save-next-step` |

## Inherited from parcours-po

| Rule | ADR | Old text |
|---|---|---|
| `first-rule` | 001 | step 1 (`learner-onboarding`) |
| `second-rule` | none | idem |
| `save-points` | none | new |
