---
description: "Définir un indicateur, écrire des exigences de qualité mesurables et demander les bonnes données."
---

## Le problème
Sans ce domaine, le PO d'un produit data publie un chiffre sans dire ce qu'il compte : deux
chiffres justes se contredisent, et l'on débat de celui qu'il faut croire. Il accepte « des
données fiables » comme exigence, que personne ne sait tester. Il demande toute une table « au
cas où » : l'accès ne s'obtient pas, ou s'obtient trop large.

## Le fil des concepts
**12. Les données du produit.** Le PO n'y calcule rien : il fait écrire et fixer, et il sait ce
qu'il demande. C'est le seul concept du domaine.

**12a. Définir un indicateur.** Un indicateur se définit par ce qu'il compte et sa règle de
calcul, son grain (Kimball, choix d'école), sa période, sa source, sa fraîcheur (choix du cours).
Cette définition vient d'abord, car on ne juge ni la qualité ni l'accès d'un chiffre non défini. La définition vaut partout où l'indicateur
est publié (choix du cours), le critère reste propre à sa story ; le PO fait fixer les manques.

**12b. La qualité des données.** Une exigence de qualité s'écrit en règle mesurable sur une
dimension (six chez DAMA UK, choix d'école) et se range dans la DoD, un critère ou la définition
(choix du cours). Elle s'appuie sur la définition de l'indicateur. Une limite de la source s'écrit et se montre.

**12c. Accès et données personnelles.** Le chiffre défini dit quelles colonnes et quelles
lignes demander, pour quelle finalité : l'accès vient en dernier. Un identifiant qui permet de
retrouver une personne est une donnée personnelle (RGPD) ; le PO ne fait pas le droit.

## D'où l'on vient, où l'on va
Le domaine 3 a posé la DoD et la DoR : celui-ci dit ce qu'une définition écrite et un accès
obtenu y demandent. Le domaine 5 ordonne des stories dont on sait alors si elles sont prêtes.

## Un cas qui traverse le domaine
Odile veut suivre le nombre d'abonnés par type d'abonnement. Le PO fait écrire sa définition
(qui compte comme abonné, à quel moment, d'après quelle source) et fixer par Odile ce qui reste
ouvert. Il traduit ce qu'elle attend du chiffre en règles mesurables, rangées au bon endroit.
Enfin, il prépare l'accès aux données des abonnés, qui portent aussi nom et coordonnées : il
dit à quoi sert chaque colonne demandée, pour cette finalité.
