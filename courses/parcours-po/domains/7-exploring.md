---
description: "Séparer ce qu'on sait de ce qu'on suppose et borner une exploration avant de s'engager."
---

## Le problème
Le PO d'un produit data prend ses suppositions pour des faits : il vérifie que le modèle marche,
pas que l'utilisateur s'en servira, fait tout construire pour voir, et exige d'une fonction de
prévision qu'elle ne se trompe jamais. Il paie la façon la plus chère d'apprendre.

## Le fil des concepts
**17. Hypothèses et exploration.** Vérifier au moindre coût ce qu'on suppose avant de s'engager.

**17a. Savoir ou supposer.** Sépare le vérifié du supposé. Marty Cagan nomme quatre grands
risques (choix d'école) ; le cours en retient deux, valeur et faisabilité, et range les données
dans la faisabilité (choix du cours). On ne vérifie que ce qu'on a nommé : il vient d'abord.

**17b. Explorer à moindre coût.** Une exploration bornée (spike, venu d'XP, choix d'école) se
décide avant : question, durée, décision selon la réponse (choix du cours). Le PO pose la
question ; les Developers explorent, par une analyse d'historique pour la faisabilité, par un
prototype sur données réelles pour la valeur (le prototype : choix d'école, Cagan).

**17c. Accepter un résultat incertain.** Une fonction de prévision se trompe : son critère porte
sur un niveau atteint, fixé après l'exploration (choix du cours) par l'utilisateur concerné.

## D'où l'on vient, où l'on va
Le domaine 6 laisse une story map et une première version, avec ce qu'elles supposent sans le
vérifier ; le MVP au sens d'Eric Ries (choix d'école, 16b) devient ici une manière d'apprendre
parmi d'autres. Le domaine ferme le cours : il laisse à l'apprenant une question devant chaque
story, ce qu'il suppose et ce qu'il fera si c'est faux.

## Un cas qui traverse le domaine
À la revue de sprint, Théo demande une suite à sa story de tournée : savoir lesquels des vélos
signalés sont vraiment en panne. Le concept 17a fait dire ce qu'on suppose : que les signalements
suffisent (ceux faits par téléphone n'y sont pas), que ses constats sont gardés, qu'il changera
sa tournée. Au concept 17b, le PO pose une question bornée qu'Anna explore, et cherche comment
voir ce que fera Théo. Au concept 17c, Maud et Théo fixent, résultats connus, le niveau du
critère, entre déplacements pour rien et vélos en panne oubliés.
