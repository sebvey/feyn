---
description: "Découper une story en tranches verticales, écrire son hors périmètre et ses dépendances, savoir quand elle est prête et quand elle est finie."
---

## Le problème
Un PO venu de la technique découpe volontiers un besoin data par couche : collecter, puis
transformer, puis restituer. Rien ne sert l'utilisateur avant la fin. Ce que la story ne fait
pas reste tacite, et un manque convenu passe pour un bug à la revue de sprint. Une story entre
dans le sprint sans ce dont elle a besoin, et « fini » se discute story par story.

## Le fil des concepts
**9. Découpage en tranches verticales.** Une story bien écrite peut rester trop grosse pour un
sprint : on la coupe en tranches qui traversent toutes les couches et servent seules à
l'utilisateur. Le vertical s'arrête à la story, ses tâches sont horizontales. Les catalogues de
patrons sont des choix d'école (SPIDR de Mike Cohn, les patrons de Richard Lawrence).

**10. Hors périmètre et dépendances.** On écrit ce que la tranche choisie ne fait pas
alors qu'on pourrait l'attendre (rubrique : choix d'école) ; chaque ligne reste une demande,
que le PO ordonne. Une story qui ne peut pas être livrée, ou n'a pas de sens, avant une autre
en dépend : on fusionne ou on découpe autrement (Mike Cohn), ou l'on garde les deux et le PO
ordonne ; envers une autre équipe, on s'accorde avec son PO sur l'ordre (choix du cours, pour
les deux).

**11. Definition of Done, Definition of Ready.** La DoD dit quand une story sort terminée, la
DoR quand elle peut entrer. La DoD est dans le Scrum Guide (une même DoD pour les équipes d'un
produit) ; le cours en tire « une seule DoD, pour toute story ». La DoR est un choix d'école ;
celle de l'équipe vélos reprend les dépendances identifiées (10) et l'accès aux données obtenu.

## D'où l'on vient, où l'on va
Le domaine 2 a donné une story qui dit qui, quoi, pourquoi, avec des critères tranchables et
des règles métier à part ; celui-ci la rend assez petite et bornée pour un sprint. Il
prépare le domaine 4 : la DoD exige une définition écrite pour chaque indicateur publié.

## Un cas qui traverse le domaine
Odile, directrice des opérations et sponsor, veut suivre la mesure de résultat de l'objectif
produit : le temps cumulé où une station du centre-ville est vide aux heures de pointe. Quelle
première tranche lui sert seule (9) ? Que pourrait-elle croire inclus, et de quoi la story
dépend-elle (10) ? Les heures de pointe, la station vide et le calcul ne sont pas fixés : qu'en
dit la DoR, et que demande la DoD avant que la story soit terminée (11) ?
