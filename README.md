# COMP 4513 (Winter 2025) Assignment #1

# Contributor 
Christopher Nottingham 

# Description
This project is an API for querying Art data, such as artists, paintings and galleries all around the world. The requested data will be sent back in JSON format. 

# Built with
Node.js - Javascript Runtime <br/>
Express - Routing <br />
Supabase - Querybuilder

## Website
- Host: Render
- Hostsite: www.render.com
- Website for API: https://comp4513-a1-nfyg.onrender.com/api/

# Example
### Request: /api/paintings/469
### Response:

```
{
   "paintingId": 469,
   "imageFileName": 105040,
   "title": "Militia Company of District II under the Command of Captain Frans Banninck Cocq (Night Watch)",
   "shapeId": 2,
   "museumLink": "http://hdl.handle.net/10934/RM0001.COLLECT.5216",
   "accessionNumber": "SK-C-5",
   "copyrightText": "Public domain",
   "description": "Rembrandt's largest, most famous canvas was made for the Arquebusiers guild hall. This was one of several halls of Amsterdam's civic guard, the city's militia and police. Rembrandt was the first to paint figures in a group portrait actually doing something. The captain, dressed in black, is telling his lieutenant to start the company marching. The guardsmen are getting into formation. Rembrandt used the light to focus on particular details, like the captain's gesturing hand and the young girl in the foreground. She was the company mascot.",
   "excerpt": "Rembrandt's largest, most famous canvas was made for the Arquebusiers guild hall. This was one of several halls of Amsterdam's civic guard, the city's militia and police. Rembrandt was the first to paint figures in a group portrait actually doing something.",
   "yearOfWork": 1642,
   "width": 453,
   "height": 379,
   "medium": "Oil on canvas",
   "cost": 4000,
   "MSRP": 4500,
   "googleLink": "https://www.google.com/culturalinstitute/beta/asset/the-night-watch/eQEojRwTdypUKA",
   "googleDescription": "The Night Watch, the most famous painting in the Rijksmuseum, actually has another title: Militia Company of District II under the Command of Captain Frans Banninck Cocq. A militia painting is a group portrait of a division of the civic guard. Rembrandt depicted the group of militiamen in an unusual way. Not in a neat row or sitting at their annual banquet, rather, he recorded a moment: a group of militiamen have just moved into action and are about to march off.",
   "wikiLink": "https://en.wikipedia.org/wiki/The_Night_Watch",
   "jsonAnnotations": "{\"safeSearchAnnotation\":{\"violence\":1,\"racy\":1},\"dominantColors\":[{\"color\":{\"red\":37,\"green\":27,\"blue\":8},\"web\":\"#251B08\",\"name\":\"Black Magic\"},{\"color\":{\"red\":127,\"green\":26,\"blue\":26},\"web\":\"#7F1A1A\",\"name\":\"Falu Red\"},{\"color\":{\"red\":92,\"green\":79,\"blue\":49},\"web\":\"#5C4F31\",\"name\":\"West Coast\"},{\"color\":{\"red\":100,\"green\":80,\"blue\":31},\"web\":\"#64501F\",\"name\":\"Bronze Olive\"},{\"color\":{\"red\":172,\"green\":152,\"blue\":94},\"web\":\"#AC985E\",\"name\":\"Barley Corn\"},{\"color\":{\"red\":75,\"green\":54,\"blue\":12},\"web\":\"#4B360C\",\"name\":\"Madras\"}]}",
   "Artists": {
      "details": "Rembrandt Harmenszoon van Rijn was a Dutch painter and etcher. He is generally considered one of the greatest painters and printmakers in European art history and the most important in Dutch history. His contributions to art came in a period of great wealth and cultural achievement that historians call the Dutch Golden Age when Dutch Golden Age painting, although in many ways antithetical to the Baroque style that dominated Europe, was extremely prolific and innovative.",
      "lastName": "Rembrandt",
      "firstName": "",
      "artistLink": "http://en.wikipedia.org/wiki/Rembrandt",
      "nationality": "Netherlands",
      "yearOfBirth": 1606,
      "yearOfDeath": 1669
   },
   "Galleries": {
      "latitude": 52.36,
      "longitude": 4.885278,
      "yahooWoeId": 728410,
      "galleryCity": "Amsterdam",
      "galleryName": "Rijksmuseum",
      "flickrPlaceId": "xfcEFYhWULKtjYI",
      "googlePlaceId": "ChIJ5Ra7we4JxkcRhYVAaq5zQ9U",
      "galleryAddress": "Museumstraat 1, 1071 XX",
      "galleryCountry": "Netherlands",
      "galleryWebSite": "http://www.rijksmuseum.nl/",
      "galleryNativeName": "Rijksmuseum"
   }
}
```

# Example API Calls to Test
## Get all data from a particular table in the database
- https://comp4513-a1-nfyg.onrender.com/api/eras 
- https://comp4513-a1-nfyg.onrender.com/api/galleries 
- https://comp4513-a1-nfyg.onrender.com/api/artists
- https://comp4513-a1-nfyg.onrender.com/api/paintings
- https://comp4513-a1-nfyg.onrender.com/api/genres
## Get all data from a origin table of Artists
- https://comp4513-a1-nfyg.onrender.com/api/artists/12
- https://comp4513-a1-nfyg.onrender.com/api/artists/search/ma
- https://comp4513-a1-nfyg.onrender.com/api/artists/search/mA
- https://comp4513-a1-nfyg.onrender.com/api/artists/country/fra
## Get all data from a origin table of Galleries
- https://comp4513-a1-nfyg.onrender.com/api/galleries/30
- https://comp4513-a1-nfyg.onrender.com/api/galleries/country/fra
## Get all data from a origin table of Genres
- https://comp4513-a1-nfyg.onrender.com/api/genres/76
- https://comp4513-a1-nfyg.onrender.com/api/genres/painting/408
## Get all data from a origin table of Paintings
- https://comp4513-a1-nfyg.onrender.com/api/paintings/search/port
- https://comp4513-a1-nfyg.onrender.com/api/paintings/search/pORt
- https://comp4513-a1-nfyg.onrender.com/api/paintings/sort/year
- https://comp4513-a1-nfyg.onrender.com/api/paintings/sort/title
- https://comp4513-a1-nfyg.onrender.com/api/paintings/years/1800/1850
- https://comp4513-a1-nfyg.onrender.com/api/paintings/63
- https://comp4513-a1-nfyg.onrender.com/api/paintings/galleries/5
- https://comp4513-a1-nfyg.onrender.com/api/paintings/artists/16
- https://comp4513-a1-nfyg.onrender.com/api/paintings/genre/78
- https://comp4513-a1-nfyg.onrender.com/api/paintings/era/2
- https://comp4513-a1-nfyg.onrender.com/api/paintings/artists/country/ital
## Get all counts from the data
- https://comp4513-a1-nfyg.onrender.com/api/counts/genres
- https://comp4513-a1-nfyg.onrender.com/api/counts/artists
- https://comp4513-a1-nfyg.onrender.com/api/counts/topgenres/20

## Error Handling
- https://comp4513-a1-nfyg.onrender.com/api/artists/1223423
- https://comp4513-a1-nfyg.onrender.com/api/galleries/Calgary
- https://comp4513-a1-nfyg.onrender.com/api/genres/painting/jsdfhg
- https://comp4513-a1-nfyg.onrender.com/api/paintings/artist/666
- https://comp4513-a1-nfyg.onrender.com/api/paintings/search/connolly
- https://comp4513-a1-nfyg.onrender.com/api/counts/topgenres/2034958
