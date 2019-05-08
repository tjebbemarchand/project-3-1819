# Readme - project 3

## De case
Create simple UI for editing tags

ALS Gebruiker WIL IK een simpele maar gebruiksvriendelijke manier om tags te maken en aan te passen  
ZODAT Logs of threads gemakkelijker getagt kunnen worden en daarmee makkelijker te doorzoeken / filteren.

## Het concept
Het idee zorgt ervoor dat alleen de admin van de app, tags kan toevoegen, wijzigen en verwijderen. Dit moet ervoor zorgen dat er geen onnodige tags bestaan na 10 jaar. De admin kan een naam en een kleur geven aan de tag, die vervolgens opgeslagen wordt met meer meta data.

Dit is de meta data die ik wil opslaan voor elke tag.

    id
    name
    value
    total
    color
    createdAt
    editedAt
    createdBy

De persoon die vervolgens een tag toe wilt voegen aan een run, log of een comment. Ziet all tags terugkomen die hij vervolgens kan aanklikken. Ook kunnen er meerdere tags aan 1 specifiek onderdeel gekoppeld worden.
Mocht de juiste tag er niet tussen staan, dan is er nog een "other" tag. Als je die selecteerd komt er een input veld tevoorschijn waarin je een suggestie kunt doen voor de tag die bij die onderdeel past.

## Schetsen
![Hand schetsen](docs/hand-schetsen.jpg)

Hierbij heb ik het Bootstrap framework gelaten omdat daar al mee gewerkt wordt. Ik gebruik ook de badge classen om de tags te stylen.